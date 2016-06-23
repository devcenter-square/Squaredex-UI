module.exports = function(grunt) {
    grunt.registerTask('build', ['clean:build', 'copy', 'concat:css', 'concat:js', 'cssmin', 'uglify', 'concat:build', 'clean:js', 'clean:css', 'rename', 'sails-linker:buildCssStyles', 'sails-linker:buildJsScripts']);
};