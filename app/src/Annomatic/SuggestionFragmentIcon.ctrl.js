angular.module('Pundit2.Annomatic')

.controller('SuggestionFragmentIconCtrl', function($scope,  $element, $rootScope,
    TextFragmentAnnotator, XpointersHelper, Annomatic, AnnotationPopover, Item) {

    var createItemFromElement = function(elem) {
        var values = {};

        values.uri = elem.attr('fragment');
        values.cMenuType = "SuggestionFragmentIconItem";
        values.label =  elem.parent().text().trim();
      //  values.type = values.type = [NameSp]; // TODO to be defined
        values.icon = true;
        values.pageContext = XpointersHelper.getSafePageContext();
        values.elem = elem;
        return new Item(values.uri, values);
    };
    // Common for all icons
    $scope.textFragmentIconClass = XpointersHelper.options.textFragmentIconClass;

    // For suggestions fragments
    $scope.iconClass = TextFragmentAnnotator.options.suggestionIconClass;
    // Element 'a' has href
    if(typeof $element.parent().attr('href') !== 'undefined') {
        //unwrap node a
        angular.element($element).unwrap();
    }
    // Will use the icon to calculate this fragment height with respect to
    // the document
    $scope.element = $element;

    // Add this icon to the FragmentAnnotator, he will supply this $scope with
    // the .item we belong to
    TextFragmentAnnotator.addFragmentIcon($scope);

    // Let's initialize the popover, tell annomatic we exist etc..
    //var init = function() {
    //    $scope.uri = $scope.item.uri;
    //    $scope.num = Annomatic.ann.uriToNumMap[$scope.uri];
    //
    //    // Add this $scope to annomatic, so he can call our methods
    //    Annomatic.ann.autoAnnScopes[$scope.num] = $scope;
    //
    //    // Add 'ann-auto' class to every bit belonging to this fragment
    //    // TODO: make 'ann-auto' configurable? .options?
    //    angular.element('.' + $scope.fragment).addClass('ann-auto');
    //
    //    var options = {
    //        content: "" + $scope.num,
    //        placement: 'bottom',
    //        templateUrl: 'src/Annomatic/AnnomaticPopover.tmpl.html',
    //        trigger: 'manual'
    //            //scope: $rootScope.$new(),
    //            //container: "[data-ng-app='Pundit2']"
    //    };
    //
    //    $scope.popover = $popover(
    //        $scope.element,
    //        options
    //    );
    //
    //};
    //init();

    // TODO: move this to its own controller?
    $scope.mouseoverHandler = function() {
        TextFragmentAnnotator.highlightById($scope.fragment);
    };

    $scope.mouseoutHandler = function() {
        TextFragmentAnnotator.clearHighlightById($scope.fragment);
    };

    $scope.clickHandler = function(event) {
        //if (Annomatic.ann.byNum[$scope.num].hidden) {
        //    return;
        //}
        //
        //if (!$scope.popover.$isShown) {
        //    $scope.show();
        //} else {
        //    $scope.hide();
        //}
        //
        //event.stopPropagation();
        //event.preventDefault();
        $scope.uri = $scope.item.uri;
        $scope.num = Annomatic.ann.uriToNumMap[$scope.uri];

        // Add this $scope to annomatic, so he can call our methods
        Annomatic.ann.autoAnnScopes[$scope.num] = $scope;

        // Add 'ann-auto' class to every bit belonging to this fragment
        // TODO: make 'ann-auto' configurable? .options?
        angular.element('.' + $scope.fragment).addClass('ann-auto');

        var options = {
            content: "" + $scope.num,
            placement: 'bottom',
            templateUrl: 'src/Annomatic/AnnomaticPopover.tmpl.html',
            trigger: 'manual',
            placement: 'bottom',
            alphaRollover: true,
            lockPageScroll: true
        };
        var item = createItemFromElement($scope.element);
        var pos =$scope.element[0].getBoundingClientRect();
        $scope.element.addClass('pnd-range-pos-icon');

        AnnotationPopover.show(pos.left, pos.top, item , options);


    };

    $scope.show = function() {
        if ($scope.popover.$isShown === true) {
            return;
        }
        Annomatic.closeAll();
        Annomatic.setState($scope.num, 'active');
        $scope.popover.show();
    };

    $scope.hide = function() {
        if ($scope.popover.$isShown === false) {
            return;
        }
        Annomatic.setLastState($scope.num);
        $scope.popover.hide();
    };

    $scope.setStateClass = function(from, to) {
        // TODO: removing ann-active too, since it's volatile, used on mouseover
        // .. better store it in the ann.state directly and have the setStateClass
        // remove it directly?

        var element = angular.element('.' + $scope.fragment);

        // Set the state class on every bit belonging to this fragment
        element.removeClass(from + ' ann-active');
        element.addClass(to);

        if (from === Annomatic.stateClassMap.hidden) {
            element.removeClass('ann-hidden');
        } else if (to === Annomatic.stateClassMap.hidden) {
            element.addClass('ann-hidden');

        }

    };

    $scope.setStateClass('', Annomatic.stateClassMap.waiting);

});