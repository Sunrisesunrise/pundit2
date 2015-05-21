angular.module('Pundit2.ResourcePanel')

.controller('ResourcePanelCtrl', function($rootScope, $scope, $timeout, $filter, $window,
    Client, Config, ItemsExchange, MyItems, MyPundit, PageItemsContainer, Preview,
    ResourcePanel, SelectorsManager, KorboCommunicationService, EventDispatcher, Analytics, PageHandler, TripleComposer) {

    var actualContainer;
    var selectors = SelectorsManager.getActiveSelectors();
    var searchTimer;

    $scope.label = '';

    $scope.moduleName = 'Pundit2';
    $scope.subjectIcon = ResourcePanel.options.inputIconSearch;
    $scope.itemSelected = null;
    $scope.isUseActive = false;
    $scope.contentTabs.activeTab = 0;

    // Properties and method to customize template (Pundit/KorboEE)
    $scope.showFilteredResults = true;
    $scope.showHeader = true;
    $scope.showVerticalTabFooterContent = true;
    $scope.showContentMessage1 = false;
    $scope.showContentMessage4 = false;
    $scope.showContentMessage5 = true;
    $scope.showContentMessage6 = true;
    $scope.useCustomTemplate = false;
    $scope.canShowPaneList = function(title) {
        return title !== 'My items' || (title === 'My items' && $scope.userLoggedIn);
    };

    // build tabs by reading active selectors inside selectors manager
    if ($scope.type !== 'pr') {
        for (var j = 0; j < selectors.length; j++) {
            $scope.contentTabs.push({
                title: selectors[j].config.label,
                template: 'src/Lists/itemList.tmpl.html',
                itemsContainer: selectors[j].config.container,
                items: [],
                module: 'Pundit2',
                isStarted: false,
                selector: selectors[j]
            });
        }
    }

    // TODO: global window resize management
    var onWindowResize = function() {
        ResourcePanel.updatePosition();
    };
    angular.element($window).resize(onWindowResize);

    // TODO: really useful?
    var removeSpace = function(str) {
        return str.replace(/ /g, '');
    };

    var resetSelection = function() {
        $scope.isUseActive = false;
        $scope.itemSelected = null;
    };

    // getter function used inside template to order items
    // return the items property value used to order
    $scope.getOrderProperty = function(item) {
        return removeSpace(item.label);
    };

    $scope.isSelected = function(item) {
        if ($scope.itemSelected !== null && $scope.itemSelected.uri === item.uri) {
            return true;
        } else {
            return false;
        }
    };

    $scope.select = function(item) {
        Preview.setItemDashboardSticky(item);
        EventDispatcher.sendEvent('Pundit.changeSelection');
        $scope.isUseActive = true;
        $scope.itemSelected = item;
    };

    $scope.showUseAndCopyButton = function() {
        var currTab = $scope.contentTabs[$scope.contentTabs.activeTab].title;
        var res = false;
        //if(Config.korbo.active && (currTab !== 'KorboBasket' && currTab !== 'Page Items' && currTab !== 'My Items')){
        if (Config.korbo.active && currTab === 'Freebase') {
            res = true;
        }
        if (typeof ResourcePanel.overrideFooterExtraButtons !== 'undefined' &&
        typeof ResourcePanel.overrideFooterExtraButtons.showUseAndCopy !== 'undefined' ) {
            res &= ResourcePanel.overrideFooterExtraButtons.showUseAndCopy;
        }
        return res;
    };

    $scope.showNewButton = function() {
        var res = false;
        if (typeof(Config.korbo) !== 'undefined' && Config.korbo.active && $scope.type !== 'pr') {
            res = true;
        }
        if (typeof ResourcePanel.overrideFooterExtraButtons !== 'undefined' &&
            typeof ResourcePanel.overrideFooterExtraButtons.showNewButton !== 'undefined' ) {
            res &= ResourcePanel.overrideFooterExtraButtons.showNewButton;
        }
        return res;
    };

    $scope.createNew = function() {
        var name = $window[Config.korbo.confName].globalObjectName;
        $window[name].callOpenNew();
    };

    $scope.useAndCopy = function(elem) {
        var name = $window[Config.korbo.confName].globalObjectName;
        $window[name].callCopyAndUse(elem);
    };

    $scope.showCopyInEditorButton = function() {
        var currTab = $scope.contentTabs[$scope.contentTabs.activeTab].title;
        //if(Config.korbo.active && (currTab !== 'KorboBasket' && currTab !== 'Page Items' && currTab !== 'My Items')){
        var res = false;
        if (Config.korbo.active && currTab === 'Freebase') {
            res = true;
        }
        if (typeof ResourcePanel.overrideFooterExtraButtons !== 'undefined' &&
            typeof ResourcePanel.overrideFooterExtraButtons.showCopyInEditorButton !== 'undefined' ) {
            res &= ResourcePanel.overrideFooterExtraButtons.showCopyInEditorButton;
        }
        return res;
    };

    $scope.showUseFullPageButton = function() {
        var res = true;

        var item = PageHandler.createItemFromPage();
        switch ($scope.type) {
            case 'sub':
                res = TripleComposer.canAddItemAsSubject(item);
                break;
            case 'pr':
                return false;
            case 'obj':
                res = TripleComposer.canAddItemAsObject(item);
                break;
        }

        if (typeof ResourcePanel.overrideFooterExtraButtons !== 'undefined' &&
        typeof ResourcePanel.overrideFooterExtraButtons.showUseFullPageButton !== 'undefined' ) {
            res &= ResourcePanel.overrideFooterExtraButtons.showUseFullPageButton;
        }

        return res;
    };

    $scope.useFullPage = function() {
        var item = PageHandler.createItemFromPage();
        $scope.select(item);
        $scope.save(item);
    };

    $scope.copyInEditor = function() {
        var obj = {};
        //TODO costruisce l'id di freebase, cambiare metodo nel caso vengano gestiti più provider
        obj.uri = "__m__" + $scope.itemSelected.uri.substring($scope.itemSelected.uri.lastIndexOf('/') + 1);
        obj.providerFrom = 'freebase';

        KorboCommunicationService.setEntityToCopy(obj);

        var name = $window[Config.korbo.confName].globalObjectName;
        $window[name].callOpenNew();
    };

    $scope.updateSearch = function(term) {
        var caller = '';
        if (typeof(term) !== 'undefined' && term.length > 2) {
            switch ($scope.type) {
                case 'sub':
                    caller = 'subject';
                    break;
                case 'pr':
                    caller = 'predicate';
                    break;
                case 'obj':
                    caller = 'object';
                    break;
            }
            if (caller !== 'pr' && caller !== '') {
                $timeout.cancel(searchTimer);
                searchTimer = $timeout(function() {
                    if (Config.annotationServerCallsNeedLoggedUser) {
                        MyPundit.checkLoggedIn().then(function (isLoggedIn) {
                            if (isLoggedIn) {
                                ResourcePanel.updateVocabSearch(term, $scope.triple, caller);
                            }
                            else {
                                EventDispatcher.sendEvent('MyPundit.userNeedToLogin');
                            }
                        });
                    }
                    else {
                        ResourcePanel.updateVocabSearch(term, $scope.triple, caller);
                    }
                }, ResourcePanel.options.vocabSearchTimer);
            }
        } else {
            $timeout.cancel(searchTimer);
            // TODO: add specific method in ResourcePanel to reset search
            if (Config.annotationServerCallsNeedLoggedUser) {
                MyPundit.checkLoggedIn().then(function (isLoggedIn) {
                    if (isLoggedIn) {
                        ResourcePanel.updateVocabSearch('', $scope.triple, caller);
                    }
                    else {
                        EventDispatcher.sendEvent('MyPundit.userNeedToLogin');
                    }
                });
            }
            else {
                ResourcePanel.updateVocabSearch('', $scope.triple, caller);
            }
        }
    };

    $scope.escapeEvent = function(e) {
        if (e.which === 27) {
            e.stopPropagation();
        }
    };

    // TODO: why?!
    $scope.$watch(function() {
        return $scope.contentTabs.activeTab;
    }, function(newActive, oldActive) {
        if (newActive !== oldActive) {
            var labTemp = $scope.label ? $scope.label : '';
            actualContainer = $scope.contentTabs[$scope.contentTabs.activeTab].itemsContainer + labTemp.split(' ').join('$');
            $scope.showUseAndCopyButton();

            var panelTitle = $scope.contentTabs[$scope.contentTabs.activeTab].title;
            Analytics.track('buttons', 'click', 'resourcePanel--' + panelTitle);
        }
    });

    $rootScope.$watch(function() {
        return MyPundit.isUserLogged();
    }, function(newStatus) {
        $scope.userLoggedIn = newStatus;
    });

    // TODO: remove from ctrl and find a better way to reset the selection
    EventDispatcher.addListener('Pundit.changeSelection', function() {
        resetSelection();
    });

    //function colled on list scroll
    $scope.infiniteScroll = function(pane, label){

        //if pane is already loading data we return
        if(pane.isLoading){
            return;
        }

        //if there are no remote items count we return
        if (typeof(pane.remoteItemCount) === 'undefined' || pane.remoteItemCount==0) {
            return;
        } else {
            //if we have downloaded all items we return
            if(pane.items.length == pane.remoteItemCount){
                return;
            }
        }
        var caller = '';
        var selectors = [pane.selector];
        var offset = pane.items.length;
        switch ($scope.type) {
            case 'sub':
                caller = 'subject';
                break;
            case 'pr':
                caller = 'predicate';
                break;
            case 'obj':
                caller = 'object';
                break;
        }
        if (caller !== 'pr' && caller !== '') {
            $timeout.cancel(searchTimer);
            searchTimer = $timeout(function() {
                if (Config.annotationServerCallsNeedLoggedUser) {
                    MyPundit.checkLoggedIn().then(function (isLoggedIn) {
                        if (isLoggedIn) {
                            ResourcePanel.addItems(label, selectors, $scope.triple, caller, offset);
                        }
                        else {
                            EventDispatcher.sendEvent('MyPundit.userNeedToLogin');
                        }
                    });
                }
                else {
                    ResourcePanel.addItems(label, selectors, $scope.triple, caller, offset);
                }
            }, ResourcePanel.options.vocabSearchTimer);
        }

    }

});