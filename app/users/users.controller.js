angular.module('app')
    .controller('UserController', function($scope, $http, $window, $log){
        $scope.user = {};
        $http({
            method: 'get',
            url: 'http://localhost:3000/users'
        })
        .then(function(response){
                if(!response.data){return;}
                $scope.users = response.data;
            }).catch(function(response){
                if(!response.data){return;}
                $log.error(response.status);
        });

        $scope.editing = function(user){
            $scope.originalUser = angular.extend({}, user);
            $scope.editedUser = user;
            $log.info(user);
        };

        $scope.revertEditing = function(index){
            $scope.editedUser = {};
            $scope.users[index] = $scope.originalUser;
        }

        $scope.save = function(event){
            //if($scope.UserForm.invalid){alert("can't save: form not valid");}
            event.preventDefault();
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/users/' +$scope.editedUser.id ,
                data: $scope.editedUser
            })
                .then(function(response){
                    $scope.editedUser = {};

                }).catch(function(response){
                alert("problem saving");
                $log.error(response.status);
            });

        };

        $scope.remove = function(index, userId){

            var result = $window.confirm("Are you sure you want to delete this user.");
            if(!result){
                return false;
            }

            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/users/' + userId
            })
            .then(function(response){
                    $scope.users.splice(index,1);
                    $log.info("successfully deleted");
            }).catch(function(response){
                alert("there was a problem deleting");
                $log.error(response.status);
            });
        };




    });



