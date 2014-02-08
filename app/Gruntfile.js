module.exports = function(grunt) {
  
  grunt.initConfig({
    sass: {
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
    browserify: {
      dist: {
        files: {
          'bin/index.js': ['src/app.js']
        }
      }
    },
    watch: {
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['sass', 'browserify']);
  grunt.registerTask('default', ['watch', 'build']);
}
