(function () {
    "use strict";

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    CheckoutController.$inject = ['$scope'];

    /* @ngInject */
    function CheckoutController($scope) {
        /* jshint validthis: true */
        var checkoutCtrl = this;


        checkoutCtrl.title = 'Checkout';

        activate();

        ////////////////

        function activate() {
            checkoutCtrl.total = 0;
            checkoutCtrl.items = [
                {
                    "name": "Martian Manhunter",
                    "price": 22,
                    "quantity": 0
                },
                {
                    "name": "Supergirl",
                    "price": 30,
                    "quantity": 0
                },
                {
                    "name": "Green Arrow",
                    "price": 28,
                    "quantity": 0
                },
                {
                    "name": "Flash",
                    "price": 1,
                    "quantity": 0
                }
            ];

            checkoutCtrl.remove = function(index){
                checkoutCtrl.items.splice(index,1);
            };

            $scope.$watch('checkoutCtrl.items',function(){
                var total = 0;
                for(var i= 0;i<checkoutCtrl.items.length;i++){
                    var currentItem = checkoutCtrl.items[i];
                    total= total + (currentItem.price * currentItem.quantity);
                }

                checkoutCtrl.total = total;
            }, true);

        }




    }

})();