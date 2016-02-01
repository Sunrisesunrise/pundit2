angular.module('Pundit2.AnnotationSidebar')

    .controller('AnnotationDetailsCtrl', function ($scope, $rootScope, $element, $timeout, $window,
                                                   AnnotationSidebar, AnnotationDetails, TripleComposer, Dashboard, EventDispatcher,
                                                   Config, MyPundit, Analytics) {

        // TODO: temporary fix waiting for server consistency
        if ($scope.motivation !== 'linking' &&
            $scope.motivation !== 'commenting') {
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

        var clientMode = Config.clientMode;

        $scope.annotation = AnnotationDetails.getAnnotationDetails(currentId);
        $scope.openGraph = Config.lodLive.baseUrl + Config.pndPurl + 'annotation/' + currentId;
        $scope.moreInfo = AnnotationDetails.options.moreInfo;
        $scope.homePundit = Config.homePundit;
        $scope.social = AnnotationDetails.options.social;
        $scope.editMode = false;
        $scope.replyMode = false;
        $scope.editCommentValue = '';
        $scope.replyCommentValue = 'leave a comment here...';
        $scope.userData = AnnotationDetails.userData();

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

        var stopEvent = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };

        $scope.toggleAnnotation = function () {
            $scope.editMode = false;

            if (!AnnotationSidebar.isAnnotationSidebarExpanded()) {
                if (AnnotationSidebar.isFiltersExpanded()) {
                    AnnotationSidebar.toggleFiltersContent();
                }
                AnnotationSidebar.toggle();
                $timeout(function () {
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
            }

            Analytics.track('buttons', 'click', 'annotation--details--' + ($scope.annotation.expanded ? 'expand' : 'collapse'));
        };

        $scope.trackAnalyticsToggleEvent = function (label, expanded) {
            Analytics.track('buttons', 'click', 'annotation--details--' + label + '--' + (expanded ? 'expand' : 'collapse'));
        };

        $scope.trackAnalyticsEvent = function (label) {
            Analytics.track('buttons', 'click', 'annotation--details--' + label);
        };

        $scope.deleteAnnotation = function (event) {
            AnnotationDetails.openConfirmModal(currentElement, currentId);
            Analytics.track('buttons', 'click', 'annotation--details--delete');

            stopEvent(event);
        };

        $scope.showEdit = function () {
            return typeof($scope.annotation.hasTemplate) === 'undefined' || $scope.forceTemplateEdit;
        };

        $scope.editAnnotation = function (event) {

            var doEditAnnotation = function () {
                if (TripleComposer.isEditMode()) {
                    TripleComposer.reset();
                }

                // TODO fix tripleComposer.editAnnotation removing watch to add statement and remove this timeout
                $timeout(function () {
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

        $scope.editComment = function (event) {
            $scope.editMode = true;
            $scope.editCommentValue = $scope.annotation.comment;

            stopEvent(event);
        };
        $scope.likeComment = function (event) {

        }
        $scope.dislikeComment = function (event) {

        }
        $scope.replyComment = function (event) {
            $scope.replyMode = true;
            $scope.replyCommentValue = "";

            stopEvent(event);

        }

        $scope.saveEdit = function (event) {
            var promise = AnnotationDetails.saveEditedComment(currentId, $scope.annotation.mainItem, $scope.annotation.comment);

            promise.then(function () {
                $scope.editMode = false;
            }, function () {
                $scope.editCommentValue = '';
                $scope.editMode = false;
            });

            stopEvent(event);
        };

        $scope.areaClick = function (event) {
            stopEvent(event);
        };

        $scope.cancelEdit = function (event) {
            $scope.editMode = false;
            $scope.replyMode = false;
            stopEvent(event);
        };

        $scope.openNotebook = function (event, id) {
            $window.open(Config.homeBaseURL + 'annotations/' + id, '_blank');
            stopEvent(event);
        };

        $scope.isUserToolShowed = function () {
            return (AnnotationDetails.isUserToolShowed($scope.annotation.creator) || ($scope.forceEdit && MyPundit.isUserLogged())) && AnnotationSidebar.isAnnotationsPanelActive();
        };
        $scope.isSocialMode = function () {
            return $scope.social
        };

        $scope.isEditBtnShowed = function () {
            return clientMode === 'pro' && $scope.motivation === 'linking';
        };

        $scope.$watch(function () {
            return currentElement.height();
        }, function (newHeight, oldHeight) {
            if (typeof($scope.annotation) !== 'undefined') {
                if (newHeight !== oldHeight && $scope.annotation.expanded) {
                    AnnotationSidebar.setAllPosition(currentId, newHeight);
                }
            }
        });

        // TODO find alternative to force digest and avoid watch delay on the height change (?)
        currentElement.bind('DOMSubtreeModified', function () {
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