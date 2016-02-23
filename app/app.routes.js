angular.module('app')
    .config(['$routeProvider',function ($routeProvider) {
        "use strict";

        $routeProvider

        .when('/checkout',{
            templateUrl: '/checkout/checkout.html',
            controller: 'CheckoutController',
            controllerAs: "checkoutCtrl"
        })

        .when('/heroes',{
            templateUrl: '/heroes/hero-list.html',
            controller: 'HeroListController',
            controllerAs: "heroListCtrl"
        })

        .when('/users',{
            templateUrl: '/users/users.html',
            controller: 'UserController'
        })

        .otherwise({
            redirectTo:'/heroes'
        });
    }])
