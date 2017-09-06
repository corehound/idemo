angular.
  module('bookingApp').
  config(['$locationProvider', '$routeProvider',
	  
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/menu', {
          template: '<menu></menu>'
        }).
        when('/bookings', {
          template: '<booking-list></booking-list>'
        }).
        otherwise('/menu');
      
    }
     
  ]);