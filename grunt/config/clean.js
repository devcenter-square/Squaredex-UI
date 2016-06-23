/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {
    grunt.config.set('clean', {
        build: ['build/**/*', '!build/index.html'],
        js: ['build/assets/js/**/*', 'build/modules/**/*.js', '!build/assets/js/local.js'],
        css: ['build/assets/css/**/*']
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
};
