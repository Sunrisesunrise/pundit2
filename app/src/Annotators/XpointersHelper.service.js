/*global Range*/

angular.module('Pundit2.Annotators')

.config(function($locationProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})

.constant('XPOINTERSHELPERDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper
     *
     * @description
     * `object`
     *
     * Configuration for XpointerHelper service
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.wrapNodeName
     *
     * @description
     * `string`
     *
     * The helper will use these node name and node classes to
     * wrap the consolidated DOM fragments. TextFragmentAnnotator and Handler
     * use these values too.
     *
     * Default value:
     * <pre> wrapNodeName: 'span' </pre>
     */
    wrapNodeName: 'span',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.wrapNodeClass
     *
     * @description
     * `string`
     *
     * The helper will use these node name and node classes to
     * wrap the consolidated DOM fragments. TextFragmentAnnotator and Handler
     * use these values too.
     *
     * Default value:
     * <pre> wrapNodeClass: 'span' </pre>
     */
    wrapNodeClass: 'pnd-cons',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.tempWrapNodeClass
     *
     * @description
     * `string`
     *
     * The helper will use these node name and node classes to
     * wrap the consolidated DOM fragments. TextFragmentAnnotator and Handler
     * use these values too.
     *
     * Default value:
     * <pre> tempWrapNodeClass: 'pnd-cons-temp' </pre>
     */
    tempWrapNodeClass: 'pnd-cons-temp',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.textFragmentIconClass
     *
     * @description
     * `string`
     *
     * Added by TextFragmentIcon directive, ignored when building xpointers
     *
     * Default value:
     * <pre> textFragmentIconClass: "pnd-text-fragment-icon" </pre>
     */
    textFragmentIconClass: "pnd-text-fragment-icon",

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.textFragmentHiddenClass
     *
     * @description
     * `string`
     *
     * Hidden fragment class
     *
     * Default value:
     * <pre> textFragmentHiddenClass: "pnd-textfragment-hidden" </pre>
     */
    textFragmentHiddenClass: "pnd-textfragment-hidden",

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.consolidationClasses
     *
     * @description
     * `array of string`
     *
     * Nodes with these classes will be ignored when building xpointers
     * and consolidating annotations. Add here any other UI element class which
     * is not considered in the isConsolidationNode() method. wrapNodeClass and
     * textFragmentIconClass are already considered.
     *
     * Default value:
     * <pre> consolidationClasses: ['pnd-cons-svg'] </pre>
     */
    consolidationClasses: ['pnd-cons-svg'],

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.consolidationClasses
     *
     * @description
     * `array of string`
     *
     * Nodes that represent the icons used by pundits after consolidation.
     * Node with these classes will be ignored when building xpointers
     *
     * Default value:
     * <pre> consolidationIconClasses: ['pnd-icon-tag'] </pre>
     */
    consolidationIconClasses: ['pnd-icon-tag'],

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.consolidationClasses
     *
     * @description
     * `array of string`
     *
     * Classes to assign to named content elements to have them recognized by Pundit
     *
     * Default value:
     * <pre> namedContentClasses: ['pundit-content'] </pre>
     */
    namedContentClasses: ['pundit-content'],

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.maxHits
     *
     * @description
     * `number`
     *
     * Number of node wrapping for time
     *
     * Default value:
     * <pre> maxHits: 8 </pre>
     */
    maxHits: 8,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.bufferDelay
     *
     * @description
     * `number`
     *
     * Delay in ms for the refresh of the buffer
     *
     * Default value:
     * <pre> bufferDelay: 60 </pre>
     */
    bufferDelay: 60,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.bufferDelay
     *
     * @description
     * `boolean`
     *
     * undefined / true / false
     *
     * Default value:
     * <pre> bufferDelay: undefined </pre>
     */
    preventDelay: undefined,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#XpointerHelper.avoidInitialHide
     *
     * @description
     * `boolean`
     *
     * Avoid inizial node hide
     *
     * Default value:
     * <pre> avoidInitialHide: false </pre>
     */
    avoidInitialHide: false
})

.service('XpointersHelper', function(XPOINTERSHELPERDEFAULTS, NameSpace, BaseComponent, EventDispatcher,
    $document, $location, $window, $q, $timeout, Status) {

    var xpointerHelper = new BaseComponent('XpointersHelper', XPOINTERSHELPERDEFAULTS);
    var preventDelay = xpointerHelper.options.preventDelay ? true : false;

    var addToArray = function(arr, add) {
        return arr.concat(add);
    };

    // Removes the rem[] elements from arr[]
    var removeFromArray = function(arr, rem) {
        var ret = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            if (rem.indexOf(arr[i]) === -1) {
                ret.push(arr[i]);
            }
        }
        return ret;
    };

    xpointerHelper.getXPathsFromXPointers = function(xpArray) {
        var xpointers = [],
            xpaths = {};

        for (var i = xpArray.length - 1; i >= 0; i--) {
            var xpointer = xpArray[i],
                obj = xpointerHelper.xPointerToXPath(xpointer);

            if (xpointerHelper.isValidXpointer(xpointer)) {
                xpaths[xpointer] = obj;
                xpointers.push(xpointer);
            } else {
                // TODO: here we could pass back the list of invalid xpointers, but they
                // should have been checked already by consolidation .. BEFORE the consolidation
                // process actually starts .... !
                xpointerHelper.err("Invalid xpointer passed to getXPathsFromXPointers: THIS SHOULD NOT HAPPEN!", xpointer);
            }
        } // for i

        return xpaths;

    }; // getXPathsFromXPointers()

    xpointerHelper.isValidXpointerURI = function(xpointer) {
        // TODO: perché in client.html si verifica xpointer undefined?! 
        if (typeof(xpointer) === 'undefined') {
            xpointerHelper.err("Xpointer is undefined: this should not happend!");
            return false;
        }
        if (xpointer.match(/#xpointer\(start-point\(string-range\(/) === null || xpointer.match(/range-to\(string-range\(/) === null) {
            return false;
        }
        // TODO: a better regexp? :)
        return true;
    };

    // Returns true if the xpointer is consolidable on the document, now
    xpointerHelper.isValidXpointer = function(xpointer) {
        if (!xpointerHelper.isValidXpointerURI(xpointer)) {
            return false;
        }

        var xpaths = xpointerHelper.xPointerToXPath(xpointer);
        return xpointerHelper.isValidRange(xpaths.startNode, xpaths.startOffset, xpaths.endNode, xpaths.endOffset);
    };

    xpointerHelper.xPointerToXPath = function(xpointer) {
        var splittedString,
            ret = {},
            foo;

        if (!xpointerHelper.isValidXpointerURI(xpointer)) {
            xpointerHelper.log("xPointerToXPath() Invalid xpointer! ", xpointer);
            return {
                startNode: null,
                startOffset: null,
                endNode: null,
                endOffset: null,
                valid: false
            };
        }

        // Split the xpointer two times, to extract a string
        // like //xpath1[n1],'',o1,//xpath2[n2],'',o2
        // where o1 and o2 are the offsets
        splittedString = xpointer.split("#xpointer(start-point(string-range(")[1].split("))/range-to(string-range(");

        // Then extract xpath and offset of the starting point
        foo = splittedString[0].split(",'',");
        ret.startXpath = foo[0];
        ret.startOffset = foo[1];

        // .. and of the ending point of the xpointer
        foo = splittedString[1].substr(0, splittedString[1].length - 3).split(",'',");
        ret.endXpath = foo[0];
        ret.endOffset = foo[1];

        ret.startNode = xpointerHelper.getNodeFromXpath(ret.startXpath);
        ret.endNode = xpointerHelper.getNodeFromXpath(ret.endXpath);

        return ret;
    };


    // Returns the DOM Node pointed by the xpath. Quite confident we can always get the
    // first result of this iteration, the second should give null since we dont use general
    // purpose xpaths
    xpointerHelper.getNodeFromXpath = function(xpath) {
        // var self = this;
        var iterator = $document[0].evaluate(xpath, $document[0], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        return iterator.singleNodeValue;
    };

    // TODO: Works only on non-consolidated dom .. ?
    xpointerHelper.isValidRange = function(startNode, startOffset, endNode, endOffset) {
        try {
            var r = $document[0].createRange();
            r.setStart(startNode, startOffset);
            r.setEnd(endNode, endOffset);
            return true;
        } catch (e) {
            return false;
        }
    };


    // Will return an array of sorted and unique xpaths, using objects with
    // properties: xpointer, xpath, offset, range
    xpointerHelper.splitAndSortXPaths = function(xpaths) {
        // We just need a starting point to sort the xpaths, taking the first node and use
        // an end_by_end comparison will do the job
        var startNode = xpointerHelper.getNodeFromXpath('//body'),
            x = [],
            ret = [];

        // For every xpointer we create 2 entries in the array: one for starting xpath
        // and one for the ending one
        for (var xpointer in xpaths) {

            // Push an element for the starting xpath+offset
            var rangeStart = $document[0].createRange(),
                node = xpointerHelper.getNodeFromXpath(xpaths[xpointer].startXpath);
            rangeStart.setStart(startNode, 0);
            rangeStart.setEnd(node, xpaths[xpointer].startOffset);

            x.push({
                xpointer: xpointer,
                xpath: xpaths[xpointer].startXpath,
                offset: xpaths[xpointer].startOffset,
                range: rangeStart
            });

            // Another time for the ending xpath+offset
            var rangeEnd = $document[0].createRange();
            node = xpointerHelper.getNodeFromXpath(xpaths[xpointer].endXpath);
            rangeEnd.setStart(startNode, 0);
            rangeEnd.setEnd(node, xpaths[xpointer].endOffset);

            x.push({
                xpointer: xpointer,
                xpath: xpaths[xpointer].endXpath,
                offset: xpaths[xpointer].endOffset,
                range: rangeEnd
            });

        } // for xpointer in self.xpaths

        // Sort this array, using a custom function which compares the end
        // points of the ranges in the passed object
        x.sort(function(a, b) {
            return a.range.compareBoundaryPoints(Range.END_TO_END, b.range);
        });

        // Erase doubled entries: they are sorted, just avoid copying the next
        // element if it's equal to the current one
        ret[0] = x[0];
        for (var i = 1, j = 0, len = x.length; i < len; i++) {
            if (x[i].xpath !== ret[j].xpath || x[i].offset !== ret[j].offset) {
                ret[++j] = x[i];
            }
        }

        return ret;
    }; // splitAndSortXPaths()


    xpointerHelper.getClassesForXpaths = function(xpointers, sortedXpaths, xpaths, xpointersClasses) {
        var realXps = [],
            htmlClasses = [];

        // Iterate through the sortedXpaths from 1st to Nth and accumulate
        // the active classes, looking at what xpointers are starting and
        // ending in the current xpath position
        for (var i = 0; i < sortedXpaths.length - 1; i++) {

            // var end = sortedXpaths[i+1];
            var start = sortedXpaths[i],
                addXps = xpointerHelper.getStartingXPs(xpointers, xpaths, start.xpath, start.offset),
                remXps = xpointerHelper.getEndingXPs(xpointers, xpaths, start.xpath, start.offset);

            realXps = addToArray(realXps, addXps);
            realXps = removeFromArray(realXps, remXps);

            var classes = [];
            for (var j = realXps.length - 1; j >= 0; j--) {
                var x = realXps[j];
                for (var k = xpointersClasses[x].length - 1; k >= 0; k--) {
                    classes.push(xpointersClasses[x][k]);
                }
            }
            htmlClasses[i + 1] = classes;

        } // for i

        return htmlClasses;
    }; // getClassesForNewXpointers()

    // Given an xpath/offset couple, returns all of the xpointers
    // which starts there
    xpointerHelper.getStartingXPs = function(xpointers, xpaths, xpath, offset) {
        var ret = [];

        for (var i = xpointers.length - 1; i >= 0; i--) {
            var x = xpointers[i];
            if (xpaths[x].startXpath === xpath && xpaths[x].startOffset === offset) {
                ret.push(x);
            }
        }
        return ret;
    };

    // Given an xpath/offset couple, returns all of the xpointers
    // which ends there
    xpointerHelper.getEndingXPs = function(xpointers, xpaths, xpath, offset) {
        var ret = [];

        for (var i = xpointers.length - 1; i >= 0; i--) {
            var x = xpointers[i];
            if (xpaths[x].endXpath === xpath && xpaths[x].endOffset === offset) {
                ret.push(x);
            }
        }
        return ret;
    };

    // Wraps all of the calculated xpaths with some htmltag and the computed
    // classes
    xpointerHelper.updateDOM = function(sortedXpaths, htmlClass, xpathsFragmentIds) {
        var xpathsCache = sortedXpaths,
            i = sortedXpaths.length - 1,
            deferred = $q.defer(),
            updateTimer,
            startLength = sortedXpaths.length;


        var deferredUpdate = function(promise) {
            $timeout.cancel(updateTimer);

            if (xpathsCache.length <= 1) {
                xpointerHelper.log("Dom successfully updated!");
                EventDispatcher.sendEvent('XpointersHelper.DOMUpdated');
                promise.resolve();
                return;
            }

            var currentHits = 0,
                maxHits = preventDelay ? 1000 : xpointerHelper.options.maxHits,
                delay = preventDelay ? 0 : xpointerHelper.options.bufferDelay;

            var doUpdate = function() {
                while (currentHits < maxHits && xpathsCache.length > 1) {
                    var end = xpathsCache.pop(),
                        start = xpathsCache[xpathsCache.length - 1];

                    if (xpathsFragmentIds[i].length > 0) {
                        xpointerHelper.log("## Updating DOM, xpath " + i + ": " + xpathsFragmentIds[i].join(" "));
                        xpointerHelper.wrapXPaths(start, end, xpointerHelper.options.wrapNodeName, htmlClass, xpathsFragmentIds[i]);
                    }

                    currentHits++;
                    i--;
                }

                if (!preventDelay) {
                    var currentLength = xpathsCache.length === 1 ? 0 : xpathsCache.length;
                    var percVal = 100 * (startLength - currentLength) / startLength;
                    Status.hitProgress(2, percVal);
                }

                deferredUpdate(promise);
            };

            if (preventDelay) {
                doUpdate();
            } else {
                updateTimer = $timeout(function() {
                    doUpdate();
                }, delay);
            }
        };

        deferredUpdate(deferred);

        return deferred.promise;
    }; // updateDOM()


    // Wrap the range from startXp to endXp (two xpaths custom objects) with
    // the given tag _tag and html class _class. Will build a range for those
    // 2 xpaths, and starting from the range's commonAncestorContainer, will
    // wrap all of the contained elements
    xpointerHelper.wrapXPaths = function(startXp, endXp, _tag, _class, _parents) {
        var htmlTag = _tag || xpointerHelper.options.wrapNodeName,
            htmlClass = _class || xpointerHelper.options.wrapNodeClass,
            parents = _parents || [],
            range = $document[0].createRange(),
            startNode = xpointerHelper.getNodeFromXpath(startXp.xpath),
            endNode = xpointerHelper.getNodeFromXpath(endXp.xpath);

        // If start and end xpaths dont have a node number [N], we
        // are wrapping the Mth=offset child of the given node
        if (!startXp.xpath.match(/\[[0-9]+\]$/) && !endXp.xpath.match(/\[[0-9]+\]$/)) {
            range.selectNode(startNode.childNodes[startXp.offset]);
        } else {

            // If it's not a textnode, set the start (or end) before (or after) it
            if (!xpointerHelper.isElementNode(startNode)) {
                range.setStart(startNode, startXp.offset);
            } else {
                range.setStart(startNode, startXp.offset);
            }

            if (!xpointerHelper.isElementNode(endNode)) {
                range.setEnd(endNode, endXp.offset);
            } else {
                range.setEndAfter(endNode);
            }
        }

        // Wrap the nearest element which contains the entire range
        xpointerHelper.wrapElement(range.commonAncestorContainer, range, htmlTag, htmlClass, parents);

    }; // wrapXPath

    // Wraps childNodes of element, only those which stay inside
    // the given range
    xpointerHelper.wrapElement = function(element, range, htmlTag, htmlClass, parents) {
        // If there's childNodes, wrap them all
        if (element.childNodes && element.childNodes.length > 0) {
            for (var i = (element.childNodes.length - 1); i >= 0 && element.childNodes[i]; i--) {
                xpointerHelper.wrapElement(element.childNodes[i], range, htmlTag, htmlClass, parents);
            }

            // Else it's a leaf: if it's a valid text node, wrap it!
        } else if (xpointerHelper.isTextNodeInsideRange(element, range)) {
            xpointerHelper.wrapNode(element, range, htmlTag, htmlClass, parents);
            // MORE Else: it's an image node.. wrap it up
        } else if (xpointerHelper.isImageNodeInsideRange(element, range)) {
            xpointerHelper.wrapNode(element, range, htmlTag, htmlClass, parents);
        }

    }; // wrapElement()

    // Triple node check: will pass if it's a text node, if it's not
    // empty and if it is inside the given range
    xpointerHelper.isTextNodeInsideRange = function(node, range) {
        var content;

        // Check: it must be a text node
        if (node.nodeType !== Node.TEXT_NODE) {
            return false;
        }

        // Check: the content must not be empty
        content = node.textContent.replace(/ /g, "").replace(/\n/, "");
        if (!node.data || content === "" || content === " ") {
            return false;
        }

        // Finally check if it's in the range
        return xpointerHelper.isNodeInsideRange(node, range);
    };
    xpointerHelper.isImageNodeInsideRange = function(node, range) {
        // Check: it must be an element node
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return false;
        }

        // Check: it must be an img
        if (node.tagName.toLowerCase() !== 'img') {
            return false;
        }

        return xpointerHelper.isNodeInsideRange(node, range);
    };

    // Will check if the given node interesecates the given range somehow
    xpointerHelper.isNodeInsideRange = function(node, range) {
        var nodeRange = $document[0].createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
        if (range.compareBoundaryPoints(Range.END_TO_START || 3, nodeRange) !== -1 ||
            range.compareBoundaryPoints(Range.START_TO_END || 1, nodeRange) !== 1) {
            return false;
        }
        return true;
    };

    // Will wrap a node (or part of it) with the given htmlTag. Just part of it when it's
    // on the edge of the given range and the range starts (or ends) somewhere inside it
    xpointerHelper.wrapNode = function(element, range, htmlTag, htmlClass, parents) {
        var r2 = $document[0].createRange(),
            wrapNode;

        // Select correct sub-range: if the element is the start or end container of the range
        // set the boundaries accordingly: if it's startContainer use it's start offset and set
        // the end offset to element length. If it's endContainer set the start offset to 0
        // and the endOffset from the range.
        if (element === range.startContainer || element === range.endContainer) {
            r2.setStart(element, (element === range.startContainer) ? range.startOffset : 0);
            r2.setEnd(element, (element === range.endContainer) ? range.endOffset : element.length);

            // Otherwise just select the entire node, and wrap it up
        } else {
            r2.selectNode(element);
        }

        wrapNode = xpointerHelper.createWrapNode(htmlTag, htmlClass, parents);

        // Finally surround the range contents with an ad-hoc crafted html element
        r2.surroundContents(wrapNode.element);
        //TODO: check type nodes (images?)
        EventDispatcher.sendEvent('XpointersHelper.NodeAdded', {
            fragments: parents,
            reference: wrapNode.jElement
        });
    }; // wrapNode()

    // Creates an HTML element to be used to wrap (usually a span?) adding the given
    // classes to it
    xpointerHelper.createWrapNode = function(htmlTag, htmlClass, parents) {
        var element = $document[0].createElement(htmlTag),
            currentElement = angular.element(element);
        currentElement.addClass(htmlClass);
        if (xpointerHelper.options.avoidInitialHide === false) {
            currentElement.addClass(xpointerHelper.options.textFragmentHiddenClass);
        }

        // TODO: make this directive name configurable??
        currentElement.attr('text-fragment-bit', '');
        // Parent fragment ids both in fragments attribute and in classes. First used to
        // pass them back to the TextFragmentAnnotator service, the second to being able
        // to retrieve the last of them with a css selector to place the icon
        currentElement.attr('fragments', parents.join(','));
        currentElement.addClass(parents.join(' '));

        return {
            element: element,
            jElement: currentElement
        };
    };

    // Merges text nodes: when unwrapping consolidated fragments we are splitting the original
    // text nodes in multiple nodes. Merging them together should get us the very same DOM we
    // started with before the consolidation.
    xpointerHelper.mergeTextNodes = function(node) {

        if (!node) {
            return;
        }

        if ((typeof(node.childNodes) !== "undefined") && (node.childNodes.length > 0)) {
            var i = node.childNodes.length - 1;

            var child, sibling;
            // TODO is there a better way to do this?
            while (child = node.childNodes[i--]) { // jshint ignore:line
                if (xpointerHelper.isTextNode(child) && (sibling = node.childNodes[i]) && xpointerHelper.isTextNode(sibling)) {
                    sibling.nodeValue = sibling.nodeValue + child.nodeValue;
                    node.removeChild(child);
                } else if (xpointerHelper.isElementNode(child)) {
                    xpointerHelper.mergeTextNodes(child);
                }
            }
        }

    }; // mergeTextNodes()


    xpointerHelper.isTextNode = function(node) {
        if (!node) {
            return false;
        }
        return node.nodeType === Node.TEXT_NODE;
    };

    xpointerHelper.isElementNode = function(node) {
        if (!node) {
            return false;
        }
        return node.nodeType === Node.ELEMENT_NODE;
    };

    // Returns true if the node is a wrap node, added by the consolidation
    xpointerHelper.isWrapNode = function(node) {

        // Not an element node.. return false
        if (!xpointerHelper.isElementNode(node)) {
            return false;
        }

        // If the node name is wrong.. return false
        if (node.nodeName.toUpperCase() !== xpointerHelper.options.wrapNodeName.toUpperCase()) {
            return false;
        }

        // It is an element, with the right name: if it has the wrap class, it is a wrap node!
        var el = angular.element(node);
        if (el.hasClass(xpointerHelper.options.wrapNodeClass)) {
            return true;
        }

        //if it is a consolidation icon, return true
        for (var i = 0; i < xpointerHelper.options.consolidationIconClasses.length; i++) {
            if (el.hasClass(xpointerHelper.options.consolidationIconClasses[i])) {
                return true;
            }
        }

        return false;
    }; // isWrapNode()

    // Returns true if the given node is a tag which should be ignored while building xpointers,
    // like an UI icon (my items? more?), or a wrapped node class
    xpointerHelper.isConsolidationNode = function(node) {

        if (!xpointerHelper.isElementNode(node)) {
            return false;
        }

        var toIgnore = [xpointerHelper.options.textFragmentIconClass, xpointerHelper.options.wrapNodeClass, xpointerHelper.options.tempWrapNodeClass, xpointerHelper.options.imgWrapNodeClass];
        toIgnore = toIgnore.concat(xpointerHelper.options.consolidationClasses);
        toIgnore = toIgnore.concat(xpointerHelper.options.consolidationIconClasses);

        for (var i = toIgnore.length; i--;) {
            if (angular.element(node).hasClass(toIgnore[i])) {
                return true;
            }
        }

        return false;
    }; // isConsolidationNode()

    xpointerHelper.isWrappedTextNode = function(node) {
        if (!xpointerHelper.isWrapNode(node)) {
            return false;
        }

        if (!xpointerHelper.isTextNode(node.firstChild)) {
            return false;
        }

        return true;
    };

    xpointerHelper.isWrappedElementNode = function(node) {

        if (!xpointerHelper.isWrapNode(node)) {
            return false;
        }

        if (!xpointerHelper.isElementNode(node.firstChild)) {
            return false;
        }

        return true;
    };

    xpointerHelper.isNamedContentNode = function(node) {

        if (!xpointerHelper.isElementNode(node)) {
            return false;
        }

        var c = xpointerHelper.options.namedContentClasses;
        for (var i = c.length; i--;) {
            if (angular.element(node).hasClass(c[i])) {
                return true;
            }
        }

        return false;
    };

    xpointerHelper.isUIButton = function(node) {

        if (!xpointerHelper.isElementNode(node)) {
            return false;
        }

        if (angular.element(node).hasClass(xpointerHelper.options.textFragmentIconClass)) {
            return true;
        }

        return false;
    };


    // TODO: Maybe this belongs somewhere else .. need to refactor a bit of
    //       TextFragmentHandler service ....
    // Gets a safe page context, stripping out pundit-related query parameters
    xpointerHelper.getSafePageContext = function() {
        var uri = $window.location.href,
            fragment, query, queryObject;

        // If there's a fragment, save it and remove it from the uri
        if (uri.indexOf("#") !== -1) {
            fragment = uri.substring(uri.indexOf("#") + 1, uri.length);
            uri = uri.substring(0, uri.indexOf("#"));
        }

        // If there's a query, decode it and remove it from the uri. Look for the
        // pundit-show parameter and strips it out
        // TODO: "pundit-show" should be configurable ... ?
        if (uri.indexOf("?") !== -1) {
            query = uri.substring(uri.indexOf("?") + 1, uri.length);
            uri = uri.substring(0, uri.indexOf("?"));

            queryObject = $location.search();
            delete queryObject['pundit-show'];

            var queryArray = [];
            for (var p in queryObject) {
                queryArray.push(p + "=" + queryObject[p]);
            }
            query = queryArray.join("&");
        }

        // Build back the URI
        if (query) {
            uri += '?' + query;
        }
        if (fragment) {
            uri += '#' + fragment;
        }

        return decodeURIComponent(uri);
    };

    if (xpointerHelper.options.preventDelay === undefined) {
        EventDispatcher.addListener('Pundit.preventDelay', function(e) {
            preventDelay = e.args;
        });
    }

    xpointerHelper.log("Component up and running");
    return xpointerHelper;
});