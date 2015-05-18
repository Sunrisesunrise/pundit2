angular.module('Pundit2.AlertSystem')


.service('AlertSystem', function($timeout) {

    var DEFAULT_DISMISS_TIME = 5000;


    var AlertType = {
        OK: { id: 'SUCCESS', alertClass: 'alert-success', timeout: DEFAULT_DISMISS_TIME, top: true, dismissible: true},
        ERROR: { id: 'ERROR', alertClass: 'alert-danger', timeout: null, top: true, dismissible: true},
        ALERT: { id: 'ALERT', alertClass: 'alert-info', timeout: null, top: true, dismissible: true},
        CUSTOM: { id: 'CUSTOM', alertClass: 'alert-warning', timeout: null, top: true, dismissible: true}
    }



    var alerts = [];
    var id = 0;
    var timeouts = {};

    var addAlert = function(type, message, timeout, top, dismissible, alertClass) {
        alerts = alerts || [];
        id = (id || 0) + 1;
        var newId = id;

        if(type.id = AlertType.CUSTOM.id){
            timeout = timeout || type.timeout;
            top = top || type.top;
            dismissible = dismissible || type.dismissible;
            alertClass = alertClass || type.alertClass;
        }else{
            timeout = type.timeout;
            top = type.top;
            dismissible = type.dismissible;
            alertClass = type.alertClass;
        }
        var alert = {id: newId, type:type.id, alertClass: alertClass, message:message, timeout:timeout, dismissible: dismissible};
        if(top){
            console.log('top');
            alerts.unshift(alert);
        }else{
            console.log('bottom');
            alerts.push(alert);
        }
        if(timeout){
            setTimeout(alert);
        }
    }

    var clearAlerts = function() {
        for(var i = 0; i<alerts.length; i++) {
            var alert = alerts[i];
            removeTimeout(alert.id);
        }
        alerts.splice(0,alerts.length)
    }

    var clearAlert = function(id) {
        removeTimeout(id);
        var alertToRemove = -1;
        for(var i = 0; i<alerts.length; i++){
            var alert = alerts[i];
            if(alert.id == id){
                alertToRemove = i;
                break;
            }
        }
        if(alertToRemove != -1){
            alerts.splice(alertToRemove,1);
        }
    }

    var removeTimeout = function(id){
        var key = getTimeoutKey(id);
        if(timeouts[key]){
            $timeout.cancel(timeouts[key]);
            delete timeouts[key];
        }
    }

    var resetTimeout = function(id) {
        removeTimeout(id);
        var alert = getAlert(id);
        setTimeout(alert);
    }


    var getTimeoutKey = function(id) {
        return 'timeout'+ id;
    }

    var setTimeout = function(alert){
        var key = getTimeoutKey(alert.id);
        var promise = $timeout(function(){
            clearAlert(alert.id);
        }, alert.timeout);
        timeouts[key] = promise;
    }

    var getAlert = function(id) {
        for(var i = 0; i<alerts.length; i++){
            var alert = alerts[i];
            if(alert.id == id){
                return alert;
            }
        }
        return null;
    }

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