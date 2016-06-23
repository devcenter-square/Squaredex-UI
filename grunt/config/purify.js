/**
 * Removes Unused css.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to reduce css file size by removing
 * unused styles
 *
 * For usage docs see:
 * 		https://www.npmjs.com/package/grunt-purifycss
 */
module.exports = function(grunt) {

    grunt.config.set('purifycss', {
        target: {
            src: ['build/**/*.html', 'build/**/*.js'],
            css: ['build/production.css'],
            dest: 'build/production.css'
        }
    });

    grunt.loadNpmTasks('grunt-purifycss');
};
