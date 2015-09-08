angular.module('Pundit2.CommentPopover')
.controller('CommentPopoverCtrl', function($scope, PndPopover, MyPundit, NotebookExchange) {

    $scope.literalText = '';

    $scope.selectedNotebookId = undefined;
    $scope.createNewNotebook = false;
    $scope.availableNotebooks = [];

    var updateAvailableNotebooks = function() {
        $scope.availableNotebooks = [];
        var notebooks = NotebookExchange.getMyNotebooks();
        for (var i in notebooks) {
            $scope.availableNotebooks.push({id: notebooks[i].id, name: notebooks[i].label});
        }
        $scope.availableNotebooks.push({id: -1, name: "Create new notebook"});
        return $scope.availableNotebooks;
    };

    var updateCurrentNotebook = function() {
        var nb = NotebookExchange.getCurrentNotebooks();
        $scope.selectedNotebookId = nb.id;
    };

    $scope.isUserLogged = MyPundit.isUserLogged();

    $scope.cancel = function() {
        PndPopover.hide();
    };

    $scope.save = function() {
        PndPopover.hide();
    };

    $scope.notebookSelectionChanged = function() {
        if (parseInt($scope.selectedNotebookId) === -1) {
            $scope.createNewNotebook = true;
        }
    }

    updateCurrentNotebook();
    updateAvailableNotebooks();
});
