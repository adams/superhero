(function () {
    "use strict";

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$window', '$log','UserService'];

    /* @ngInject */
    function UserController($window, $log, UserService) {
        /* jshint validthis: true */
        var userCtrl = this;
        userCtrl.title = 'UserController';
        userCtrl.user = {};

        activate();

        ////////////////

        function activate() {

            UserService.query().$promise
            .then(function(data){
                userCtrl.users = data;
            }).catch(function(response){
                $log.error(response.status);
            });
        }

        userCtrl.editing = function(user){
            userCtrl.originalUser = angular.extend({}, user);
            userCtrl.editedUser = user;
            $log.info(user);
        };

        userCtrl.revertEditing = function(index){
            userCtrl.editedUser = {};
            userCtrl.users[index] = userCtrl.originalUser;
        };

        userCtrl.save = function(form){
            if(form.$invalid){
                $window.alert("can't save: form not valid");
                return false;
            }

            UserService.update(userCtrl.editedUser.id, userCtrl.editedUser).$promise
            .then(function(response){
                userCtrl.editedUser = {};
            }).catch(function(response){
                $window.alert("problem saving");
                $log.error(response.status);
            });

        };

        userCtrl.remove = function(index, user){

            var result = $window.confirm("Are you sure you want to delete this user.");
            if(!result){
                return false;
            }

            UserService.remove(user).$promise
            .then(function(data){
                userCtrl.users.splice(index,1);
                $log.info("successfully deleted");
            }).catch(function(response){
                $window.alert("there was a problem deleting");
                $log.error(response.status);
            });
        };

        userCtrl.adding = function(){
            userCtrl.newUser = {};
        };

        userCtrl.revertAdding = function(index){
            userCtrl.newUser = null;
        };

        userCtrl.add = function(form){
            if(form.$invalid){
                $window.alert("can't save: form not valid");
                return false;
            }

            UserService.save(userCtrl.newUser).$promise
            .then(function(data){
                userCtrl.users.unshift(userCtrl.newUser);
                userCtrl.newUser = null;
            }).catch(function(response){
                $window.alert("problem saving");
                $log.error(response.status);
            });

        };



    }

})();

