var LR = require('connect-livereload')({
    port: 31331
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// chromePunditConfig used to retrieve the chromePunditConfig.annotationServerBaseURL string
var chromePunditConfig = require('./app/extensions/chrome/inject/extension_conf.js');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var conf = {
        app: 'app',
        build: 'build',
        tests: 'test',
        liveport: 31331
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        conf: conf,

        // Bower can be run from grunt, will call it like this to avoid
        // extra install steps
        bower: {
            install: {
                options: {
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    install: true,
                    copy: false
                }
            }
        },

        shell: {
            options: {
                stdout: true
            },
            protractorInstall: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            }
        },

        uglify: {
            bookmarklet: {
                files: {
                    '<%= conf.build %>/bm/scripts/pundit-bm.js': ['.tmp/concat/scripts/*.js']
                }
            },
            chrome: {
                files: {
                    '<%= conf.build %>/extensions/chrome/inject/scripts/libs.js': ['.tmp/concat/scripts/libs.js'],
                    '<%= conf.build %>/extensions/chrome/inject/scripts/pundit2.js': ['.tmp/concat/scripts/pundit2.js'],
                    '<%= conf.build %>/extensions/chrome/inject/content_script.js': ['<%= conf.build %>/extensions/chrome/inject/content_script.js'],
                    '<%= conf.build %>/extensions/chrome/js/background.js': ['<%= conf.build %>/extensions/chrome/js/background.js'],
                    '<%= conf.build %>/extensions/chrome/js/modules_conf.js': ['<%= conf.build %>/extensions/chrome/js/modules_conf.js']
                }
            }
        },
        cssmin: {
            bookmarklet: {
                files: {
                    '<%= conf.build %>/bm/css/pundit-bm.css': ['.tmp/concat/css/pundit.css']
                }
            },
            chrome: {
                files: {
                    '<%= conf.build %>/extensions/chrome/inject/css/pundit.css': ['.tmp/concat/css/pundit.css']
                }
            }
        },


        // Instruct the .html page with custom directives to concat/uglify/cssmin
        // and replace the inclusion directives in the production html files
        useminPrepare: {
            html: '<%= conf.app %>/examples/index.html',
            options: {
                dest: '<%= conf.build %>'
            }
        },
        usemin: {
            html: ['<%= conf.build %>/{,*/}*.html'],
            css: ['<%= conf.build %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= conf.build %>']
            }
        },

        // Clean up, remove all the build, tmp, css files
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'coverage/*',
                        '<%= conf.app %>/css/*css',
                        '<%= conf.app %>/css/fonts',
                        '<%= conf.build %>/*',
                        '!<%= conf.build %>/.git*'
                    ]
                }]
            },
            docs: {
                files: [{
                    src: ['<%= conf.build %>/docs/*']
                }]
            },
            chrome: {
                files: [{
                    src: ['<%= conf.app %>/examples/extensions']
                }]
            }
        },

        // *min: reduce space
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/styles/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= conf.app %>/css/img'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/styles/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= conf.build %>/css/img'
                }]
            }
        },

        // Split in two the htlmin targets, the final step is after
        // usemin, to avoid deleting useful comments :P
        htmlmin: {
            final: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.build %>',
                    src: ['*.html'],
                    dest: '<%= conf.build %>'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/examples/',
                    src: ['*.html'],
                    dest: '<%= conf.build %>'
                }]
            }
        },

        // Angular code does not go along with uglify's mangle option
        // ngmin make them friends! .. 
        // WARNING! Declare every time the angular.module('SomethingApp') and then
        // .controller(), without chaining .controller().controller() or it will
        // screw up... At least with grunt-ngmin 0.0.3
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        html2js: {
            options: {
                base: '<%= conf.app %>/'
            },
            main: {
                module: 'templates-main',
                src: ['<%= conf.app %>/src/**/*.tmpl.html'],
                dest: '<%= conf.app %>/src/templates.js'
            },
            korboee: {
                module: 'korboee-templates',
                src: ['<%= conf.app %>/src/KorboEE/**/*.tmpl.html'],
                dest: '<%= conf.app %>/src/korboee-template.js'
            }
        },


        concat: {
            docApp: {
                src: ["<%= conf.app %>/../docsAssets/app/*js"],
                dest: "<%= conf.build %>/docs/js/docs.js"
            }
        },

        // Replace fonts path for the Chrome extension
        replace: {
            chrome: {
                options: {
                    patterns: [{
                        match: /\(fonts/g,
                        replacement: '(chrome-extension://__MSG_@@extension_id__/inject/css/fonts'
                    }, {
                        match: /url\(img/g,
                        replacement: 'url(chrome-extension://__MSG_@@extension_id__/inject/css/img'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= conf.build %>/extensions/chrome/inject/css/pundit.css'],
                    dest: '<%= conf.build %>/extensions/chrome/inject/css/'
                }]
            },
            chrome_conf: {
                options: {
                    patterns: [{
                        match: /const annotationServerBaseURL = (.+)/g,
                        replacement: 'const annotationServerBaseURL = "'+chromePunditConfig.annotationServerBaseURL+'";'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= conf.build %>/extensions/chrome/js/backgroundHttpRequestsHandler.js'],
                    dest: '<%= conf.build %>/extensions/chrome/js/'
                }]
            },
            dev_chrome: {
                options: {
                    patterns: [{
                        match: /'fonts\//g,
                        replacement: '\'chrome-extension://__MSG_@@extension_id__/inject/css/fonts/'
                    }, {
                        match: /url\('img/g,
                        replacement: 'url(\'chrome-extension://__MSG_@@extension_id__/inject/css/img'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= conf.app %>/examples/extensions/chrome/inject/css/style.css'],
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/css/'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['<%= conf.app %>/examples/extensions/chrome/inject/css/pundit2.css'],
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/css/'
                }]
            },
            dev_chrome_conf: {
                options: {
                    patterns: [{
                        match: /const annotationServerBaseURL = (.+)/g,
                        replacement: 'const annotationServerBaseURL = "'+chromePunditConfig.annotationServerBaseURL+'";'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= conf.app %>/examples/extensions/chrome/js/backgroundHttpRequestsHandler.js'],
                    dest: '<%= conf.app %>/examples/extensions/chrome/js/'
                }]
            }
        },

        // Whatever is not copied by other tasks.. get copied here
        copy: {
            docs: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/../docsAssets/assets',
                    dest: '<%= conf.build %>/docs',
                    src: [
                        '*',
                        '**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/../node_modules/marked/lib/',
                    dest: '<%= conf.build %>/docs/js',
                    src: [
                        'marked.js'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/../bower_components/',
                    dest: '<%= conf.build %>/docs/js',
                    src: [
                        'lunr.js/lunr.min.js',
                        'google-code-prettify/src/prettify.js',
                        'google-code-prettify/src/lang-css.js',
                        'angular/angular.min.js',
                        'jquery/dist/jquery.min.js',
                        'angular-resource/angular-resource.js',
                        'angular-route/angular-route.js',
                        'angular-animate/angular-animate.js',
                        'angular-cookies/angular-cookies.js',
                        'angular-sanitize/angular-sanitize.js',
                        'angular-touch/angular-touch.js'
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= conf.app %>',
                    dest: '<%= conf.build %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'css/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= conf.build %>/css/img',
                    src: 'generated/*'
                }]
            },
            prod: {
                files: [{
                    src: '<%= conf.build %>/css/*.pundit.css',
                    dest: '<%= customDir %>/pundit2.css'
                }, {
                    src: '<%= conf.build %>/scripts/*.pundit2.js',
                    dest: '<%= customDir %>/pundit2.js'
                }, {
                    src: '<%= conf.build %>/scripts/*.libs.js',
                    dest: '<%= customDir %>/libs.js'
                }, {
                    expand: true,
                    cwd: '<%= conf.build %>/css/',
                    dest: '<%= customDir %>/',
                    src: 'fonts/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.build %>/css/',
                    dest: '<%= customDir %>/',
                    src: 'img/*'
                }, {
                    src: './pundit2_conf.js',
                    dest: '<%= customDir %>/pundit2_conf.js'
                }, {
                    expand: true,
                    cwd: '<%= conf.build %>/docs/',
                    dest: '<%= customDir %>/docs/',
                    src: '**/*'
                }, {
                    src: './korboee_conf.js',
                    dest: '<%= customDir %>/korboee_conf.js'

                }]
            },
            prod_chrome: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.build %>/extensions/chrome/',
                    dest: '<%= customDir %>/',
                    src: '**/*'
                }]
            },
            uncompressed: {
                files: [{
                    src: '.tmp/concat/scripts/pundit2.js',
                    dest: '<%= customDir %>/uncompressed/pundit2.js'

                }]
            },
            bookmarklet: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/fonts/pundit-icon-font/',
                    dest: '<%= conf.build %>/bm/css/',
                    src: 'fonts/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/styles/',
                    dest: '<%= conf.build %>/bm/css/',
                    src: 'img/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/src/',
                    dest: '<%= conf.build %>/bm',
                    src: 'InitBookmarklet.js'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/src/',
                    dest: '<%= conf.build %>/bm',
                    src: 'InitBookmarkletFeed.js'
                }]
            },
            css: {
                expand: true,
                cwd: '<%= conf.app %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/fonts/pundit-icon-font/',
                    dest: '<%= conf.app %>/css/',
                    src: 'fonts/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/fonts/pundit-icon-font/',
                    dest: '<%= conf.app %>/css/',
                    src: 'style.css'
                }]
            },
            chrome: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.build %>/scripts/',
                    dest: '<%= conf.build %>/extensions/chrome/inject/scripts/',
                    src: '**/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/extensions/chrome/',
                    dest: '<%= conf.build %>/extensions/chrome/',
                    src: '**/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/styles/',
                    dest: '<%= conf.build %>/extensions/chrome/inject/css/',
                    src: 'img/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/fonts/pundit-icon-font/',
                    dest: '<%= conf.build %>/extensions/chrome/inject/css/',
                    src: 'fonts/*'
                }]
            },
            dev_chrome: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/extensions/chrome/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/',
                    src: '**/*'
                }]
            },
            dev_chrome_components: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/../bower_components/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/bower_components/',
                    src: '**/*'
                }]
            },
            dev_chrome_modules: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/examples/src_crx/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/js/',
                    src: 'modules_conf.js'
                }]
            },
            dev_chrome_script: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/src/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/scripts',
                    src: '**/*'
                }]
            },
            dev_chrome_templates: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/src/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/scripts',
                    src: 'templates.js'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/src/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/scripts',
                    src: 'korboee-template.js'
                }]
            },
            dev_chrome_css: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.app %>/css/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/css/',
                    src: '{,*/}*.css'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/styles/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/css/',
                    src: 'img/*'
                }, {
                    expand: true,
                    cwd: '<%= conf.app %>/fonts/pundit-icon-font/',
                    dest: '<%= conf.app %>/examples/extensions/chrome/inject/css/',
                    src: 'fonts/*'
                }]
            }
        },

        // Bypassing your cache for fun and profit
        rev: {
            options: {
                algorithm: 'sha1',
                length: 8
            },
            dist: {
                files: {
                    src: [
                        '<%= conf.build %>/scripts/libs.js',
                        '<%= conf.build %>/scripts/pundit2.js',
                        '<%= conf.build %>/scripts/korboee.js',
                        '<%= conf.build %>/css/pundit.css',
                        '<%= conf.build %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            }
        },

        less: {
            dev: {
                options: {
                    sourceMapAsFile: true,
                    sourceMap: true,
                    paths: ["<%= conf.app %>/css"]
                },
                files: {
                    "<%= conf.app %>/css/pundit2.css": "<%= conf.app %>/styles/pundit/pundit2.less",
                    "<%= conf.app %>/css/korboee.css": "<%= conf.app %>/styles/korboee/korboee.less"
                }
            },
            dist: {
                options: {
                    paths: ["<%= conf.app %>/css"],
                    cleancss: true
                },
                files: {
                    "<%= conf.app %>/css/pundit2.css": "<%= conf.app %>/styles/pundit/pundit2.less",
                    "<%= conf.app %>/css/korboee.css": "<%= conf.app %>/styles/korboee/korboee.less"
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            LR,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            testserver: {
                options: {
                    port: 9999
                }
            }
        },

        watch: {
            less: {
                options: {
                    livereload: conf.liveport // to force the reload after less modifications
                },
                files: ['<%= conf.app %>/styles/*/*.less'],
                tasks: [
                    'less:dev', 'newer:copy:fonts',
                    'newer:copy:dev_chrome_css',
                    'replace:dev_chrome'
                ]
            },
            unit: {
                files: [
                    '<%= conf.tests %>/*.js',
                    '<%= conf.tests %>/**/*.js'
                ],
                tasks: ['jshint', 'karma:unit']
            },
            chrome: {
                files: [
                    '<%= conf.app %>/extensions/chrome/*',
                    '<%= conf.app %>/extensions/chrome/**/*',
                    '<%= conf.app %>/examples/src_crx/*'
                ],
                tasks: [
                    'newer:copy:dev_chrome',
                    'newer:copy:dev_chrome_modules'
                    // 'open:reload' // Use this to force the extension files reaload
                ]
            },
            buildhtml: {
                files: [
                    '<%= conf.app %>/examples/src/*'
                ],
                tasks: ['examples']
            },
            html: {
                files: [
                    '<%= conf.app %>/**/*.tmpl.html',
                    '!<%= conf.app %>/examples/extensions/chrome/inject/scripts/**/*.tmpl.html'
                ],
                tasks: ['html2js']
            },
            livereload: {
                options: {
                    livereload: conf.liveport
                },
                files: [
                    // '<%= conf.app %>/**/*.html', // Skip the html exaples mod
                    // '!<%= conf.app %>/examples/extensions/chrome/inject/scripts/**/*.html',
                    // '!<%= conf.app %>/examples/extensions/chrome/html/*.html'
                    // '<%= conf.app %>/css/*.css', // Use this if the less force reload is removed 
                    '<%= conf.app %>/examples/src/*.html',
                    '<%= conf.app %>/src/**/*.js',
                    '<%= conf.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '!<%= conf.app %>/src/templates.js',
                    '!<%= conf.app %>/src/korboee-template.js'
                ],
                tasks: ['newer:copy:dev_chrome_script'] // It's possibile remove this task and use useServerFile = true in modules_conf for the chrome extension development
            },
            templates: {
                options: {
                    livereload: conf.liveport
                },
                files: [
                    '<%= conf.app %>/src/templates.js',
                    '<%= conf.app %>/src/korboee-template.js'
                ],
                tasks: ['newer:copy:dev_chrome_templates']
            }
        },

        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>/app/examples/'
            },
            doc: {
                url: 'http://localhost:<%= connect.options.port %>/build/docs/'
            },
            inc: {
                url: 'http://localhost:<%= connect.options.port %>/app/src/'
            }
            // Use this task to force the extensions file reload,
            // but you have to install this extension:
            // https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid
            // reload: {
            //     url: 'http://reload.extensions'
            // }
        },

        jshint: {
            options: {
                "reporter": require('jshint-stylish'),
                "loopfunc": true,
                "undef": true,
                "unused": true,
                "browser": true,
                "expr": true,
                "curly": true,
                "trailing": true,
                "camelcase": true,
                "eqeqeq": true,
                "multistr": true,
                "globals": {
                    angular: true,
                    console: true
                },
                "predef": [
                    "waitsFor",
                    "runs",
                    "element",
                    "by"
                ]
            },
            tests: {
                options: {
                    "camelcase": false,
                    "node": true,
                    "sub": true,
                    "globals": {
                        describe: true,
                        // ddescribe: true,
                        it: true,
                        // iit: true,
                        xit: true,
                        expect: true,
                        beforeEach: true,
                        afterEach: true,
                        inject: true,
                        protractor: true,
                        jasmine: true,
                        angular: true,
                        KORBODEFAULTCONF: true,
                        browser: true,
                        Range: true
                    }
                },
                files: {
                    src: ['Gruntfile.js', 'test/*.js', 'test/**/*.js']
                }
            },
            app: {
                options: {
                    "globals": {
                        punditConfig: true,
                        angular: true,
                        console: true
                    }
                },
                files: {
                    src: [
                        'app/src/**/*.js',
                        '!app/src/version.js',
                        '!app/src/templates.js',
                        '!app/src/korboee-template.js'
                    ]
                }
            }
        },

        karma: {
            options: {
                configFile: './test/karma.conf.js'
            },
            headless: {
                browsers: ['PhantomJS']
            },
            unit: {
                autoWatch: false,
                singleRun: true
            },
            watch: {
                autoWatch: true,
                singleRun: false
            },
            unitCoverage: {
                autoWatch: false,
                singleRun: true,
                reporters: ['progress', 'coverage'],
                preprocessors: {
                    "app/**/*.tmpl.html": 'ng-html2js',
                    "app/**/*.js": 'coverage'
                },
                coverageReporter: {
                    type: 'html',
                    dir: '<%= conf.build %>/coverage/'
                }
            }
        },

        protractor: {
            options: {
                keepAlive: true,
                configFile: "./test/protractor.conf.js"
            },
            singlerun: {},
            auto: {
                keepAlive: true,
                options: {
                    args: {
                        seleniumPort: 4444
                    }
                }
            }
        },

        htmlbuild: {
            options: {
                parseTag: 'buildexamples'
            },
            pre: {
                src: "<%= conf.app %>/examples/src/*.pre.inc",
                dest: "<%= conf.app %>/examples/examples.list.html"
            },
            dev: {
                src: "<%= conf.app %>/examples/src/*.html",
                dest: "<%= conf.app %>/examples/",
                options: {
                    data: {
                        examples: '<%= conf.examples %>'
                    },
                    sections: {
                        header: [
                            '<%= conf.app %>/examples/src/_header.inc',
                            '<%= conf.app %>/examples/examples.list.html',
                            '<%= conf.app %>/examples/src/_libs.inc',
                            '<%= conf.app %>/examples/src/_pundit.inc'
                        ],
                        footer: [
                            '<%= conf.app %>/examples/src/_footer.inc'
                        ]
                    }
                }
            }
        }
    });

    grunt.registerTask('examples', 'creates examples', [
        'listExamples', 'htmlbuild:pre', 'htmlbuild:dev'
    ]);

    grunt.registerTask('listExamples', 'List examples',
        function() {
            var examples = grunt.file.expand('app/examples/src/*html'),
                examplesLinks = [];

            for (var i in examples) {
                var idx = examples[i].lastIndexOf('/'),
                    name = examples[i].substr(idx + 1),
                    label = name.substr(0, name.length - 5);
                examplesLinks[i] = "<a href='" + name + "'>" + label + "</a>";
            }

            conf.examples = examples;
            conf.examplesLinks = examplesLinks.join(" | ");
        }
    );

    grunt.registerTask('dgeni', 'Generate docs via Dgeni.',
        function() {
            var dgeni = require('dgeni');
            var done = this.async();

            dgeni('docsAssets/dgeni.conf.js')
                .generateDocs()
                .then(done);
        }
    );

    grunt.registerTask('doc', 'create documentation', [
        'clean:docs', 'dgeni', 'copy:docs', 'concat:docApp', 'open:doc'
    ]);

    grunt.registerTask('docNoOpen', 'create documentation', [
        'clean:docs', 'dgeni', 'copy:docs', 'concat:docApp'
    ]);

    grunt.registerTask('install', 'Installs js (non-node) dependencies like bower etc', [
        'bower', 'shell:protractorInstall'
    ]);

    grunt.registerTask('build', 'Builds a production-ready version of the application', [
        'clean:dist', 'copy:fonts', 'html2js:main', 'html2js:korboee', 'examples', 'useminPrepare',
        'less:dist', 'copy:css', 'imagemin', 'htmlmin', 'concat', 'copy:dist', 'ngAnnotate', 'cssmin',
        'copy:chrome', 'replace:chrome', 'replace:chrome_conf', 'uglify', 'rev', 'usemin', 'htmlmin:final',
        'copy:bookmarklet'
    ]);

    grunt.registerTask('chrome_examples', 'Chrome extension', [
        'clean:chrome', 'copy:dev_chrome', 'copy:dev_chrome_modules', 'copy:dev_chrome_components', 
        'copy:dev_chrome_script', 'copy:dev_chrome_templates', 'copy:dev_chrome_css', 'replace:dev_chrome',
        'replace:dev_chrome_conf'
    ]);

    grunt.registerTask('dev', 'Live dev workflow: watches app files and reloads the browser automatically', [
        'less:dev', 'copy:fonts', 'chrome_examples', 'imagemin:dev', 'html2js:main',
        'html2js:korboee', 'examples', 'connect:livereload', 'open:server', 'watch'
    ]);

    grunt.registerTask('dev:unit', 'Live dev UNIT tests workflow: watches for test files and runs unit tests automatically', [
        'test:unit', 'watch:unit'
    ]);
    grunt.registerTask('dev:chrome', 'Live dev Chrome', ['watch:chrome']);

    grunt.registerTask('test', 'Executes unit and e2e tests', [
        'jshint', 'karma:unit', 'connect:testserver', 'protractor:singlerun'
    ]);
    grunt.registerTask('test:unit', 'Executes unit tests', [
        'jshint:tests', 'karma:unit'
    ]);
    grunt.registerTask('test:cov', 'Produces test coverage reports', ['karma:unitCoverage']);
    grunt.registerTask('test:e2e', 'Executes the e2e tests', [
        /*'jshint',*/
        'connect:testserver', 'protractor:singlerun'
    ]);

    grunt.registerTask('test:headless', [
        'jshint', 'karma:headless'
    ]);

    grunt.registerTask('default', ['clean']);

    grunt.registerTask('prod', 'Take as parameter a path or directory when to copy files ready to be included in the HTML page',
        function() {
            grunt.task.run('build');
            grunt.task.run('docNoOpen');
            grunt.config.set('customDir', arguments[0]);
            grunt.task.run('copy:prod');
        }
    );

    grunt.registerTask('prod_chrome', 'Take as parameter a path or directory when to copy chrome extension files',
        function() {
            grunt.task.run('build');
            grunt.config.set('customDir', arguments[0]);
            grunt.task.run('copy:prod_chrome');
        }
    );

    grunt.registerTask('uncompressedProd', 'Take as parameter a path or directory when to copy files ready to be included in the HTML page',
        function() {
            grunt.task.run('build');
            grunt.task.run('docNoOpen');
            grunt.config.set('customDir', arguments[0]);
            grunt.task.run('copy:prod');
            grunt.task.run('copy:uncompressed');
        }
    );
};
