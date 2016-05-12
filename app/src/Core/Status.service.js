angular.module('Pundit2.Core')

.constant("STATUSDEFAULTS", {
    debug: false
})

.service('Status', function(BaseComponent, EventDispatcher, STATUSDEFAULTS) {

    var status = new BaseComponent('Status', STATUSDEFAULTS);

    var state = {
        Annomatic: {},
        AnnotationSidebar: {},
        Dashboard: {},
        Toolbar: {},
        Pundit: {
            clientBoot: false,
            canBeShowedAfterHidden: false,
            userLogged: false,
            loading: false,
            templateMode: false,
            needsProgressBar: false,
            progress: 0
        }
    };

    var alertLog = [],
        loadingCount = {};

    var updateLoading = function(currentState) {
        EventDispatcher.sendEvent('Pundit.loading', currentState);
    };

    var setLoading = function(eventName, currentState)  {
        var loadingState = [];

        if (typeof(loadingCount[eventName]) === 'undefined') {
            loadingCount[eventName] = 0;
        }

        if (currentState) {
            if (state.Pundit.loading === false) {
                state.Pundit.loading = true;
                updateLoading(true);
            }
            loadingCount[eventName] ++;
        } else {
            loadingCount[eventName] --;
            loadingState = Object.keys(loadingCount).filter(
                function(index) {
                    return loadingCount[index] > 0;
                }
            );

            if (loadingState.length === 0) {
                state.Pundit.loading = false;
                updateLoading(false);
                loadingCount[eventName] = 0;
            }
        }
    };

    // Loading
    EventDispatcher.addListeners(
        [
            'AnnotationsCommunication.loading',
            'NotebookCommunication.loading',
            'NotebookComposerCtrl.loading',
            'Annomatic.loading',
            'MyItems.loading'

        ],
        function(e) {
            setLoading(e.name, e.args);
        }
    );

    // Client
    EventDispatcher.addListener('Client.boot', function() {
        state.Pundit.clientBoot = true;
    });

    // MyPundit
    EventDispatcher.addListener('MyPundit.isUserLogged', function(e) {
        state.Pundit.userLogged = e.args;
    });

    // Annomatic
    EventDispatcher.addListener('Annomatic.isRunning', function(e) {
        state.Annomatic.isRunning = e.args;
    });

    // AnnotationSidebar
    EventDispatcher.addListener('AnnotationSidebar.toggle', function(e) {
        state.AnnotationSidebar.isExpanded = e.args;
    });
    EventDispatcher.addListener('AnnotationSidebar.toggleFiltersContent', function(e) {
        state.AnnotationSidebar.isFiltersContentExpanded = e.args;
    });

    // Dashboard
    EventDispatcher.addListener('Dashboard.toggle', function(e) {
        state.Dashboard.isVisible = e.args;
    });

    // Template mode
    EventDispatcher.addListener('Pundit.templateMode', function(e) {
        state.Pundit.templateMode = e.args;

        // Reset selection when template state change
        EventDispatcher.sendEvent('Pundit.changeSelection');
    });

    // Alert
    EventDispatcher.addListener('Pundit.alert', function(e) {
        alertLog.push(e.args);
    });

    status.setState = function(component, property, value) {
        if (typeof state[component] === 'undefined') {
            return;
        }
        
        state[component][property] = value;
    };
    
    status.getState = function(component) {
        return state[component];
    };

    status.getCanBeShowedAfterHidden = function() {
        return state.Pundit.canBeShowedAfterHidden;
    };
    
    status.getClientBoot = function() {
        return state.Pundit.clientBoot;
    };

    status.getLoading = function() {
        return state.Pundit.loading;
    };

    status.getUserStatus = function() {
        return state.Pundit.userLogged;
    };

    status.getTemplateModeStatus = function() {
        return state.Pundit.templateMode;
    };

    status.getLog = function() {
        return alertLog;
    };

    status.resetProgress = function() {
        state.Pundit.progress = 0;
        state.Pundit.needsProgressBar = false;
        EventDispatcher.sendEvent('Status.progressReset');
    };

    status.hitProgress = function(phase, relativePerc) {
        var phases = {
            'phase0': 0,
            'phase1': 10,
            'phase2': 40,
            'phase3': 50,
        };

        var init = 0;
        for (var i = 0; i < phase; i++) {
            init += phases['phase'+i];
        }
        var p = phases['phase'+phase] / 100 * relativePerc;
        state.Pundit.progress = init + p;

        EventDispatcher.sendEvent('Status.progress', {
            needsProgressBar: (state.Pundit.needsProgressBar = true),
            progress: state.Pundit.progress
        });
    };

    return status;
});