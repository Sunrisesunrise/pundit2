angular.module('Pundit2.AnnotationSidebar')

.controller('AnnotationSidebarCtrl', function($scope, $filter, $document, $window, $timeout, $injector,
    EventDispatcher, AnnotationSidebar, AnnotationsExchange, ItemsExchange, TextFragmentAnnotator,
    Config, Analytics, Status) {

    var clientMode = Config.clientMode,
        Dashboard = clientMode === 'pro' ? $injector.get('Dashboard') : undefined;

    var bodyClasses = AnnotationSidebar.options.bodyExpandedClass + ' ' + AnnotationSidebar.options.bodyCollapsedClass,
        sidebarClasses = AnnotationSidebar.options.sidebarExpandedClass + ' ' + AnnotationSidebar.options.sidebarCollapsedClass;

    var html = angular.element('html');
        body = angular.element('body'),
        container = angular.element('.pnd-annotation-sidebar-container'),
        header = angular.element('.pnd-annotation-sidebar-header');
    // var content = angular.element('.pnd-annotation-sidebar-content');

    var toolbarHeight = clientMode === 'pro' ? parseInt(angular.element('toolbar nav').css('height'), 10) : 0;

    var state = {
        toolbarHeight: toolbarHeight,
        newMarginTopSidebar: 0,
        sidebarCurrentHeight: 0,
        sidebarNewHeight: 0
    };

    var search = {
        iconMagnifier: AnnotationSidebar.options.inputIconSearch,
        iconFilter: AnnotationSidebar.options.inputIconFilter,
        clean: AnnotationSidebar.options.inputIconClear
    };

    var minDateWatch,
        maxDateWatch;

    var updateHitsTimer,
        annotationsCache = [],
        preventDelay = AnnotationSidebar.options.preventDelay ? true : false,
        myItemsPrevent = false;

    var annotationsQueques = {
        saveAnnotation: [],
        editAnnotation: [],
        deleteAnnotation: []
    };

    $scope.annotationSidebar = AnnotationSidebar;
    $scope.filters = AnnotationSidebar.getAnnotationsFilters();
    $scope.isAnnomaticActive = AnnotationSidebar.isAnnomaticActive();
    $scope.isAnnotationSidebarExpanded = AnnotationSidebar.options.isAnnotationSidebarExpanded;
    $scope.isLoadingData = false;
    $scope.isLoading = false;
    $scope.consolidationInProgress = false;

    $scope.annotations = {};

    $scope.filterTypeExpanded = '';

    $scope.fromMinDate = new Date();
    $scope.toMinDate = new Date();
    $scope.fromMaxDate = new Date();
    $scope.fromToDate = new Date();

    $scope.proMode = clientMode === 'pro';

    body.css('position', 'static');
    container.css('height', body.innerHeight() + 'px');
    container.css('margin-top', state.newMarginTopSidebar + 'px');
    header.css('top', state.newMarginTopSidebar + 'px');

    // Start reading the default
    if (AnnotationSidebar.options.isAnnotationSidebarExpanded) {
        html.addClass(AnnotationSidebar.options.bodyExpandedClass);
        body.addClass(AnnotationSidebar.options.bodyExpandedClass);
        container.addClass(AnnotationSidebar.options.sidebarExpandedClass);
    } else {
        html.addClass(AnnotationSidebar.options.bodyCollapsedClass);
        body.addClass(AnnotationSidebar.options.bodyCollapsedClass);
        container.addClass(AnnotationSidebar.options.sidebarCollapsedClass);
    }

    var activateFragments = function(items) {
        angular.forEach(items, function(item) {
            TextFragmentAnnotator.showByUri(item.uri);
        });
    };

    var activateAnnotationsFragments = function(annotations) {
        angular.forEach(annotations, function(annotation) {
            activateFragments(annotation.items);
        });
    };

    var addAnnotation = function(annotation) {
        $scope.annotations[annotation.id] = annotation;
    };

    var addAnnotations = function(showProgress) {
        $timeout.cancel(updateHitsTimer);
        showProgress = typeof showProgress !== 'undefined' ? showProgress : false;

        if (annotationsCache.length === 0) {
            return;
        }

        var currentHits = 0,
            maxHits = AnnotationSidebar.options.maxHits,
            delay = AnnotationSidebar.options.bufferDelay;

        var doAdd = function() {
            while (currentHits < maxHits && annotationsCache.length !== 0) {
                var currentAnnotation = annotationsCache.shift();
                addAnnotation(currentAnnotation);
                activateFragments(currentAnnotation.items);
                currentHits++;
            }
            if (showProgress) {
                var percVal = 100 * ($scope.allAnnotationsLength - annotationsCache.length) / $scope.allAnnotationsLength;
                Status.hitProgress(3, percVal);
            }
            addAnnotations(showProgress);
        };

        if (preventDelay || myItemsPrevent) {
            doAdd();
        } else {
            updateHitsTimer = $timeout(function() {
                doAdd();
            }, delay);
        }

        myItemsPrevent = false;
    };

    var removeAnnotation = function(annotation) {
        if (typeof annotation === 'undefined') {
            return;
        }

        var annotationId = annotation.id;
        if (typeof $scope.annotations[annotationId] !== 'undefined') {
            delete $scope.annotations[annotationId];
        }
    };

    var removeAnnotations = function(filteredAnnotations) {
        angular.forEach($scope.annotations, function(annotation) {
            if (typeof filteredAnnotations[annotation.id] === 'undefined') {
                removeAnnotation(annotation);
            }
        });
    };

    // Annotation sidebar height
    var resizeSidebarHeight = function() {
        var minHeightSidebar = AnnotationSidebar.minHeightRequired;
        var bodyHeight = body.innerHeight();
        var documentHeight = $document.innerHeight();
        var difference;

        // TODO: save old documentHeight and reset the view
        state.sidebarNewHeight = Math.max(bodyHeight, documentHeight, minHeightSidebar);
        state.sidebarCurrentHeight = container.innerHeight();

        if (clientMode === 'pro' && Dashboard.isDashboardVisible()) {
            difference = state.toolbarHeight + Dashboard.getContainerHeight();
        } else {
            difference = state.toolbarHeight;
        }

        state.sidebarNewHeight = state.sidebarNewHeight - difference;

        if (state.sidebarNewHeight !== state.sidebarCurrentHeight) {
            container.css('height', state.sidebarNewHeight + 'px');
        }
    };

    // Temp fix for bs-datepicker issues min value
    var setMin = function(currentMin) {
        var newMinDate = new Date((currentMin && !isNaN(Date.parse(currentMin))) ? Date.parse(currentMin) : 0);
        newMinDate.setDate(newMinDate.getDate() - 1);

        return $filter('date')(newMinDate, 'yyyy-MM-dd');
    };

    var updateMinDate = function(minDate) {
        if (typeof(minDate) !== 'undefined') {
            var newMinDate = $filter('date')(minDate, 'yyyy-MM-dd');
            $scope.fromMinDate = setMin(newMinDate);
            if (AnnotationSidebar.filters.fromDate.expression === '') {
                $scope.toMinDate = setMin(newMinDate);
            }
        }
    };

    var updateMaxDate = function(maxDate) {
        if (typeof(maxDate) !== 'undefined') {
            var newMaxDate = $filter('date')(maxDate, 'yyyy-MM-dd');
            $scope.toMaxDate = newMaxDate;
            if (AnnotationSidebar.filters.toDate.expression === '') {
                $scope.fromMaxDate = newMaxDate;
            }
        }
    };

    $scope.isSuggestionsPanelActive = function() {
        return AnnotationSidebar.isSuggestionsPanelActive();
    };

    $scope.activateSuggestionsPanel = function() {
        AnnotationSidebar.activateSuggestionsPanel();
    };

    $scope.isAnnotationsPanelActive = function() {
        return AnnotationSidebar.isAnnotationsPanelActive();
    };

    $scope.activateAnnotationsPanel = function() {
        AnnotationSidebar.activateAnnotationsPanel();
    };

    $scope.updateSearch = function(freeText) {
        AnnotationSidebar.filters.freeText.expression = freeText;
        Analytics.track('main-events', 'generic', 'use-filter', 'freeText:' + freeText);
    };

    $scope.updateDate = function(date, fromTo) {
        var currentDate;
        if (typeof(date) !== 'undefined' && date !== null) {
            currentDate = date;
        } else {
            currentDate = fromTo === 'from' ? $scope.fromMinDate : $scope.toMaxDate;
        }

        if (fromTo === 'from') {
            $scope.toMinDate = setMin(currentDate);
        } else if (fromTo === 'to') {
            $scope.fromMaxDate = currentDate;
        }
    };

    $scope.isFilterLabelShowed = function(currentInputText) {
        if (typeof(currentInputText) === 'string') {
            return currentInputText.length > 0;
        }
    };

    $scope.toggleFilterList = function(event, filterType) {
        var pndFilterShowClass = 'pnd-annotation-sidebar-filter-show';
        var previousElement = angular.element('.' + pndFilterShowClass);
        var currentElement = angular.element(event.target.parentElement.parentElement);

        $scope.searchAuthors = '';
        $scope.searchNotebooks = '';
        $scope.searchTypes = '';
        $scope.searchPredicates = '';
        $scope.searchEntities = '';

        // Close all filter list and toggle the current
        previousElement.not(currentElement).removeClass(pndFilterShowClass);
        currentElement.toggleClass(pndFilterShowClass);

        if (currentElement.hasClass(pndFilterShowClass)) {
            $scope.filterTypeExpanded = filterType;

            if (filterType === 'date') {
                enableDateWatch();
            }
        } else {
            $scope.filterTypeExpanded = '';

            if (filterType === 'date') {
                disableDateWatch();
            }
        }

        // TODO this is not the right way to handle limit cases
        if (typeof filterType === 'undefined') {
            filterType = angular.element(event.target).text().trim();
        }
        Analytics.track('buttons', 'click', 'sidebar--filters--filtersPanel--' + filterType);
    };

    $scope.toggleFilter = function(currentFilter, currentUri) {
        var indexFilter = AnnotationSidebar.filters[currentFilter].expression.indexOf(currentUri);
        if (indexFilter === -1) {
            AnnotationSidebar.filters[currentFilter].expression.push(currentUri);
            AnnotationSidebar.toggleActiveFilter(currentFilter, currentUri);
            Analytics.track('main-events', 'generic', 'use-filter', currentFilter + ':' + currentUri);
        } else {
            AnnotationSidebar.filters[currentFilter].expression.splice(indexFilter, 1);
            AnnotationSidebar.toggleActiveFilter(currentFilter, currentUri);
            Analytics.track('main-events', 'generic', 'reset-filter', currentFilter + ':' + currentUri);
        }
    };

    $scope.toggleBrokenAnnotations = function() {
        var trackingFilterLabel = '';
        if (AnnotationSidebar.filters.broken.expression === '') {
            AnnotationSidebar.filters.broken.expression = 'hideBroken';
            trackingFilterLabel = 'hideBroken';
        } else {
            AnnotationSidebar.filters.broken.expression = '';
            trackingFilterLabel = 'showBroken';
        }
        Analytics.track('buttons', 'click', 'sidebar--filters--filtersPanel--' + trackingFilterLabel);
    };

    $scope.setSearchIcon = function(str) {
        if (typeof(str) === 'undefined' || str === '') {
            return search.iconMagnifier;
        } else {
            return search.clean;
        }
    };

    $scope.setFilterIcon = function(str) {
        if (typeof(str) === 'undefined' || str === '') {
            return search.iconFilter;
        } else {
            return search.clean;
        }
    };

    // Watch annotations
    $scope.$watch(function() {
        return AnnotationSidebar.getAllAnnotations();
    }, function(currentAnnotations) {
        var currentAnnotationId, currentAnnotation, annotations, annotationsKey;
        var oldLength, newLength;
        var annotationsByPosition = AnnotationSidebar.getAllAnnotationsPositioned();

        $scope.consolidationInProgress = false;

        if (AnnotationSidebar.needToFilter()) {
            annotations = AnnotationSidebar.getAllAnnotationsFiltered();
        } else {
            annotations = currentAnnotations;
            activateFragments(ItemsExchange.getItemsByContainer(Config.modules.MyItems.container));
        }

        annotationsKey = Object.keys(annotations);
        $scope.annotationsLength = annotationsKey.length;

        var updateAllAnnotations = function() {
            removeAnnotations(annotations);

            angular.forEach(annotationsByPosition, function(annotation) {
                if (typeof annotations[annotation.id] !== 'undefined') {
                    annotationsCache.push(annotation);
                }
            });

            addAnnotations(true);
        };

        var updateAnnotationsByQueque = function(queque, updateOrDelete) {
            for (var i in queque) {
                currentAnnotationId = queque[i];

                if (updateOrDelete === 'deleteAnnotation') {
                    currentAnnotation = $scope.allAnnotations[currentAnnotationId];
                    removeAnnotation(currentAnnotation);
                } else if (updateOrDelete === 'updateAnnotation') {
                    currentAnnotation = AnnotationsExchange.getAnnotationById(currentAnnotationId);
                    addAnnotation(currentAnnotation);
                }

                EventDispatcher.sendEvent('AnnotationSidebar.' + updateOrDelete, currentAnnotationId); // updateAnnotation or deleteAnnotation
            }

            Status.hitProgress(3, 100);
            activateAnnotationsFragments(annotations);
        };

        // TODO: add some comments
        if (annotationsQueques.saveAnnotation.length > 0) {
            oldLength = $scope.allAnnotationsLength;
            newLength = annotationsByPosition.length;
            if (newLength !== oldLength + annotationsQueques.saveAnnotation.length) {
                updateAllAnnotations();
                EventDispatcher.sendEvent('AnnotationSidebar.updateAnnotation', annotationsQueques.saveAnnotation[0]);
            } else {
                updateAnnotationsByQueque(annotationsQueques.saveAnnotation, 'updateAnnotation');
            }
            annotationsQueques.saveAnnotation = [];
        } else if (annotationsQueques.editAnnotation.length > 0) {
            oldLength = $scope.allAnnotationsLength;
            newLength = annotationsByPosition.length;
            if (newLength !== oldLength) {
                updateAllAnnotations();
            } else {
                updateAnnotationsByQueque(annotationsQueques.editAnnotation, 'updateAnnotation');
            }
            annotationsQueques.editAnnotation = [];
        } else if (annotationsQueques.deleteAnnotation.length > 0) {
            oldLength = $scope.allAnnotationsLength;
            newLength = annotationsByPosition.length;
            if (newLength !== oldLength - annotationsQueques.deleteAnnotation.length) {
                updateAllAnnotations();
            } else {
                updateAnnotationsByQueque(annotationsQueques.deleteAnnotation, 'deleteAnnotation');
            }
            annotationsQueques.deleteAnnotation = [];
        } else {
            updateAllAnnotations();
        }

        $scope.allAnnotations = currentAnnotations;
        $scope.allAnnotationsLength = Object.keys($scope.allAnnotations).length;
    });

    if (clientMode === 'pro') {
        // Using JSON.strigify to avoid deep watch (, true) on AnnotationSidebar filters 
        $scope.$watch(function() {
            return JSON.stringify(AnnotationSidebar.filters);
        }, function() {
            if (AnnotationSidebar.filters.freeText.expression === '') {
                $scope.freeText = '';
            }
            if (AnnotationSidebar.filters.fromDate.expression === '' &&
                AnnotationSidebar.filters.toDate.expression === '') {
                updateMinDate(AnnotationSidebar.getMinDate());
                updateMaxDate(AnnotationSidebar.getMaxDate());
            }

            var annotations = AnnotationSidebar.getAllAnnotationsFiltered(),
                annotationsKey = Object.keys(annotations);

            removeAnnotations(annotations);
            annotationsCache = annotationsKey.map(function(k) {
                return annotations[k];
            });
            addAnnotations();

            $scope.annotationsLength = annotationsKey.length;

            if (AnnotationSidebar.needToFilter() === false) {
                activateFragments(ItemsExchange.getItemsByContainer(Config.modules.MyItems.container));
            }
        });

        // Watch dashboard height for top of sidebar
        $scope.$watch(function() {
            return Dashboard.getContainerHeight();
        }, function(dashboardHeight) {
            state.newMarginTopSidebar = state.toolbarHeight + dashboardHeight;
            container.css('margin-top', state.newMarginTopSidebar + 'px');
            header.css('top', state.newMarginTopSidebar + 'px');
        });
        $scope.$watch(function() {
            return Dashboard.isDashboardVisible();
        }, function(dashboardVisibility) {
            if (dashboardVisibility) {
                state.newMarginTopSidebar = state.toolbarHeight + Dashboard.getContainerHeight();
                container.css('margin-top', state.newMarginTopSidebar + 'px');
                header.css('top', state.newMarginTopSidebar + 'px');
            } else {
                container.css('margin-top', state.toolbarHeight + 'px');
                header.css('top', state.toolbarHeight + 'px');
            }
        });
    }

    $scope.$watch(function() {
        return AnnotationSidebar.minHeightRequired;
    }, function() {
        resizeSidebarHeight();
    });

    $scope.$watch(function() {
        return $document.innerHeight();
    }, function() {
        resizeSidebarHeight();
    });

    function enableDateWatch() {
        minDateWatch = $scope.$watch(function() {
            return AnnotationSidebar.getMinDate();
        }, function(minDate) {
            updateMinDate(minDate);
        });

        maxDateWatch = $scope.$watch(function() {
            return AnnotationSidebar.getMaxDate();
        }, function(maxDate) {
            updateMaxDate(maxDate);
        });
    }

    function disableDateWatch() {
        if (typeof minDateWatch === 'function') {
            minDateWatch();
            minDateWatch = undefined;
        }
        if (typeof maxDateWatch === 'function') {
            maxDateWatch();
            maxDateWatch = undefined;
        }
    }

    EventDispatcher.addListener('MyPundit.isUserLogged', function(e) {
        $scope.isAnnomaticActive = AnnotationSidebar.isAnnomaticActive();
    });

    EventDispatcher.addListener('Pundit.loading', function(e) {
        var currentState = e.args;
        if (currentState !== $scope.isLoadingData) {
            AnnotationSidebar.toggleLoading();
            $scope.isLoadingData = currentState;
        }
    });

    EventDispatcher.addListener('AnnotationSidebar.toggleLoading', function(e) {
        $scope.isLoading = e.args;
    });

    EventDispatcher.addListener('Consolidation.startConsolidate', function() {
        $scope.consolidationInProgress = true;
    });

    // Watch annotation sidebar expanded or collapsed
    EventDispatcher.addListener('AnnotationSidebar.toggle', function(e) {
        var currentState = e.args;
        if (currentState !== $scope.isAnnotationSidebarExpanded) {
            html.toggleClass(bodyClasses);
            body.toggleClass(bodyClasses);
            container.toggleClass(sidebarClasses);
            AnnotationSidebar.setAnnotationsPosition();
            $scope.isAnnotationSidebarExpanded = currentState;
        }
    });

    // Watch filters expanded or collapsed
    EventDispatcher.addListener('AnnotationSidebar.toggleFiltersContent', function(e) {
        $scope.isFiltersShowed = e.args;
    });

    EventDispatcher.addListeners(
        [
            'AnnotationsCommunication.saveAnnotation',
            'AnnotationsCommunication.editAnnotation',
            'AnnotationsCommunication.deleteAnnotation'
        ],
        function(e) {
            var eventType = e.name.split('.')[1],
                annotationId = e.args;

            annotationsQueques[eventType].push(annotationId);
            EventDispatcher.sendEvent('AnnotationSidebar.forceUpdate');
        }
    );

    EventDispatcher.addListeners(['MyItems.itemAdded', 'MyItems.itemRemoved'], function() {
        myItemsPrevent = true;
    });

    EventDispatcher.addListener('AnnotationDetails.wrongAnnotation', function(e) {
        var annotationId = e.args;
        delete $scope.annotations[annotationId];
        delete $scope.allAnnotations[annotationId];
        $scope.annotationsLength = Object.keys($scope.annotations).length;
        $scope.allAnnotationsLength = Object.keys($scope.allAnnotations).length;
    });

    EventDispatcher.addListener('Consolidation.newRequest', function() {
        $timeout.cancel(updateHitsTimer);
    });

    EventDispatcher.addListener('TextFragmentAnnotator.updateItems', function(e) {
        var updatedItems = e.args,
            updatedAnnotations = {};

        angular.forEach(updatedItems, function(itemUri) {
            var annList = AnnotationsExchange.getAnnotationsByItem(itemUri);
            for (var i in annList) {
                updatedAnnotations[annList[i].id] = annList[i];
            }
        });

        angular.forEach(updatedAnnotations, function(annotation) {
            if (typeof $scope.annotations[annotation.id] !== 'undefined') {
                activateFragments(annotation.items);
            }
        });
    });

    angular.element($window).bind('resize', function() {
        resizeSidebarHeight();
    });

    AnnotationSidebar.log('Controller Run');
});