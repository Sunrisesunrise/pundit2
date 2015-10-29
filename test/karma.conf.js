module.exports = function(config) {
    config.set({
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-strap/dist/angular-strap.js',
            'bower_components/angular-strap/dist/angular-strap.tpl.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/angular-moment/angular-moment.min.js',
            'bower_components/angular-datepicker/dist/angular-datepicker.min.js',
            'bower_components/angular-md5/angular-md5.min.js',
            'bower_components/ng-resize/ngresize.min.js',

            // Load the module declaration before the module utilization, or karma
            // will screw up :|
            'app/src/pundit2.js',
            'app/src/templates.js',
            'app/src/Core/Core.js',
            'app/src/Model/Model.js',
            'app/src/AlertSystem/AlertSystem.js',
            'app/src/AnnotationSidebar/AnnotationSidebar.js',
            'app/src/Annomatic/Annomatic.js',
            'app/src/Dashboard/Dashboard.js',
            'app/src/Breadcrumbs/Breadcrumbs.js',
            'app/src/ContextualMenu/ContextualMenu.js',
            'app/src/Lists/GeneralItemsContainer/GeneralItemsContainer.js',
            'app/src/Lists/PageItemsContainer/PageItemsContainer.js',
            'app/src/Lists/PredicatesContainer/PredicatesContainer.js',
            'app/src/Lists/MyItemsContainer/MyItemsContainer.js',
            'app/src/Lists/MyNotebooksContainer/MyNotebooksContainer.js',
            'app/src/Lists/VocabulariesContainer/VocabulariesContainer.js',
            'app/src/Vocabularies/Vocabularies.js',
            'app/src/Tools/TripleComposer/TripleComposer.js',
            'app/src/Tools/NotebookComposer/NotebookComposer.js',
            'app/src/LiteTool/LiteTool.js',
            'app/src/AnnotationPopover/AnnotationPopover.js',
            'app/src/FragmentPopover/FragmentPopover.js',
            'app/src/Item/Item.js',
            'app/src/Toolbar/Toolbar.js',
            'app/src/Preview/Preview.js',
            'app/src/Tools/NotebookComposer/NotebookComposer.js',
            'app/src/ResourcePanel/ResourcePanel.js',
            'app/src/Communication/Communication.js',
            'app/src/KorboEE/KorboEE.js',
            'app/src/SimplifiedClient/SimplifiedClient.js',
            'app/src/**/*.js',
            'test/unit/**/*.js'
        ],
        exclude: [
            'app/src/InitBookmarklet.js',
            'app/src/InitBookmarkletFeed.js'
        ], // list of files / patterns to exclude
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        browsers:  ['Chrome'], // ['Firefox', 'Chrome', 'PhantomJS'],

        // logLevel: config.LOG_DEBUG,
        autoWatch: false,
        singleRun: true,
        colors: true
    });
};