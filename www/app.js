'use strict';

var app = angular.module('BlankApp', ['ngMaterial', 'ngRoute','ngResource']);

app.config(['$routeProvider','$routeParams',
    function($routeProvider,$routeParams) {
        $routeProvider.
        when('/pokemonList', {
            templateUrl: '/views/pokemon-list.html',
            controller: 'MainController'
        }).
        when('/showPokemon/:name', {
            templateUrl: '/views/pokemon.html',
            controller: 'PokemonDetailController'
        }).
        otherwise({
            redirectTo: '/pokemonList'
        });
    }]);