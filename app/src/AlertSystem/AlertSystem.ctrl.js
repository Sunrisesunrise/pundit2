angular.module('Pundit2.AlertSystem')

.controller('AlertSystemCtrl', function($scope, AlertSystem) {

    $scope.alerts = AlertSystem.alerts;

    $scope.alertClick = function(alert) {
        AlertSystem.resetTimeout(alert.id);
    };

    $scope.dismissAlert = function(alert) {
        AlertSystem.clearAlert(alert.id);
    };

});