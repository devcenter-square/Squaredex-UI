module.exports = function (grunt) {
	grunt.registerTask('json-api', ['less:vendors', 'less:dev', 'sails-linker', 'concurrent:server']);
};
