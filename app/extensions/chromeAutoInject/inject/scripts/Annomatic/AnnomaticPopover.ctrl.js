angular.module('Pundit2.Annomatic')

.controller('AnnomaticPopoverCtrl', function($rootScope, $scope, Annomatic, EventDispatcher, MyPundit, PndPopover) {

    // Using popover's content variable to pass the number of the 
    // annotation
    $scope.num = parseInt($scope.content, 10);
    $scope.ann = Annomatic.ann;
    $scope.isMultiEntites = false;
    $scope.currentEntity = 0;

    if (typeof(Annomatic.ann.byNum[$scope.num]) !== 'undefined') {
        if (typeof(Annomatic.ann.byNum[$scope.num].entities) !== 'undefined') {
            $scope.entities = Annomatic.ann.byNum[$scope.num].entities;
            $scope.isMultiEntites = true;
            $scope.multiLength = $scope.entities.length;
        }
    }

    // Automatically open the details on popover open?
    $scope.showDetails = true;

    // Number of times this same suggestion occurs among all the suggestions.
    // Will be used to show the button to accept all of them at once
    $scope.instances = $scope.ann.byId[$scope.ann.byNum[$scope.num].id].length;

    $scope.hide = function(event) {
        $scope.$hide();
        Annomatic.setLastState($scope.num);
        event.stopPropagation();
        event.preventDefault();

        // TODO: temporary fix: use AnnotationPopover and check why this function is not used
        PndPopover.hide();
    };

    $scope.setOk = function(event) {
        MyPundit.login().then(function(logged) {
            if (logged) {
                $scope.$hide();

                if ($scope.ann.savedByNum.indexOf($scope.num) === -1) {
                    if ($scope.isMultiEntites) {
                        Annomatic.save($scope.num, $scope.currentEntity);
                    } else {
                        Annomatic.save($scope.num);
                    }
                } else {
                    Annomatic.setState($scope.num, 'accepted');
                }

            }
        });

        event.stopPropagation();
        event.preventDefault();
    };

    $scope.setKo = function() {
        $scope.$hide();
        Annomatic.setState($scope.num, 'removed');
        Annomatic.reviewNext($scope.num + 1);
    };

    $scope.goNext = function(event) {
        $scope.$hide();
        //  angular.element('.pnd-range-pos-icon').removeClass("pnd-range-pos-icon");
        Annomatic.setLastState($scope.num);
        Annomatic.reviewNext($scope.num + 1);
        event.stopPropagation();
        event.preventDefault();
    };

    $scope.popoverClick = function(event) {
        event.stopPropagation();
        event.preventDefault();
    };

    $scope.toggleSimilar = function() {
        var ann = $scope.ann.byNum[$scope.num],
            id = ann.id,
            similar = $scope.ann.byId[id];

        // Skipping num so we dont toggle the state of the current
        // automatic annotation
        for (var i = similar.length; i--;) {
            if (similar[i] !== $scope.num) {
                var similarAnn = Annomatic.ann.byNum[similar[i]];
                if (similarAnn.state !== "active") {
                    Annomatic.setState(similar[i], 'active');
                } else {
                    Annomatic.setLastState(similar[i]);
                }
            }
        }
    };

    $scope.changeEntity = function() {
        if ($scope.currentEntity < $scope.multiLength - 1) {
            $scope.currentEntity++;
        } else {
            $scope.currentEntity = 0;
        }
    };

});