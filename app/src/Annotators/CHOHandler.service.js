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

        //find pnd-resource
        var CHOElem = angular.element("[pnd-resource]");
        //add directive attribute
        CHOElem.addClass("cho-menu");
        //compile the DOM
        $compile(angular.element("[pnd-resource]"))($rootScope);

        return CHO;

    });