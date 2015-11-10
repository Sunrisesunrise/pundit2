angular.module('Pundit2.LiteTool')

.controller('LiteToolCtrl', function($scope, $rootScope, Status, AnnotationSidebar, EventDispatcher, MyPundit, Analytics) {

    $scope.isUserLogged = false;
    $scope.isAnnotationSidebarExpandedv = false;
    $scope.userData = {};

    var logout = function() {
        MyPundit.logout();
        Analytics.track('buttons', 'click', 'litetool--logout');
    };

    var editYourProfile = function() {
        MyPundit.editProfile();
        Analytics.track('buttons', 'click', 'litetool--editProfile');
    };

    $scope.userLoggedInDropdown = [{
        text: 'Edit your profile',
        click: editYourProfile
    }, {
        text: 'Log out',
        click: logout
    }];
    $scope.dropdownTemplate = "src/ContextualMenu/dropdown.tmpl.html";

    $scope.annotationsClickHandler = function() {
        AnnotationSidebar.toggle();
    };

    $scope.login = function() {
        MyPundit.login();
        Analytics.track('buttons', 'click', 'litetool--login');
    };

    $scope.closePopover = function() {
        MyPundit.closeLoginPopover();
    };

    EventDispatcher.addListener('AnnotationSidebar.toggle', function(e) {
        $scope.isAnnotationSidebarExpanded = e.args;
    });

    $scope.$watch(function() {
        return MyPundit.isUserLogged();
    }, function(newStatus) {
        $scope.isUserLogged = newStatus;
        $scope.userData = MyPundit.getUserData();
    });
});