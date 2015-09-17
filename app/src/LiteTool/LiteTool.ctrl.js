angular.module('Pundit2.LiteTool')

.controller('LiteToolCtrl', function($scope, $rootScope, Status, AnnotationSidebar, EventDispatcher, MyPundit) {

    $scope.userIsLogged = false;

    $scope.annotationsClickHandler = function() {
        AnnotationSidebar.toggle();
    };

    $scope.login = function() {
        MyPundit.login();
    };

    EventDispatcher.addListener('MyPundit.isUserLogged', function(e) {
        $scope.userIsLogged = e.args;
    });
});