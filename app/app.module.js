angular.module('app',['ngRoute']);

angular.module('app').run(function($rootScope, $location){

    $rootScope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
