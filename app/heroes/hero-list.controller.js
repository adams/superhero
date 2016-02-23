(function () {
    "use strict";

    angular
        .module('app')
        .controller('HeroListController', HeroListController);

    HeroListController.$inject = ['$timeout'];

    /* @ngInject */
    function HeroListController($timeout) {
        /* jshint validthis: true */
        var heroListCtrl = this;
        heroListCtrl.title = 'Heroes';





        activate();

        ////////////////

        function activate() {

            heroListCtrl.heroes = [{identity: "John Joenzz", name:'Martian Manhunter'}
                ,{identity: "Kara Danvers", name: "Supergirl"},
                {identity: "Oliver Queen", name: "Green Arrow"}];

            heroListCtrl.select = function(hero){
                console.log(hero);
            }
        }


    }

})();
