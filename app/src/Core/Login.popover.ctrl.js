angular.module('Pundit2.Core')

.controller('LoginPopoverCtrl', function($scope, MyPundit) {

    $scope.loginPageSrc = '';

    $scope.$watch(function() {
        return MyPundit.getLoginPopoverSrc();
    }, function(loginSrc) {
        $scope.loginPageSrc = loginSrc;
    });

    $scope.closePopover = function() {
        MyPundit.closeLoginPopover();
    }
});