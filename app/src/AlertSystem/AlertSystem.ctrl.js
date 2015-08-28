angular.module('Pundit2.AlertSystem')

.controller('AlertSystemCtrl', function($scope, AlertSystem) {

    $scope.alerts = AlertSystem.alerts;

    $scope.alertClick = function(alert) {
        AlertSystem.resetTimeout(alert.id);
    };

    $scope.dismissAlert = function(alert) {
        AlertSystem.clearAlert(alert);
    };

    $scope.animateShowAlert = function(alert) {
        // Using ng-show as trigger to start animation.
        AlertSystem.show(alert);
        return true;
    };

    $scope.mouseEnter = function(alert) {
        AlertSystem.mouseEnter(alert);
    };

    $scope.mouseLeave = function(alert) {
        AlertSystem.mouseLeave(alert);
    };
});