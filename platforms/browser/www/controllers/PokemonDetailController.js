/**
 * Created by bryansijs on 11-03-16.
 */

app.controller('PokemonDetailController', ['$scope','$http','dataService',function($scope, $http,dataService) {
    $scope.title = "Pokemon Detail";

    $scope.init = function(){
        //hier ophalen
        //var postUsers = $http.get('http://pokeapi.co/api/v2/pokemon/?limit=20')
        //postUsers.then(function(result) {
        //    $scope.pokemons = result.data.results;
        //});
    }
}]);