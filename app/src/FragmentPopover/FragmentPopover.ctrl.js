angular.module('Pundit2.FragmentPopover')

.controller('FragmentPopoverCtrl', function($scope, PndPopover, $window, AnnotationDetails) {
    $scope.gotoLink = function() {
        $window.open($window.location.href);
        PndPopover.hide();
    };

    $scope.showAnnotation = function(annotation) {
        AnnotationDetails.openAnnotationView(annotation.id);
        PndPopover.hide();
    };
});