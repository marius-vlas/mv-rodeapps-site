/**
 * Created on 26/6/17.
 */

var gulp = require('gulp');
var run  = require('gulp-run');

gulp.task('autoprefix-css', function () {
    return run('postcss src/assets/css/main.css --use autoprefixer -d src/assets/css/build/').exec();
});
gulp.task('watch', function () {
    gulp.watch('src/assets/css/main.css', ['autoprefix-css']);
});

gulp.task('default', [
    'watch',
]);