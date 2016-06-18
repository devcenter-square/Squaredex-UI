/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-concurrent
 *
 */
module.exports = function (grunt) {

    grunt.config.set('concurrent', {
        server: {
            tasks: [
                'json_server',
                'watch'
            ],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
};