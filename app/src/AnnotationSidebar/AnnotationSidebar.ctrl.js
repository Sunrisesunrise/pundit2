angular.module('Pundit2.AnnotationSidebar')

.controller('AnnotationSidebarCtrl', function($scope, $filter, $document, $window, $timeout,
    EventDispatcher, AnnotationSidebar, AnnotationsExchange, ItemsExchange, Dashboard,
    Config, Analytics, TextFragmentAnnotator, Status) {

    var bodyClasses = AnnotationSidebar.options.bodyExpandedClass + ' ' + AnnotationSidebar.options.bodyCollapsedClass;
    var sidebarClasses = AnnotationSidebar.options.sidebarExpandedClass + ' ' + AnnotationSidebar.options.sidebarCollapsedClass;

    // var html = angular.element('html');
    var body = angular.element('body');
    var container = angular.element('.pnd-annotation-sidebar-container');
    var header = angular.element('.pnd-annotation-sidebar-header');
    // var content = angular.element('.pnd-annotation-sidebar-content');

    var toolbarHeight = parseInt(angular.element('toolbar nav').css('height'), 10);

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

    var savedOrEditedAnnotationQueque = [],
        deletedIdQueue = [];

    $scope.annotationSidebar = AnnotationSidebar;
    $scope.filters = AnnotationSidebar.getAnnotationsFilters();
    $scope.isAnnomaticActive = Config.isModuleActive('Annomatic');
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

    body.css('position', 'static');
    container.css('height', body.innerHeight() + 'px');

    // Start reading the default
    if (AnnotationSidebar.options.isAnnotationSidebarExpanded) {
        body.addClass(AnnotationSidebar.options.bodyExpandedClass);
        container.addClass(AnnotationSidebar.options.sidebarExpandedClass);
    } else {
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

    var removeAnnotation = function(annotationId) {
        if (typeof $scope.annotations[annotationId] !== 'undefined') {
            delete $scope.annotations[annotationId];
        }
    };

    var removeAnnotations = function(filteredAnnotations) {
        angular.forEach($scope.annotations, function(annotation) {
            if (typeof filteredAnnotations[annotation.id] === 'undefined') {
                removeAnnotation(annotation.id);
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

        if (Dashboard.isDashboardVisible()) {
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
        } else {
            AnnotationSidebar.filters[currentFilter].expression.splice(indexFilter, 1);
            AnnotationSidebar.toggleActiveFilter(currentFilter, currentUri);
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
        var currentAnnotation, currentId, annotations, annotationsKey;
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

        if (savedOrEditedAnnotationQueque.length > 0) {
            for (var i in savedOrEditedAnnotationQueque) {
                currentAnnotation = savedOrEditedAnnotationQueque[i];
                currentId = currentAnnotation.id;
                if (typeof annotations[currentId] !== 'undefined') {
                    addAnnotation(currentAnnotation);
                }
                EventDispatcher.sendEvent('AnnotationSidebar.updateAnnotation', currentId);
            }
            savedOrEditedAnnotationQueque = [];
            Status.hitProgress(3, 100);
            activateAnnotationsFragments(annotations);
        } else if (deletedIdQueue.length > 0) {
            // TODO: avoid in communication the download of all annotations when one is deleted
            removeAnnotations(annotations);
            angular.forEach(annotations, function(annotation) {
                addAnnotation(annotation);
            });

            for (var j in deletedIdQueue) {
                removeAnnotation(deletedIdQueue[j]);
            }
            deletedIdQueue = [];
            Status.hitProgress(3, 100);
            activateAnnotationsFragments(annotations);
        } else {
            removeAnnotations(annotations);

            angular.forEach(annotationsByPosition, function(annotation) {
                if (typeof annotations[annotation.id] !== 'undefined') {
                    annotationsCache.push(annotation);
                }
            });

            addAnnotations(true);
        }

        $scope.allAnnotations = currentAnnotations;
        $scope.allAnnotationsLength = Object.keys($scope.allAnnotations).length;
    });

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

    EventDispatcher.addListeners(['AnnotationsCommunication.saveAnnotation', 'AnnotationsCommunication.editAnnotation'], function(e) {
        var annotationId = e.args,
            currentAnnotation = AnnotationsExchange.getAnnotationById(annotationId);
        savedOrEditedAnnotationQueque.push(currentAnnotation);
    });

    EventDispatcher.addListeners(['MyItems.itemAdded', 'MyItems.itemRemoved'], function() {
        myItemsPrevent = true;
    });

    EventDispatcher.addListener('AnnotationsCommunication.annotationDeleted', function(e) {
        var annotationId = e.args;
        deletedIdQueue.push(annotationId);
    });

    EventDispatcher.addListener('AnnotationDetails.wrongAnnotation', function(e) {
        var annotationId = e.args;
        delete $scope.annotations[annotationId];
        delete $scope.allAnnotations[annotationId];
        $scope.annotationsLength = Object.keys($scope.annotations).length;
        $scope.allAnnotationsLength = Object.keys($scope.allAnnotations).length;
    });

    angular.element($window).bind('resize', function() {
        resizeSidebarHeight();
    });

    AnnotationSidebar.log('Controller Run');
});