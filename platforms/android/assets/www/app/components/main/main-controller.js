"use strict";

angular.module("ngapp").controller("mainController", function(shared, menu, language, location, data, $state, $scope){

    location.setLocation();

    $scope.title = $state.current.title;
    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.shared = shared;

    $scope.pokemons = {
        data: shared.pokemons,

        getItemAtIndex: function(index) {
            return this.data[index];
        },

        getLength: function() {
            return this.data.length + 5;
        },

        fetchMoreItems: function(index) {

        }
    }

    $scope.init = function() {
        language.setLanguage();
        //$scope.$apply();
        console.log(shared.pokemons);
    }

    $scope.goDetail = function(pokemon) {
        shared.currentPokemon = pokemon;
        window.location.replace("#/detail");
    }

    $scope.goMap = function() {
        window.location.replace("#/map");
    }

    $scope.infiniteItems = {
        numLoaded_: 0,
        toLoad_: 0,

        // Required.
        getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
                this.fetchMoreItems_(index);
                return null;
            }

            return index;
        },

        // Required.
        // For infinite scroll behavior, we always return a slightly higher
        // number than the previously loaded items.
        getLength: function() {
            return this.numLoaded_ + 5;
        },

        fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            if (this.toLoad_ < index) {
                this.toLoad_ += 20;
                $timeout(angular.noop, 300).then(angular.bind(this, function() {
                    this.numLoaded_ = this.toLoad_;
                }));
            }
        }
    };
});
