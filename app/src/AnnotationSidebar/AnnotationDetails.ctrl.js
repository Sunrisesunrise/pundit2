angular.module('Pundit2.AnnotationSidebar')

.controller('AnnotationDetailsCtrl', function($scope, $rootScope, $element, $timeout, $window,
    AnnotationSidebar, AnnotationDetails, AnnotationsExchange, TripleComposer, Dashboard, EventDispatcher,
    Config, MyPundit, Analytics) {

    var isDefined = function(a) {
        if (typeof a === 'undefined') {
            return 0;
        } else {
            return a;
        }
    };

    //function compare(a, b) {
    //    if (a.created < b.created) {
    //        return 1;
    //    } else if (a.created > b.created) {
    //        return -1;
    //    } else {
    //        return 0;
    //    }
    //}

    // TODO: temporary fix waiting for server consistency
    if ($scope.motivation !== 'linking' &&
        $scope.motivation !== 'commenting' &&
        $scope.motivation !== 'replying') {
        $scope.motivation = 'linking';
    }

    if (AnnotationDetails.getAnnotationDetails($scope.id) === undefined) {
        AnnotationDetails.addAnnotationReference($scope);
    }

    var notebookId,
        currentId = $scope.id,
        currentElement = $element,
        initialHeight = AnnotationSidebar.options.annotationHeight,
        currentHeight = initialHeight - 1;

    $scope.annotation = AnnotationDetails.getAnnotationDetails(currentId);

    $scope.annotation.social = {
        counting: {
            comment: isDefined($scope.annotation.replies),
            like: isDefined($scope.annotation.likes),
            dislike: isDefined($scope.annotation.dislikes),
            endors: isDefined($scope.annotation.endorses),
            report: isDefined($scope.annotation.reports)
        },
        status: {
            comment: false,
            like: false,
            dislike: false,
            endors: false,
            report: false,
        }
    };
    $scope.social = AnnotationDetails.options.social;
    $scope.annotation.parentId = $scope.id;
    $scope.openGraph = Config.lodLive.baseUrl + Config.pndPurl + 'annotation/' + currentId;
    $scope.moreInfo = AnnotationDetails.options.moreInfo;
    $scope.homePundit = Config.homePundit;
    $scope.options = AnnotationDetails.options;
    $scope.optionsReplyes = angular.copy($scope.options);
    $scope.reply = AnnotationDetails.options.reply;
    $scope.replyDialog = false;
    $scope.like = AnnotationDetails.options.like;
    $scope.dislike = AnnotationDetails.options.dislike;
    $scope.endorse = AnnotationDetails.options.endorse;
    $scope.report = AnnotationDetails.options.report;
    $scope.editCommentValue = '';
    $scope.replyCommentValue = '';
    $scope.userData = AnnotationDetails.userData();
    $scope.replyTreeActivate = false;
    $scope.replyTree = [];

    if ($scope.options.replyTree === false) {
        $scope.optionsReplyes.reply = false;
    }

    if (typeof($scope.annotation) !== 'undefined') {
        $scope.notebooksHomeLink = Config.homeBaseURL + 'notebooks/';
        notebookId = $scope.annotation.notebookId;
    }

    if (typeof(Config.lodLive) !== 'undefined' && Config.lodLive.active) {
        $scope.lodLiveBaseUrl = Config.lodLive.baseUrl;
        $scope.lodLive = true;
    } else {
        $scope.lodLive = false;
    }

    if (typeof(Config.forceTemplateEdit) !== 'undefined' && Config.forceTemplateEdit) {
        $scope.forceTemplateEdit = true;
    } else {
        $scope.forceTemplateEdit = false;
    }

    if (typeof(Config.forceEditAndDelete) !== 'undefined' && Config.forceEditAndDelete) {
        $scope.forceEdit = true;
    } else {
        $scope.forceEdit = false;
    }

    var stopEvent = function(event) {
        event.stopPropagation();
        event.preventDefault();
    };

    $scope.toggleAnnotation = function() {
        $scope.editMode = false;


        if (!AnnotationSidebar.isAnnotationSidebarExpanded()) {
            if (AnnotationSidebar.isFiltersExpanded()) {
                AnnotationSidebar.toggleFiltersContent();
            }
            AnnotationSidebar.toggle();
            $timeout(function() {
                var dashboardHeight = Dashboard.isDashboardVisible() ? Dashboard.getContainerHeight() : 0;
                angular.element('body').animate({
                    scrollTop: currentElement.offset().top - dashboardHeight - 60
                }, 'slow');
            }, 100);
        }
        // if(AnnotationDetails.isAnnotationGhosted(currentId)){
        //     AnnotationDetails.closeViewAndReset();
        // }
        // $scope.metaInfo = false;
        AnnotationDetails.toggleAnnotationView(currentId);

        if (!$scope.annotation.expanded) {
            AnnotationSidebar.setAllPosition(currentId, initialHeight);
            $scope.replyDialog = false;
            $scope.annotation.replyCommentValue = '';
        }

        if ($scope.annotation.expanded && !$scope.annotation.repliesLoaded) {
            AnnotationDetails.getRepliesByAnnotationId(currentId).then(function(data) {

                if (typeof data !== 'undefined') {
                    //data.sort(compare);
                    $scope.replyTree = data;
                }

                console.log("data: " + data);
                $scope.annotation.repliesLoaded = true;
            });

            $scope.annotation.repliesLoaded = true;

        }

        Analytics.track('buttons', 'click', 'annotation--details--' + ($scope.annotation.expanded ? 'expand' : 'collapse'));
    };

    $scope.trackAnalyticsToggleEvent = function(label, expanded) {
        Analytics.track('buttons', 'click', 'annotation--details--' + label + '--' + (expanded ? 'expand' : 'collapse'));
    };

    $scope.trackAnalyticsEvent = function(label) {
        Analytics.track('buttons', 'click', 'annotation--details--' + label);
    };

    $scope.deleteAnnotation = function(event) {
        AnnotationDetails.openConfirmModal(currentElement, currentId);
        Analytics.track('buttons', 'click', 'annotation--details--delete');

        stopEvent(event);
    };

    $scope.showEdit = function() {
        return typeof($scope.annotation.hasTemplate) === 'undefined' || $scope.forceTemplateEdit;
    };

    $scope.editAnnotation = function(event) {

        var doEditAnnotation = function() {
            if (TripleComposer.isEditMode()) {
                TripleComposer.reset();
            }

            // TODO fix tripleComposer.editAnnotation removing watch to add statement and remove this timeout
            $timeout(function() {
                TripleComposer.editAnnotation($scope.annotation.id);
                if (!Dashboard.isDashboardVisible()) {
                    TripleComposer.closeAfterOp();
                    Dashboard.toggle();
                } else {
                    TripleComposer.closeAfterOpOff();
                }
                EventDispatcher.sendEvent('AnnotationDetails.editAnnotation', TripleComposer.options.clientDashboardTabTitle);

                Analytics.track('buttons', 'click', 'annotation--details--edit');
            }, 1);
        };

        if (TripleComposer.isSaving()) {
            // console.log("Still saving .. wait !!");
            TripleComposer.setAfterSave(doEditAnnotation);
        } else {
            doEditAnnotation();
        }

        stopEvent(event);
    };

    $scope.editComment = function() {
        $scope.editMode = !$scope.editMode;
        $scope.editCommentValue = $scope.annotation.comment;

        //stopEvent(event);
    };

    $scope.socialEvent = function(event, type) {
        var createItemFromResource = function(event) {
            var values = {};

            values.uri = 'lool';
            values.icon = true;
            values.elem = event.currentTarget;

            return new Item(values.uri, values);
        };
        var contrary = {
                like: 'dislike',
                dislike: 'like',
                endors: 'report',
                report: 'endors'
            },
            promise = {},
            operation = '';

        if (!MyPundit.isUserLogged()) {
            angular.element(event.target).addClass('pnd-range-pos-icon');
            AnnotationPopover.show(event.clientX, event.clientY, createItemFromResource(event), '', undefined, 'alert');
            return;
        }

        if (typeof type === 'undefined') {
            return;
        }
        if (type === 'comment') {
            promise = AnnotationDetails.socialEvent(currentId, $scope.annotation.parentId, type, 'add', $scope.annotation.replyCommentValue);

            promise.then(function(data) {
                $scope.replyDialog = false;
                $scope.replyTreeActivate = true;
                $scope.isUserLogged = MyPundit.isUserLogged();
                var currentUser = MyPundit.getUserData();
                var reply = {
                    id: data.AnnotationID,
                    content: $scope.annotation.replyCommentValue,
                    'creatorName': currentUser.fullName,
                    'created': Date(),
                    'thumbnail': currentUser.thumbnail,
                    social: {
                        counting: {
                            comment: 0,
                            like: 0,
                            dislike: 0,
                            endors: 0,
                            report: 0
                        },
                        status: {
                            comment: false,
                            like: false,
                            dislike: false,
                            endors: false,
                            report: false
                        }
                    }
                };
                $scope.annotation.replyCommentValue = '';

                $scope.replyTree.unshift(reply);


            });
        } else {

            if (!$scope.social.status[type]) {
                operation = 'add';
            } else {
                operation = 'remove';
            }

            promise = AnnotationDetails.socialEvent(currentId, $scope.annotation.ancestor, type, operation);

            promise.then(function(status) {

                if (status) {

                    if ($scope.social.status[type] && !$scope.social.status[contrary[type]]) {
                        $scope.social.counting[type] = parseInt($scope.social.counting[type]) - 1;
                    }

                    if (!$scope.social.status[type] && !$scope.social.status[contrary[type]]) {
                        $scope.social.counting[type] = parseInt($scope.social.counting[type]) + 1;
                    }

                    if (!$scope.social.status[type] && $scope.social.status[contrary[type]]) {
                        $scope.social.status[contrary[type]] = !$scope.social.status[contrary[type]];
                        $scope.social.counting[type] = parseInt($scope.social.counting[type]) + 1;
                        $scope.social.counting[contrary[type]] = parseInt($scope.social.counting[contrary[type]]) - 1;
                    }

                    $scope.social.status[type] = !$scope.social.status[type];
                }
                var data = $scope.annotation;
            });
        }


        stopEvent(event);
    };

    $scope.saveEdit = function(event) {
        var promise = AnnotationDetails.saveEditedComment(currentId, $scope.annotation.itemsArray[0], $scope.annotation.comment);

        promise.then(function() {
            $scope.editMode = false;
        }, function() {});

        stopEvent(event);
    };

    $scope.areaClick = function(event) {
        stopEvent(event);
    };

    $scope.cancelEdit = function(event) {
        $scope.editMode = false;
        stopEvent(event);
    };

    $scope.cancelReply = function(event) {
        $scope.replyDialog = false;
        stopEvent(event);
    };

    $scope.openNotebook = function(event, id) {
        $window.open(Config.homeBaseURL + 'annotations/' + id, '_blank');
        stopEvent(event);
    };

    $scope.isUserToolShowed = function() {
        return AnnotationDetails.isUserToolShowed($scope.annotation.creator);
    };

    $scope.isLinking = function() {
        if ($scope.motivation === 'linking') {
            return true;
        }
        return false;
    };

    $scope.isEditBtnShowed = function() {
        return AnnotationDetails.isEditBtnShowed($scope.motivation);
    };

    $scope.menuEdit = function(evt) {
        AnnotationDetails.menuEdit(evt.toElement, $scope);
        console.log("inside menu");
    };

    $scope.$watch(function() {
        return currentElement.height();
    }, function(newHeight, oldHeight) {
        if (typeof($scope.annotation) !== 'undefined') {
            if (newHeight !== oldHeight && $scope.annotation.expanded) {
                AnnotationSidebar.setAllPosition(currentId, newHeight);
            }
        }
    });


    // TODO find alternative to force digest and avoid watch delay on the height change (?)
    currentElement.bind('DOMSubtreeModified', function() {
        if (typeof($scope.annotation) !== 'undefined') {
            if (currentElement.height() !== currentHeight) {
                currentHeight = currentElement.height();
                if (currentHeight < 30 || currentHeight > 140) {
                    $rootScope.$$phase || $rootScope.$digest();
                }
            }
        }
    });

    AnnotationDetails.log('Controller Details Run');
});