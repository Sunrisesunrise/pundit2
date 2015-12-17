angular.module('Pundit2.AlertSystem')

.directive('alertSystem', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: "src/AlertSystem/AlertSystem.dir.tmpl.html",
        controller: "AlertSystemCtrl"
    };
});