/*global $:false */
angular.module('Pundit2.Core')
/**
 * @ngdoc service
 * @name Keyboard
 * @module Pundit2.Core
 * @description
 *
 * Keyboard Service offers keyboard keys and short cut handlers.
 */
.service('Keyboard', function ($rootScope, $document, BaseComponent) {
    // Keyboard service instance.
    var keyboard = new BaseComponent('Keyboard');

    // Internal state object.
    var state = {
        keyHandlers: {},
        consuming: {}
    };

    // Get event identifier string; it will be a string composed by initial of modifier keys (uppercase if pressed) with keycode
    // Example for Ctrl+Shift+D:
    //      'aCmS68'
    var getKeyIdentifier = function (eventKeyConfig) {
        var keyCode = eventKeyConfig.keyCode || eventKeyConfig.which;
        var result = "";
        result += (eventKeyConfig.altKey ? 'A' : 'a');
        result += (eventKeyConfig.ctrlKey ? 'C' : 'c');
        result += (eventKeyConfig.metaKey ? 'M' : 'm');
        result += (eventKeyConfig.shiftKey ? 'S' : 's');
        result += keyCode;

        return result;
    };

    // Normalize eventKeyConfig object, checks for and adds all missing properties; print an error message if mandatory properties are missing.
    var normalizeEventKeyConfig = function (eventKeyConfig) {
        var normalizedEventKeyConfig = {
            scope: undefined,
            priority: 0,
            module: null,
            keyCode: null,
            callbackParams: [],
            once: false,
            stopPropagation: false,
            ignoreOnInput: true,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false
        };

        var errorMessage = 'Invalid eventKeyConfig object, please see object documentation.';

        if (typeof eventKeyConfig.keyCode === 'undefined') {
            keyboard.err(errorMessage);
            return null;
        }

        if (!angular.isArray(eventKeyConfig.callbackParams)) {
            eventKeyConfig.callbackParams = normalizedEventKeyConfig.callbackParams;
        }

        angular.forEach(normalizedEventKeyConfig, function (value, key) {
            if (!angular.isDefined(eventKeyConfig[key])) {
                eventKeyConfig[key] = normalizedEventKeyConfig[key];
            }
        });

        if (!angular.isDefined(eventKeyConfig.handlerID)) {
            eventKeyConfig.handlerID = Math.floor((new Date()).getTime() / 100 * (Math.random() * 100) + 1);
        }

        // Normalize priority.
        eventKeyConfig.priority = eventKeyConfig.priority < 0 ? 0 : eventKeyConfig.priority;

        return eventKeyConfig;
    };

    var isFocusOnInputTextField = function () {
        if ($(document.activeElement).prop('tagName').toLowerCase() === 'input' &&
        $(document.activeElement).prop('type').toLowerCase() === 'text') {
            return true;
        }
        return false;
    };

    // Consumes event by calling all registered handlers callback.
    var consumeEvent = function (evt) {
        // Get event key identifier.
        var keyIdentifier = getKeyIdentifier(evt);
        if (null !== keyIdentifier) {
            // Semaphore for event.
            state.consuming[keyIdentifier] = true;
            // Get handlers for current event.
            var handlers = state.keyHandlers[keyIdentifier];
            if (angular.isArray(handlers)) {
                // Cycling handlers.
                for (var i in handlers) {
                    var eventHandlerConfig = handlers[i];
                    if (eventHandlerConfig.ignoreOnInput && isFocusOnInputTextField()) {
                        continue;
                    }
                    // Consuming handler.
                    eventHandlerConfig.callback.apply(eventHandlerConfig.scope, [
                        evt,
                        eventHandlerConfig
                    ]);
                    // Check if handler needs to bee removed automatically.
                    if (eventHandlerConfig.once) {
                        handlers[i] = null;
                    }
                    // Check if no further handlers have to be evaluated.
                    if (eventHandlerConfig.stopPropagation) {
                        break;
                    }
                }
                // Update state handlers by removing null elements.
                state.keyHandlers[keyIdentifier] = handlers.filter(function (elem) {
                    return elem !== null;
                });
                delete state.consuming[keyIdentifier];
                return true;
            }
        }
        delete state.consuming[keyIdentifier];
        return false;
    };

    /**
     * @ngdoc method
     * @name Keyboard#off
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Disable serivce.
     */
    keyboard.off = function () {
        $document.off('keydown.keyboardService');
    };

    /**
     * @ngdoc method
     * @name Keyboard#off
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Enable serivce.
     */
    keyboard.on = function () {
        // Base keydown event handlers.
        $document.on('keydown.keyboardService', function (evt) {
            keyboard.log("keydown - " + keyboard.eventToString(evt));
            keyboard.log(evt);
            var keyCode = evt.keyCode || evt.which;
            switch (keyCode) {
                case 16:
                case 17:
                case 18:
                case 91:
                    // Ignore single key down for SHIFT, CTRL, META and ALT keys
                    break;
                default:
                    var preventDefault = consumeEvent(evt);
                    if (preventDefault) {
                        evt.stopPropagation();
                        evt.stopImmediatePropagation();
                        evt.preventDefault();
                        return false;
                    }
            }
        });
    };

    /**
     * @ngdoc method
     * @name Keyboard#getState
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Get current state. It's only used during unit test to verify other methods.
     *
     * @return {object} internal state object.
     */
    keyboard.getState = function () {
        return state;
    };

    /**
     * @ngdoc method
     * @name Keyboard#eventToString
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Convert event object to string.
     *
     * @return {string} output string, exemple for Ctrl+Shift+D: [ alt ] [(CTRL)] [ meta ] [(SHIFT)] [68]
     */
    keyboard.eventToString = function (evt) {
        var output = "";
        output += '[' + (evt.altKey ? '(ALT)' : ' alt ') + '] ';
        output += '[' + (evt.ctrlKey ? '(CTRL)' : ' ctrl ') + '] ';
        output += '[' + (evt.metaKey ? '(META)' : ' meta ') + '] ';
        output += '[' + (evt.shiftKey ? '(SHIFT)' : ' shift ') + '] ';
        output += '[' + evt.keyCode + ']';
        return output;
    };

    /**
     * @ngdoc method
     * @name Keyboard#registerHandler
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Register an event handler for key combination described by eventKeyConfig object.
     *
     * @param {string} module name
     * @param {object} event Key configuration object, an object with the following properties:
     *      - scope: {object} scope, default : undefined
     *      - priority: {number} execution priority, default : 0
     *      - module: {string} module name, default: null
     *      - callbackParams: {array} additional parameters passed to callback function, default: []
     *      - once: {boolean} defines if event must be consumed only once, default: false
     *      - stopPropagation: {boolean} defines if event must block other event handlers, default: false
     *      - ignoreOnInput: {boolean} ignore event when focus is on input text field
     *      - altKey: {boolean} event key combination, default false
     *      - ctrlKey: {boolean} event key combination, default false
     *      - metaKey: {boolean} event key combination, default false
     *      - shiftKey: {boolean} event key combination, default false
     *      - keyCode: {number} key code (mandatory property)
     * @param {function} callback
     *
     * @return {object} eventKeyConfig normalized with all properties plus handlerID
     * @see `Keyboard.unregisterHandler`
     */
    keyboard.registerHandler = function (module, eventKeyConfig, callback) {
        var normalizedEventKeyConfig = normalizeEventKeyConfig(eventKeyConfig);
        if (null === normalizedEventKeyConfig) {
            return null;
        }

        if (typeof callback !== 'function') {
            keyboard.err('Invalid callback given.');
            return null;
        }

        var keyIdentifier = getKeyIdentifier(eventKeyConfig);
        var handlers = state.keyHandlers[keyIdentifier];

        if (typeof handlers === 'undefined') {
            state.keyHandlers[keyIdentifier] = handlers = [];
        }

        normalizedEventKeyConfig.callback = callback;
        normalizedEventKeyConfig.module = module;

        if (handlers.length === 0) {
            handlers.push(normalizedEventKeyConfig);
        }
        else {
            var added = false;
            for (var i = 0; i < handlers.length; i++) {
                if (normalizedEventKeyConfig.priority >= handlers[i].priority) {
                    handlers.splice(i, 0, normalizedEventKeyConfig);
                    added = true;
                    break;
                }
            }
            if (!added) {
                handlers.push(normalizedEventKeyConfig);
            }
        }

        return normalizedEventKeyConfig;
    };

    /**
     * @ngdoc method
     * @name Keyboard#unregisterHandler
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Unregister an event handler described by eventKeyConfig object.
     *
     * @see `Keyboard.registerHandler`
     */
    keyboard.unregisterHandler = function (eventKeyConfig) {
        var normalizedEventKeyConfig = normalizeEventKeyConfig(eventKeyConfig);
        if (null === normalizedEventKeyConfig) {
            return;
        }
        var keyIdentifier = getKeyIdentifier(eventKeyConfig);
        var handlers = state.keyHandlers[keyIdentifier];
        if (typeof handlers === 'undefined') {
            return;
        }

        for (var i in handlers) {
            if (handlers[i].handlerID === eventKeyConfig.handlerID) {
                handlers[i] = null;
                break;
            }
        }

        if (!angular.isDefined(state.consuming[keyIdentifier])) {
            state.keyHandlers[keyIdentifier] = handlers.filter(function (elem) {
                return elem !== null;
            });
        }
    };

    /**
     * @ngdoc method
     * @name Keyboard#unregisterAllHandlers
     * @module Pundit2.Core
     * @function
     *
     * @description
     * Unregister all handlers.
     */
    keyboard.unregisterAllHandlers = function () {
        state.keyHandlers = {};
    };

    // Enable Service.
    keyboard.on();

    return keyboard;
});