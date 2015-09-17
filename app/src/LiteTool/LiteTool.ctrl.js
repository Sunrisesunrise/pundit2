angular.module('Pundit2.LiteTool')

.controller('LiteToolCtrl', function($scope, $rootScope, Status, AnnotationSidebar) {
    $scope.annotationsClickHandler = function() {
        AnnotationSidebar.toggle();
    };
});