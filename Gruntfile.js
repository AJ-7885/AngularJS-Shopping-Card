/*! Author : AJ @MavajSunCo  23-DEC-2016 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
    });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          '_/js/app.js': ['_/components/js/*.js','_/components/js/modules/*.js']
        } //files
      } //my_target
    }, //uglify
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        } //options
      } //dev
    }, //compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['_/components/js/*.js'],
        tasks: ['uglify']
      }, //script
      sass: {
        sourcemap: 'auto',  
        files: ['_/components/sass/*.scss'],
        tasks: ['compass:dev']
      }, //sass
      html: {
        files: ['*.html']
      }
    } //watch
  }) //initConfig
  grunt.registerTask('default', 'watch');
} //exports