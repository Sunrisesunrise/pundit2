angular.module('Pundit2.VocabulariesContainer')

.constant('VOCABULARIESCONTAINERDEFAULTS', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer
     *
     * @description
     * `object`
     *
     * Configuration object for VocabulariesContainer service.
     *
     * All selectors shown its items by VocabulariesContainer directive.
     */

    /**
     * @ngdoc property
     * @name modules#VocabulariesContainer.active
     *
     * @description
     * `boolean`
     *
     * Default state of the VocabulariesContainer module, if it is set to true
     * the client adds to the DOM (inside dashboard) the VocabulariesContainer directive in the boot phase.
     *
     * When selector manager is activated by default all selectors are active (Freebase, Korbo, ...),
     * to turn off a specific selector is necessary to set to false the active property
     * in the configuration object of the specific selector.
     *
     * Default value:
     * <pre> active: true </pre>
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.clientDashboardTemplate
     *
     * @description
     * `string`
     *
     * Path of template containing VocabulariesContainer directive, client will append the content of this template
     * to the DOM (inside dashboard directive) to bootstrap this component
     *
     * Default value:
     * <pre> clientDashboardTemplate: "src/Lists/VocabulariesContainer/ClientVocabulariesContainer.tmpl.html" </pre>
     */
    clientDashboardTemplate: "src/Lists/VocabulariesContainer/ClientVocabulariesContainer.tmpl.html",

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.clientDashboardPanel
     *
     * @description
     * `string`
     *
     * Name of the panel where append the VocabulariesContainer directive (legal value to default are: 'lists', 'tools' and 'details')
     *
     * Default value:
     * <pre> clientDashboardPanel: "lists" </pre>
     */
    clientDashboardPanel: "lists",

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.clientDashboardTabTitle
     *
     * @description
     * `string`
     *
     * Tab title inside panel dashboard tabs.
     *
     * Default value:
     * <pre> clientDashboardTabTitle: "Vocab" </pre>
     */
    clientDashboardTabTitle: "Vocab",

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.cMenuType
     *
     * @description
     * `string`
     *
     * Contextual menu type showed by items contained inside VocabulariesContainer directive.
     *
     * Default value:
     * <pre> cMenuType: 'vocabItems' </pre>
     */
    cMenuType: 'vocabItems',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.debug
     *
     * @description
     * `boolean`
     *
     * Active debug log.
     *
     * Default value:
     * <pre> debug: false </pre>
     */
    debug: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.order
     *
     * @description
     * `string`
     *
     * Default items property used to sort items list inside VocabulariesContainer directive (legal value are: 'label' and 'type').
     *
     * Default value:
     * <pre> order: 'label' </pre>
     */
    order: 'label',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.reverse
     *
     * @description
     * `boolean`
     *
     * Default items ordering inside VocabulariesContainer directive (true: ascending, false: descending).
     *
     * Default value:
     * <pre> reverse: false </pre>
     */
    reverse: false,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.initialActiveTab
     *
     * @description
     * `number`
     *
     * Default displayed tab
     *
     * Default value:
     * <pre> initialActiveTab: 0 </pre>
     */
    initialActiveTab: 0,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.inputIconSearch
     *
     * @description
     * `string`
     *
     * Icon shown in the search input when it's empty.
     *
     * Default value:
     * <pre> inputIconSearch: 'pnd-icon-search' </pre>
     */
    inputIconSearch: 'pnd-icon-search',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#VocabulariesContainer.inputIconClear
     *
     * @description
     * `string`
     *
     * Icon shown in the search input when it has some content.
     *
     * Default value:
     * <pre> inputIconClear: 'pnd-icon-times' </pre>
     */
    inputIconClear: 'pnd-icon-times'

})

.service('VocabulariesContainer', function(VOCABULARIESCONTAINERDEFAULTS, BaseComponent) {

    // empty service only used inside Client.service.js to read the default configuration
    // and build the expected interface inside list panel

    return new BaseComponent('VocabulariesContainer', VOCABULARIESCONTAINERDEFAULTS);

});