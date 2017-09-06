'use strict';

angular.
  module('bookingList').
  component('bookingList', {
    templateUrl: 'booking-list/booking-list.template.html',
    controller: ['$http', '$scope', '$resource', 'Booking', 'SpringDataRestAdapter',
    	
      function BookingListController($http, $scope, $resource, Booking, SpringDataRestAdapter) {
    			

    	var httpPromise = $http.get('/reservation');

    	SpringDataRestAdapter.process(httpPromise, 'room').then(function (processedResponse) {
    		
    		  angular.forEach(processedResponse._embeddedItems, function (reservation, key) {
    			    console.log(" name: " + reservation.user);
    			    console.log(" name: " + reservation.room.name);
    			  });
    	});    	

		
    	$scope.cities = ["Praha", "Brno", "Hradec Kralové"];
    	$scope.rooms = ["1", "2", "3"];
    	
    	$scope.bookings = Booking.query();
        
        $scope.deleteBooking = function (bookingId) {
        	console.log(bookingId);
        	
        	$scope.bookings = Booking.query();

        };
        
        $scope.createBooking = function () {
        	console.log('create booking');
        	console.log($scope.selectedCity);
        	console.log($scope.selectedRoom);
        	
        	$scope.bookings = Booking.query();

        };
        
        $scope.cityChanged = function () {
        	console.log($scope.selectedCity);
        	$scope.rooms = ["A", "B", "C"];
        };

      }

    ]
  });