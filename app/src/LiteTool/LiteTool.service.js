angular.module('Pundit2.LiteTool')

.constant('LITETOOLDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#LiteTool
     *
     * @description
     * `object`
     *
     * Configuration for LiteTool module.
     * LiteTool is always visible and positioned at the top of the page
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#LiteTool.clientDomTemplate
     *
     * @description
     * `string`
     *
     * Path of template containing lite-tool directive
     * The Client will append the content of this template to the DOM to bootstrap this component
     *
     * Default value:
     * <pre> clientDomTemplate: "src/LiteTool/ClientLiteTool.tmpl.html" </pre>
     */
    clientDomTemplate: "src/LiteTool/ClientLiteTool.tmpl.html",
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#LiteTool.debug
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

.service('LiteTool', function(BaseComponent, EventDispatcher, LITETOOLDEFAULTS/*, Config, MyPundit*/) {

    var liteTool = new BaseComponent('LiteTool', LITETOOLDEFAULTS);

    liteTool.log('Up and running');
    return liteTool;
});