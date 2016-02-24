(function () {
    "use strict";

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$http', '$window', '$log'];

    /* @ngInject */
    function UserController($http, $window, $log) {
        /* jshint validthis: true */
        var userCtrl = this;
        userCtrl.title = 'UserController';
        userCtrl.user = {};

        activate();

        ////////////////

        function activate() {

            $http({
                method: 'get',
                url: 'http://localhost:3000/users'
            }).then(function(response){
                    if(!response.data){return;}
                    userCtrl.users = response.data;
            }).catch(function(response){
                    if(!response.data){return;}
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
        }

        userCtrl.save = function(event){
            //if(userCtrl.UserForm.invalid){alert("can't save: form not valid");}
            event.preventDefault();
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/users/' +userCtrl.editedUser.id ,
                data: userCtrl.editedUser
            })
                .then(function(response){
                    userCtrl.editedUser = {};

                }).catch(function(response){
                alert("problem saving");
                $log.error(response.status);
            });

        };

        userCtrl.remove = function(index, userId){

            var result = $window.confirm("Are you sure you want to delete this user.");
            if(!result){
                return false;
            }

            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/users/' + userId
            })
                .then(function(response){
                    userCtrl.users.splice(index,1);
                    $log.info("successfully deleted");
                }).catch(function(response){
                alert("there was a problem deleting");
                $log.error(response.status);
            });
        };



    }

})();

