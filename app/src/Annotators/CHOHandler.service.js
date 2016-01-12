angular.module('Pundit2.Annotators')

    .constant('CHOHANDLERDEFAULTS', {
        /**
         * @module punditConfig
         * @ngdoc property
         * @name modules#CHOHandler.ignoreClasses
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


        // Contextual menu type triggered by the text fragment handler. An Item will
        // be passed as resource

        /**
         * @module punditConfig
         * @ngdoc property
         * @name modules#CHOHandler.cMenuType
         *
         * @description
         * `string`
         *
         * Contextual menu type shown over image
         *
         * Default value:
         * <pre> cMenuType: 'CHOHandlerItem' </pre>
         */
        cMenuType: "CHOHandlerItem",

        /**
         * @module punditConfig
         * @ngdoc property
         * @name modules#CHOHandler.labelMaxLength
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

    .service('CHOHandler', function(CHOHANDLERDEFAULTS, NameSpace, BaseComponent, Config,
                                      TextFragmentHandler, XpointersHelper, Item, $compile, $timeout, $rootScope) {

        var CHO = new BaseComponent('CHOHandler', CHOHANDLERDEFAULTS);

        // This function must be executed before than pundit is appended to DOM
        var timeoutPromise = null,
            exist = false,
            el = null,
            dir = null;

        var clear = function() {
            // remove css class from CHO
            el.removeClass('pnd-pointed-CHO');
            // remove directive
            dir.remove();
            // update state var
            exist = false;
            el = null;
        };

        var mouseOver = function(evt) {
            CHO.clearTimeout();
            if (el !== null && evt.target.src !== el[0].src) {
                clear();
            }
            if (!exist) {
                // store a target (CHO) reference
                el = angular.element(evt.target)
                    .addClass('pnd-pointed-CHO')
                    .after('<CHO-menu ref="pnd-pointed-CHO"></CHO-menu>');
                // store a directive reference
                dir = $compile(angular.element('img-CHO'))($rootScope);
                exist = true;
            }
        };
        var mouseOut = function() {
            // remove directive after 250ms
            CHO.removeDirective();
        };

        angular.element('CHO').hover(mouseOver, mouseOut);

        var getXpFromNode = function(node) {
            var range = document.createRange();
            range.selectNode(node);
            return TextFragmentHandler.range2xpointer(range);
        };
        scope.CHOclickHandler = function(evt) {
            el = angular.element("CHOIcon");
            evt.preventDefault();
            evt.stopPropagation();

            CHOHandler.clearTimeout();

            if (scope.item === null) {
                // create item only once
                scope.item = CHOHandler.createItemFromCHO(scope.CHO[0]);
                ItemsExchange.addItemToContainer(scope.item, CHOHandler.options.container);
            }

            if (Toolbar.isActiveTemplateMode()) {
                var triples = TemplatesExchange.getCurrent().triples;
                // verify that all predicates admit images as subject
                // all template triples must be have a predicate

                //for (var i in triples) {
                //    if (triples[i].predicate.suggestedSubcjetTypes.indexOf(NameSpace.types.image) === -1) {
                //        return;
                //    }
                //}

                TripleComposer.addToAllSubject(ItemsExchange.getItemByUri(scope.item.uri));
                TripleComposer.closeAfterOp();
                EventDispatcher.sendEvent('Annotators.saveAnnotation');
                return;
            }

            var item = ItemsExchange.getItemByUri(scope.item.uri);
            ContextualMenu.show(evt.pageX, evt.pageY, item, ImageHandler.options.cMenuType);

        };


        CHO.turnOn = function() {
            angular.element('CHO').hover(mouseOver, mouseOut);
        };

        CHO.turnOff = function() {
            angular.element('CHO').unbind('mouseenter mouseleave');
        };

        CHO.clearTimeout = function() {
            if (timeoutPromise !== null) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = null;
            }
        };

        CHO.removeDirective = function() {
            timeoutPromise = $timeout(function() {
                clear();
            }, 100);
        };

        CHO.createItemFromCHO = function(CHO) {
            var values = {};

            values.uri = getXpFromNode(CHO);
            values.type = [NameSpace.types.image];
            values.description = CHO.src;
            values.image = CHO.src;

            values.label = values.description;
            if (values.label.length > CHO.options.labelMaxLength) {
                values.label = values.label.substr(0, CHO.options.labelMaxLength) + ' ..';
            }

            values.pageContext = XpointersHelper.getSafePageContext();
            values.isPartOf = values.uri.split('#')[0];

            return new Item(values.uri, values);
        };

        return CHO;

    });