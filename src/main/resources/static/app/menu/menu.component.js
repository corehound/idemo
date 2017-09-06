'use strict';

angular.
  module('menu').
  component('menu', {
    templateUrl: 'menu/menu.template.html',
    controller: function BookingListController() {
      this.bookings = [
        {
          name: 'PRDUS',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'PRDUS',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'PRDUS',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    }
  });