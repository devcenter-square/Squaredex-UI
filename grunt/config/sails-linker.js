/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 *      https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {
    grunt.config.set('sails-linker', {
        cssVendors: {
            options: {
                startTag: '<!--CSS_VENDORS-->',
                endTag: '<!--CSS_VENDORS END-->',
                fileTmpl: '<link rel="stylesheet" href="%s" type="text/css" />',
                appRoot: 'dev/'
            },
            files: {
                'dev/index.html': ['dev/assets/vendor/**/*.css', '!dev/assets/vendor/lazyload/**/*']
            },
        },
        cssStyles: {
            options: {
                startTag: '<!--CSS_STYLES-->',
                endTag: '<!--CSS_STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s" type="text/css" />',
                appRoot: 'dev/'
            },
            files: {
                'dev/index.html': ['dev/assets/css/fonts.css', 'dev/assets/css/**/*.css']
            },
        },
        jsVendors: {
            options: {
                startTag: '<!--JS_VENDORS-->',
                endTag: '<!--JS_VENDORS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: 'dev/'
            },
            files: {
                'dev/index.html': ['dev/assets/vendor/jquery/jquery.js', 'dev/assets/vendor/jquery/*.js', 'dev/assets/vendor/angular/angular.js', 'dev/assets/vendor/angular/**/*.js', 'dev/assets/vendor/underscore/*.js', 'dev/assets/vendor/**/*.js', '!dev/assets/vendor/angular/angular.min.js', '!dev/assets/vendor/lazyload/**/*']
            },
        },
        jsModules: {
            options: {
                startTag: '<!--JS_MODULES-->',
                endTag: '<!--JS_MODULES END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: 'dev/'
            },
            files: {
                'dev/index.html': ['dev/modules/**/*.js']
            },
        },
        jsScripts: {
            options: {
                startTag: '<!--JS_SCRIPTS-->',
                endTag: '<!--JS_SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: 'dev/'
            },
            files: {
                'dev/index.html': ['dev/assets/js/app.js', 'dev/assets/js/**/*.js', '!dev/assets/js/index.js', '!dev/assets/js/local.js']
            },
        },
        buildCssStyles: {
            options: {
                startTag: '<!--CSS_STYLES-->',
                endTag: '<!--CSS_STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s" type="text/css" />',
                appRoot: 'build/'
            },
            files: {
                'build/index.html': ['build/assets/css/**/*.css']
            },
        },
        buildJsScripts: {
            options: {
                startTag: '<!--JS_SCRIPTS-->',
                endTag: '<!--JS_SCRIPTS END-->',
                fileTmpl: '<script src="%s" type="text/javascript"></script>',
                appRoot: 'build/'
            },
            files: {
                'build/index.html': ['build/assets/js/**/*.js', '!build/assets/js/local.js']
            },
        },
    });
    grunt.loadNpmTasks('grunt-sails-linker');
};