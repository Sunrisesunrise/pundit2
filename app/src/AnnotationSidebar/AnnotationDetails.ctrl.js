angular.module('Pundit2.AnnotationSidebar')

.controller('AnnotationDetailsCtrl', function($scope, $rootScope, $element, $modal, $timeout, $window,
    AnnotationSidebar, AnnotationDetails, AnnotationsCommunication, TripleComposer, Dashboard,
    EventDispatcher, Config, MyPundit, Analytics) {

    if (AnnotationDetails.getAnnotationDetails($scope.id) === undefined) {
        AnnotationDetails.addAnnotationReference($scope);
    }

    var notebookId,
        currentId = $scope.id,
        currentElement = $element,
        initialHeight = AnnotationSidebar.options.annotationHeigth,
        currentHeight = initialHeight - 1;

    $scope.annotation = AnnotationDetails.getAnnotationDetails(currentId);
    $scope.openGraph = Config.lodLive.baseUrl + Config.pndPurl + 'annotation/' + currentId;
    $scope.moreInfo = AnnotationDetails.options.moreInfo;
    $scope.notebookLink = Config.askThePundit;

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

    // confirm modal
    var modalScope = $rootScope.$new();
    modalScope.titleMessage = 'Delete Annotation';

    var confirmModal = $modal({
        container: '[data-ng-app="Pundit2"]',
        template: 'src/Core/Templates/confirm.modal.tmpl.html',
        show: false,
        backdrop: 'static',
        scope: modalScope
    });

    // open modal
    var openConfirmModal = function() {
        // promise is needed to open modal when template is ready
        modalScope.notifyMessage = 'Are you sure you want to delete this annotation? Please be aware that deleted annotations cannot be recovered.';
        confirmModal.$promise.then(confirmModal.show);
    };

    // confirm btn click
    modalScope.confirm = function() {
        if (MyPundit.isUserLogged()) {
            currentElement.addClass('pnd-annotation-details-delete-in-progress');
            AnnotationsCommunication.deleteAnnotation($scope.annotation.id).then(function() {
                modalScope.notifyMessage = "Your annotation has been deleted successfully";
                TripleComposer.reset();
            }, function() {
                currentElement.removeClass('pnd-annotation-details-delete-in-progress');
                modalScope.notifyMessage = 'Impossible to delete the annotation. Please reatry later.';
            });
        }

        Analytics.track('buttons', 'click', 'annotation--details--delete--confirm');

        $timeout(function() {
            confirmModal.hide();
        }, 1000);
    };

    // cancel btn click
    modalScope.cancel = function() {
        confirmModal.hide();
        Analytics.track('buttons', 'click', 'annotation--details--delete--cancel');
    };

    $scope.toggleAnnotation = function() {
        if (!AnnotationSidebar.isAnnotationSidebarExpanded()) {
            AnnotationSidebar.toggle();
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
        openConfirmModal();

        Analytics.track('buttons', 'click', 'annotation--details--delete');
    };

    $scope.showEdit = function() {
        return typeof($scope.annotation.hasTemplate) === 'undefined' || $scope.forceTemplateEdit;
    };

    $scope.editAnnotation = function() {
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

    $scope.isUserToolShowed = function() {
        return (AnnotationDetails.isUserToolShowed($scope.annotation.creator) || ($scope.forceEdit && MyPundit.isUserLogged())) && AnnotationSidebar.isAnnotationsPanelActive();
    };

    $scope.mouseoverHandler = function() {
        AnnotationDetails.activateTextFragmentHighlight($scope.annotation.broken, currentId, $scope.annotation.itemsUriArray);
    };

    $scope.mouseoutHandler = function() {
        AnnotationDetails.resetTextFragmentHighlight($scope.annotation.broken);
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