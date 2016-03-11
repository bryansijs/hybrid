/**
 * Created by bryansijs on 08-03-16.
 */

app.controller('MainController', ['$scope','$http','dataService','PokemonService',function($scope, $http,dataService,PokemonService) {
    $scope.title = "Pokedex";

    $scope.init = function(){
        //hier ophalen

        PokemonService.get(function(data,err){
            $scope.pokemons = data.results;
        });
    }

    $scope.showDetails = function(url){
        dataService.set(url);
        console.log('setted: ' + url);
    }
}]);

