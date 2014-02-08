module.exports = function(grunt) {
  grunt.initConfig({
    sass: function() {
      dist: {
        files: [{
          expand: true,
          cwd: './styles',
          src: ['*.scss'],
          dest: './bin/styles',
          ext: '.css'
        }]
      } 
    },
    browserify: function() {
      dist: {
        files: {
          'bin/index.js': ['src/app.js']
        }
      }
    },
    watch: function() {
      sass: {
        files: ['./styles/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['./src/**/*.js'],
        tasks: ['browserify']
      }
    }
  });

  grunt.loadNPMTasks('grunt-contrib-watch');
  grunt.loadNPMTasks('grunt-contrib-sass');
  grunt.loadNPMTasks('grunt-browserify');

  grunt.registerTask('build', ['sass', 'browserify']);
  grunt.registerTask('default', ['watch']);
}
