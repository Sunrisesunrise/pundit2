angular.module('Pundit2.Annotators')

.constant('IMAGEHANDLERDEFAULTS', {
     /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler
     *
     * @description
     * `object`
     *
     * Configuration for Image Handler module
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler.removeSelectionOnAbort
     *
     * @description
     * `boolean`
     *
     * If true, whet user select some content classed as ignored (see ignoreClasses), selected content will get reseted.
     *
     * Default value:
     * <pre> removeSelectionOnAbort: true </pre>
     */
    removeSelectionOnAbort: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler.ignoreClasses
     *
     * @description
     * `array of string`
     *
     * List of classes added to content to ignore it and not annotate it.
     * Any content classed with any of these class will get ignored by the handler.
     * If selection to annotate start, ends or contains one of those classes, nothing will happen
     *
     * Default value:
     * <pre> ignoreClasses: ['pnd-ignore'] </pre>
     */
    ignoreClasses: ['pnd-ignore'],

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler.useTemporarySelection
     *
     * @description
     * `boolean`
     *
     * Activate listeners for temporary selections
     *
     * Default value:
     * <pre> useTemporarySelection: false </pre>
     */
    useTemporarySelection: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler.container
     *
     * @description
     * `string`
     *
     * Name of the container used to store the image in the itemsExchange
     *
     * Default value:
     * <pre> container: 'createdTextFragments' </pre>
     */
    container: 'createdImage',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler.cMenuType
     *
     * @description
     * `string`
     *
     * Contextual menu type shown over image
     *
     * Default value:
     * <pre> cMenuType: 'ImageHandlerItem' </pre>
     */
    cMenuType: 'imageHandlerItem',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ImageHandler.labelMaxLength
     *
     * @description
     * `number`
     *
     * Maximum characters number of image src used to create the label for annotation.
     *
     * Default value:
     * <pre> labelMaxLength: 40 </pre>
     */
    labelMaxLength: 40

})

.service('ImageHandler', function(IMAGEHANDLERDEFAULTS, NameSpace, BaseComponent, Config,
    TextFragmentHandler, XpointersHelper, Item, $compile, $timeout, $rootScope, ItemsExchange, TripleComposer, EventDispatcher, $document, Toolbar, Consolidation) {

    var imageHandler = new BaseComponent('ImageHandler', IMAGEHANDLERDEFAULTS);

    // This function must be executed before than pundit is appended to DOM
    var timeoutPromise = null,
        exist = false,
        el = null,
        dir = null;

    var lastTemporaryConsolidable,
        temporaryConsolidated = {};


    var checkTemporaryConsolidated = function(forceWipe) {
        if (typeof forceWipe === 'undefined') {
            forceWipe = false;
        }
        if (Object.keys(temporaryConsolidated).length === 0) {
            return;
        }
        var validUris = {};
        var statements = TripleComposer.getStatements();
        statements.forEach(function(el) {
            if (typeof el.scope === 'undefined') {
                return;
            }
            var triple = el.scope.get();
            if (typeof triple.subject !== 'undefined' && triple.subject !== null && typeof triple.subject.uri !== 'undefined') {
                validUris[triple.subject.uri] = true;
            }
            if (typeof triple.object !== 'undefined' && triple.object !== null && typeof triple.object.uri !== 'undefined') {
                validUris[triple.object.uri] = true;
            }
        });

        for (var uri in temporaryConsolidated) {
            if (forceWipe || typeof validUris[uri] === 'undefined') {
                var temporaryFragmentId = temporaryConsolidated[uri].fragmentId;
                imageHandler.wipeFragmentIds([temporaryFragmentId]);
                imageHandler.setItemAsTemporary(uri, false);
                delete temporaryConsolidated[uri];
            }
        }

        if (forceWipe) {
            lastTemporaryConsolidable = undefined;
            ItemsExchange.wipeTemporaryItems();
        }
    };

    var consolidateTemporarySelection = function() {
        for (var uri in temporaryConsolidated) {
            var temporaryFragmentId = temporaryConsolidated[uri].fragmentId,
                temporaryFragmentUri = imageHandler.getFragmentUriById(temporaryFragmentId);

            Consolidation.updateItemListAndMap(ItemsExchange.getItemByUri(temporaryFragmentUri), 'text');
            imageHandler.placeIconByFragmentId(temporaryFragmentId);

            angular.element('.' + temporaryFragmentId)
                .removeClass(XpointersHelper.options.textFragmentHiddenClass)
                .removeAttr('temp-fragments')
                .removeClass('pnd-cons-temp');
            delete temporaryConsolidated[uri];
        }
        lastTemporaryConsolidable = undefined;
    };

    var addTemporarySelection = function() {
        if (typeof lastTemporaryConsolidable !== 'undefined') {
            XpointersHelper.wrapElement(
                lastTemporaryConsolidable.range.commonAncestorContainer,
                lastTemporaryConsolidable.range,
                'span', 'pnd-cons-temp pnd-cons', [lastTemporaryConsolidable.fragmentId],
                true,
                lastTemporaryConsolidable.itemUri
            );
            temporaryConsolidated[lastTemporaryConsolidable.itemUri] = lastTemporaryConsolidable;
            ItemsExchange.setItemAsTemporary(lastTemporaryConsolidable.itemUri, true);
            lastTemporaryConsolidable = undefined;
        }
    };

    // If configured to do so, removes the user's selection from the browser
    var removeSelection = function() {
        if (imageHandler.options.removeSelectionOnAbort) {
            $document[0].getSelection().removeAllRanges();
        }
    };

    var clear = function() {
        // remove css class from img
        el.removeClass('pnd-pointed-img');
        // remove directive
        dir.remove();
        // update state var
        exist = false;
        el = null;
    };

    var mouseOver = function(evt) {
        imageHandler.clearTimeout();
        if (el !== null && evt.target.src !== el[0].src) {
            clear();
        }
        if (!exist) {
            // store a target (img) reference
            el = angular.element(evt.target)
                .addClass('pnd-pointed-img')
                .after('<img-menu ref="pnd-pointed-img"></img-menu>');
            // store a directive reference
            dir = $compile(angular.element('img-menu'))($rootScope);
            exist = true;
        }
    };

    var mouseOut = function() {
        // remove directive after 250ms
        imageHandler.removeDirective();
    };

    angular.element('img').hover(mouseOver, mouseOut);

    var getXpFromNode = function(node) {

        var range = document.createRange();
        range.selectNode(node);
        var index = [].indexOf.call(node.parentNode.children, el.context) + 1;
        return XpointersHelper.range2xpointer(range, index);
    };

    // TODO: ???
    function mouseUpHandler(upEvt) {
        lastTemporaryConsolidable = undefined;
        // TODO: please .. 
        if (clientHidden) {
            return;
        }

        $document.off('mouseup', mouseUpHandler);

        var target = upEvt.target;
        if (imageHandler.isToBeIgnored(target)) {
            // TODO: nain
            textFragmentHandler.log('ABORT: ignoring mouse UP event on document: ignore class spotted.');
            removeSelection();
            return;
        }

        var range = imageHandler.getSelectedRange();
        if (range === null) {
            return;
        }

        // Check every node contained in this range: if we select something which starts
        // and ends inside the same text node the length will be 0: everything is ok.
        // Otherwise check that every contained node must not be ignored
        var nodes = range.cloneContents().querySelectorAll('*'),
            nodesLen = nodes.length;
        while (nodesLen--) {
            if (textFragmentHandler.isToBeIgnored(nodes[nodesLen])) {
                // TODO: nain!
                textFragmentHandler.log('ABORT: ignoring range: ignore class spotted inside it, somewhere.');
                removeSelection();
                return;
            }
        }

        // TODO: this will create a new item in our container at each valid user selection.
        // how to wipe them up? If the user keeps selecting stuff we end up with LOADS and
        // LOADS of unused items.
        // Problem: the item might be used by the triple composer, or added to my items or
        // discarded at all.
        // Possible solution: wipe the container when triple composer is empty, ctx menu is
        // NOT shown on every dashboard open/close ?
        var item = imageHandler.createItemFromRange(range),
            currentFr = 'imgf-' + (new Date()).getTime();
        ItemsExchange.addItemToContainer(item, imageHandler.options.container);

        lastTemporaryConsolidable = {
            offset: range.endOffset,
            range: range,
            xpointer: item.getXPointer(),
            fragmentId: currentFr,
            itemUri: item.uri
        };

        //XpointersHelper.wrapElement(range.commonAncestorContainer, range, 'span', 'pnd-cons-temp', [lastTemporaryConsolidable.fragmentId]);
        //temporaryConsolidated[item.uri] = lastTemporaryConsolidable;

        imageHandler.log('Valid selection ended on document. Text fragment Item produced: ' + item.label);

        if (Toolbar.isActiveTemplateMode() && Config.clientMode === 'pro') {
            imageHandler.log('Item used as subject inside triple composer (template mode active).');
            TripleComposer.addToAllSubject(item);
            TripleComposer.closeAfterOp();
            addTemporarySelection();
            EventDispatcher.sendEvent('Annotators.saveAnnotation');
            return;
        }

        // TODO: generalize item in {data}
        // TODO: -.-''' handlerMenu?! 
        var promise = handlerMenu.show(upEvt.pageX, upEvt.pageY, item, imageHandler.options.cMenuType, currentFr);
        if (typeof promise !== 'undefined' && promise !== false) {
            promise.then(function() {
                // TODO: NAIN
                textFragmentHandler.log('textFragmentHandler handlerMenu.show promise resolved');
            });
        }
    } // mouseUpHandler()

    // Creates a proper Item from a range .. it must be a valid range, kktnx.
    imageHandler.createItemFromRange = function(range) {
        var values = {};

        values.uri = XpointersHelper.range2xpointer(range);
        values.type = [NameSpace.fragments.text];
        values.description = range.toString();

        values.label = values.description;
        if (values.label.length > imageHandler.options.labelMaxLength) {
            values.label = values.label.substr(0, imageHandler.options.labelMaxLength) + ' ..';
        }

        values.pageContext = XpointersHelper.getSafePageContext();
        values.isPartOf = values.uri.split('#')[0];

        return new Item(values.uri, values);
    };

    imageHandler.getSelectedRange = function() {
        var doc = $document[0],
            range;

        if (doc.getSelection().rangeCount === 0) {
            // TODO: NAIN!
            textFragmentHandler.log('getSelection().rangeCount is 0: no selected range.');
            return null;
        }

        range = doc.getSelection().getRangeAt(0);

        // If the selected range is empty (this happens when the user clicks on something)...
        if (range !== null &&
            range.startContainer === range.endContainer &&
            range.startOffset === range.endOffset) {

            imageHandler.log('Range is not null, but start/end containers and offsets match: no selected range.');
            return null;
        }

        imageHandler.log('GetSelectedRange returning a DIRTY range: ' +
            range.startContainer.nodeName + '[' + range.startOffset + '] > ' +
            range.endContainer.nodeName + '[' + range.endOffset + ']');

        return range;
    }; // getSelectedRange()

    // Checks if the node (or any parent) is a node which needs to be ignored
    imageHandler.isToBeIgnored = function(node) {
        var classes = imageHandler.options.ignoreClasses,
            ignoreLen = classes.length;

        // Traverse every parent and check if it has one of the classes we
        // need to ignore. As soon as we find one, return true: must ignore.
        while (node.nodeName.toLowerCase() !== 'body') {
            for (var i = ignoreLen; i--;) {
                if (angular.element(node).hasClass(classes[i])) {
                    return true;
                }
            }

            // If there's no parent node .. even better, we didnt find anything wrong!
            if (node.parentNode === null) {
                return false;
            }
            node = node.parentNode;
        }
        return false;
    };

    imageHandler.turnOn = function() {
        angular.element('img').hover(mouseOver, mouseOut);
    };

    imageHandler.turnOff = function() {
        angular.element('img').unbind('mouseenter mouseleave');
    };

    imageHandler.clearTimeout = function() {
        if (timeoutPromise !== null) {
            $timeout.cancel(timeoutPromise);
            timeoutPromise = null;
        }
    };

    imageHandler.removeDirective = function() {
        timeoutPromise = $timeout(function() {
            clear();
        }, 100);
    };

    imageHandler.createItemFromImage = function(img) {
        var values = {};

        values.uri = getXpFromNode(img);
        values.type = [NameSpace.types.image];
        values.description = img.src;
        values.image = img.src;

        values.label = values.description;
        if (values.label.length > imageHandler.options.labelMaxLength) {
            values.label = values.label.substr(0, imageHandler.options.labelMaxLength) + ' ..';
        }

        values.pageContext = XpointersHelper.getSafePageContext();
        values.isPartOf = values.uri.split('#')[0];

        return new Item(values.uri, values);
    };

    imageHandler.wipeTemporarySelection = function() {
        checkTemporaryConsolidated(true);
    };

    if (imageHandler.options.useTemporarySelection) {
        EventDispatcher.addListeners([
            'PndPopover.addTemporarySelection',
            'TripleComposer.useAsObject',
            'TripleComposer.useAsSubject'
        ], function() {
            addTemporarySelection();
        });

        EventDispatcher.addListeners([
            'PndPopover.removeTemporarySelection',
            'TripleComposer.statementChange',
            'TripleComposer.statementChanged',
            'TripleComposer.reset'
        ], function() {
            checkTemporaryConsolidated();
        });

        EventDispatcher.addListeners(
            [
                'PndPopover.wipeTemporarySelections',
                'Consolidation.startConsolidate',
                'Client.hide',
            ],
            function() {
                checkTemporaryConsolidated(true);
            }
        );

        EventDispatcher.addListeners([
            'AnnotationsCommunication.annotationSaved',
            'AnnotationsCommunication.editAnnotation'
        ], function() {
            consolidateTemporarySelection();
        });
    }

    return imageHandler;

});