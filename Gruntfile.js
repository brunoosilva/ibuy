module.exports = function( grunt ) {
  require( 'jit-grunt' )( grunt );

  grunt.initConfig( {
    watch: {
      styles: {
        files: [ "assets/less/*.less"], // which files to watch
        tasks: [ "less" ],
        options: {
          nospawn: true
        }
      },
      uglify: {
        files: [ "assets/libs/**/*.min.js", "assets/js/src/*.js"], // which files to watch
        tasks: [ "uglify" ]
      }
    },
    uglify: {
      options: {
        mangle: false,
        beautify: true
      },
      ibuy: {
        files: {
          "assets/js/site.min.js" : [
                                      "assets/libs/angular/angular.min.js"
                                    , "assets/libs/angular-route/angular-route.min.js"
                                    , "assets/libs/angular-sanitize/angular-sanitize.min.js"
                                    , "assets/libs/ngSweetAlert/SweetAlert.min.js"
                                    , "assets/libs/sweetalert/dist/sweetalert.min.js"
                                    , "assets/js/src/*.js"
                                    ]
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files:  {
          "assets/css/site.min.css": "assets/less/*.less"
        }
      }
    }
  });

grunt.registerTask('default', ['less', 'uglify', 'watch']);

};
