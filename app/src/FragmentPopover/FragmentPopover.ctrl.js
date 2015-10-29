angular.module('Pundit2.FragmentPopover')

.controller('FragmentPopoverCtrl', function($scope, PndPopover, $window, AnnotationDetails) {
    $scope.gotoLink = function() {
        $window.open($window.location.href);
        PndPopover.hide();
    };

    $scope.showAnnotation = function(annotation) {
        AnnotationDetails.openAnnotationView(annotation.id);
        AnnotationDetails.resetTextFragmentHighlight(false);
        PndPopover.hide();
    };

    $scope.mouseenter = function(annotation) {
        AnnotationDetails.activateTextFragmentHighlight(false, annotation.id, annotation.entities);
    };
    $scope.mouseleave = function() {
        AnnotationDetails.resetTextFragmentHighlight(false);
    };
});