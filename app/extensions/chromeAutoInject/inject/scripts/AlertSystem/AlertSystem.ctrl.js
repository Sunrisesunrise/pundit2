angular.module('Pundit2.AlertSystem')

.controller('AlertSystemCtrl', function($scope, AlertSystem) {

    $scope.alerts = AlertSystem.alerts;

    $scope.alertClick = function(alert, $event) {
        var callBack = angular.element($event.target).data('inner-callback');
        AlertSystem.click(alert, callBack);
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

    $scope.innerClick = function(i) {
        AlertSystem.log("innerclick " +i);
    };

});