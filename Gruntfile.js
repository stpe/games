module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gss: grunt.file.readJSON('grunt-gss.json'),

    shell: {
      jekyllServe: {
        command: 'jekyll serve --watch'
      }
    },

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
              if (["title", "platform", "code", "cib"].indexOf(key) != -1) {
                rowdata[key] = String(row[col]);
              }
            });
            return rowdata;
          }
        },
        dest: '_data/games.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-gss-to-json');

  grunt.registerTask('update', ['gss_to_json']);
  grunt.registerTask('default', ['shell:jekyllServe']);
};
