/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function (grunt) {

    grunt.config.set('watch', {
        lessAssets: {
            files: 'dev/assets/less/*.less',
            tasks: ['less:dev']
        },
        assets: {
            files: ['dev/assets/css/**/*', 'dev/assets/vendor/**/*', 'dev/assets/modules/**/*', 'dev/assets/js/**/*'],
            tasks: ['sails-linker'],
            options: {
                livereload: true
            }
        },
        html: {
            files: ['dev/**/*.html', 'dev/**/*.js'],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};