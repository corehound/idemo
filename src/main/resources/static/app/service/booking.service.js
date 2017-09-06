'use strict';

angular.
  module('bookingService').
  factory('Booking', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/i-demo/bookings.json', {bookingId: '@bid'}, {
        
    	query: {
          method: 'GET',
          params: {bookingId: 'all'},
          isArray: true
        },
      
        delete: { 
        	method: 'DELETE',
        	params: {bookingId: '@bid'} }
        
      });
    }
  ]);
