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
 *      https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {
    grunt.config.set('rename', {
        css: {
            files: [{
                src: ['build/production.css'],
                dest: 'build/assets/css/production.min.css'
            }]
        },
        js: {
            files: [{
                src: ['build/production.js'],
                dest: 'build/assets/js/production.min.js'
            },{
                src: ['build/dependencies.js'],
                dest: 'build/assets/js/dependencies.min.js'
            }]
        },
        others: {
            files: [{
                src: ['build/index-template.html'],
                dest: 'build/index.html'
            }]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-rename');
};