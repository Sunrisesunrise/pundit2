angular.module('Pundit2.Preview')

.controller('PreviewCtrl', function($scope, Preview, TypesHelper, $window, MyPundit, Config, Analytics) {

    $scope.itemDashboardPreview = null;
    $scope.homePundit = Config.homePundit;

    // getter function used to build hierarchystring.
    // hierarchystring is used for tracking events with analytics.
    var getHierarchyString = function() {
        // Temporary solution to find hierarchystring.
        var eventLabel = "";
        var myScope = $scope;
        do {
            if (typeof(myScope) === 'undefined' || myScope === null) {
                break;
            }
            if (myScope.hasOwnProperty('pane')) {
                if (myScope.pane.hasOwnProperty('hierarchystring')) {
                    eventLabel = myScope.pane.hierarchystring;
                }
                break;
            }
            myScope = myScope.$parent;
        }
        while (typeof(myScope) !== 'undefined' && myScope !== null);

        return eventLabel;
    };

    $scope.getWelcomeHeaderMessage = function() {
        return Preview.getWelcomeHeaderMessage();
    };

    $scope.getWelcomeBodyMessage = function() {
        return Preview.getWelcomeBodyMessage();
    };

    // return true if dashboard preview is empty
    $scope.isItemEmpty = function() {
        return $scope.itemDashboardPreview === null;
    };

    $scope.isUser = function() {
        if (MyPundit.isUserLogged() === false) {
            return false;
        }

        var userData = MyPundit.getUserData(),
            userUri = userData.uri;

        return $scope.itemDashboardPreview.creator === userUri;
    };

    // return true if dashboard preview is empty
    $scope.isNotebook = function() {
        // console.log(MyPundit.getUserData());
        // TODO: Use namespace
        if ($scope.itemDashboardPreview !== null && 
                $scope.itemDashboardPreview.type[0] === "http://purl.org/pundit/ont/ao#Notebook" 
                ) {
            return true;
        } else {
            return false;
        }

    };

    // return true if no item is sticky
    $scope.isStickyItemEmpty = function() {
        return Preview.getItemDashboardSticky() === null;
    };

    // return true if current item in preview panel is the sticky item
    $scope.isStickyItem = function() {
        return Preview.isStickyItem();
    };

    $scope.clearSticky = function() {
        Preview.clearItemDashboardSticky();

        var eventLabel = getHierarchyString();
        eventLabel += "--clear";
        Analytics.track('buttons', 'click', eventLabel);
    };

    // get label of a type from his uri
    $scope.getLabelType = function(uri) {
        //var labelType = TypesHelper.getLabel(uri);
        return TypesHelper.getLabel(uri);
    };

    // open item url in a new window when click on More Info button in a preview
    $scope.openUrl = function(url) {
        $window.open(url);

        var eventLabel = getHierarchyString();
        eventLabel += "--moreInfo";
        Analytics.track('buttons', 'click', eventLabel);
    };

    $scope.openNotebookUrl = function(id) {
        var url = Config.homeBaseURL + '/annotations/' + id;
        $window.open(url);

        var eventLabel = getHierarchyString();
        eventLabel += "--moreInfo";
        Analytics.track('buttons', 'click', eventLabel);
    };

    $scope.getItemIcon = function() {
        if (!$scope.isItemEmpty()) {
            return $scope.itemDashboardPreview.getIcon();
        }
    };

    $scope.getItemClass = function() {
        if (!$scope.isItemEmpty()) {
            return $scope.itemDashboardPreview.getClass();
        }
    };

    // check where a new item is selected to get a preview
    $scope.$watch(function() {
        return Preview.getItemDashboardPreview();
    }, function(newItem) {

        $scope.itemDashboardPreview = newItem;
        // check if item has an image to show
        if (newItem === null) {

            $scope.hasImage = false;
            $scope.itemIsAnImage = false;

        } else {
            if (TypesHelper.getLabel(newItem.type[0]) === 'Notebook') {
                $scope.hasImage = false;
                $scope.itemIsAnImage = false;
            } else {
                $scope.hasImage = (typeof(newItem.image) !== 'undefined');
                $scope.itemIsAnImage = $scope.itemDashboardPreview.isImage() || $scope.itemDashboardPreview.isImageFragment();
            }


        }
    });
});