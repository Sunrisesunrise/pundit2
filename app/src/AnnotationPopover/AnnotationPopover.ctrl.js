angular.module('Pundit2.AnnotationPopover')

// TODO: manage opening during loading
.controller('AnnotationPopoverCtrl', function($scope, PndPopover, MyPundit, NotebookExchange, XpointersHelper, Item,
    NotebookCommunication, AnnotationsCommunication, AnnotationPopover, ModelHelper, NameSpace, $timeout, $q) {
    
    var resourceItem = undefined;

    $scope.literalText = '';
    $scope.opacity = 1;

    $scope.autoCompleteItems = [];

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

    $scope.showAutoComplete = false;

    $scope.companiesData = AnnotationPopover.companiesData;
    $scope.companiesSearchText = '';
    $scope.handleCompaniesSearchTextChange = function(newValue) {
        $.ajax({
            url: 'https://api-u.spaziodati.eu/v2/companies?token=h-936813c74be545cf9072d8ce078affff',
            type: 'POST',
            data: {
                name: newValue,
                packages: 'base',
                limit: 20
            }
        }).then(function(data) {
            $scope.autoCompleteItems = data.items;
        });
    };

    if (typeof $scope.companiesData.companies[0].value !== 'undefined') {
        $scope.companiesData.companies.unshift({label: ' ', value: undefined});
    }

    $scope.selectedResourceId = $scope.companiesData.companies[0].value;

    var lastSelectedNotebookId;

    var createResourceItemFromEntity = function(entity) {
        console.log(entity)
        var values = {};

        values.uri = 'https://atoka.io/azienda/-/' + entity.id;
        values.description = entity.web.description;
        values.label = entity.name;
        values.type = values.type = [NameSpace.types.resource]; // TODO to be defined
        values.pageContext = XpointersHelper.getSafePageContext();
        values.image = entity.web.logo;
        values[NameSpace.atoka.hasFullAddress] = entity.base.registeredAddress.fullAddress;
        values[NameSpace.atoka.hasAteco] = entity.base.ateco[0].code + ': ' + entity.base.ateco[0].description;

        return new Item(values.uri, values);
    };


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
                break;
            case 'highlight':
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
            entityStatement = {
                scope: {
                    get: function() {
                        return {
                            subject: resourceItem,
                            predicate: '',
                            object: objectContent
                        };
                    }
                }
            };

        var modelData = isComment ? ModelHelper.buildCommentData([currentStatement, entityStatement]) : ModelHelper.buildHigthLightData([currentStatement, entityStatement]),
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

    
    $scope.getDetailsForItem = function(item) {
        $.ajax({
            type: 'GET',
            url: 'https://api-u.spaziodati.eu/v2/companies/' + item.id + '?token=h-936813c74be545cf9072d8ce078affff&packages=base,web',
        }).then(function(companyData) {
            console.log('company detail .. TODO', companyData);
            AnnotationPopover.companiesData.companyData[companyData.item.id] = companyData;
            resourceItem = createResourceItemFromEntity(companyData.item)
        });
    };

    $scope.doAcceptResource = function(resourceId) {
        var resource = $scope.companiesData.companyData[resourceId].item;
        resourceItem = createResourceItemFromEntity(resource);
        console.log(createResourceItemFromEntity(resource));
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