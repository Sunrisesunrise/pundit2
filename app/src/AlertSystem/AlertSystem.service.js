angular.module('Pundit2.AlertSystem')


.service('AlertSystem', function($timeout) {

    var DEFAULT_DISMISS_TIME = 5000;

    /**
     * Enumeration of alert type with relatives default values
     * @type {{OK: {id: string, alertClass: string, timeout: number, top: boolean, dismissible: boolean}, ERROR: {id: string, alertClass: string, timeout: null, top: boolean, dismissible: boolean}, ALERT: {id: string, alertClass: string, timeout: null, top: boolean, dismissible: boolean}, CUSTOM: {id: string, alertClass: string, timeout: null, top: boolean, dismissible: boolean}}}
     */
    var AlertType = {
        OK: {
            id: 'SUCCESS',
            alertClass: 'alert-success',
            timeout: DEFAULT_DISMISS_TIME,
            top: true,
            dismissible: true
        },
        ERROR: {
            id: 'ERROR',
            alertClass: 'alert-danger',
            timeout: null,
            top: true,
            dismissible: true
        },
        ALERT: {
            id: 'ALERT',
            alertClass: 'alert-info',
            timeout: null,
            top: true,
            dismissible: true
        },
        CUSTOM: {
            id: 'CUSTOM',
            alertClass: 'alert-warning',
            timeout: null,
            top: true,
            dismissible: true
        }
    };

    var alerts = [];
    var id = 0;
    var timeouts = {};

    /**
     * Add an alert. Parameter timeout, top, dismissible and alertClass are used only for AlertType CUSTOM. For other types are ignored.
     * @param type
     * @param message
     * @param timeout
     * @param top
     * @param dismissible
     * @param alertClass
     */
    var addAlert = function(type, message, timeout, top, dismissible, alertClass) {
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
            dismissible: dismissible
        };
        
        if (top) {
            console.log('top');
            alerts.unshift(alert);
        } else {
            console.log('bottom');
            alerts.push(alert);
        }
        if (timeout) {
            setTimeout(alert);
        }
    };

    /**
     * Clear all alerts
     */
    var clearAlerts = function() {
        for (var i = 0; i < alerts.length; i++) {
            var alert = alerts[i];
            removeTimeout(alert.id);
        }
        alerts.splice(0, alerts.length);
    };

    /**
     * Clear the alert
     * @param id id of the alert
     */
    var clearAlert = function(id) {
        removeTimeout(id);
        var alertToRemove = -1;
        for (var i = 0; i < alerts.length; i++) {
            var alert = alerts[i];
            if (alert.id === id) {
                alertToRemove = i;
                break;
            }
        }
        if (alertToRemove !== -1) {
            alerts.splice(alertToRemove, 1);
        }
    };

    /**
     * Remove the timeout associated to the alert
     * @param id
     */
    var removeTimeout = function(id) {
        var key = getTimeoutKey(id);
        if (timeouts[key]) {
            $timeout.cancel(timeouts[key]);
            delete timeouts[key];
        }
    };

    /**
     * Reset the timeout associated to the alert
     * @param id
     */
    var resetTimeout = function(id) {
        removeTimeout(id);
        var alert = getAlert(id);
        setTimeout(alert);
    };

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
            clearAlert(alert.id);
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

    return {
        AlertType: AlertType,
        alerts: alerts,
        addAlert: addAlert,
        clearAlerts: clearAlerts,
        clearAlert: clearAlert,
        removeTimeout: removeTimeout,
        resetTimeout: resetTimeout
    };


});