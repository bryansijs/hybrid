/**
 * Created by bryansijs on 11-03-16.
 */

app.controller('PokemonDetailController', ['$scope','PokemonService','$routeParams',function($scope,PokemonService,$routeParams) {
    alert($routeParams);
    $scope.title = $routeParams.name;

    $scope.init = function(){


    }
}]);