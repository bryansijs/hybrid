"use strict";

angular.module("ngapp").controller("detailController", function(shared, menu, language, location, $state, $scope, $mdDialog){

    this.title = $state.current.title;

    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.pokemon = shared.currentPokemon;

    $scope.init = function() {
        //alert("longitude : " + $scope.pokemon.name + " - " + $scope.pokemon.longitude + " latitude : " + $scope.pokemon.latitude );
    }


    $scope.startNavigation = function() {
        if(shared.currentPokemon.catched != "true") {
            if(launchnavigator) {
                launchnavigator.navigate([shared.currentPokemon.latitude, shared.currentPokemon.longitude], {
                    start: location.gps.latitude+","+location.gps.longitude
                });
            } else {
                errorGettingLocation( language.str.notAbleToGetLocation );
            }
        } else {
            errorGettingLocation( language.str.alreadyCatchedPokemon );
        }
    }

    var errorGettingLocation = function(message) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error')
                .textContent(message)
                .ariaLabel('Alert Dialog')
                .ok('OK')
        );
    }

});