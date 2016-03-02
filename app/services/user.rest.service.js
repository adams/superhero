(function () {
    "use strict";

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$resource','$log'];

    /* @ngInject */
    function UserService($resource, $log) {
        var urlTemplate = 'http://localhost:3000/users/:id';
        var paramDefaults = {id: '@id'};
        var actions = {'update': { method:'PUT' }};

        return $resource(urlTemplate, paramDefaults, actions);

    }


})();
