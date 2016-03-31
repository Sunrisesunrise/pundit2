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
    EventDispatcher, Client, Status, MyPundit, AnnotationsExchange, ResourceHandler, AnnotationsCommunication) {

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

    document.addEventListener('Pundit.hide', Client.hideClient);
    document.addEventListener('Pundit.show', Client.showClient);
    document.addEventListener('Pundit.loadAnnotations', AnnotationsCommunication.getAnnotations);
    document.addEventListener('Pundit.showBootstrap', Client.showClientBoot);
    document.addEventListener('Pundit.requestAnnotationsNumber', requestAnnotationsNumber);
    document.addEventListener('Pundit.requestUserProfileUpdate', userStatusUpdate);
    document.addEventListener('Pundit.requestUserLoggedStatus', userStatusUpdate);
    document.addEventListener('Pundit.forceCompileButton', ResourceHandler.forceCompileButton);
    document.addEventListener('Pundit.requestAnnotationsNumberRaw', requestAnnotationsNumber);

    EventDispatcher.addListener('Pundit.dispatchDocumentEvent', function(data) {
        dispatchDocumentEvent(data.args.event, data.args.data);
    });

    EventDispatcher.addListener('Pundit.loading', function(e) {
        var eventName = e.name,
            currentState = e.args;
        dispatchDocumentEvent(eventName, currentState);
    });

    window.dispatchDocumentEvent = dispatchDocumentEvent;

    return messageHandler;
});