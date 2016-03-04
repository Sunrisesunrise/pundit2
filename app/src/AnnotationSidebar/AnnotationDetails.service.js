/*global moment*/

angular.module('Pundit2.AnnotationSidebar')

.constant('ANNOTATIONDETAILSDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails
     *
     * @description
     * `object`
     *
     * Configuration object for AnnotationDetails module. AnnotationDetails
     * directive is instantiated from the AnnotationSidebar and
     * contains details of the annotations.
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.defaultExpanded
     *
     * @description
     * `boolean`
     *
     * Initial state of thposition:relative
     * <pre> defaultExpanded: false </pre>
     */
    defaultExpanded: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.moreInfo
     *
     * @description
     * `boolean`
     *
     * Show/Hide the more info link in object
     *
     * Default value:
     * <pre> moreInfo: false </pre>
     */
    moreInfo: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.debug
     *
     * @description
     * `boolean`
     *
     * Active debug log
     *
     * Default value:
     * <pre> debug: false </pre>
     */
    debug: false,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.social
     *
     * @description
     * `boolean`
     *
     * Active social event
     *
     * Default value:
     * <pre> social: true </pre>
     */
    social: true,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.reply
     *
     * @description
     * `boolean`
     *
     * Active social reply
     *
     * Default value:
     * <pre> reply: true </pre>
     */
    reply: true,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.replyTree
     *
     * @description
     * `boolean`
     *
     * Active social replyTree
     *
     * Default value:
     * <pre> replyTree: true </pre>
     */
    replyTree: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.like
     *
     * @description
     * `boolean`
     *
     * Active social like
     *
     * Default value:
     * <pre> like: true </pre>
     */
    like: true,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.dislike
     *
     * @description
     * `boolean`
     *
     * Active social dislike
     *
     * Default value:
     * <pre> dislike: true </pre>
     */
    dislike: true,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.endorse
     *
     * @description
     * `boolean`
     *
     * Active social endorse
     *
     * Default value:
     * <pre> endorse: true </pre>
     */
    endorse: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.report
     *
     * @description
     * `boolean`
     *
     * Active social report
     *
     * Default value:
     * <pre> report: true </pre>
     */
    report: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.cMenuType
     *
     * @description
     * `string`
     *
     * Contextual menu type showed in edit Mode
     *
     * Default value:
     * <pre> cMenuType: 'annotationDetailsEditable' </pre>
     */

    cMenuTypeEdit: 'annotationDetailsEditable',
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.cMenuType
     *
     * @description
     * `string`
     *
     * Contextual menu type showed in no edit Mode
     *
     * Default value:
     * <pre> cMenuType: 'annotationDetailsNoEditable' </pre>
     */

    cMenuTypeNoEdit: 'annotationDetailsNoEditable',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationDetails.cMenuTypeLeaf
     *
     * @description
     * `string`
     *
     * Contextual menu type showed in no edit Mode
     *
     * Default value:
     * <pre> cMenuType: 'annotationDetailsLeaf' </pre>
     */

    cMenuTypeLeaf: 'annotationDetailsLeaf',
})

.service('AnnotationDetails', function(ANNOTATIONDETAILSDEFAULTS, $rootScope, $filter, $timeout, $document, $window, $modal, $injector, $q,
    BaseComponent, Config, EventDispatcher, Annotation, AnnotationSidebar, AnnotationsExchange, ModelHelper, TemplatesExchange,
    Consolidation, ContextualMenu, ItemsExchange, MyPundit, TextFragmentAnnotator, Status,
    ImageAnnotator, AnnotationsCommunication, NotebookExchange, TypesHelper, Analytics, NameSpace) {

    var annotationDetails = new BaseComponent('AnnotationDetails', ANNOTATIONDETAILSDEFAULTS);

    var clientMode = Config.clientMode,
        Dashboard = clientMode === 'pro' ? $injector.get('Dashboard') : undefined;

    var state = {
        annotations: [],
        defaultExpanded: annotationDetails.options.defaultExpanded,
        social: annotationDetails.options.social,
        reply: annotationDetails.options.reply,
        like: annotationDetails.options.like,
        dislike: annotationDetails.options.dislike,
        endorse: annotationDetails.options.endorse,
        report: annotationDetails.options.report,
        isUserLogged: false,
        isSidebarExpanded: false,
        isGhostedActive: false,
        contextualMenuOpened: false,
        openAnnotation: false,
        userData: {},
    };

    var forceSkip = '';

    var scopeReference = {},
        repliesReference = {};


    var initContextualMenu = function() {


        ContextualMenu.addAction({
            name: 'Edit',
            type: annotationDetails.options.cMenuTypeEdit,
            label: 'Edit',
            showIf: function() {
                return true;
            },
            priority: 99,
            action: function(scope) {
                var event = {};

                if (scope.motivation === 'commenting') {
                    scope.editComment(event);
                } else {
                    event = document.createEvent('Event');
                    scope.editAnnotation(event);
                }
                console.log('dentro edit');
            }
        });

        ContextualMenu.addDivider({
            priority: 98,
            type: annotationDetails.options.cMenuTypeEdit
        });


        ContextualMenu.addAction({
            name: 'Delete',
            type: [annotationDetails.options.cMenuTypeEdit, annotationDetails.options.cMenuTypeNoEdit],
            showIf: function() {
                return true;
            },
            label: 'Delete',
            priority: 97,
            action: function(scope) {
                scope.deleteAnnotation(document.createEvent('Event'));
            }
        });

        ContextualMenu.addAction({
            name: 'Delete reply',
            type: [annotationDetails.options.cMenuTypeLeaf],
            showIf: function() {
                return true;
            },
            label: 'Delete',
            priority: 97,
            action: function(scope) {
                scope.deleteAnnotationLeaf(document.createEvent('Event'));
            }
        });
    };
    initContextualMenu();

    var mouseoutHandlerPromise,
        overActiveId = '',
        highlightFragments = [];

    // ContextualMenu.addAction({
    //     type: [
    //         TextFragmentAnnotator.options.cMenuType,
    //         ImageHandler.options.cMenuType
    //     ],
    //     name: 'showAllAnnotations',
    //     label: 'Show all annotations of this item',
    //     showIf: function(item) {
    //         if (typeof(item) !== 'undefined') {
    //             return Consolidation.isConsolidated(item) || (item.uri in Consolidation.getFragmentParentList());
    //         }
    //     },
    //     priority: 10,
    //     action: function(item) {
    //         if (!AnnotationSidebar.isAnnotationSidebarExpanded()) {
    //             AnnotationSidebar.toggle();
    //         }
    //         annotationDetails.closeViewAndReset();

    //         if (AnnotationSidebar.isFiltersExpanded()) {
    //             AnnotationSidebar.toggleFiltersContent();
    //         }

    //         AnnotationSidebar.resetFilters();

    //         var fragmentsListUri;
    //         var fragmentParentList = Consolidation.getFragmentParentList();
    //         if (item.uri in fragmentParentList) {
    //             fragmentsListUri = fragmentParentList[item.uri];
    //         }

    //         for (var annotation in state.annotations) {
    //             if (state.annotations[annotation].itemsUriArray.indexOf(item.uri) === -1) {
    //                 state.annotations[annotation].ghosted = true;
    //             }
    //             for (var f in fragmentsListUri) {
    //                 if (state.annotations[annotation].itemsUriArray.indexOf(fragmentsListUri[f].uri) !== -1) {
    //                     state.annotations[annotation].ghosted = false;
    //                     continue;
    //                 }
    //          init   }
    //         }

    //         state.isGhostedActive = true;
    //         TextFragmentAnnotator.ghostAll();
    //         TextFragmentAnnotator.ghostRemoveByUri(item.uri);

    //         Analytics.track('buttons', 'click', 'contextualMenu--showAllAnnotationForItem');
    //     }
    // });

    // confirm modal
    var modalScope = $rootScope.$new();
    modalScope.titleMessage = 'Delete Annotation';

    var confirmModal = $modal({
        container: '[data-ng-app="Pundit2"]',
        templateUrl: 'src/Core/Templates/confirm.modal.tmpl.html',
        show: false,
        backdrop: 'static',
        scope: modalScope
    });

    // confirm btn click
    modalScope.confirm = function() {
        var currentElement = modalScope.elementReference,
            currentId = modalScope.annotationId;

        if (MyPundit.isUserLogged()) {
            currentElement.addClass('pnd-annotation-details-delete-in-progress');
            if (confirmModal.isReply) {
                AnnotationsCommunication.deleteReply(currentId).finally(function() {
                    confirmModal.hide();
                    currentElement.removeClass('pnd-annotation-details-delete-in-progress');
                    modalScope.hideReply();
                    //EventDispatcher.addListeners(['deleteReply'], function(e) {
                    //    var element = document.getElementById(e.args);
                    //    element.hide();
                    //});
                    EventDispatcher.sendEvent('deleteReply', state.id);
                });
            } else {
                AnnotationsCommunication.deleteAnnotation(currentId).finally(function() {
                    confirmModal.hide();
                    currentElement.removeClass('pnd-annotation-details-delete-in-progress');
                });
            }

        }

        Analytics.track('buttons', 'click', 'annotation--details--delete--confirm');
    };

    // cancel btn click
    modalScope.cancel = function() {
        confirmModal.hide();
        Analytics.track('buttons', 'click', 'annotation--details--delete--cancel');
    };

    var activateTextFragmentHighlight = function(items) {
        var currentItem;
        for (var index in items) {
            currentItem = ItemsExchange.getItemByUri(items[index]);
            if (typeof(currentItem) !== 'undefined') {
                if (currentItem.isTextFragment()) {
                    TextFragmentAnnotator.highlightByUri(items[index]);
                } else if (currentItem.isImageFragment()) {
                    // TODO really temp trick!!
                    ImageAnnotator.svgClearHighlightByItem(currentItem);
                    ImageAnnotator.svgHighlightByItem(currentItem);
                } else if (currentItem.isImage()) {
                    ImageAnnotator.highlightByUri(items[index]);
                }
                highlightFragments.push(items[index]);
            }
        }
    };

    var resetTextFragmentHighlight = function() {
        var currentItem;
        for (var index in highlightFragments) {
            currentItem = ItemsExchange.getItemByUri(highlightFragments[index]);
            if (typeof(currentItem) !== 'undefined') {
                if (currentItem.isTextFragment()) {
                    TextFragmentAnnotator.clearHighlightByUri(highlightFragments[index]);
                } else if (currentItem.isImageFragment()) {
                    ImageAnnotator.svgClearHighlightByItem(currentItem);
                } else if (currentItem.isImage()) {
                    ImageAnnotator.clearHighlightByUri(highlightFragments[index]);
                }
            }
        }
        highlightFragments = [];
    };

    var isToBeIgnored = function(node) {
        var annClass = 'pnd-annotation-details-wrap';
        var filterClass = 'pnd-annotation-sidebar-filter-content';
        var refClass = 'pnd-annotation-details-ghosted';

        // Traverse every parent and check if it has one of the classes we
        // need to ignore. As soon as we find one, return true: must ignore.
        while (node.nodeName.toLowerCase() !== 'body') {
            if (angular.element(node).hasClass(annClass)) {
                if (angular.element(node).find('.' + refClass).length === 0) {
                    return false;
                }
            }
            if (angular.element(node).hasClass(filterClass)) {
                return false;
            }
            // If there's no parent node .. even better, we didnt find anything wrong!
            if (node.parentNode === null) {
                return true;
            }
            node = node.parentNode;
        }
        return true;
    };

    var buildItemDetails = function(currentUri) {
        var currentItem = ItemsExchange.getItemByUri(currentUri);
        var result;
        if (typeof(currentItem) !== 'undefined') {
            result = {
                uri: currentUri,
                label: currentItem.label,
                description: currentItem.description,
                image: (typeof currentItem.image !== 'undefined' ? currentItem.image : null),
                class: currentItem.getClass(),
                icon: currentItem.getIcon(),
                typeLabel: (typeof currentItem.type[0] !== 'undefined' ? TypesHelper.getLabel(currentItem.type[0]) : null),
                // typeLabel: TypesHelper.getLabel(currentItem.type[0]),
                typeClass: 'uri',
                pageContext: currentItem.pageContext
            };

            if (result.typeLabel === 'Text fragment' &&
                result.pageContext !== undefined) {
                if (result.pageContext !== location.href) {
                    result.isExternal = true;
                }
            }
        }
        return result;
    };

    var buildMainItem = function(currentAnnotation) {
        var annotation = currentAnnotation,
            mainItem = {},
            firstUri;

        for (firstUri in annotation.graph) {
            break;
        }

        mainItem = buildItemDetails(firstUri);

        return mainItem;
    };

    var buildObjectsArray = function(list) {
        var objectValue,
            objectType;
        var results = [];

        for (var object in list) {
            objectValue = list[object].value;
            objectType = list[object].type;

            if (objectType === 'uri') {
                results.push(buildItemDetails(objectValue));
            } else {
                if (typeof list[object].datatype !== 'undefined' &&
                    list[object].datatype === NameSpace.dateTime) {
                    objectValue = moment(objectValue).format('YYYY-MM-DD  HH:mm');
                }

                results.push({
                    uri: null,
                    label: objectValue,
                    description: objectValue,
                    image: null,
                    class: null, // TODO: valutare
                    icon: null,
                    typeLabel: objectType,
                    typeClass: objectType
                });
            }
        }
        return results;
    };

    var buildItemsArray = function(currentAnnotation) {
        var annotation = currentAnnotation,
            graph = annotation.graph,
            object;

        var results = [];

        for (var subject in graph) {
            for (var predicate in graph[subject]) {
                for (var objectIndex in graph[subject][predicate]) {
                    object = graph[subject][predicate][objectIndex];
                    results.push({
                        subject: buildItemDetails(subject),
                        predicate: buildItemDetails(predicate),
                        objects: buildObjectsArray([object])
                    });
                }
            }
        }

        return results;
    };

    var buildItemsUriArray = function(currentAnnotation) {
        var annotation = currentAnnotation;
        var items = annotation.items;
        var results = [];

        for (var item in items) {
            if (results.indexOf(item) === -1) {
                results.push(item);
            }
        }

        return results;
    };

    var convertTime = function(serverdate) {
        var annotationServerVersion = Config.annotationServerVersion;

        if (annotationServerVersion === 'v2') {
            var momentDate = moment(serverdate).utc();
            var localTime = moment.utc(momentDate).toDate();
            return localTime;
        }
        return serverdate;
    };

    annotationDetails.addScopeReference = function(id, value) {
        scopeReference[id] = value;
    };

    annotationDetails.getScopeReference = function(id) {
        return scopeReference[id];
    };

    annotationDetails.addRepliesReference = function(id, value) {
        repliesReference[id] = value;
    };

    annotationDetails.getRepliesReference = function(id) {
        return repliesReference[id];
    };

    annotationDetails.checkCreatorRepliesReference = function(creator) {
        for (var i = 0, len = repliesReference.length; i < len; i++) {
            if (repliesReference[i].annotation.creator === creator) {
                return true;
            }
        }
        return false;
    };

    annotationDetails.removeRepliesReference = function(id) {
        delete repliesReference[id];
    };
    annotationDetails.openConfirmModal = function(currentElement, currentId) {
        // promise is needed to open modal when template is ready
        modalScope.titleMessage = 'Delete Annotation';
        modalScope.notifyMessage = 'Are you sure you want to delete this annotation? Please be aware that deleted annotations cannot be recovered.';
        modalScope.elementReference = currentElement;
        modalScope.annotationId = currentId;
        confirmModal.isReply = false;
        confirmModal.$promise.then(confirmModal.show);
    };

    annotationDetails.openConfirmModalReply = function(currentElement, currentId, hideReply) {
        // promise is needed to open modal when template is ready
        modalScope.titleMessage = 'Delete reply';
        modalScope.notifyMessage = 'Are you sure you want to delete this reply? Please be aware that deleted replies cannot be recovered.';
        modalScope.elementReference = currentElement;
        modalScope.annotationId = currentId;
        modalScope.hideReply = hideReply;
        confirmModal.isReply = true;

        confirmModal.$promise.then(confirmModal.show);
    };

    annotationDetails.saveEditedComment = function(annID, item, comment) {
        var currentTarget = item,
            currentStatement = {
                scope: {
                    get: function() {
                        return {
                            subject: currentTarget,
                            predicate: '',
                            object: comment
                        };
                    }
                }
            };

        var modelData = ModelHelper.buildCommentData(currentStatement);

        var editPromise = AnnotationsCommunication.editAnnotation(
            annID,
            modelData.graph,
            modelData.items,
            modelData.flatTargets,
            modelData.target,

            modelData.type,
            'commenting'
        );

        return editPromise;
    };
    annotationDetails.setEditable = function(bool) {
        state.isEditable = bool;
    };

    annotationDetails.saveReply = function(item, reply) {
        var currentTarget = item,
            currentStatement = {
                scope: {
                    get: function() {
                        return {
                            subject: currentTarget,
                            predicate: '',
                            object: reply
                        };
                    }
                }
            };

        var modelData = ModelHelper.buildCommentData(currentStatement);

        var replyPromise = AnnotationsCommunication.saveAnnotation(
            modelData.graph,
            modelData.items,
            modelData.flatTargets,
            undefined,
            '',
            modelData.target,
            modelData.type,
            'commenting' //TODO support on server side for motivation: "replying"
        );

        return replyPromise;
    };

    annotationDetails.getAnnotationDetails = function(currentId) {
        if (typeof state.annotations[currentId] !== 'undefined') {
            return state.annotations[currentId];
        }
    };

    annotationDetails.getAnnotationViewStatus = function(currentId) {
        return state.annotations[currentId].expanded;
    };

    annotationDetails.setGhosted = function(currentId) {
        if (typeof(state.annotations[currentId]) !== 'undefined') {
            state.annotations[currentId].ghosted = true;
        }
        state.isGhostedActive = true;
    };

    annotationDetails.resetGhosted = function() {
        for (var id in state.annotations) {
            state.annotations[id].ghosted = false;
        }
        state.isGhostedActive = false;

    };

    annotationDetails.closeViewAndReset = function() {
        for (var id in state.annotations) {
            state.annotations[id].ghosted = false;
            state.annotations[id].expanded = false;
            AnnotationSidebar.setAllPosition(id, AnnotationSidebar.options.annotationHeight);
        }
        state.isGhostedActive = false;
        TextFragmentAnnotator.ghostRemoveAll();
    };

    annotationDetails.closeAllAnnotationView = function(skipId, skipPositioning) {
        skipPositioning = typeof skipPositioning !== 'undefined' ? skipPositioning : false;
        for (var id in state.annotations) {
            if (id !== skipId) {
                state.annotations[id].expanded = false;
                if (skipPositioning === false) {
                    AnnotationSidebar.setAnnotationHeight(id, AnnotationSidebar.options.annotationHeight);
                }
            }
        }
    };

    annotationDetails.openAnnotationView = function(currentId) {
        if (typeof(state.annotations[currentId]) !== 'undefined') {
            if (!AnnotationSidebar.isAnnotationSidebarExpanded()) {
                AnnotationSidebar.toggle();
            }
            annotationDetails.closeAllAnnotationView(currentId);
            state.annotations[currentId].expanded = true;

        } else {
            annotationDetails.log("Cannot find this annotation: id -> " + currentId);
        }
    };

    annotationDetails.closeAnnotationView = function(currentId) {
        if (typeof(state.annotations[currentId]) !== 'undefined') {
            state.annotations[currentId].expanded = false;
        } else {
            annotationDetails.log("Cannot find this annotation: id -> " + currentId);
        }
    };

    annotationDetails.toggleAnnotationView = function(currentId, forceTo) {
        if (!state.contextualMenuOpened) {
            annotationDetails.closeAllAnnotationView(currentId);
            state.annotations[currentId].expanded = typeof forceTo !== 'undefined' ? forceTo : !state.annotations[currentId].expanded;
        }
    };

    annotationDetails.isAnnotationGhosted = function(currentId) {
        return state.annotations[currentId].ghosted;
    };

    annotationDetails.isAnnotationUser = function(creator) {
        return creator === state.userData.uri;
    };

    annotationDetails.isUserToolShowed = function(creator) {
        var forceEdit = false;
        if (typeof(Config.forceEditAndDelete) !== 'undefined' && Config.forceEditAndDelete) {
            forceEdit = true;
        }
        return ((state.isUserLogged === true && creator === state.userData.uri) || (forceEdit && MyPundit.isUserLogged())) && AnnotationSidebar.isAnnotationsPanelActive();
    };

    annotationDetails.isEditBtnShowed = function(motivation) {
        return Config.clientMode === 'pro' && (motivation === 'linking' || motivation === 'commenting');
    };

    annotationDetails.userData = function() {
        return MyPundit.getUserData();
    };

    annotationDetails.addAnnotationReference = function(scope, force) {
        var currentId = scope.id;
        var isBroken = scope.broken;
        var notebookName = "Downloading in progress";
        var currentAnnotation = AnnotationsExchange.getAnnotationById(currentId);
        var expandedState;
        var template;
        var currentColor;

        //check thumbnail if null set default
        if (currentAnnotation.thumbnail === '') {
            currentAnnotation.thumbnail = 'http://s9.postimg.org/uylsxjghr/people_dialer_photo.png';
        }
        console.log(currentAnnotation.creatorName + ' ' + currentAnnotation.thumbnail + ' ' + currentAnnotation.id);


        var buildSemantic = function() {
            template = TemplatesExchange.getTemplateById(currentAnnotation.hasTemplate);

            if (typeof(template) !== 'undefined') {
                currentColor = template.hasColor;
            }


            if (typeof(state.annotations[currentId]) === 'undefined') {
                state.annotations[currentId] = {
                    id: currentId,
                    uri: currentAnnotation.uri,
                    creator: currentAnnotation.creator,
                    creatorName: currentAnnotation.creatorName,
                    created: convertTime(currentAnnotation.created),
                    thumbnail: currentAnnotation.thumbnail,
                    notebookId: currentAnnotation.isIncludedIn,
                    notebookName: notebookName,
                    scopeReference: scope,
                    mainItem: buildMainItem(currentAnnotation),
                    itemsArray: buildItemsArray(currentAnnotation),
                    itemsUriArray: buildItemsUriArray(currentAnnotation),
                    broken: isBroken,
                    expanded: expandedState,
                    repliesLoaded: false,
                    ghosted: false,
                    color: currentColor,
                    hasTemplate: template,
                    likes: currentAnnotation.likes,
                    dislikes: currentAnnotation.dislike,
                    replies: currentAnnotation.replies,
                    disagrees: currentAnnotation.disagrees,
                    endorses: currentAnnotation.endorses,
                    reports: currentAnnotation.reports,
                    social: currentAnnotation.social
                };

                var cancelWatchNotebookName = $rootScope.$watch(function() {
                    return NotebookExchange.getNotebookById(currentAnnotation.isIncludedIn);
                }, function(nb) {
                    if (typeof(nb) !== 'undefined') {
                        notebookName = nb.label;
                        state.annotations[currentId].notebookName = notebookName;
                        cancelWatchNotebookName();
                    }
                });
            } else {
                state.annotations[currentId].expanded = expandedState;

                if (typeof(force) !== 'undefined' && force) {
                    state.annotations[currentId].created = currentAnnotation.created;
                    state.annotations[currentId].created = currentAnnotation.created;
                    state.annotations[currentId].notebookId = currentAnnotation.isIncludedIn;
                    state.annotations[currentId].scopeReference = scope;
                    state.annotations[currentId].mainItem = buildMainItem(currentAnnotation);
                    state.annotations[currentId].itemsArray = buildItemsArray(currentAnnotation);
                    state.annotations[currentId].itemsUriArray = buildItemsUriArray(currentAnnotation);
                    state.annotations[currentId].broken = isBroken;
                    state.annotations[currentId].ghosted = false;
                    state.annotations[currentId].expanded = true;
                }
            }
        };

        var buildCommentOrHighlight = function(motivation) {
            var firstTargetUri = currentAnnotation.hasTarget[0],
                firstItem = currentAnnotation.items[firstTargetUri],
                currentGraph = '';

            if (typeof(state.annotations[currentId]) === 'undefined') {
                state.annotations[currentId] = {
                    id: currentId,
                    uri: currentAnnotation.uri,
                    creator: currentAnnotation.creator,
                    creatorName: currentAnnotation.creatorName,
                    created: convertTime(currentAnnotation.created),
                    notebookId: currentAnnotation.isIncludedIn,
                    notebookName: notebookName,
                    thumbnail: currentAnnotation.thumbnail,
                    scopeReference: scope,
                    mainItem: buildItemDetails(firstTargetUri),
                    itemsArray: [firstItem],
                    itemsUriArray: [firstTargetUri],
                    broken: isBroken,
                    expanded: expandedState,
                    repliesLoaded: false,
                    ghosted: false,
                    likes: currentAnnotation.likes,
                    dislikes: currentAnnotation.dislikes,
                    replies: currentAnnotation.replies,
                    disagrees: currentAnnotation.disagrees,
                    endorses: currentAnnotation.endorses,
                    reports: currentAnnotation.reports,
                    social: currentAnnotation.social
                };

                if (motivation === 'commenting') {
                    if (typeof currentAnnotation.graph[NameSpace.rdf.value] === 'undefined') {
                        for (var first in currentAnnotation.graph) {
                            currentGraph = currentAnnotation.graph[first];
                            break;
                        }

                    } else {
                        currentGraph = currentAnnotation.graph;
                    }
                    state.annotations[currentId].comment = currentGraph[NameSpace.rdf.value][0].value;
                }

                var cancelWatchNotebookName = $rootScope.$watch(function() {
                    return NotebookExchange.getNotebookById(currentAnnotation.isIncludedIn);
                }, function(nb) {
                    if (typeof(nb) !== 'undefined') {
                        notebookName = nb.label;
                        state.annotations[currentId].notebookName = notebookName;
                        cancelWatchNotebookName();
                    }
                });
            } else {
                state.annotations[currentId].expanded = expandedState;

                if (typeof(force) !== 'undefined' && force) {
                    state.annotations[currentId].created = currentAnnotation.created;
                    state.annotations[currentId].notebookId = currentAnnotation.isIncludedIn;
                    state.annotations[currentId].scopeReference = scope;
                    state.annotations[currentId].mainItem = buildItemDetails(firstTargetUri);
                    state.annotations[currentId].itemsArray = [firstItem];
                    state.annotations[currentId].itemsUriArray = [firstTargetUri];
                    state.annotations[currentId].broken = isBroken;
                    state.annotations[currentId].ghosted = false;
                    state.annotations[currentId].expanded = true;
                }
            }
        };

        if (typeof(currentId) === 'undefined' ||
            typeof(currentAnnotation) === 'undefined') {
            EventDispatcher.sendEvent('AnnotationDetails.wrongAnnotation', currentId);
            return;
        }

        expandedState = (force ? true : state.defaultExpanded);

        if (currentAnnotation.motivatedBy === 'commenting' ||
            currentAnnotation.motivatedBy === 'highlighting' ||
            currentAnnotation.motivatedBy === 'replying') {
            buildCommentOrHighlight(currentAnnotation.motivatedBy);
        } else {
            buildSemantic();
        }
    };

    annotationDetails.activateTextFragmentHighlight = function(broken, annotationId, items) {
        $timeout.cancel(mouseoutHandlerPromise);

        if (broken || overActiveId === annotationId) {
            return;
        }

        resetTextFragmentHighlight();
        activateTextFragmentHighlight(items);
        overActiveId = annotationId;
    };

    annotationDetails.resetTextFragmentHighlight = function(broken) {
        $timeout.cancel(mouseoutHandlerPromise);

        if (broken || overActiveId === '') {
            return;
        }

        mouseoutHandlerPromise = $timeout(function() {
            resetTextFragmentHighlight();
            overActiveId = '';
            $timeout.cancel(mouseoutHandlerPromise);
        }, 100);
    };

    annotationDetails.getRepliesByAnnotationId = function(annotationId) {
        annotationDetails.addRepliesReference(annotationId, AnnotationsCommunication.getRepliesByAnnotationId(annotationId));

        return annotationDetails.getRepliesReference(annotationId);
    };

    annotationDetails.socialEvent = function(annotationId, ancestor, type, operation, comment) {
        return AnnotationsCommunication.socialEvent(annotationId, ancestor, type, operation, comment);
    };

    annotationDetails.menuEdit = function(elem, scope) {
        var pos = elem.getBoundingClientRect();
        var left = pos.left + pos.width * 2 / 3 + angular.element($window).scrollLeft();
        var top = pos.top + pos.height * 2 / 3 + angular.element($window).scrollTop();
        var type = '';

        if (typeof scope.motivation === 'undefined') {
            scope.motivation = scope.data.motivation;
        }

        if (typeof angular.element('.pnd-dropdown-contextual-menu')[0] === 'undefined') {

            if (annotationDetails.isEditBtnShowed(scope.motivation)) {
                type = annotationDetails.options.cMenuTypeEdit;
            } else if (typeof scope.leaf !== 'undefined') {
                type = annotationDetails.options.cMenuTypeLeaf;
            } else {
                type = annotationDetails.options.cMenuTypeNoEdit;
            }
            ContextualMenu.show(left, top, scope, type);
            state.contextualMenuOpened = true;
        } else {
            ContextualMenu.hide();
        }
    };

    EventDispatcher.addListeners(['AnnotationSidebar.updateAnnotation'], function(e) {
        annotationDetails.log('Update annotation ' + e.args);

        var annotationId = e.args,
            targetAnnotation,
            currentAnnotation,
            annomaticIsRunning;

        if (typeof(annotationId) !== 'undefined') {

            currentAnnotation = AnnotationsExchange.getAnnotationById(annotationId);
            targetAnnotation = {
                id: annotationId,
                broken: currentAnnotation.isBroken()
            };
            if (!AnnotationSidebar.isAnnotationSidebarExpanded()) {
                AnnotationSidebar.toggle();
            }
            if (AnnotationSidebar.needToFilter()) {
                forceSkip = annotationId;
            }
            annotationDetails.closeAllAnnotationView(annotationId);
            annotationDetails.addAnnotationReference(targetAnnotation, true);

            annomaticIsRunning = Status.getState('Annomatic').isRunning;
            if (annomaticIsRunning) {
                return;
            }

            $timeout(function() {
                var currentElement = angular.element('#' + annotationId),
                    currentElementRect = currentElement[0].getClientRects()[0],
                    dashboardHeight = clientMode === 'pro' ? Dashboard.getContainerHeight() : 0;

                if (currentElementRect.top >= 0 &&
                    currentElementRect.bottom <= $window.innerHeight) {
                    return;
                }
                if (currentElement.length > 0) {
                    angular.element('body').animate({
                        scrollTop: currentElement.offset().top - dashboardHeight - 60
                    }, 'slow');
                }
            }, 100);
        }
    });

    // Watch annotation sidebar expanded or collapsed
    EventDispatcher.addListener('AnnotationSidebar.toggle', function(e) {
        state.isSidebarExpanded = e.args;
        if (state.isSidebarExpanded === false) {
            annotationDetails.closeAllAnnotationView();
        }
    });

    EventDispatcher.addListener('MyItems.action', function() {
        if (state.isSidebarExpanded) {
            annotationDetails.closeAllAnnotationView();
        }
    });

    // Watch annotation sidebar expanded or collapsed
    EventDispatcher.addListener('AnnotationSidebar.toggleAnnotation', function(e) {
        var annId = e.args;
        annotationDetails.toggleAnnotationView(annId, true);
    });

    EventDispatcher.addListener('ResizeManager.resize', function() {
        state.contextualMenuOpened = false;
        ContextualMenu.hide();
        annotationDetails.closeAllAnnotationView();
    });

    EventDispatcher.addListener('MyPundit.isUserLogged', function(e) {
        state.isUserLogged = e.args;
        state.userData = MyPundit.getUserData();
        annotationDetails.closeAllAnnotationView(undefined, true);
    });

    EventDispatcher.addListener('Client.hide', function( /*e*/ ) {
        $document.off('mousedown', mouseDownHandler);
    });

    EventDispatcher.addListener('Client.show', function( /*e*/ ) {
        $document.on('mousedown', mouseDownHandler);
    });
    EventDispatcher.addListener('closeContextualMenu', function( /*e*/ ) {
        state.contextualMenuOpened = false;
    });
    EventDispatcher.addListener('openContextualMenu', function( /*e*/ ) {
        state.contextualMenuOpened = true;
    });
    $document.on('mousedown', mouseDownHandler);

    function mouseDownHandler(downEvt) {
        var target = downEvt.target;

        if (state.isGhostedActive) {
            if (isToBeIgnored(target)) {
                annotationDetails.closeViewAndReset();
            }
        }

        $rootScope.$$phase || $rootScope.$digest();
    }

    annotationDetails.log('Component running');
    return annotationDetails;
});