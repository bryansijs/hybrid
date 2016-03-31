"use strict";

angular.module("ngapp").controller("mainController", function(shared, menu, language, location, data, $state, $scope){

    location.setLocation();

    $scope.title = $state.current.title;
    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.shared = shared;

    $scope.pokemons = {
        data: shared.pokemons,

        getItemAtIndex: function(index) {
            return this.data[index];
        },

        getLength: function() {
            return this.data.length + 5;
        },

        fetchMoreItems: function(index) {

        }
    }

    $scope.init = function() {
        language.setLanguage();
        //$scope.$apply();
        console.log(shared.pokemons);
    }

    $scope.goDetail = function(pokemon) {
        shared.currentPokemon = pokemon;
        window.location.replace("#/detail");
    }

    $scope.goMap = function() {
        window.location.replace("#/map");
    }

});
