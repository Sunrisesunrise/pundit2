angular.module('Pundit2.CommentPopover')
.controller('CommentPopoverCtrl', function($scope, PndPopover, MyPundit, NotebookExchange, NotebookCommunication, CommentPopover, $timeout) {

    $scope.literalText = '';

    $scope.selectedNotebookId = undefined;
    $scope.createNewNotebook = false;
    $scope.savingNewNotebook = false;
    $scope.savingComment = false;
    $scope.errorSaving = false;
    $scope.newNotebookName = '';
    $scope.availableNotebooks = [];
    $scope.isUserLogged = MyPundit.isUserLogged();

    var lastSelectedNotebookId;

    var updateAvailableNotebooks = function() {
        $scope.availableNotebooks = [];
        var notebooks = NotebookExchange.getMyNotebooks();
        for (var i in notebooks) {
            $scope.availableNotebooks.push({id: notebooks[i].id, name: notebooks[i].label});
        }
        $scope.availableNotebooks.push({id: 0, name: "Create new notebook"});
        return $scope.availableNotebooks;
    };

    var updateCurrentNotebook = function() {
        if (!MyPundit.isUserLogged()) {
            return;
        }
        if (typeof CommentPopover.lastUsedNotebookID === 'undefined') {
            CommentPopover.lastUsedNotebookID = NotebookExchange.getCurrentNotebooks().id;
        }
        lastSelectedNotebookId = $scope.selectedNotebookId = CommentPopover.lastUsedNotebookID;
    };

    $scope.login = function() {
        MyPundit.login();
        PndPopover.hide();
    };

    $scope.cancel = function() {
        PndPopover.hide();
    };

    $scope.save = function() {
        $scope.savingComment = true;
        $timeout(function() {
            var res = parseInt((Math.random(4)*100) % 2) === 1;
            if (res) {
                $scope.savingComment = false;
                $scope.errorSaving = false;
                CommentPopover.lastUsedNotebookID = lastSelectedNotebookId;
                PndPopover.hide();
            }
            else {
                $scope.savingComment = false;
                $scope.errorSaving = true;
            }
        }, 3000);


        // TODO: SAVE

    };

    $scope.notebookSelectionChanged = function() {
        if (parseInt($scope.selectedNotebookId) === 0) {
            $scope.createNewNotebook = true;
        }
        else {
            lastSelectedNotebookId = $scope.selectedNotebookId;
        }
    }

    $scope.createNewNotebookClick = function() {
        $scope.savingNewNotebook = true;
        NotebookCommunication.createNotebook($scope.newNotebookName).then(function(notebookID){
            if (typeof notebookID !== 'undefined') {
                lastSelectedNotebookId = notebookID;
                updateAvailableNotebooks();
                $scope.selectedNotebookId = lastSelectedNotebookId;
            }
            $scope.savingNewNotebook = false;
            $scope.createNewNotebook = false;
            $scope.newNotebookName = '';
        }, function() {
            // TODO: handle errors during noteebook save, maybe Alert System is enough ?
            $scope.savingNewNotebook = false;
            $scope.createNewNotebook = false;
            $scope.newNotebookName = '';
        });
    };

    $scope.cancelCreationNewNotebookClick = function() {
        $scope.createNewNotebook = false;
        $scope.savingNewNotebook = false;
        $scope.newNotebookName = '';
        $scope.selectedNotebookId = lastSelectedNotebookId;
    };

    updateCurrentNotebook();
    updateAvailableNotebooks();
});
