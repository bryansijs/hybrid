'use strict';

var app = angular.module('BlankApp', ['ngMaterial', 'ngRoute','ngResource']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/pokemonList', {
            templateUrl: '/views/pokemon-list.html',
            controller: 'MainController'
        }).
        when('/showPokemon', {
            templateUrl: '/views/pokemon.html',
            controller: 'PokemonDetailController'
        }).
        otherwise({
            redirectTo: '/pokemonList'
        });
    }]);