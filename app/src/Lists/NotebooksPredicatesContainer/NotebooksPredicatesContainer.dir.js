angular.module('Pundit2.NotebooksPredicatesContainer')

.directive('notebooksPredicatesContainer', function() {
    return {
        restrict: 'E',
        scope: {
            type: '@'
        },
        templateUrl: "src/Lists/NotebooksPredicatesContainer/NotebooksPredicatesContainer.dir.tmpl.html",
        controller: "NotebooksPredicatesContainerCtrl"
    };
});