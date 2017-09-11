angular.
  module('bookingApp').
  config(['$locationProvider', '$routeProvider',
	  
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<booking-list></booking-list>'
        }).
        otherwise('/home');
      
    }
     
  ]);