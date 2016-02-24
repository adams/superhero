(function () {
    "use strict";

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$log'];

    /* @ngInject */
    function UserService($http, $log) {
        var usersUrl = 'http://localhost:3000/users/';
        var service = {
            list:list,
            add:add,
            update: update,
            remove: remove
        };

        return service;

        ////////////////

        function list() {
            return $http({
                method: 'get',
                url: usersUrl
            });

        }

        function add(user) {
            return $http({
                method: 'POST',
                url: usersUrl,
                data: user
            });
        }

        function update(user) {
            return $http({
                method: 'PUT',
                url: usersUrl + user.id ,
                data: user
            });

        }

        function remove(id) {
            return $http({
                method: 'DELETE',
                url: usersUrl + id
            });

        }




    }


})();
