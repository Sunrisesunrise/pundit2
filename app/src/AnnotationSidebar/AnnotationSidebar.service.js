angular.module('Pundit2.AnnotationSidebar')

.constant('ANNOTATIONSIDEBARDEFAULTS', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar
     *
     * @description
     * `object`
     *
     * Configuration object for AnnotationSidebar module. By default,
     * AnnotationSidebar directive is collapsed and can be expanded. It
     * also contains filters that can be used to show or hide annotations.
     */


    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.isAnnotationSidebarExpanded
     *
     * @description
     * `boolean`
     *
     * Initial state of the sidebar, expanded or collapsed
     *
     * Default value:
     * <pre> isAnnotationSidebarExpanded: 'false' </pre>
     */
    isAnnotationSidebarExpanded: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.isFiltersShowed
     *
     * @description
     * `boolean`
     *
     * Initial state of the list of the filers, shown or hidden
     *
     * Default value:
     * <pre> isFiltersShowed: 'false' </pre>
     */
    isFiltersShowed: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.annotationsRefresh
     *
     * @description
     * `number`
     *
     * Delay in ms for the refresh of the annotations
     *
     * Default value:
     * <pre> annotationsRefresh: 300 </pre>
     */
    annotationsRefresh: 300,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.bodyClass
     *
     * @description
     * `string`
     *
     * Class added to the body when there is the sidebar in the page
     *
     * Default value:
     * <pre> bodyClass: 'pnd-annotation-sidebar-active' </pre>
     */
    bodyClass: 'pnd-annotation-sidebar-active',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.bodyExpandedClass
     *
     * @description
     * `string`
     *
     * Class added to the body when the sidebar is expanded
     *
     * Default value:
     * <pre> bodyExpandedClass: 'pnd-annotation-sidebar-expanded' </pre>
     */
    bodyExpandedClass: 'pnd-annotation-sidebar-expanded',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.bodyCollapsedClass
     *
     * @description
     * `string`
     *
     * Class added to the body when the sidebar is collpsed
     *
     * Default value:
     * <pre> bodyCollapsedClass: 'pnd-annotation-sidebar-collapsed' </pre>
     */
    bodyCollapsedClass: 'pnd-annotation-sidebar-collapsed',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.sidebarExpandedClass
     *
     * @description
     * `string`
     *
     * Class added to the sidebar when it is expanded
     *
     * Default value:
     * <pre> sidebarExpandedClass: pnd-annotation-sidebar-expanded' </pre>
     */
    sidebarExpandedClass: 'pnd-annotation-sidebar-expanded',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.sidebarCollapsedClass
     *
     * @description
     * `string`
     *
     * Class added to the sidebar when it is collapsed
     *
     * Default value:
     * <pre> sidebarCollapsedClass: 'pnd-annotation-sidebar-collapsed' </pre>
     */
    sidebarCollapsedClass: 'pnd-annotation-sidebar-collapsed',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.inputIconSearch
     *
     * @description
     * `string`
     *
     * Icon shown in the search input when it's empty
     *
     * Default value:
     * <pre> inputIconSearch: 'pnd-icon-search' </pre>
     */
    inputIconSearch: 'pnd-icon-search',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.inputIconFilter
     *
     * @description
     * `string`
     *
     * Icon shown in the filter input when it's empty
     *
     * Default value:
     * <pre> inputIconFilter: 'pnd-icon-filter' </pre>
     */
    inputIconFilter: 'pnd-icon-filter',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.inputIconClear
     *
     * @description
     * `string`
     *
     * Icon shown in the search input when it has some content
     *
     * Default value:
     * <pre> inputIconClear: 'pnd-icon-close' </pre>
     */
    inputIconClear: 'pnd-icon-close',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.annotationsPanelActive
     *
     * @description
     * `boolean`
     *
     * Panel active by default when opening the sidebar
     *
     * Default value:
     * <pre> annotationsPanelActive: 'true' </pre>
     */
    annotationsPanelActive: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.suggestionsPanelActive
     *
     * @description
     * `boolean`
     *
     * Panel active by default when opening the sidebar
     *
     * Default value:
     * <pre> suggestionsPanelActive: 'false' </pre>
     */
    suggestionsPanelActive: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.annotationHeigth
     *
     * @description
     * `number`
     *
     * The height of the annotations in the sidebar for positioning
     *
     * Default value:
     * <pre> annotationHeigth: 25 </pre>
     */
    annotationHeigth: 25,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.startTop
     *
     * @description
     * `number`
     *
     * First top position of annotations in the sidebar
     *
     * Default value:
     * <pre> startTop: 55 </pre>
     */
    startTop: 55,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.clientDomTemplate
     *
     * @description
     * `string`
     *
     * The Client will append the content of this template to the DOM to bootstrap this component
     *
     * Default value:
     * <pre> clientDomTemplate: 'src/AnnotationSidebar/ClientAnnotationSidebar.tmpl.html' </pre>
     */
    clientDomTemplate: 'src/AnnotationSidebar/ClientAnnotationSidebar.tmpl.html',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AnnotationSidebar.debug
     *
     * @description
     * `boolean`
     *
     * Active debug log
     *
     * Default value:
     * <pre> debug: false </pre>
     */
    debug: false
})

.service('AnnotationSidebar', function(ANNOTATIONSIDEBARDEFAULTS, $rootScope, $filter, $timeout,
    BaseComponent, EventDispatcher, AnnotationsExchange, Annomatic, Consolidation, Dashboard, BrokenHelper,
    ItemsExchange, NotebookExchange, TypesHelper, TextFragmentAnnotator, XpointersHelper, Analytics) {

    var annotationSidebar = new BaseComponent('AnnotationSidebar', ANNOTATIONSIDEBARDEFAULTS);

    var state = {
        isSidebarExpanded: annotationSidebar.options.isAnnotationSidebarExpanded,
        isFiltersExpanded: annotationSidebar.options.isFiltersShowed,
        isLoading: false,
        allAnnotations: {},
        filteredAnnotations: {},
        isAnnotationsPanelActive: annotationSidebar.options.annotationsPanelActive,
        isSuggestionsPanelActive: annotationSidebar.options.suggestionsPanelActive
    };

    // Contains the list of elements relating to the annotations on the page
    var elementsList = {
        annotationsDate: [],
        authors: {},
        notebooks: {},
        entities: {},
        predicates: {},
        types: {},
        broken: {}
    };

    var annotationsByDate = [];
    var annotationsByLabel = [];

    // TODO: take startPosition from element in sidebar
    // TODO: take toolbar height from service
    var startPosition = annotationSidebar.options.startTop;
    var toolbarHeight = 30;
    var annotationPosition = [];

    var tempBrokenList = {};

    // var timeoutPromise;

    annotationSidebar.minHeightRequired = startPosition;

    // Contains the values ​​of active filters
    annotationSidebar.filters = {
        freeText: {
            filterName: 'freeText',
            filterLabel: 'Free text',
            expression: ''
        },
        authors: {
            filterName: 'authors',
            filterLabel: 'Author',
            expression: []
        },
        notebooks: {
            filterName: 'notebooks',
            filterLabel: 'Notebooks',
            expression: []
        },
        fromDate: {
            filterName: 'fromDate',
            filterLabel: 'From date',
            expression: ''
        },
        toDate: {
            filterName: 'toDate',
            filterLabel: 'To date',
            expression: ''
        },
        predicates: {
            filterName: 'predicates',
            filterLabel: 'Predicates',
            expression: []
        },
        entities: {
            filterName: 'entities',
            filterLabel: 'Entities',
            expression: []
        },
        types: {
            filterName: 'types',
            filterLabel: 'Types',
            expression: []
        },
        broken: {
            filterName: 'broken',
            filterLabel: 'Broken',
            expression: ''
        }
    };

    annotationSidebar.filtersCount = {};
    annotationSidebar.annotationPositionReal = {};

    // sort on key values
    // function keysrt(key) {
    //     return function(a, b) {
    //         if (a[key] > b[key]) return 1;
    //         if (a[key] < b[key]) return -1;
    //         return 0;
    //     }
    // }

    var sortByKey = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };

    var orderAndSetPos = function(optId, optHeight) {
        var pos;
        var currentTop,
            currentIndex;

        startPosition = annotationSidebar.options.startTop;
        annotationSidebar.annotationPositionReal = {};

        if (typeof(optId) !== 'undefined' && typeof(optHeight) === 'number') {
            currentIndex = annotationPosition.map(function(e) {
                return e.id;
            }).indexOf(optId);
            if (currentIndex !== -1) {
                annotationPosition[currentIndex].height = optHeight;
            }
        } else {
            annotationPosition.sort(function(a, b) {
                return a.top - b.top;
            });
        }



        pos = annotationPosition;
        for (var ann in pos) {
            annotationSidebar.annotationPositionReal[pos[ann].id] = {
                id: pos[ann].id,
                top: pos[ann].top,
                height: pos[ann].height,
                broken: pos[ann].broken
            };

            currentTop = pos[ann].top;

            if (currentTop > startPosition) {
                annotationSidebar.annotationPositionReal[pos[ann].id].top = currentTop;
                startPosition = currentTop + pos[ann].height;
            } else {
                annotationSidebar.annotationPositionReal[pos[ann].id].top = startPosition;
                startPosition += pos[ann].height;
            }
        }

        annotationSidebar.minHeightRequired = startPosition + annotationSidebar.options.annotationHeigth;
    };

    var findFirstConsolidateItem = function(currentAnnotation) {
        var graph = currentAnnotation.graph;
        var list;
        var currentItem;
        var objectValue;
        var objectType;

        for (var subject in graph) {
            currentItem = ItemsExchange.getItemByUri(subject);
            if (currentItem && currentItem.isTextFragment() || currentItem.isImageFragment() || currentItem.isImage() || currentItem.isWebPage()) {
                if (Consolidation.isConsolidated(currentItem)) {
                    return subject;
                }
            }

            for (var predicate in graph[subject]) {

                list = graph[subject][predicate];
                for (var object in list) {
                    objectValue = list[object].value;
                    objectType = list[object].type;

                    if (objectType === 'uri') {
                        currentItem = ItemsExchange.getItemByUri(objectValue);
                        if (currentItem && currentItem.isTextFragment() || currentItem.isImageFragment() || currentItem.isImage() || currentItem.isWebPage()) {
                            if (Consolidation.isConsolidated(currentItem)) {
                                return objectValue;
                            }
                        }
                    }
                }
            }
        }
    };

    var setAnnotationsPosition = function(optId, optHeight) {

        var annotations = (annotationSidebar.needToFilter() ? state.filteredAnnotations : state.allAnnotations);
        var optCheck = false;
        var annotationHeigth = 0;
        var dashboardHeight;

        if (Dashboard.isDashboardVisible()) {
            dashboardHeight = Dashboard.getContainerHeight();
        } else {
            dashboardHeight = 0;
        }

        if (Object.keys(annotations).length > 0) {
            startPosition = annotationSidebar.options.startTop;
            annotationPosition = [];

            if (typeof(optId) !== 'undefined' && typeof(optHeight) === 'number') {
                optCheck = true;
            }

            angular.forEach(annotations, function(annotation) {
                // var graph = annotation.graph;
                var firstValidUri;
                var currentItem;
                // var currentId;

                var currentFragment;

                firstValidUri = findFirstConsolidateItem(annotation);

                if (typeof(firstValidUri) === 'undefined') {
                    annotationHeigth = annotationSidebar.options.annotationHeigth;
                    if (optCheck && optId === annotation.id) {
                        annotationHeigth = optHeight;
                    }

                    annotationPosition.push({
                        id: annotation.id,
                        top: -3,
                        height: annotationHeigth,
                        broken: true
                    });
                } else {
                    var top, imgRef, fragRef, xpathTemp;
                    currentItem = ItemsExchange.getItemByUri(firstValidUri);

                    if (currentItem.isTextFragment()) {
                        top = -1;
                        currentFragment = TextFragmentAnnotator.getFragmentIdByUri(firstValidUri);
                        fragRef = angular.element('.' + currentFragment);

                        if (typeof(currentFragment) !== 'undefined' && typeof(fragRef.offset()) !== 'undefined') {
                            top = fragRef.offset().top - toolbarHeight - dashboardHeight;
                            // annotationSidebar.log("curr fr "+currentFragment + " alt "+ angular.element('.'+currentFragment).offset().top );
                        } else {
                            annotationSidebar.log("Something wrong with the fragments of this annotation: ", annotation);
                        }
                    } else if (currentItem.isImage()) {
                        // TODO: add icon during the consolidation and get the top of the specific image
                        // console.log("img ? ", currentItem);
                        top = -1;
                        xpathTemp = XpointersHelper.xPointerToXPath(currentItem.uri);
                        imgRef = angular.element(xpathTemp.startNode.firstElementChild);

                        if (typeof(imgRef.offset()) !== 'undefined') {
                            top = imgRef.offset().top - toolbarHeight - dashboardHeight;
                        }
                    } else if (currentItem.isImageFragment()) {
                        top = -1;
                        xpathTemp = XpointersHelper.xPointerToXPath(currentItem.parentItemXP);
                        imgRef = angular.element(xpathTemp.startNode.firstElementChild);

                        if (typeof(imgRef.offset()) !== 'undefined') {
                            top = imgRef.offset().top - toolbarHeight - dashboardHeight;
                        }
                    } else if (currentItem.isWebPage()) {
                        top = -2;
                    }

                    annotationHeigth = annotationSidebar.options.annotationHeigth;
                    if (optCheck && optId === annotation.id) {
                        annotationHeigth = optHeight;
                    }
                    annotationPosition.push({
                        id: annotation.id,
                        top: top,
                        height: annotationHeigth,
                        broken: false
                    });
                }
            });
            orderAndSetPos();
        }
    };

    var setAnnotationInPage = function(annotations) {
        var currentItem;
        TextFragmentAnnotator.hideAll();
        angular.forEach(annotations, function(annotation) {
            for (var itemUri in annotation.items) {
                if (annotation.predicates.indexOf(itemUri) === -1) {
                    currentItem = ItemsExchange.getItemByUri(itemUri);
                    if (Consolidation.isConsolidated(currentItem)) {
                        TextFragmentAnnotator.showByUri(currentItem.uri);
                    }
                }
            }
        });
    };

    var setBrokenInfo = function(annotation) {
        isBroken = annotation.isBroken();
        isBrokenYet = annotation.isBrokenYet;

        annotation.broken = isBroken;

        if (typeof(isBrokenYet) === 'string' && isBrokenYet === 'true') {
            isBrokenYet = true;
        } else {
            isBrokenYet = false;
        }

        // Add fixed annotation to BrokenHelper
        if (isBrokenYet && !isBroken) {
            BrokenHelper.addAnnotation(annotation.id, false);
        }

        // Add broken annotation to BrokenHelper
        if (!isBrokenYet && isBroken) {
            BrokenHelper.addAnnotation(annotation.id, true);
        }

        // Update elementsList
        if (isBroken) {
            tempBrokenList[annotation.id] = annotation;
            // elementsList.broken['uri:broken'].annotationsList[annotation.id] = annotation;
        }
    };

    var removeBroken = function(list, brokenList) {
        angular.forEach(brokenList, function(annotation) {
            if (typeof list[annotation.id] !== 'undefined') {
                delete list[annotation.id];
            }
        });

        return list;
    };

    // Updates the list of filters when new annotations comes
    var setFilterElements = function(annotations) {
        var isBroken, isBrokenYet;
        var annotationsByLabelTemp = {};

        annotationSidebar.filtersCount = {};

        elementsList.broken['uri:broken'] = {
            annotationsList: {}
        };
        BrokenHelper.resetQueques();

        angular.forEach(annotations, function(annotation) {

            var uriList = {};

            annotationsByDate.push(annotation);
            setBrokenInfo(annotation);

            // Annotation authors
            if (typeof(elementsList.authors[annotation.creator]) === 'undefined') {
                elementsList.authors[annotation.creator] = {
                    uri: annotation.creator,
                    label: annotation.creatorName,
                    active: false,
                    partial: 1,
                    annotationsList: {}
                };
            } else {
                elementsList.authors[annotation.creator].partial++;
            }
            elementsList.authors[annotation.creator].annotationsList[annotation.id] = annotation;

            // Annotation date
            if (elementsList.annotationsDate.indexOf(annotation.created) === -1) {
                elementsList.annotationsDate.push(annotation.created);
            }

            // Annotation notebook
            var notebookId = annotation.isIncludedIn;
            var notebookUri = annotation.isIncludedInUri;
            if (typeof(elementsList.notebooks[notebookUri]) === 'undefined') {
                var notebookName = "Downloading in progress";
                var cancelWatchNotebookName = $rootScope.$watch(function() {
                    return NotebookExchange.getNotebookById(notebookId);
                }, function(nb) {
                    if (typeof(nb) !== 'undefined') {
                        notebookName = nb.label;
                        elementsList.notebooks[notebookUri].label = notebookName;
                        cancelWatchNotebookName();
                    }
                });

                elementsList.notebooks[notebookUri] = {
                    uri: notebookUri,
                    label: notebookName,
                    notebookId: notebookId,
                    active: false,
                    partial: 1,
                    annotationsList: {}
                };
            } else {
                elementsList.notebooks[notebookUri].partial++;
            }
            elementsList.notebooks[notebookUri].annotationsList[annotation.id] = annotation;


            // Predicates
            angular.forEach(annotation.predicates, function(predicateUri) {
                if (typeof(uriList[predicateUri]) === 'undefined') {
                    uriList[predicateUri] = {
                        uri: predicateUri
                    };
                    if (typeof(elementsList.predicates[predicateUri]) === 'undefined') {
                        elementsList.predicates[predicateUri] = {
                            uri: predicateUri,
                            label: annotation.items[predicateUri].label,
                            active: false,
                            partial: 1,
                            annotationsList: {}
                        };
                    } else {
                        elementsList.predicates[predicateUri].partial++;
                    }
                    elementsList.predicates[predicateUri].annotationsList[annotation.id] = annotation;
                }
            });


            // Entities
            angular.forEach(annotation.entities, function(entUri) {
                if (typeof(uriList[entUri]) === 'undefined') {
                    uriList[entUri] = {
                        uri: entUri
                    };
                    if (typeof(elementsList.entities[entUri]) === 'undefined') {
                        elementsList.entities[entUri] = {
                            uri: entUri,
                            label: annotation.items[entUri].label, // TODO add check ?
                            active: false,
                            partial: 1,
                            annotationsList: {}
                        };
                    } else {
                        elementsList.entities[entUri].partial++;
                    }
                    elementsList.entities[entUri].annotationsList[annotation.id] = annotation;
                }
            });

            // Types
            angular.forEach(annotation.items, function(singleItem) {
                angular.forEach(singleItem.type, function(typeUri) {
                    if (typeof(uriList[typeUri]) === 'undefined') {
                        uriList[typeUri] = {
                            uri: typeUri
                        };
                        if (typeof(elementsList.types[typeUri]) === 'undefined') {
                            elementsList.types[typeUri] = {
                                uri: typeUri,
                                label: TypesHelper.getLabel(typeUri),
                                active: false,
                                partial: 1,
                                annotationsList: {}
                            };
                        } else {
                            elementsList.types[typeUri].partial++;
                        }
                        elementsList.types[typeUri].annotationsList[annotation.id] = annotation;
                    }
                });
            });

            // FreeText 
            annotation.allLabels = [];

            for (var i in annotation.items) {
                var label = annotation.items[i].label;
                label = label.toLowerCase();
                annotation.allLabels.push(label);
            }
            for (var subject in annotation.graph) {
                for (var predicate in annotation.graph[subject]) {
                    for (var object in annotation.graph[subject][predicate]) {
                        var currentObject = annotation.graph[subject][predicate][object];
                        if (currentObject.type === 'literal') {
                            var literal = currentObject.value;
                            literal = literal.toLowerCase();
                            annotation.allLabels.push(literal);
                        }
                    }
                }
            }

        });

        BrokenHelper.sendQueques();

        elementsList.broken['uri:broken'].annotationsList = removeBroken(angular.extend({}, state.allAnnotations), tempBrokenList);;

        annotationsByLabel = sortByKey(annotationsByLabel, 'label');
        annotationsByDate = sortByKey(annotationsByDate, 'created');
    };

    var findIndex = function(val, start, end) {
        var index = (start + end) / 2;
        index = parseInt(index, 10);

        if (start === end - 1) {
            return start;
        }

        if (annotationsByDate[index].created === val) {
            return index;
        } else if (annotationsByDate[index].created < val) {
            start = index;
        } else {
            end = index;
        }

        return findIndex(val, start, end);
    };

    var filterAnnotationsByDate = function(dateFrom, dateTo) {
        var results = {};

        if (annotationsByDate.length === 0) {
            return results;
        }

        if ((dateFrom === '' || typeof dateFrom === 'undefined') &&
            (dateTo === '' || typeof dateTo === 'undefined')) {
            return results;
        }

        if (typeof dateFrom === 'undefined' || dateFrom === '') {
            dateFrom = annotationsByDate[0].created;
        } else {
            dateFrom = dateFrom + 'T00:00:00';
        }

        if (typeof dateTo === 'undefined' || dateTo === '') {
            dateTo = annotationsByDate[annotationsByDate.length - 1].created;
        } else {
            dateTo = dateTo + 'T23:59:59';
        }

        if (dateFrom > dateTo) {
            return results;
        }

        var annStartIndex = findIndex(dateFrom, 0, annotationsByDate.length, annotationsByDate, 'created');
        var annEndIndex = findIndex(dateTo, annStartIndex, annotationsByDate.length, annotationsByDate, 'created');

        for (var i = annStartIndex; i < annEndIndex; i++) {
            results[annotationsByDate[i].id] = annotationsByDate[i];
        }

        annotationSidebar.log('DateFrom ' + dateFrom + ' DateTo ' + dateTo);

        return results;
    };

    var intersection = function(a, b) {
        var results = {};

        if (Object.keys(a).length < Object.keys(b).length) {
            for (var i in a) {
                if (typeof b[i] !== 'undefined') {
                    results[i] = a[i];
                }
            }
        } else {
            for (var j in b) {
                if (typeof a[j] !== 'undefined') {
                    results[j] = b[j];
                }
            }
        }

        return results;
    };

    var multipleIntersection = function(obj) {
        var firstTime = true;
        var results = {};

        for (var i in obj) {
            if (Object.keys(obj[i]).length > 0) {
                if (firstTime) {
                    results = obj[i];
                    firstTime = false;
                } else {
                    results = intersection(results, obj[i]);
                }
            }
        }

        return results;
    };

    var getAnnotationsOfSpecificFilter = function(filterKey, activeItems) {
        var results = {};
        for (var i in activeItems) {
            angular.extend(results, elementsList[filterKey][activeItems[i]].annotationsList);
        }

        return results;
    };

    var filterAnnotationsByLabel = function(label, annotationsList) {
        if (label === '') {
            return annotationsList;
        }

        var str = label.toLowerCase().replace(/\s+/g, ' '),
            strParts = str.split(' '),
            reg = new RegExp(strParts.join('.*'));

        var results = {};

        angular.forEach(annotationsList, function(annotation) {
            for (var i in annotation.allLabels) {
                if (annotation.allLabels[i].toLowerCase().match(reg) !== null) {
                    results[annotation.id] = annotation;
                    return;
                }

            }
        });

        return results;
    };

    var isFilterUriActive = function(filter, uri) {
        var res = annotationSidebar.filters[filter].expression.indexOf(uri);
        return res !== -1;
    };

    var updatePartialFiltersCount = function(globalFilters, filteredAnnotations, subFiltersSet) {
        var exceptionsCheck = ['annotationsDate'];
        var subFiltersSetCopy = {};

        angular.forEach(globalFilters, function(filter, key) {
            if (exceptionsCheck.indexOf(key) !== -1) {
                return;
            }

            for (var i in filter) {
                if (!isFilterUriActive(key, i)) {
                    for (var j in subFiltersSet) {
                        subFiltersSetCopy[j] = subFiltersSet[j];
                    }

                    subFiltersSetCopy[key] = getAnnotationsOfSpecificFilter(key, [i]);

                    elementsList[key][i].partial = Object.keys(multipleIntersection(subFiltersSetCopy)).length;
                } else {
                    elementsList[key][i].partial = Object.keys(intersection(elementsList[key][i].annotationsList, filteredAnnotations)).length;
                }
            }
        });

        annotationSidebar.log('Updated elementsList with partial counting ', elementsList);
    };

    var getFilteredAnnotations = function(activeFilters, globalFilters) {
        var exceptionsCheck = ['freeText', 'fromDate', 'toDate', 'broken'];

        var firstTime = true,
            atLeastOneActiveFilter = false,
            list = [],
            temp = {},
            subFiltersSet = {},
            currentAnnotationsList;

        var activeAnnotations = Object.keys(state.filteredAnnotations).length === 0 ? state.allAnnotations : state.filteredAnnotations;
        var results = {};

        angular.forEach(activeFilters, function(filter, key) {
            if (exceptionsCheck.indexOf(key) !== -1 || filter.expression.length === 0) {
                if (exceptionsCheck.indexOf(key) === -1) {
                    subFiltersSet[key] = {};
                }
                return;
            }

            list = filter.expression;
            currentAnnotationsList = getAnnotationsOfSpecificFilter(key, list);

            subFiltersSet[key] = currentAnnotationsList;

            if (list.length > 0) {
                atLeastOneActiveFilter = true;
            }
        });

        if (annotationSidebar.filters.broken.expression === 'hideBroken') {
            atLeastOneActiveFilter = true;
            subFiltersSet['broken'] = elementsList.broken['uri:broken'].annotationsList;
        }

        if (activeFilters['fromDate'].expression !== '' || activeFilters['toDate'].expression !== '') {
            subFiltersSet['date'] = filterAnnotationsByDate(activeFilters['fromDate'].expression, activeFilters['toDate'].expression);
            atLeastOneActiveFilter = true;
        }

        if (activeFilters['freeText'].expression !== '') {
            atLeastOneActiveFilter = true;
            subFiltersSet['freeText'] = filterAnnotationsByLabel(activeFilters['freeText'].expression, state.allAnnotations);
        }

        results = atLeastOneActiveFilter ? multipleIntersection(subFiltersSet) : angular.extend({}, state.allAnnotations);
        updatePartialFiltersCount(globalFilters, results, subFiltersSet);

        annotationSidebar.log(Object.keys(results).length + ' multi result ', results);

        return results;
    };

    // Expands or collapses the sidebar
    annotationSidebar.toggle = function() {
        state.isSidebarExpanded = !state.isSidebarExpanded;
        EventDispatcher.sendEvent('AnnotationSidebar.toggle', state.isSidebarExpanded);
    };

    annotationSidebar.toggleLoading = function() {
        state.isLoading = !state.isLoading;
        EventDispatcher.sendEvent('AnnotationSidebar.toggleLoading', state.isLoading);
    };

    // Show / hide the list of the filters in the sidebar
    annotationSidebar.toggleFiltersContent = function() {
        state.isFiltersExpanded = !state.isFiltersExpanded;
        EventDispatcher.sendEvent('AnnotationSidebar.toggleFiltersContent', state.isFiltersExpanded);
        Analytics.track('buttons', 'click', 'sidebar--' + (state.isFiltersExpanded ? 'showFilters' : 'filters--hide'));
    };
    // Check if the sidebar is expanded
    annotationSidebar.isAnnotationSidebarExpanded = function() {
        return state.isSidebarExpanded;
    };
    // Check if the list of the filters is visible
    annotationSidebar.isFiltersExpanded = function() {
        return state.isFiltersExpanded;
    };

    annotationSidebar.isAnnotationsPanelActive = function() {
        return state.isAnnotationsPanelActive;
    };
    annotationSidebar.activateAnnotationsPanel = function() {
        if (state.isFiltersExpanded) {
            annotationSidebar.toggleFiltersContent();
        }

        if (state.isSuggestionsPanelActive) {
            Annomatic.stop();
            EventDispatcher.sendEvent('AnnotationSidebar.activateAnnotationsPanel');
            Consolidation.wipe();
            Consolidation.consolidateAll();
        }

        state.isAnnotationsPanelActive = true;
        state.isSuggestionsPanelActive = false;
    };

    annotationSidebar.isSuggestionsPanelActive = function() {
        return state.isSuggestionsPanelActive;
    };
    annotationSidebar.activateSuggestionsPanel = function() {
        if (state.isAnnotationsPanelActive) {
            if (state.isFiltersExpanded) {
                state.isFiltersExpanded = false;
            }
            Consolidation.wipe();
            Annomatic.run();
        }

        state.isSuggestionsPanelActive = true;
        state.isAnnotationsPanelActive = false;
    };

    annotationSidebar.getAllAnnotations = function() {
        return state.allAnnotations;
    };

    // Get the object of filtered annotations
    annotationSidebar.getAllAnnotationsFiltered = function(filters) {
        state.filteredAnnotations = getFilteredAnnotations(filters, elementsList);

        setAnnotationInPage(state.filteredAnnotations);
        setAnnotationsPosition();

        return state.filteredAnnotations;
    };

    annotationSidebar.getFilters = function() {
        return elementsList;
    };

    annotationSidebar.getMinDate = function() {
        if (elementsList.annotationsDate.length > 0) {
            return elementsList.annotationsDate.reduce(
                function(prev, current) {
                    return prev < current ? prev : current;
                }
            );
        }
    };

    annotationSidebar.getMaxDate = function() {
        if (elementsList.annotationsDate.length > 0) {
            return elementsList.annotationsDate.reduce(
                function(prev, current) {
                    return prev > current ? prev : current;
                }
            );
        }
    };

    annotationSidebar.getLoadingStatus = function() {
        return state.isLoading;
    };

    annotationSidebar.setAllPosition = function(id, height) {
        orderAndSetPos(id, height);
    };

    annotationSidebar.setAnnotationPosition = function(optId, optHeight) {
        var currentIndex;
        if (typeof(optId) !== 'undefined' && typeof(optHeight) === 'number') {
            currentIndex = annotationPosition.map(function(e) {
                return e.id;
            }).indexOf(optId);
            if (currentIndex !== -1) {
                annotationPosition[currentIndex].height = optHeight;
            }
        }
    };

    annotationSidebar.setAnnotationsPosition = function() {
        setAnnotationsPosition();
    };

    // Check if some filters are active
    annotationSidebar.needToFilter = function() {
        for (var f in annotationSidebar.filters) {
            var current = annotationSidebar.filters[f].expression;
            if (typeof(current) === 'string' && current !== '') {
                return true;
            } else if (angular.isArray(current) && current.length > 0) {
                return true;
            }
        }
        return false;
    };

    // Activate / Disable a specific filter
    annotationSidebar.toggleActiveFilter = function(list, uri) {
        elementsList[list][uri].active = !elementsList[list][uri].active;
        Analytics.track('buttons', 'click', 'sidebar--filters--filtersPanel--' + list + '--' + (elementsList[list][uri].active ? 'active' : 'inactive'));
    };

    // TODO: verificare che l'elemento sia presente fra gli elementi prima
    // di impostarlo? es. nessuna annotazione con autore X
    annotationSidebar.setFilter = function(filterKey, uriValue) {
        var currentIndex;
        var currentElementInList;
        var currentFilter = annotationSidebar.filters[filterKey].expression;
        if (typeof(currentFilter) === 'string') {
            annotationSidebar.filters[filterKey].expression = uriValue;
        } else if (typeof(currentFilter) === 'object') {
            currentIndex = annotationSidebar.filters[filterKey].expression.indexOf(uriValue);
            currentElementInList = elementsList[filterKey][uriValue];
            if (currentIndex === -1 && typeof(currentElementInList) !== 'undefined') {
                currentElementInList.active = true;
                annotationSidebar.filters[filterKey].expression.push(uriValue);
            }
        }
    };

    // Disable a specific filter 
    annotationSidebar.removeFilter = function(filterKey, uriValue) {
        var currentIndex;
        var currentFilter = annotationSidebar.filters[filterKey].expression;
        if (typeof(currentFilter) === 'string') {
            annotationSidebar.filters[filterKey].expression = '';
        } else if (typeof(currentFilter) === 'object') {
            currentIndex = annotationSidebar.filters[filterKey].expression.indexOf(uriValue);
            if (currentIndex !== -1) {
                elementsList[filterKey][uriValue].active = false;
                annotationSidebar.filters[filterKey].expression.splice(currentIndex, 1);
            }
        }
    };

    // Clear all active filters
    annotationSidebar.resetFilters = function() {
        angular.forEach(annotationSidebar.filters, function(filter) {
            if (typeof(filter.expression) === 'string') {
                filter.expression = '';
            } else if (typeof(filter.expression) === 'object') {
                for (var f in elementsList[filter.filterName]) {
                    elementsList[filter.filterName][f].active = false;
                }
                filter.expression = [];
            }
        });

        Analytics.track('buttons', 'click', 'sidebar--filters--removeAllFilters');
    };

    EventDispatcher.addListener('Consolidation.consolidateAll', function() {
        annotationSidebar.log('Update annotations in sidebar');

        var annotations = AnnotationsExchange.getAnnotationsList();
        state.allAnnotations = angular.copy(annotations);
        setFilterElements(state.allAnnotations);
        setAnnotationsPosition();
    });

    annotationSidebar.log('Component running');
    return annotationSidebar;
});