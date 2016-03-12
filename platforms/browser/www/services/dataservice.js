app.factory('dataService', function() {
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
});

app.factory('PokemonService', function ($resource) {

    //
    var data
    return $resource('http://pokeapi.co/api/v2/pokemon/:id/?limit=20');
});