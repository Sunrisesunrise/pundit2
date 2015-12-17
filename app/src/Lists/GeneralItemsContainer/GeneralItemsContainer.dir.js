angular.module('Pundit2.GeneralItemsContainer')

.directive('generalItemsContainer', function() {
    return {
        restrict: 'E',
        scope: {
            hierarchystring: '@',
            type: '@'
        },
        templateUrl: "src/Lists/GeneralItemsContainer/GeneralItemsContainer.dir.tmpl.html",
        controller: "GeneralItemsContainerCtrl"
    };
});