/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        build: {
            files: [{
                expand: true,
                cwd: 'dev/',
                src: ['**/*', '!**/*.less', '!index.html', '!api/**', '!assets/less/**'],
                dest: 'build'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
