"use strict";

angular.module("ngapp").service("data", function($resource, shared, location, $state){
    var url = 'http://pokeapi.co/api/v2/pokemon/';
    var ctrl = this;
    var pokemons = [];
    var pokemonCountInMemory = 0;
    this.pokemonsCount = 1;
    
    var getPokemon = function(id, lastPokeCount) {

        if(false && window.localStorage.getItem("pokemon_"+id)) {
            pokemons[id] = JSON.parse(window.localStorage.getItem("pokemon_"+id));
            ctrl.pokemonsCount++;
        } else {
                console.log("start function getPokemon : " + id + "WTF");
                downloadPokemon(id, lastPokeCount);
        }
    }
    
    var downloadPokemon = function(lastPokeCount) {
        pokemons = [];
        var pokemonCountOnDownload = ctrl.pokemonsCount;
        console.log("start function downloadPokemon :");
         var loadedPokemons = ctrl.pokemonsCount;
         for(var i = loadedPokemons; i < lastPokeCount; i++) {
            
            if(window.localStorage.getItem("pokemon_"+i)) {
                console.log("pokemon is in localstorage ");
                pokemons[i] = JSON.parse(window.localStorage.getItem("pokemon_"+i));
                ctrl.pokemonsCount++;

                if(ctrl.pokemonsCount == lastPokeCount) {
                    var count = ctrl.pokemonsCount - pokemonCountOnDownload;
                    for(var i = 0; i < count; i++) {
                        shared.pokemons.push(pokemons[(pokemonCountOnDownload + i)]);
                    }

                    setTimeout(function() {
                        updateScreen();
                    }, 1000);
                    return;
                }
            } else {
                console.log("pokemon will be downloaded +  " + i);
                var resource = $resource( url + i + "/").get();
       
                resource.$promise.then(function(data) {
                    console.log("downloaded Pokemon :" ,data);
                    var pokemon = {};
                    pokemon.id = data.id;
                    pokemon.name = data.name;
                    pokemon.sprites = data.sprites;
                    pokemon.abilities = data.abilities;
                    pokemon.types = data.types;
                    pokemon.latitude = getRandomNumber(location.gps.latitude);
                    pokemon.longitude = getRandomNumber(location.gps.longitude);
                    pokemon.height = data.height;
                    pokemon.weight = data.weight;
                    pokemon.base_experience = data.base_experience;
                    pokemon.order = data.order;
                    
                    ctrl.savePokemon(pokemon);
                    pokemons[pokemon.id] = pokemon;
                    ctrl.pokemonsCount++;
                    
                    if(ctrl.pokemonsCount == lastPokeCount) {
                        var count = ctrl.pokemonsCount - pokemonCountOnDownload;
                        for(var i = 0; i < count; i++) {
                            shared.pokemons.push(pokemons[(pokemonCountOnDownload + i)]);
                        }  
                        updateScreen();
                        return;
                    }
                });    
            }
         }
    }
    
    var getRandomNumber = function(number) {
        var scale = 7;
        if(Math.random() < 0.5) {
            return number + (Math.random() / scale);
        } else {
            return number - (Math.random() / scale);
        }
    }
    
    var updateScreen = function() {
        console.log("start function updateScreen");
        if($state.is("loading")) {
            
            console.log("state is loading");
            var event = new CustomEvent("pokedex_ready");
            document.dispatchEvent(event);
            
        } else {
            console.log("state is not loading");
            var event = new CustomEvent("data_update");
            document.dispatchEvent(event);
        }
    }
    
    var countPokemonInMemory = function() {
        console.log("start function countPokemonInMemory");
        var number = 1;
        var go = true;
        while(go) {
            if(!window.localStorage.getItem("pokemon_"+number)) {
              go = false;  
            }
            number++;
        }
        pokemonCountInMemory = number;
    }
    
    this.savePokemon = function(pokemon) {
        console.log("start function savePokemon");
        window.localStorage.setItem("pokemon_"+pokemon.id , JSON.stringify(pokemon));
    }
    
    this.checkForUpdates = function() {
        console.log("start function checkForUpdates");
        var today = new Date().getDay();
        //window.localStorage.removeItem("lastUpdatedDay");
        
        if(window.localStorage.getItem("lastUpdatedDay")) {
            var lastToday = window.localStorage.getItem("lastUpdatedDay");
            if(today != lastToday && today > lastToday || today != lastToday && today == 0) {
                ctrl.updateAllPokemons(pokemonCountInMemory);
                window.localStorage.setItem("lastUpdatedDay", today);
            }
        } else {
            window.localStorage.setItem("lastUpdatedDay", today);
        }
    }
    
    this.updateAllPokemons = function(lastPokemonId) {
        console.log("start function updateAllPokemons");
        for(var i = 1; i < lastPokemonId; i++) {
            var resource = $resource( url + id + "/").get();
                resource.$promise.then(function(data) {
                    var pokemon = {};
                    pokemon.id = data.id;
                    pokemon.name = data.name;
                    pokemon.sprites = data.sprites;
                    pokemon.abilities = data.abilities;
                    pokemon.types = data.types;
                    pokemon.latitude = getRandomNumber(location.gps.latitude);
                    pokemon.longitude = getRandomNumber(location.gps.longitude);
                    pokemon.height = data.height;
                    pokemon.weight = data.weight;
                    pokemon.base_experience = data.base_experience;
                    pokemon.order = data.order;

                    shared.pokemons[pokemon.id] = pokemon;
                    console.log("Update following pokemon:",shared.pokemons[pokemon.id]);
                });
        }
    }
    
    this.getPokemons = function(numberOfPokemons) {
        pokemons = [];
        console.log("start function getPokemons");
        console.log("pokemonCountInMemory = " + pokemonCountInMemory);
        console.log("pokemonsCount: "+ ctrl.pokemonsCount);
        console.log("numberOfPokemons = " + numberOfPokemons);
        
        var loadedPokemons = ctrl.pokemonsCount;
        var newPokemons = loadedPokemons + numberOfPokemons;
        
        downloadPokemon(newPokemons)

        
        ctrl.checkForUpdates();
    }
    
    countPokemonInMemory();
});