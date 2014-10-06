module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gss: grunt.file.readJSON('grunt-gss.json'),

    gss_to_json: {
      dev: {
        options: {
          spreadsheetId: '<%= gss.spreadsheetId %>',
          worksheetId: '<%= gss.worksheetId %>',
          oauth : {
              email: '<%= gss.oauth.email %>',
              keyFile: '<%= gss.oauth.keyFile %>'
          },

          includeInfo: false,

          transformRow: function(row, header) {
            var rowdata = {};
            Object.keys(row).forEach(function(col) {
              var key = header[col] ? header[col].toLowerCase().replace(/[^a-z]/g, "") : col;
              rowdata[key] = row[col];
            });
            return rowdata;
          }
        },
        dest: "_data/games.json"
      }
    }

  });

  grunt.loadNpmTasks('grunt-gss-to-json');

  grunt.registerTask('default', ['gss_to_json']);
};

