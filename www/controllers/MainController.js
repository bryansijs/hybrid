/**
 * Created by bryansijs on 08-03-16.
 */

app.controller('MainController', ['$scope','$http','dataService','PokemonService',function($scope, $http,dataService,PokemonService) {
    $scope.title = "Pokedex";

    $scope.init = function(){
        //hier ophalen
        //TODO: local storage met expire date
        PokemonService.get(function(data,err){
            $scope.pokemons = data.results;
            $scope.currentPokemon = $scope.pokemons[0];
            console.log($scope.pokemons[0]);
        });

    }

    $scope.initDetail = function(){
        console.log("current pokemon: "+$scope.currentPokemon)
    }

    $scope.showDetails = function(url){
        //dataService.set(url);
        console.log('setted: ' + JSON.stringify(url));
        window.location.href = "#showPokemon";
    }
}]);

