angular.module('Pundit2.AnnotationSidebar')

.controller('AnnotationDetailsCtrl', function($scope, $rootScope, $element, $timeout, $window,
    AnnotationSidebar, AnnotationDetails, TripleComposer, Dashboard, EventDispatcher,
    Config, MyPundit, Analytics) {

    if (AnnotationDetails.getAnnotationDetails($scope.id) === undefined) {
        AnnotationDetails.addAnnotationReference($scope);
    }

    var notebookId,
        currentId = $scope.id,
        currentElement = $element,
        initialHeight = AnnotationSidebar.options.annotationHeight,
        currentHeight = initialHeight - 1;

    $scope.annotation = AnnotationDetails.getAnnotationDetails(currentId);
    $scope.openGraph = Config.lodLive.baseUrl + Config.pndPurl + 'annotation/' + currentId;
    $scope.moreInfo = AnnotationDetails.options.moreInfo;
    $scope.notebookLink = Config.askThePundit;

    $scope.editMode = false;

    if (typeof($scope.annotation) !== 'undefined') {
        if (AnnotationDetails.isUserToolShowed($scope.annotation.creator)) {
            $scope.askLink = Config.askBaseURL + '#/myNotebooks/';
        } else {
            $scope.askLink = Config.askBaseURL + '#/notebooks/';
        }

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
        }

        Analytics.track('buttons', 'click', 'annotation--details--' + ($scope.annotation.expanded ? 'expand' : 'collapse'));
    };

    $scope.trackAnalyticsToggleEvent = function(label, expanded) {
        Analytics.track('buttons', 'click', 'annotation--details--' + label + '--' + (expanded ? 'expand' : 'collapse'));
    };

    $scope.trackAnalyticsEvent = function(label) {
        Analytics.track('buttons', 'click', 'annotation--details--' + label);
    };

    $scope.deleteAnnotation = function() {
        AnnotationDetails.openConfirmModal(currentElement, currentId);
        Analytics.track('buttons', 'click', 'annotation--details--delete');
    };

    $scope.showEdit = function() {
        return typeof($scope.annotation.hasTemplate) === 'undefined' || $scope.forceTemplateEdit;
    };

    $scope.editAnnotation = function() {

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
            console.log("Still saving .. wait !!");
            TripleComposer.setAfterSave(doEditAnnotation);
        } else {
            doEditAnnotation();
        }
    };

    $scope.editComment = function() {
        $scope.editMode = true;
    };

    $scope.cancelEdit = function() {
        $scope.editMode = false;
    }

    $scope.isUserToolShowed = function() {
        return (AnnotationDetails.isUserToolShowed($scope.annotation.creator) || ($scope.forceEdit && MyPundit.isUserLogged())) && AnnotationSidebar.isAnnotationsPanelActive();
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