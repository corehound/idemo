angular.
  module('bookingApp').
  config(function (HateoasInterceptorProvider) {
		HateoasInterceptorProvider.transformAllResponses();
		console.log('init');
	});