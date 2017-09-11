'use strict';

angular.
  module('bookingList').
  component('bookingList', {
    templateUrl: 'app/booking-list/booking-list.template.html',
    controller: ['$http', '$scope', 'SpringDataRestAdapter',
    	
      function BookingListController($http, $scope, SpringDataRestAdapter) {
    			
        $scope.selectedCity = "";
      	$scope.selectedRoom = "";
      	$scope.selectedDate = new Date();
      	
    	$scope.minDate = new Date();
    	

		loadReservationList();
    	    	
    	var httpPromise = $http.get('/city');
    	SpringDataRestAdapter.process(httpPromise, 'rooms').then(function (processedResponse) {    		   
			    $scope.cities = processedResponse._embeddedItems;
    	});
    	    	  
        $scope.deleteBooking = function (booking) {
        	console.log(booking._links.self.href);
        	var httpPromise = $http.delete(booking._links.self.href).then(function () { 
        		loadReservationList();
        	});   	
        };
        
        $scope.createBooking = function () {
        	console.log('create booking');
        	console.log($scope.selectedCity);
        	console.log($scope.selectedRoom);
        	console.log($scope.selectedDate.getDate() + $scope.selectedDate.getMonth() + $scope.selectedDate.getFullYear());
        	
        	if ($scope.selectedCity == "" || $scope.selectedRoom == "" || $scope.selectedDate == ""){
        	    console.log('eerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        	    return;
        	}
        	
        	var date = $scope.selectedDate.getFullYear() + "-" + ($scope.selectedDate.getMonth() + 1) + "-" + $scope.selectedDate.getDate();
        	var data = "{\"user\": \"kakrda\", \"date\" : \"" + date +  "\"}";
        
        	console.log(data);
        	
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

            var httpPromise = $http.post('/reservation', data, config);
            
            SpringDataRestAdapter.process(httpPromise).then(function (processedResponse) {
      		  
      			 console.log("AAAAAAAAAAAAAAa name: " + processedResponse._links.room.href);
      			    
      			    
      			  var data2 = $scope.selectedRoom._links.self.href;
      	        
                  var config2 = {
                      headers : {
                          'Content-Type': 'text/uri-list'
                      }
                  }
                  
      			  var httpPromisePut = $http.put(processedResponse._links.room.href, data2, config2);
      			
                  loadReservationList();
                
                $scope.selectedCity = "";
              	$scope.selectedRoom = "";
              	$scope.selectedDate = new Date();
            });  
            
            
            
            
        };
        	
        
        
        $scope.cityChanged = function () {
        	console.log($scope.selectedCity);
        	console.log($scope.selectedCity.rooms._embeddedItems);
        	$scope.rooms = $scope.selectedCity.rooms._embeddedItems;
        };
        
        function loadReservationList() {
            
        	var httpPromise = $http.get('/reservation');

        	SpringDataRestAdapter.process(httpPromise, ['city', 'room'], true).then(function (processedResponse) {
        		  angular.forEach(processedResponse._embeddedItems, function (reservation, key) {
        			    console.log(" name: " + reservation.user);
        			    console.log(" name: " + reservation.room.name);
        			    console.log("XXXXXXXXXXXXXXXXXXX name: " + reservation.room);
        			  });
        		   
        		  $scope.bookings = processedResponse._embeddedItems;
        	}); 
        	        	
        }

      }

    ]
  });