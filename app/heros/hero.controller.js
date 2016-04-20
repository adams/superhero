angular.module('hero-app')
.controller('ListCtrl', function($scope, $http){

	$scope.newHero = {};

	$http.get('/data/products.json')
		.then(function(res){
			$scope.heros = res.data
		})

	$scope.addHero = function (hero){
		$scope.heros.push(hero);
		$scope.newHero = {};
	}

})