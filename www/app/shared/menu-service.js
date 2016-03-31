"use strict";

angular.module("ngapp").service("menu", function(shared, language, $mdDialog, $mdToast, $scope, $mdSidenav, $mdComponentRegistry, $state){

    var ctrl = this;

    this.isOpen = function() { return false };
    $mdComponentRegistry
        .when("left")
        .then( function(sideNav){

            ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
            ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
        });

    this.toggleRight = function() {
        $mdSidenav("left").toggle()
            .then(function(){
            });
    };

    this.close = function() {
        $mdSidenav("right").close()
            .then(function(){
            });
    };


    this.onSwipe = function(ev) {
        $mdSidenav("left").toggle();
    }

    this.openMenu = function() {
        $mdSidenav("left").toggle();
    }

    this.goBack = function() {
        if($state) {
            if($state.is("main")) {
                if(navigator.app) {
                    navigator.app.exitApp();
                }
            }else{
                $mdToast.hide();
                location.replace("#/main");
                $scope.apply();
            }
        }else {
            location.replace("#/main");
            $scope.apply();
        }
    }

    this.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app

        var confirm = $mdDialog.prompt()
            .title(language.str.yourName)
            .textContent(shared.info.auth + language.str.isYourCurrentName )
            .placeholder(language.str.newName)
            .ariaLabel('name')
            .targetEvent(ev)
            .ok('Update')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function(result) {

            window.localStorage.setItem("name", result);
            shared.info.auth = result;
        }, function() {
            //TODO Cancel function
        });
    };

    this.goProfile = function() {
        location.replace("#/profile");
    }
});