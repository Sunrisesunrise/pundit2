angular.module('Pundit2.AnnotationPopover')

// TODO: manage opening during loading
.controller('AnnotationPopoverCtrl', function($scope, PndPopover, MyPundit, NotebookExchange, XpointersHelper, Item,
    NotebookCommunication, AnnotationsCommunication, AnnotationPopover, ModelHelper, NameSpace, $timeout, $q, Atoka,
    Analytics) {

    var resourceItem;

    $scope.literalText = '';
    $scope.opacity = 1;

    $scope.isAtokaActive = Atoka.options.active;
    $scope.atokaEntity = {};

    $scope.selectedNotebookId = undefined;
    $scope.selectedResourceId = undefined;
    $scope.savingAnnotation = false;
    $scope.errorSaving = false;
    $scope.availableNotebooks = [];
    $scope.isUserLogged = MyPundit.isUserLogged();

    $scope.currentMode = AnnotationPopover.mode;

    $scope.isSwitchMode = $scope.isUserLogged;
    $scope.isCommentMode = false;
    $scope.isHighlightMode = false;
    $scope.message = 'Login to Pundit to create new annotations!';
    $scope.tooltip = false;

    $scope.autoCompleteItems = [];
    $scope.showAutoComplete = false;

    if ($scope.isAtokaActive) {
        $scope.companiesData = Atoka.getSelectList();
        if ($scope.companiesData && $scope.companiesData.length > 0) {
            $scope.companiesData.unshift({
                label: 'Select a company',
                value: undefined
            });
        } else {
            $scope.companiesData = [];
            $scope.showAutoComplete = true;
        }

        $scope.handleCompaniesSearchTextChange = function(searchLabel) {
            if (searchLabel.length > 0) {
                $scope.autoCompleteLoading = true;
                Atoka.autocomplete(searchLabel).then(function(items) {
                    $scope.autoCompleteItems = items;
                    $scope.autoCompleteLoading = false;
                });
            } else {
                $scope.autoCompleteLoading = false;
                $scope.autoCompleteItems = [];
            }
        };
    }

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

        if (typeof AnnotationPopover.lastUsedNotebookID === 'undefined') {
            // TODO: manage loading statuts, so with currentNotebook undefined
            AnnotationPopover.lastUsedNotebookID = NotebookExchange.getCurrentNotebooks().id;
        }
        lastSelectedNotebookId = $scope.selectedNotebookId = AnnotationPopover.lastUsedNotebookID;
    };

    $scope.setMode = function(mode) {
        $scope.currentMode = mode;

        $scope.opacity = 0;
        $scope.isSwitchMode = false;
        switch (mode) {
            case 'comment':
                $scope.isCommentMode = $scope.isUserLogged;
                Analytics.track('main-clicks', 'generic', 'user-click-comment');
                break;
            case 'highlight':
                Analytics.track('main-clicks', 'generic', 'user-click-highlight');
                $scope.isHighlightMode = $scope.isUserLogged;
                break;
            case 'alert':
                $scope.isCommentMode = $scope.isUserLogged;
                $scope.message = 'Login to Pundit to use social events';
                break;
                //if (mode!== 'comment' && mode!=='highlight' && mode!= 'alert')
                //mode = type of social in tooltip mode
            default:
                $scope.isCommentMode = false;
                $scope.isSwitchMode = false;
                $scope.message = mode;
                $scope.tooltip = true;
                break;
        }

        $timeout(function() {
            // var state = PndPopover.getState();
            //state.popover.$applyPlacement();
            AnnotationPopover.doResize();
            $scope.opacity = 1;
        }, 15);
    };

    $scope.login = function() {
        MyPundit.login();
        PndPopover.hide();
    };

    $scope.cancel = function() {
        PndPopover.hide();
    };

    $scope.save = function() {
        $scope.savingAnnotation = true;

        if ($scope.isAtokaActive) {
            resourceItem = Atoka.createItemFromCompanyId($scope.selectedResourceId);
        }

        var isComment = $scope.currentMode === 'comment',
            objectContent = isComment ? $scope.literalText : '';

        var currentTarget = PndPopover.getData().item,
            currentStatement = {
                scope: {
                    get: function() {
                        return {
                            subject: currentTarget,
                            predicate: '',
                            object: objectContent
                        };
                    }
                }
            },
            entityStatement = resourceItem ? {
                scope: {
                    get: function() {
                        return {
                            subject: resourceItem,
                            predicate: '',
                            object: objectContent
                        };
                    }
                }
            } : undefined,
            statementsArray = [];

        statementsArray.push(currentStatement);

        if (resourceItem) {
            statementsArray.push(entityStatement);
        }

        var modelData = isComment ? ModelHelper.buildCommentData(statementsArray) : ModelHelper.buildHigthLightData(statementsArray),
            motivation = isComment ? 'commenting' : 'highlighting';

        var httpPromise = AnnotationsCommunication.saveAnnotation(
            modelData.graph,
            modelData.items,
            modelData.flatTargets,
            undefined, // templateID
            undefined, // skipConsolidation
            modelData.target,
            modelData.type,
            motivation,
            $scope.selectedNotebookId
        );

        httpPromise.then(function() {
            // OK.
            AnnotationPopover.lastUsedNotebookID = lastSelectedNotebookId = $scope.selectedNotebookId;
            NotebookCommunication.setCurrent(lastSelectedNotebookId);
            PndPopover.hide();
        }, function() {
            // Epic FAIL.
        });

        Analytics.track('main-clicks', 'generic', 'user-click-save');
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

    $scope.buildEntity = function(item) {
        $scope.atokaEntity = {
            uri: Atoka.options.baseUri + item.id,
            title: item.name,
            hasFullAddress: item.base && item.base.registeredAddress ? item.base.registeredAddress.fullAddress : null,
            hasAteco: item.base && item.base.ateco[0] ? item.base.ateco[0].code + ': ' + item.base.ateco[0].description : null,
        };
    };

    $scope.acceptAutoCompleteItem = function(item) {
        $scope.companiesData.push({label: item.name, value: item.id});
        $scope.selectedResourceId = item.id;

        $scope.autoCompleteItems = [];
        $scope.showAutoComplete = false;

        Atoka.setAtokaItemDetails(item.id);
        $scope.buildEntity(item);
    };

    $scope.doAcceptResource = function(itemId) {
        $scope.buildEntity(Atoka.getDetailsById(itemId));
        $scope.selectedResourceId = itemId;
    };

    $scope.resetResource = function() {
        // $scope.companiesData = [];
        $scope.selectedResourceId = undefined;
    };

    $scope.focusOn = function(elementId) {
        if ($scope.currentMode === 'comment' || $scope.currentMode === 'highlight') {
            setTimeout(function() {
                angular.element('.pnd-annotation-popover #' + elementId)[0].focus();
            }, 10);
        }
    };

    if ($scope.currentMode !== '') {
        $scope.setMode($scope.currentMode);
    }

    updateCurrentNotebook();
    updateAvailableNotebooks();
});