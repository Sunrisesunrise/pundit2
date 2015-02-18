angular.module('Pundit2.Breadcrumbs')
.controller('BreadcrumbsCtrl', ['$scope', function($scope) {
    $scope.items = [];
    $scope.itemSelect = function(index, event) {
        event.preventDefault();
        var item = $scope.items[index];
        if (typeof item !== 'undefined' &&
            item.hasOwnProperty('callback') &&
            typeof item.callback === 'function') {
            item.callback.call(null, index, item);
            $scope.dropItemsFromIndex(index + 1);
        }
        return false;
    }

    $scope.appendItem = function(itemObject) {
        $scope.items.push(itemObject);
    }

    $scope.popItem = function() {
        if ($scope.items.length > 0) {
            $scope.items.pop();
        }
    }

    $scope.dropItemsFromIndex = function(index) {
        if (index >= $scope.items.length) {
            return;
        }
        index = index < 0 ? 0 : index;
        $scope.items.splice(index, $scope.items.length - index);
    }
}]);
