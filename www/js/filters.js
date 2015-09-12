angular.module('johans.filters', []).filter('image', function() {
  return function(input,tabpos) {
	  return input.pos == tabpos;
  };
});