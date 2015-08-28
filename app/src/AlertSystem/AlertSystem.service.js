angular.module('Pundit2.AlertSystem')

.constant('ALERTSYSTEMDEFAULTS', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AlertSystem
     *
     * @description
     * `object`
     *
     * Configuration object for AlertSystem module.
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AlertSystem.annotationsRefresh
     *
     * @description
     * `number`
     *
     * Delay in ms for the dismiss of the notifications
     *
     * Default value:
     * <pre> defaultDismissTime: 5000 </pre>
     */
    defaultDismissTime: 5000,

    forceAnimationOnClose: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AlertSystem.clientDomTemplate
     *
     * @description
     * `string`
     *
     * The Client will append the content of this template to the DOM to bootstrap this component
     *
     * Default value:
     * <pre> clientDomTemplate: 'src/AlertSystem/ClientAlertSystem.tmpl.html' </pre>
     */
    clientDomTemplate: 'src/AlertSystem/ClientAlertSystem.tmpl.html',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#AlertSystem.debug
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

// TODO Add method documentation in JSDoc

.service('AlertSystem', function(BaseComponent, $timeout, ALERTSYSTEMDEFAULTS, EventDispatcher, $rootScope) {

    var alertSystem = new BaseComponent('AlertSystem', ALERTSYSTEMDEFAULTS);

    var alerts = [];
    var id = 0;
    var timeouts = {};

    var animQueue = [];
    var animating = false;

    var processAnimQueue = function() {
        if (animQueue.length === 0) {
            animating = false;
            return;
        }
        var alert = animQueue.shift(),
            animObject = {},
            elem;

        if (alert.animShow) {
            elem = $('alert-system div[data-alert-id="' + alert.id + '"]');
            var h = elem.height() + parseInt(elem.css('paddingTop')) + parseInt(elem.css('paddingBottom')) + parseInt(elem.css('borderTop'));

            animObject.marginBottom = elem.css('marginBottom');
            animObject.opacity = 1;

            elem.css('margin-bottom', '-' + h +'px')
                .css('display', 'block');//
        }
        else if (alert.animHide) {
            elem = $('alert-system div[data-alert-id="' + alert.id + '"]');
            var width = elem.width();
            elem.css('margin-bottom', '-' + h +'px')
                .css('min-height', '0px');

            animObject.opacity = 0;
            animObject.marginBottom = '0px';
            //animObject.marginLeft = '-'+width+'px';
            animObject.height = '0px';
            animObject.paddingTop = '0px';
            animObject.paddingBottom = '0px';
            animObject.borderTopWidth = '0px';
            animObject.borderBottomWidth = '0px';

            if (alertSystem.options.forceAnimationOnClose && !alert.animate) {
                alert.animDelay = alertSystem.AlertType.INFO.animDelay;
            }
        }

        if (typeof elem !== 'undefined') {
            alert.animating = true;
            elem.animate(animObject, alert.animDelay, function() {
                if (alert.animHide) {
                    doClearAlert(alert);
                    $rootScope.$$phase || $rootScope.$digest();
                }
                else {
                    if (alert.timeout) {
                        var td = alert.timeout / 1000;
                        alert.progress = $('div[data-alert-id="'+alert.id+'"] .pnd-alert-progress');
                        alert.progress.css('-webkit-transition-duration', td + 's')
                        .css('transition-duration', td + 's')
                        .css('width', '100%');
                        alert.animating = false;
                        alertSystem.resetAlertTimeout(alert);
                    }
                }
                alert.animating = false;
                processAnimQueue();
            });
        }
        else {
            processAnimQueue();
        }
    };

    alertSystem.show = function(alert) {
        if (alert.animShow || alert.animHide) {
            return;
        }
        alert.animShow = true;
        animQueue.push(alert);
        if (animating) {
            return;
        }
        animating = true;
        alert.animating = true;
        processAnimQueue();
    };

    alertSystem.animHide = function(alert) {
        alert.animHide = true;
        animQueue.push(alert);
        if (animating) {
            return;
        }
        animating = true;
        alert.animating = true;
        processAnimQueue();
    };

    /**
     * Enumeration of alert type with relatives default values
     * @type {{OK: {id: string, alertClass: string, timeout: number, top: boolean, dismissible: boolean}, ERROR: {id: string, alertClass: string, timeout: null, top: boolean, dismissible: boolean}, ALERT: {id: string, alertClass: string, timeout: null, top: boolean, dismissible: boolean}, CUSTOM: {id: string, alertClass: string, timeout: null, top: boolean, dismissible: boolean}}}
     */
    alertSystem.AlertType = {
        SUCCESS: {
            id: 'SUCCESS',
            alertClass: 'pnd-alert-success',
            timeout: alertSystem.options.defaultDismissTime,
            top: true,
            dismissible: true,
            animate: true,
            animDelay: 400
        },
        ERROR: {
            id: 'ERROR',
            alertClass: 'pnd-alert-error',
            timeout: null,
            top: true,
            dismissible: true,
            animate: true,
            animDelay: 400
        },
        INFO: {
            id: 'INFO',
            alertClass: 'pnd-alert-info',
            timeout: null,
            top: true,
            dismissible: true,
            animate: true,
            animDelay: 400
        },
        WARNING: {
            id: 'WARNING',
            alertClass: 'pnd-alert-warning',
            timeout: null,
            top: true,
            dismissible: true,
            animate: true,
            animDelay: 400
        }
    };

    alertSystem.alerts = alerts;

    /**
     * Private function that return the key associated to a timeout promise
     * @param id
     */
    var getTimeoutKey = function(id) {
        return 'timeout' + id;
    };

    var setTimeout = function(alert) {
        var key = getTimeoutKey(alert.id);
        var promise = $timeout(function() {
            alertSystem.clearAlert(alert);
        }, alert.timeout);
        timeouts[key] = promise;
    };

    var getAlert = function(id) {
        for (var i = 0; i < alerts.length; i++) {
            var alert = alerts[i];
            if (alert.id === id) {
                return alert;
            }
        }
        return null;
    };

    /**
     * @ngdoc method
     * @name AlertSystem#addAlert
     * @module Pundit2.AlertSystem
     * @function
     *
     * @description
     * Add an alert
     *
     * @param {type}
     * @param {message}
     * @param {timeout}
     * @param {top}
     * @param {dismissible}
     * @param {alertClass}
     *
     */
    alertSystem.addAlert = function(type, message, title, timeout, top, dismissible, alertClass) {
        var newId,
            alert;

        alerts = alerts || [];
        id = (id || 0) + 1;

        newId = id;

        timeout = typeof(timeout) !== 'undefined' ? timeout : type.timeout;
        top = typeof(top) !== 'undefined' ? top : type.top;
        dismissible = typeof(dismissible) !== 'undefined' ? dismissible : type.dismissible;
        alertClass = alertClass || type.alertClass;

        alert = {
            id: newId,
            type: type.id,
            alertClass: alertClass,
            message: message,
            timeout: timeout,
            dismissible: dismissible,
            title: title,
            initStyle: type.animate ? 'display: none; opacity: 0' : '',
            animDelay: type.animate ? isNaN(type.animDelay) ? alertSystem.AlertType.INFO.animDelay : type.animDelay : 1
        };

        if (top) {
            alerts.unshift(alert);
            alertSystem.log('Pushed alert on top');
        } else {
            alerts.push(alert);
            alertSystem.log('Pushed alert on bottom');
        }
        $rootScope.$$phase || $rootScope.$apply(function() {
            console.log("after apply");
            console.log($('[data-alert-id="'+alert.id+'"]'));
        });
        if (timeout) {
            setTimeout(alert);
        }
    };

    /**
     * @ngdoc method
     * @name AlertSystem#clearAlerts
     * @module Pundit2.AlertSystem
     * @function
     *
     * @description
     * Clear all alerts
     *
     */
    alertSystem.clearAlerts = function() {
        for (var i = 0; i < alerts.length; i++) {
            var alert = alerts[i];
            alertSystem.removeTimeout(alert.id);
        }
        alerts.splice(0, alerts.length);
    };

    /**
     * @ngdoc method
     * @name AlertSystem#clearAlert
     * @module Pundit2.AlertSystem
     * @function
     *
     * @description
     * Clear an alert by id
     *
     * @param {id} id of the alert
     *
     */
    alertSystem.clearAlert = function(alert) {
        delete alert.animShow;
        alert.animHide = true;
        alertSystem.animHide(alert);
    };

    var doClearAlert = function(alert) {
        alertSystem.removeTimeout(alert.id);
        var alertToRemove = -1;
        for (var i = 0; i < alerts.length; i++) {
            if (alerts[i].id === alert.id) {
                alertToRemove = i;
                break;
            }
        }
        if (alertToRemove !== -1) {
            alerts.splice(alertToRemove, 1);
        }
    };

    /**
     * @ngdoc method
     * @name AlertSystem#removeTimeout
     * @module Pundit2.AlertSystem
     * @function
     *
     * @description
     * Remove the timeout associated to the alert
     *
     * @param {id}
     *
     */
    alertSystem.removeTimeout = function(id) {
        var key = getTimeoutKey(id);
        if (timeouts[key]) {
            $timeout.cancel(timeouts[key]);
            delete timeouts[key];
        }
    };

    /**
     * @ngdoc method
     * @name AlertSystem#resetTimeout
     * @module Pundit2.AlertSystem
     * @function
     *
     * @description
     * Reset the timeout associated to the alert
     *
     * @param {id}
     *
     */
    alertSystem.resetTimeout = function(id) {
        alertSystem.removeTimeout(id);
        var alert = getAlert(id);
        if (alert.timeout && !alert.animating) {
            setTimeout(alert);
        }
    };

    /**
     * @ngdoc method
     * @name AlertSystem#resetTimeout
     * @module Pundit2.AlertSystem
     * @function
     *
     * @description
     * Reset the timeout associated to the alert
     *
     * @param {id}
     *
     */
    alertSystem.resetAlertTimeout = function(alert) {
        alertSystem.removeTimeout(alert.id);
        if (alert.timeout && !alert.animating) {
            setTimeout(alert);
        }
    };

    EventDispatcher.addListener('Pundit.alert', function(evt) {
        var alertConfig = angular.copy(alertSystem.AlertType.INFO);
        var message = evt.args;
        var title;
        if (typeof evt.args !== 'string') {
            if (typeof evt.args.id !== 'undefined' && typeof alertSystem.AlertType[evt.args.id] !== 'undefined') {
                alertConfig = alertSystem.AlertType[evt.args.id];
            }
            angular.merge(alertConfig, evt.args);
            message = evt.args.message || '--no-message--';
            title = evt.args.title;
        }
        alertSystem.addAlert(alertConfig, message, title, alertConfig.timeout, alertConfig.top, alertConfig.dismissible, alertConfig.alertClass);
    });

    return alertSystem;
});