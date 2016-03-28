"use strict";

"use strict";

angular.module("ngapp").controller("detailController", function(shared, menu, language, location, $state, $scope){
    this.title = $state.current.title;
    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.pokemon = shared.currentPokemon;

    $scope.init = function() {
        $scope.startNavigation = function() {
            if($scope.pokemon.latitude != null) {
                launchnavigator.navigate([$scope.pokemon.latitude, $scope.longitude], {
                    start: location.gps.latitude+","+location.longitude
                });
            } else {
                alert("navigation service isn't working");
            }
        }
    }

});