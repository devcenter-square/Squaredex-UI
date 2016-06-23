/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

    grunt.config.set('less', {
        dev: {
            files: [{
                expand: true,
                cwd: 'dev/assets/less/',
                src: ['app.less'],
                dest: 'dev/assets/css/',
                ext: '.css'
            }]
        },
        vendors: {
            files: [{
                expand: true,
                cwd: 'dev/assets/less/bootstrap/',
                src: ['bootstrap.less'],
                dest: 'dev/assets/vendor/bootstrap/',
                ext: '.css'
            }, {
                expand: true,
                cwd: 'dev/assets/less/font-awesome/',
                src: ['font-awesome.less'],
                dest: 'dev/assets/vendor/font-awesome/',
                ext: '.css'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};
