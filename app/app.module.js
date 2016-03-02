angular.module('app',['ngRoute','ngResource']);

angular.module('app').run(function($rootScope, $location){

    $rootScope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
