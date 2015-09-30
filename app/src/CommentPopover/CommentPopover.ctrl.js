angular.module('Pundit2.CommentPopover')

.controller('CommentPopoverCtrl', function($scope, PndPopover, MyPundit, NotebookExchange,
    NotebookCommunication, AnnotationsCommunication, CommentPopover, ModelHelper, $timeout, $q) {

    $scope.literalText = '';

    $scope.selectedNotebookId = undefined;
    $scope.savingComment = false;
    $scope.errorSaving = false;
    $scope.availableNotebooks = [];
    $scope.isUserLogged = MyPundit.isUserLogged();

    var lastSelectedNotebookId;

    var updateAvailableNotebooks = function() {
        $scope.availableNotebooks = [];
        var notebooks = NotebookExchange.getMyNotebooks();
        for (var i in notebooks) {
            $scope.availableNotebooks.push({
                value: notebooks[i].id,
                label: notebooks[i].label,
                title: notebooks[i].label
            });
        }
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

        var currentTarget = PndPopover.getData().item,
            currentStatement = {
                scope: {
                    get: function() {
                        return {
                            subject: currentTarget,
                            predicate: '',
                            object: $scope.literalText
                        };
                    }
                }
            };

        var modelData = ModelHelper.buildCommentData(currentStatement);

        var httpPromise = AnnotationsCommunication.saveAnnotation(
            modelData.graph,
            modelData.items,
            modelData.flatTargets,
            undefined, // templateID
            undefined, // skipConsolidation
            modelData.target,
            modelData.type,
            'commenting',
            $scope.selectedNotebookId
        );

        httpPromise.then(function() {
            // OK.
            CommentPopover.lastUsedNotebookID = $scope.selectedNotebookId;
            NotebookCommunication.setCurrent(lastSelectedNotebookId);
            PndPopover.hide();
        }, function() {
            // Epic FAIL.
        });

    };

    $scope.doCreateNewNotebook = function(notebookName) {
        var deferred = $q.defer();

        NotebookCommunication.createNotebook(notebookName).then(function(notebookID) {
            if (typeof notebookID !== 'undefined') {
                lastSelectedNotebookId = notebookID;
                updateAvailableNotebooks();
                $scope.selectedNotebookId = lastSelectedNotebookId;
                deferred.resolve({
                    label: notebookName,
                    title: notebookName,
                    value: notebookID
                });
            }
        }, function() {
            // TODO: handle errors during noteebook save, maybe Alert System is enough ?
            deferred.reject();
        });

        return deferred.promise;
    };

    updateCurrentNotebook();
    updateAvailableNotebooks();
});