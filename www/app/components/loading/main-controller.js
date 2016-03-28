"use strict";

angular.module("ngapp").controller("loadingController", function(shared,language , data, menu,$state, $scope){

    data.checkForupdates();
    $scope.lan = language;

    document.addEventListener("pokedex_ready", function(e) {
        location.replace("#/main");
    });

});