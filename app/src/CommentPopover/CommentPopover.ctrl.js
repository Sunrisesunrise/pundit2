angular.module('Pundit2.CommentPopover')

.controller('CommentPopoverCtrl', function($scope, PndPopover, MyPundit, NotebookExchange,
    NotebookCommunication, CommentPopover, ModelHelper, $timeout, $q) {

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
        $timeout(function() {
            var res = parseInt((Math.random() * 100) % 2) === 1;
            if (res) {
                $scope.savingComment = false;
                $scope.errorSaving = false;
                CommentPopover.lastUsedNotebookID = lastSelectedNotebookId;
                NotebookCommunication.setCurrent(lastSelectedNotebookId);
                PndPopover.hide();
            } else {
                $scope.savingComment = false;
                $scope.errorSaving = true;
            }
        }, 3000);


        var currentTarget = PndPopover.getData(),
            currentStatement = {
                scope: {
                    get: function() {
                        return {
                            subject: currentTarget,
                            predicate: '',
                            object: $scope.literalText
                        }
                    }
                }
            };

        // console.log(ModelHelper.buildCommentData(currentStatement));

        // TODO: SAVE
        // var httpPromise = AnnotationsCommunication.saveAnnotation(
        //     modelData.graph,
        //     modelData.items,
        //     modelData.flatTargets,
        //     undefined, // templateID
        //     undefined, // skipConsolidation
        //     modelData.target,
        //     modelData.type,
        //     'comment'
        // );

    };

    $scope.doCreateNewNotebook = function(notebookName) {
        var deferred = $q.defer();

        NotebookCommunication.createNotebook(notebookName).then(function(notebookID) {
            if (typeof notebookID !== 'undefined') {
                lastSelectedNotebookId = notebookID;
                updateAvailableNotebooks();
                $scope.selectedNotebookId = lastSelectedNotebookId;
                deferred.resolve(notebookID);
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