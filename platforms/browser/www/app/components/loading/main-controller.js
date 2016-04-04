"use strict";

angular.module("ngapp").controller("loadingController", function(shared,language , data, menu,$state, $scope){
    $scope.lan = language;
    $scope.title = language.str.titleLoading;

    data.getPokemons(15);

    document.addEventListener("pokedex_ready", function(e) {
        //document.removeEventListener("pokedex_ready");
        location.replace("#/main");
    });

});