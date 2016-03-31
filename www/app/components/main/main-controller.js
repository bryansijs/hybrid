"use strict";

angular.module("ngapp").controller("mainController", function(shared, menu, language, location, data, $state, $scope){

    location.setLocation();

    this.title = $state.current.title;

    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.shared = shared;

    $scope.init = function() {
        language.setLanguage();
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
