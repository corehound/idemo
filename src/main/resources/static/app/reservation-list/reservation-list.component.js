'use strict';

angular.
module('reservationList').
component('reservationList', {
    templateUrl: 'app/reservation-list/reservation-list.template.html',
    controller: ['$http', '$scope', '$rootScope', 'SpringDataRestAdapter',

        function ReservationListController($http, $scope, $rootScope, SpringDataRestAdapter) {
            var date = new Date()
            //var selectedDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear()

            $scope.selectedCity = "";
            $scope.selectedRoom = "";
            $scope.selectedDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
            $scope.minDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()

            loadReservationList();
            loadCityList();

            $scope.deleteReservation = function(reservation) {
                console.log(reservation._links.self.href);
                var httpPromise = $http.delete(reservation._links.self.href).then(function() {
                    loadReservationList();
                });
            };

            $scope.createReservation = function() {
                console.log('create reservation');

                if ($scope.selectedCity == "" || $scope.selectedRoom == "" || $scope.selectedDate == "") {
                    console.log('Not valid data error.');
                    return;
                }

                var dateData = jQuery('#date').val().split('/')
                var date = dateData[2] + '-' + dateData[0] + '-' + dateData[1]
                //var date = $scope.selectedDate.getFullYear() + "-" + ($scope.selectedDate.getMonth() + 1) + "-" + $scope.selectedDate.getDate();
                var data = "{\"user\": \"" + $rootScope.userId + "\", \"date\" : \"" + date + "\"}";

                console.log(data);

                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                var getPromise = $http.get('/reservation/search/findByDateAndRoomId?date=' + date + '&roomid=' + $scope.selectedRoom.id);

                SpringDataRestAdapter.process(getPromise).then(function(processedResponse) {
                    if (processedResponse._embeddedItems.length > 0) {
                    	$scope.error="FUUUJ";
                    } else {

                    	var httpPromise = $http.post('/reservation', data, config);

                        SpringDataRestAdapter.process(httpPromise).then(function(processedResponse) {

                            var data2 = $scope.selectedRoom._links.self.href;

                            var config2 = {
                                headers: {
                                    'Content-Type': 'text/uri-list'
                                }
                            }

                            var httpPromisePut = $http.put(processedResponse._links.room.href, data2, config2);

                            loadReservationList();
                            var date = new Date()

                            $scope.selectedCity = "";
                            $scope.selectedRoom = "";
                            $scope.selectedDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
                        });

                        $scope.hideModal()
                    }
                });

            };

            $scope.showModal = function() {
                angular.element(document.querySelector('#modal-reservation')).addClass('modal-open')
                var datepicker = angular.element(document.querySelector('.js-datepicker'))
                console.log(jQuery(datepicker).datepicker())
            };

            $scope.hideModal = function() {
                console.log('hiding')
                angular.element(document.querySelector('#modal-reservation')).removeClass('modal-open')
            };

            $scope.cityChanged = function() {
                console.log($scope.selectedCity);
                console.log($scope.selectedCity.rooms._embeddedItems);
                $scope.rooms = $scope.selectedCity.rooms._embeddedItems;
            };

            function loadReservationList() {

                var httpPromise = $http.get('/reservation');

                SpringDataRestAdapter.process(httpPromise, ['city', 'room'], true).then(function(processedResponse) {
                    angular.forEach(processedResponse._embeddedItems, function(reservation, key) {
                        // console.log(" name: " + reservation.user);
                        // console.log(" name: " + reservation.room.name);
                    });

                    $scope.reservations = processedResponse._embeddedItems;
                });

            }

            function loadCityList() {
                var httpPromise = $http.get('/city');
                SpringDataRestAdapter.process(httpPromise, 'rooms').then(function(processedResponse) {
                    $scope.cities = processedResponse._embeddedItems;
                });
            }

        }

    ]
});