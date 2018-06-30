const gulp = require('gulp'),
      connect = require('gulp-connect');

gulp.task('connect',()=>{
    connect.server({
        port : 8889
    });
});

gulp.task('default',['connect']);