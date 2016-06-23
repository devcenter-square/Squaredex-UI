module.exports = function(grunt) {
    grunt.registerTask('default', ['less:vendors', 'less:dev', 'sails-linker:cssVendors', 'sails-linker:cssStyles', 'sails-linker:jsVendors', 'sails-linker:jsModules', 'sails-linker:jsScripts', 'watch']);
};
