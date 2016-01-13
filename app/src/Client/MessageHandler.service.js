angular.module('Pundit2.Client')

.run(function($injector, Config) {
    if (Config.isModuleActive('Client')) {
        var messageHandler = $injector.get('MessageHandler');
        messageHandler.log('Client handler running');
    }
})

.constant('MESSAGEHANDLERDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#MessageHandler.active
     *
     * @description
     * `boolean`
     *
     * Active message handling
     *
     * Default value:
     * <pre> active: true </pre>
     */
    active: false,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#MessageHandler.debug
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

.service('MessageHandler', function(MESSAGEHANDLERDEFAULTS, $document, BaseComponent, Config, Analytics,
    EventDispatcher, Client, Status, MyPundit, AnnotationsExchange) {

    var messageHandler = new BaseComponent('MessageHandler', MESSAGEHANDLERDEFAULTS);

    var dispatchDocumentEvent = function(eventName, details) {
        var evt;
        if (document.createEventObject) {
            // dispatch for IE
            evt = document.createEventObject();
            evt.detail = details;
            document.fireEvent(eventName, evt);
        } else {
            // dispatch for firefox + others
            evt = document.createEvent("Event");
            evt.initEvent(eventName, true, true); // event type,bubbling,cancelable
            evt.detail = details;
            evt = new CustomEvent(eventName, {
                detail: details
            });
            document.dispatchEvent(evt);
        }
    };

    var requestAnnotationsNumber = function() {
        if (Status.getLoading()) {
            // TODO: ...? 
        }
        dispatchDocumentEvent('Pundit.updateAnnotationsNumber', AnnotationsExchange.getAnnotations().length);
    };

    var userStatusUpdate = function() {
        MyPundit.checkLoggedIn(true, false);
    };

    // we need to do it here due to a instance order time 
    dispatchDocumentEvent('Pundit.analyticsSettings', Analytics.options);

    $document.on('Pundit.hide', Client.hideClient);
    $document.on('Pundit.show', Client.showClient);
    $document.on('Pundit.requestAnnotationsNumber', requestAnnotationsNumber);
    $document.on('Pundit.requestUserProfileUpdate', userStatusUpdate);
    $document.on('Pundit.requestUserLoggedStatus', userStatusUpdate);

    // TODO: use a different bind? 
    document.addEventListener('Pundit.requestAnnotationsNumberRaw', requestAnnotationsNumber);

    EventDispatcher.addListener('Pundit.dispatchDocumentEvent', function(data) {
        dispatchDocumentEvent(data.args.event, data.args.data);
    });

    EventDispatcher.addListener('Pundit.loading', function(e) {
        var eventName = e.name,
            currentState = e.args;
        dispatchDocumentEvent(eventName, currentState);
    });

    return messageHandler;
});