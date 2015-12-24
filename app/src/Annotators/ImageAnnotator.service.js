angular.module('Pundit2.Annotators')

// TODO: linting, refactoring and so on .. 

.constant('IMAGEANNOTATORDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageAnnotator
     *
     * @description
     * `object`
     *
     * Configuration object for Image Annotator module.
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#TextFragmentAnnotator.addIcon
     *
     * @description
     * `boolean`
     *
     * Add or not the icon to the text fragments
     *
     * Default value:
     * <pre> addIcon: 'true' </pre>
     */
    addIcon: false
})

.service('ImageAnnotator', function(NameSpace, BaseComponent, $location,
    Consolidation, XpointersHelper, ImageFragmentAnnotatorHelper, EventDispatcher, $q, $rootScope, ItemsExchange, Config, $compile) {

    // Create the component and declare what we deal with: text
    var imageAnnotator = new BaseComponent('ImageAnnotator');

    imageAnnotator.label = 'image';
    imageAnnotator.type = NameSpace.types[imageAnnotator.label];
    imageAnnotator.labelIF = 'imagePart';
    imageAnnotator.typeIF = NameSpace.fragments[imageAnnotator.labelIF];

    var fragmentIds = {},
        fragmentsRefs = {},
        fragmentsRefsById = {},
        i = 0,
        fragmentById = [],
        tempFragmentIds = {},
        lastTemporaryConsolidable,
        temporaryConsolidated = {},
        imgConsClass = 'pnd-cons-img';
        // svgTimeout;

    // // TODO: Move this to XpointersHelper .something() ?
    // var activateFragments = function() {
    //     // var deferred = $q.defer();

    //     var consolidated = angular.element('.pnd-cons:not(.ng-scope)');
    //     $compile(consolidated)($rootScope);
    //     $rootScope.$$phase || $rootScope.$digest();

    //     // deferred.resolve();
    //     // return deferred.promise;
    // };


    // var consolidateTemporarySelection = function() {
    //     for (var uri in temporaryConsolidated) {
    //         var temporaryFragmentId = temporaryConsolidated[uri].fragmentId,
    //             temporaryFragmentUri = imageAnnotator.getFragmentUriById(temporaryFragmentId);

    //         Consolidation.updateItemListAndMap(ItemsExchange.getItemByUri(temporaryFragmentUri), 'text');
    //         imageAnnotator.placeIconByFragmentId(temporaryFragmentId);

    //         angular.element('.' + temporaryFragmentId)
    //             .removeClass(XpointersHelper.options.textFragmentHiddenClass)
    //             .removeAttr('temp-fragments')
    //             .removeClass('pnd-cons-temp');
    //         delete temporaryConsolidated[uri];
    //     }
    //     lastTemporaryConsolidable = undefined;
    // };

    imageAnnotator.isConsolidable = function(item) {
        var xpointerURI;

        if (!angular.isArray(item.type)) {
            imageAnnotator.log('Item not valid: malformed type' + item.uri);
            return false;
        } else if (item.type.length === 0) {
            imageAnnotator.log('Item not valid: types len 0' + item.uri);
            return false;
        } else if ((item.type.indexOf(imageAnnotator.type) === -1) && (item.type.indexOf(imageAnnotator.typeIF) === -1)) {
            imageAnnotator.log('Item not valid: not have type image ' + item.uri);
            return false;
        } else {
            if (item.type.indexOf(imageAnnotator.type) !== -1) {
                xpointerURI = item.xpointer;
            } else if (item.type.indexOf(imageAnnotator.typeIF) !== -1) {
                xpointerURI = item.parentItemXP;
            }
            if (!XpointersHelper.isValidXpointerURI(xpointerURI)) {
                imageAnnotator.log('Item not valid: not a valid xpointer uri: ' + xpointerURI);
                return false;
            } else if (!XpointersHelper.isValidXpointer(xpointerURI)) {
                imageAnnotator.log('Item not valid: not consolidable on this page: ' + xpointerURI);
                return false;
            }
        }

        // TODO: it's a valid image fragment if:
        // - one of its types is the fragment-image type [done]
        // - has a part of
        // - .selector contains something
        // ... etc etc
        imageAnnotator.log('Item valid: ' + item.label);
        return true;
    };

    imageAnnotator.consolidate = function(items) {
        imageAnnotator.log('Consolidating!');
        /*
         if (!angular.isObject(items)) {
         imageAnnotator.err('Items not valid: malformed object', items);
         return deferred.resolve();
         }
         */
        var updateDOMPromise,
            compilePromise,
            uri,
            currentUri,
            xpointers = [],
            parentItemXPList = {};

        for (uri in items) {
            if (items[uri].type.indexOf(imageAnnotator.type) !== -1) {
                currentUri = items[uri].xpointer;
            } else if (items[uri].type.indexOf(imageAnnotator.typeIF) !== -1) {
                currentUri = items[uri].parentItemXP;
            }
            xpointers.push(currentUri);
            if (typeof(items[uri].polygon) !== 'undefined') {
                if (typeof(parentItemXPList[items[uri].parentItemXP]) !== 'undefined') {
                    parentItemXPList[items[uri].parentItemXP].push(items[uri].polygon);
                } else {
                    parentItemXPList[items[uri].parentItemXP] = [items[uri].polygon];
                }
            }
            fragmentIds[uri] = ['imgf-' + i];
            tempFragmentIds[currentUri] = ['imgf-' + i];
            fragmentById['imgf-' + i] = {
                uri: uri,
                bits: [],
                bitsObj: {},
                item: items[uri]
            };
            i++;
        }
        var xpaths = XpointersHelper.getXPathsFromXPointers(xpointers),
            sorted = XpointersHelper.splitAndSortXPaths(xpaths),
            // After splitting and sorting each bit has a list of fragment ids it belongs to.
            // Instead of using classes, these ids will be saved in a node attribute.
            xpathsFragmentIds = XpointersHelper.getClassesForXpaths(xpointers, sorted, xpaths, tempFragmentIds);

        updateDOMPromise = XpointersHelper.updateDOM(sorted, XpointersHelper.options.wrapNodeClass, xpathsFragmentIds);
        updateDOMPromise.then(function() {
            var fragmentId;
            if (Object.keys(fragmentsRefsById).length > 0) {
                for (var uri in fragmentIds) {
                    fragmentId = fragmentIds[uri];
                    fragmentsRefs[uri] = fragmentsRefsById[fragmentId];
                }
            }
        });
    };


    // TODO: WHAAAAT?! 
    // Called by TextFragmentBit directives: they will wrap every bit of annotated content
    // for every xpointer we save an array of those bits. Each bit can belong to more
    // than one xpointer (overlaps!)
    imageAnnotator.updateFragmentBit = function(bit, action) {
        var fragments = bit.fragments,
            id = bit.bitId;

        // Fragment ids are split by a comma, gather them back in a array. Otherwise
        // they are a string
        if (fragments.match(/,/)) {
            fragments = fragments.split(',');
        } else {
            fragments = [fragments];
        }

        for (var l = fragments.length; l--;) {
            var current = fragmentById[fragments[l]];
            switch (action) {
                case 'add':
                    if (typeof current === 'undefined') {
                        imageAnnotator.err('fragmentById[' + fragments[l] + '] is undefined - skipping imageAnnotator.addFragmentBit()');
                        continue;
                    }
                    if (typeof current.bitsObj[id] === 'undefined') {
                        current.bits.push(bit);
                        current.bitsObj[id] = bit;
                    }
                    break;
                case 'remove':
                    if (typeof current === 'undefined') {
                        continue;
                    }
                    if (typeof current.bitsObj[id] !== 'undefined') {
                        var indexFind = current.bits.map(function(e) {
                            return e.bitId;
                        }).indexOf(id);
                        if (indexFind !== -1) {
                            current.bits.splice(indexFind, 1);
                        }
                        delete current.bitsObj[id];
                    }
                    break;
                case 'update':
                    if (typeof current === 'undefined') {
                        if (typeof bitsQueque[fragments[l]] === 'undefined') {
                            bitsQueque[fragments[l]] = [bit];
                        } else {
                            bitsQueque[fragments[l]].push(bit);
                        }
                        continue;
                    }
                    if (typeof current.bitsObj[id] === 'undefined') {
                        current.bits.push(bit);
                        current.bitsObj[id] = bit;
                    }
                    break;
            }
        }
        imageAnnotator.log('Update consolidated fragment bit references', fragments);
    };

    imageAnnotator.getFragmentReferenceByUri = function(uri) {
        if (typeof(fragmentsRefs[uri]) !== 'undefined') {
            return fragmentsRefs[uri];
        }
    };

    imageAnnotator.getFragmentIdByUri = function(uri) {
        if (typeof(fragmentIds[uri]) !== 'undefined') {
            return fragmentIds[uri];
        }
    };

    imageAnnotator.getFragmentUriById = function(id) {
        if (typeof(fragmentById[id]) !== 'undefined') {
            return fragmentById[id].uri;
        }
    };

    imageAnnotator.getBitsById = function(id) {
        if (typeof(fragmentById[id]) !== 'undefined') {
            return fragmentById[id].bits;
        }
    };

    imageAnnotator.highlightByUri = function(uri) {
        // if (typeof(fragmentIds[uri]) === 'undefined') {
        //     imageAnnotator.log('Not highlighting given URI: fragment id not found');
        //     return;
        // }
        imageAnnotator.highlightById(fragmentIds[uri][0]);
    };

    imageAnnotator.highlightById = function(id) {
        // for (var l = fragmentById[id].bits.length; l--;) {
        //     fragmentById[id].bits[l].high();
        // }
        imageAnnotator.log('Highlighting fragment id=' + id + ', # bits: ' + fragmentById[id].bits.length);
    };


    imageAnnotator.clearHighlightByUri = function(uri) {
        // if (typeof(fragmentIds[uri]) === 'undefined') {
        //     imageAnnotator.log('Not clearing highlight on given URI: fragment id not found');
        //     return;
        // }
        imageAnnotator.clearHighlightById(fragmentIds[uri]);
    };

    imageAnnotator.clearHighlightById = function(id) {
        // for (var l = fragmentById[id].bits.length; l--;) {
        //     fragmentById[id].bits[l].clear();
        // }
        imageAnnotator.log('Clear highlight on fragment id=' + id + ', # bits: ' + fragmentById[id].bits.length);
    };

    // Hides and shows a single fragment (identified by its item's URI)
    imageAnnotator.showByUri = function(uri) {
        // if (typeof(fragmentIds[uri]) === 'undefined') {
        //     imageAnnotator.log('Not showing fragment for given URI: fragment id not found');
        //     return;
        // }
        // var id = fragmentIds[uri];
        // for (var l = fragmentById[id].bits.length; l--;) {
        //     fragmentById[id].bits[l].show();
        // }
    };

    imageAnnotator.hideByUri = function(uri) {
        // if (typeof(fragmentIds[uri]) === 'undefined') {
        //     imageAnnotator.log('Not hiding fragment for given URI: fragment id not found');
        //     return;
        // }
        // var id = fragmentIds[uri];
        // for (var l = fragmentById[id].bits.length; l--;) {
        //     fragmentById[id].bits[l].hide();
        // }
    };

    // Hides and shows every fragment
    imageAnnotator.hideAll = function() {
        for (var uri in fragmentIds) {
            imageAnnotator.hideByUri(uri);
        }
    };

    imageAnnotator.showAll = function() {
        for (var uri in fragmentIds) {
            imageAnnotator.showByUri(uri);
        }
    };

    // Ghost and remove ghost from a single fragment (identified by its item's URI)
    imageAnnotator.ghostByUri = function(uri) {
        if (typeof(fragmentIds[uri]) === 'undefined') {
            imageAnnotator.log('Fragment id not found');
            return;
        }
        var id = fragmentIds[uri];
        for (var l = fragmentById[id].bits.length; l--;) {
            fragmentById[id].bits[l].ghost();
        }
    };

    imageAnnotator.ghostRemoveByUri = function(uri) {
        if (typeof(fragmentIds[uri]) === 'undefined') {
            imageAnnotator.log('Fragment id not found');
            return;
        }
        var id = fragmentIds[uri];
        for (var l = fragmentById[id].bits.length; l--;) {
            fragmentById[id].bits[l].expo();
        }
    };

    // Hides and shows every fragment
    imageAnnotator.ghostAll = function() {
        for (var uri in fragmentIds) {
            imageAnnotator.ghostByUri(uri);
        }
    };

    imageAnnotator.ghostRemoveAll = function() {
        for (var uri in fragmentIds) {
            imageAnnotator.ghostRemoveByUri(uri);
        }
    };

    // The orchestrator will be called by the consolidation service as single point of
    // interaction when it comes to deal with fragments. Let's subscribe the text type.

    // TODO: oh damn it!!!
    imageAnnotator.wipe = function() {
        fragmentIds = {};
        fragmentsRefs = {};
        fragmentsRefsById = {};
        fragmentById = {};

        // bitsQueque = {};

        // // Replace wrapped nodes with their content
        // var bits = angular.element('.' + XpointersHelper.options.wrapNodeClass);
        // angular.forEach(bits, function(node) {
        //     var parent = node.parentNode;
        //     while (node.firstChild) {
        //         parent.insertBefore(node.firstChild, node);
        //     }
        //     angular.element(node).remove();
        // });

        // // Finally merge splitted text nodes
        // XpointersHelper.mergeTextNodes(angular.element('body')[0]);
        /* var imgCons = angular.element('.' + imgConsClass);
         imgCons.removeClass(imgConsClass);
         */ // imgCons.siblings('svg.pnd-polygon-layer').remove();
    };

    imageAnnotator.wipeItem = function(item) {
        var fragmentId = fragmentIds[item.uri][0];
        // TODO: ... ? 
        // imageAnnotator.wipeFragmentIds([fragmentId]);

    };

    // imageAnnotator.wipeFragmentIds = function(frIds) {
    //     var modifiedFragmentsId = {},
    //         modifiedItemsUri = [];

    //     for (var i in frIds) {
    //         var fragmentId = frIds[i],
    //             uri = fragmentById[fragmentId].uri,
    //             references = fragmentsRefsById[fragmentId];

    //         for (var r in references) {
    //             var elem = references[r];
    //             wipeReference(elem, fragmentId, modifiedFragmentsId);
    //         }

    //         delete fragmentsRefsById[fragmentId];
    //         delete fragmentById[fragmentId];

    //         if (fragmentIds[uri][0] === fragmentId) {
    //             delete fragmentIds[uri];
    //             delete fragmentsRefs[uri];
    //         }
    //     }

    //     XpointersHelper.mergeTextNodes(angular.element('body')[0]);

    //     // TODO: refactor!!
    //     angular.forEach(Object.keys(modifiedFragmentsId), function(fr) {
    //         var currentUri = fragmentById[fr].uri,
    //             currentReferences = angular.element('.' + fr),
    //             referencesList = [];

    //         currentReferences.each(function(i) {
    //             referencesList.unshift(currentReferences.eq(i));
    //         });

    //         fragmentsRefs[currentUri] = referencesList;
    //         fragmentsRefsById[fr] = referencesList;
    //     });

    //     activateFragments();

    //     for (var fr in modifiedFragmentsId) {
    //         if (typeof fragmentById[fr] === 'undefined') {
    //             continue;
    //         }
    //         modifiedItemsUri.push(fragmentById[fr].uri);
    //     }
    //     //TODO call ImageFragmentAnnotator.updateItems
    //     EventDispatcher.sendEvent('TextFragmentAnnotator.updateItems', modifiedItemsUri);
    // };

    imageAnnotator.svgHighlightByItem = function(item) {
        // TODO check if the svg is yet built
        var currentUri, imgReference, xpaths = [];
        if ((item.type.indexOf(imageAnnotator.typeIF) !== -1) && (typeof(item.polygon) !== 'undefined')) {
            currentUri = item.parentItemXP;
            xpaths = XpointersHelper.getXPathsFromXPointers([currentUri]);
            if (currentUri in xpaths) {
                imgReference = angular.element(xpaths[currentUri].startNode.firstElementChild);
                ImageFragmentAnnotatorHelper.drawPolygonOverImage(item.polygon, imgReference);
            }
        }
    };

    imageAnnotator.svgClearHighlightByItem = function( /*item*/ ) {
        angular.element('.' + imgConsClass).siblings('span.pnd-cons-svg').remove();
        // var currentUri, imgReference, xpaths = [];
        // if ((item.type.indexOf(imageAnnotator.typeIF) !== -1) && (typeof(item.polygon) !== 'undefined')){
        //     currentUri = item.parentItemXP;
        //     xpaths = XpointersHelper.getXPathsFromXPointers([currentUri]);
        //     if (currentUri in xpaths) {
        //         imgReference = angular.element(xpaths[currentUri].startNode.firstElementChild);
        //         imgReference.siblings('svg.pnd-polygon-layer').remove();
        //     }
        // }
    };

    imageAnnotator.highlightById = function(id) {
        for (var l = fragmentById[id].bits.length; l--;) {
            fragmentById[id].bits[l].high();
        }
        imageAnnotator.log('Highlighting fragment id=' + id + ', # bits: ' + fragmentById[id].bits.length);
    };

    imageAnnotator.clearHighlightById = function(uri) {
        if (typeof(fragmentIds[uri]) === 'undefined') {
            imageAnnotator.log('Not clearing highlight on given URI: fragment id not found');
            return;
        }
        imageAnnotator.clearHighlightById(fragmentIds[uri]);
    };

    imageAnnotator.highlightByUri = function(uri) {
        if (typeof(fragmentIds[uri]) === 'undefined') {
            imageAnnotator.log('Not highlighting given URI: fragment id not found');
            return;
        }
        imageAnnotator.highlightById(fragmentIds[uri][0]);
    };

    imageAnnotator.clearHighlightByUri = function(uri) {
        if (typeof(fragmentIds[uri]) === 'undefined') {
            imageAnnotator.log('Not clearing highlight on given URI: fragment id not found');
            return;
        }
        imageAnnotator.clearHighlightById(fragmentIds[uri]);
    };

    Consolidation.addAnnotator(imageAnnotator);

    EventDispatcher.addListener('XpointersHelper.NodeAdded', function(e) {
        var elementInfo = e.args,
            elementFragments = elementInfo.fragments,
            elementReferce = elementInfo.reference,
            currentFragment, currentIcon;

        var patt = new RegExp(/imgf\-[0-9]+/);
        for (var i in elementFragments) {
            currentFragment = elementFragments[i];
            if (!patt.test(currentFragment)) {
                return;
            }
            if (typeof fragmentsRefsById[currentFragment] === 'undefined') {
                fragmentsRefsById[currentFragment] = [elementReferce];

            } else {
                fragmentsRefsById[currentFragment].push(elementReferce);
            }
        }

        $compile(elementReferce)($rootScope);
    });

    // EventDispatcher.addListener('Consolidation.consolidateAll', function() {
    //     var myItemsList = ItemsExchange.getItemsByContainer(Config.modules.MyItemsContainer.container);
    //     if (imageAnnotator.options.addIcon === false &&
    //         imageAnnotator.options.addOnlyMyItemsIcon) {
    //         angular.forEach(myItemsList, function(item) {
    //             placeMyItemsIconByUri(item.uri);
    //         });
    //     }
    // });

    // EventDispatcher.addListener('XpointersHelper.temporaryWrap', function(e) {
    //     var wrapInfo = e.args,
    //         fragments = wrapInfo.fragments,
    //         newFragmentUri = wrapInfo.uri,
    //         newFragmentId = fragments[0];

    //     var bits = [],
    //         bitsObj = {};

    //     if (typeof bitsQueque[newFragmentId] !== 'undefined') {
    //         angular.forEach(bitsQueque[newFragmentId], function(bit) {
    //             bits.push(bit);
    //             bitsObj[bit.bitId] = bit;
    //         });
    //         delete bitsQueque[newFragmentId];
    //     }

    //     fragmentIds[newFragmentUri] = typeof fragmentIds[newFragmentUri] === 'undefined' ? [newFragmentId] : fragmentIds[newFragmentUri].push(newFragmentId);
    //     fragmentById[newFragmentId] = {
    //         uri: newFragmentUri,
    //         bits: bits,
    //         bitsObj: bitsObj,
    //         item: ItemsExchange.getItemByUri(newFragmentUri)
    //     };

    //     angular.forEach(fragments, function(fr) {
    //         if (typeof fragmentById[fr] === 'undefined') {
    //             imageAnnotator.err('Something wrog with this fragment ' + fr);
    //             return;
    //         }

    //         var currentUri = fragmentById[fr].uri,
    //             currentReferences = angular.element('.' + fr),
    //             referencesList = [];

    //         currentReferences.each(function(i) {
    //             referencesList.unshift(currentReferences.eq(i));
    //         });

    //         fragmentsRefs[currentUri] = referencesList;
    //         fragmentsRefsById[fr] = referencesList;
    //     });

    //     activateFragments();
    // });

    // EventDispatcher.addListeners([
    //     'AnnotationsCommunication.annotationSaved',
    //     'AnnotationsCommunication.editAnnotation'
    // ], function() {
    //     consolidateTemporarySelection();
    // });

    // $rootScope.$on('annomatic-run', function() {
    //     annomaticIsRunning = true;
    // });
    // $rootScope.$on('annomatic-stop', function() {
    //     annomaticIsRunning = false;
    // });

    imageAnnotator.log('Component up and running');
    return imageAnnotator;
});