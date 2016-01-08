angular.module('Pundit2.LiteTool')

.controller('LiteToolCtrl', function($scope, $rootScope, $window, $modal, Config, Status, AnnotationSidebar, EventDispatcher, MyPundit, Keyboard, Analytics) {

    $scope.isUserLogged = false;
    $scope.isAnnotationSidebarExpandedv = false;
    $scope.isContextualMenuOpen = false;
    $scope.isUserPopoupOpen = false;
    $scope.userData = {};

    // modal
    var sendModalScope = $rootScope.$new();

    var sendModal = $modal({
        container: "[data-ng-app='Pundit2']",
        templateUrl: 'src/Core/Templates/send.modal.tmpl.html',
        show: false,
        backdrop: 'static',
        scope: sendModalScope,
        keyboard: false
    });

    var sendMail = function(subject, body) {
        var user = MyPundit.getUserData();
        var link = "mailto:punditbug@netseven.it" +
            "?cc=" +
            "&subject=" + escape(subject) +
            "&body=" + escape(body) +
            "%0A%0A" + "Pundit version: " + PUNDITVERSION.version +
            "%0A%0A" + "Configuration file: " + Config.confURL +
            "%0A" + "Web page: " + document.URL +
            "%0A" + "Broswer info: " + window.navigator.userAgent +
            "%0A%0A" + "User openid: " + user.openid +
            "%0A" + "User uri: " + user.uri +
            "%0A" + "User name: " + user.fullName +
            "%0A" + "User mail: " + user.email;

        //window.location.href = link;
        window.open(link);
    };

    sendModalScope.titleMessage = "Need help? Contact us!";
    sendModalScope.text = {
        msg: "",
        subject: ""
    };


    sendModalScope.send = function() {
        // send a mail
        sendMail(sendModalScope.text.subject, sendModalScope.text.msg);
        sendModal.hide();
        Analytics.track('buttons', 'click', 'toolbar--reportBug--send');
    };

    sendModalScope.cancel = function() {
        sendModal.hide();
        if (typeof modalEscapeHandler !== 'undefined') {
            Keyboard.unregisterHandler(modalEscapeHandler);
            modalEscapeHandler = undefined;
        }
        Analytics.track('buttons', 'click', 'toolbar--reportBug--cancel');
    };

    var logout = function() {
        MyPundit.logout();
        Analytics.track('buttons', 'click', 'litetool--logout');
    };

    var manageYourAnnotation = function() {
        $window.open(Config.homeBaseURL, '_blank');
        Analytics.track('buttons', 'click', 'toolbar--manageAnnotation');
    };

    var editYourProfile = function() {
        MyPundit.editProfile();
        Analytics.track('buttons', 'click', 'litetool--editProfile');
    };

    var modalEscapeHandler;
    var addModalEscapeHandler = function(callback) {
        modalEscapeHandler = Keyboard.registerHandler('LiteToolController', {
            keyCode: 27,
            ignoreOnInput: false,
            stopPropagation: true
        }, callback);
    };

    // open help modal
    var showHelp = function() {
        addModalEscapeHandler(function() {
            sendModalScope.cancel();
        });

        sendModal.$promise.then(function() {
            sendModalScope.text.msg = "";
            sendModalScope.text.subject = "";
            sendModal.show();

            var sendBtn = angular.element('.pnd-send-modal-send');
            $scope.$watch(function() {
                return sendModalScope.text.subject;
            }, function(text) {
                if (text.length > 2) {
                    sendBtn.removeClass('disabled');
                } else {
                    sendBtn.addClass('disabled');
                }
            }, true);

        });

        Analytics.track('buttons', 'click', 'litetool--reportBug');
    };

    $scope.userLoggedInDropdown = [];
    if (Config.homePundit) {
        $scope.userLoggedInDropdown.push({
            text: 'Manage your annotations',
            click: manageYourAnnotation
        });
    }

    $scope.userLoggedInDropdown.push({
        text: 'Edit your profile',
        click: editYourProfile
    }, {
        text: 'Help',
        click: showHelp
    }, {
        text: 'Log out',
        click: logout
    });
    
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

    $scope.$on('dropdown.hide.before', function() {
        $scope.isContextualMenuOpen = false;
    });

    $scope.$on('dropdown.show.before', function() {
        $scope.isContextualMenuOpen = true;
    });

    EventDispatcher.addListener('MyPundit.popoverClose', function( /*e*/ ) {
        $scope.isUserPopoupOpen = false;
    });

    EventDispatcher.addListener('MyPundit.popoverOpen', function( /*e*/ ) {
        $scope.isUserPopoupOpen = true;
    });

    $scope.$watch(function() {
        return MyPundit.isUserLogged();
    }, function(newStatus) {
        $scope.isUserLogged = newStatus;
        $scope.userData = MyPundit.getUserData();
    });
});