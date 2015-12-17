describe('Keyboard service', function() {

    var Keyboard,
        state,
        $rootScope,
        $document,
        $log,
        getTotHanlders = function() {
            var totHandlers = 0;
            for (var i in state.keyHandlers) {
                if (state.keyHandlers.hasOwnProperty(i)) {
                    totHandlers += state.keyHandlers[i].length;
                }
            }
            return totHandlers;
        };

    beforeEach(module('Pundit2'));

    beforeEach(inject(function($injector, _$document_, _$rootScope_, _Keyboard_, _$log_){
        Keyboard = $injector.get('Keyboard');
        state = Keyboard.getState();
        $rootScope = _$rootScope_;
        $document = _$document_;
        $log = _$log_;
    }));

    afterEach(function () {
        Keyboard.off();
    });

    it('should expose expected API', function(){
        expect(Keyboard.registerHandler).toBeDefined();
        expect(Keyboard.unregisterHandler).toBeDefined();
        expect(Keyboard.unregisterAllHandlers).toBeDefined();
        expect(Keyboard.getState).toBeDefined();
        expect(Keyboard.eventToString).toBeDefined();
        expect(Keyboard.on).toBeDefined();
        expect(Keyboard.off).toBeDefined();
    });

    it('should correctly disable and re-enable service', function() {
        var eventConfigObjects = [
            {
                ctrlKey: true,
                keyCode: 70,
                ignoreOnInput: false
            }
        ];

        for (var i in eventConfigObjects) {
            Keyboard.registerHandler('test', eventConfigObjects[i], function(evt, eventKeyConfigObject){
                Keyboard.err("Consumed " + eventKeyConfigObject.handlerID);
            });
        }

        /**
         * Create KeyboardEvent
         */
        var e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 70});

        angular.element('body')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        Keyboard.off();

        /**
         * Create KeyboardEvent
         */
        e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 70});

        angular.element('body')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(0);
        $log.reset();

        Keyboard.on();

        /**
         * Create KeyboardEvent
         */
        e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 70});

        angular.element('body')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(1);
        $log.reset();

    });

    it('should not add handler by invalid event config object or invalid callback', function() {
        var invalidEventObject = {};

        Keyboard.registerHandler('test', invalidEventObject, function(){/*do nothing*/});
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        var validEventObjectConfig = {
            keyCode: 70
        };
        Keyboard.registerHandler('test', validEventObjectConfig);
        expect($log.error.logs.length).toBe(1);
        $log.reset();
    });

    it('should correctly add handler', function() {
        var validEventObjectConfig = {
            ctrlKey: true,
            keyCode: 70
        };

        Keyboard.registerHandler('test', validEventObjectConfig, function(){/*do nothing*/});

        expect(state.keyHandlers['aCms70'].length).toBe(1);

    });

    it('should correctly convert event object to string', function() {
        var validEventObjectConfig = {
            shiftKey: true,
            ctrlKey: true,
            keyCode: 70
        };

        expect(Keyboard.eventToString(validEventObjectConfig)).toBe('[ alt ] [(CTRL)] [ meta ] [(SHIFT)] [70]');

    });

    it('should correctly remove all handlers', function() {
        var eventConfigObjects = [
            {
                ctrlKey: true,
                keyCode: 70
            },
            {
                keyCode: 27
            },
            {
                keyCode: 13
            }
        ];

        for (var i in eventConfigObjects) {
            Keyboard.registerHandler('test', eventConfigObjects[i], function(){/*do nothing*/});
        }

        expect(getTotHanlders()).toBe(3);

        Keyboard.unregisterAllHandlers();

        expect(getTotHanlders()).toBe(0);
    });

    it('should correctly remove one handler', function() {
        var eventConfigObjects = [
            {
                ctrlKey: true,
                keyCode: 70
            },
            {
                ctrlKey: true,
                keyCode: 70
            },
        ];

        for (var i in eventConfigObjects) {
            Keyboard.registerHandler('test', eventConfigObjects[i], function(){/*do nothing*/});
        }
        expect(state.keyHandlers['aCms70'].length).toBe(2);

        // Unregister invalid eventKeyObject.
        Keyboard.unregisterHandler({});
        expect(state.keyHandlers['aCms70'].length).toBe(2);
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        // Unregister a not previously added eventKeyObject.
        Keyboard.unregisterHandler({
            altKey: true,
            keyCode: 88
        });
        expect(state.keyHandlers['aCms70'].length).toBe(2);
        expect(getTotHanlders()).toBe(2);

        Keyboard.unregisterHandler(eventConfigObjects[0]);
        expect(state.keyHandlers['aCms70'].length).toBe(1);

        expect(state.keyHandlers['aCms70'][0].handlerID).not.toBe(eventConfigObjects[0].handlerID);
    });

    it('should correctly consume handlers', function() {
        Keyboard.unregisterAllHandlers();

        expect(getTotHanlders()).toBe(0);
        expect($log.error.logs.length).toBe(0);

        var eventConfigObjects = [
            {
                ctrlKey: true,
                keyCode: 70,
                ignoreOnInput: false
            },
            {
                shiftKey: true,
                keyCode: 71,
                once: true
            },
        ];

        for (var i in eventConfigObjects) {
            Keyboard.registerHandler('test', eventConfigObjects[i], function(evt, eventKeyConfigObject){
                Keyboard.err("Consumed " + eventKeyConfigObject.handlerID);
            });
        }

        expect(getTotHanlders()).toBe(2);
        expect($log.error.logs.length).toBe(0);

        var textField = '<input type="text" id="textfield0" />';
        angular.element('body').append(textField);

        /**
         * Create KeyboardEvent
         */
        var e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 70});

        angular.element('body')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        // Focus on textField and check events handlers.
        angular.element('#textfield0').focus();
        expect(angular.element('#textfield0')[0] === $document[0].activeElement).toBe(true);

        /**
         * Create KeyboardEvent
         */
        e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 70});

        angular.element('#textfield0')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        /**
         * Create KeyboardEvent
         */
        e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          shiftKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 71});

        // This keydown shold be ignored.
        angular.element('#textfield0')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(0);

        // Repeat twice event and check that is cosumend only once (by conf).
        angular.element('#textfield0').blur();
        for (i=0; i<2; i++) {
            e = new window.KeyboardEvent('keydown', {
              bubbles: true,
              cancelable: true,
              shiftKey: true
            });
            delete e.keyCode;
            Object.defineProperty(e, 'keyCode', {'value': 71});
            angular.element('body')[0].dispatchEvent(e);
        }
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        // Add high priority event.
        var hpEvent = {
            ctrlKey: true,
            keyCode: 70,
            ignoreOnInput: false,
            stopPropagation: true
        };
        Keyboard.registerHandler('test', hpEvent, function(evt, eventKeyConfigObject){
            Keyboard.err("Consumed hp " + eventKeyConfigObject.handlerID);
        });

        e = new window.KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true
        });
        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 70});
        angular.element('body')[0].dispatchEvent(e);
        expect($log.error.logs.length).toBe(1);
        $log.reset();

    });

});