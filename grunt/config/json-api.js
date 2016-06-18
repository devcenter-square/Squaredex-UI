/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-uglify
 *
 */

module.exports = function (grunt) {

    grunt.config.set('json_server', {
        json_server: {
            options: {
                port: 8081,
                hostname: 'localhost',
                db: 'dev/api/db.json'
            }
        },
    });

    grunt.loadNpmTasks('grunt-json-server');
};