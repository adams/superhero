angular.module('app')
    .controller('UserController', function($scope, $http){
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
            console.log (response.status);
        });

        $scope.editing = function(user){
            $scope.originalUser = angular.extend({}, user);
            $scope.editedUser = user;
            console.log(user);
        }

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
                console.log (response.status);
            });

        }


    });



