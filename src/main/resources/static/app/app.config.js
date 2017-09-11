angular.
  module('reservationApp').
  config(['$locationProvider', '$routeProvider',
	  
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<reservation-list></reservation-list>'
        }).
        otherwise('/home');
      
    }
     
  ]);