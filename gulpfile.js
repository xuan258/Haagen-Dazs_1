const gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	imageMin = require('gulp-imagemin');
	uglify = require('gulp-uglify');
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	//.pipe(cssnano())
	.pipe(rename({'suffix':'.min'}))
	.pipe(gulp.dest('./dist'));
})
gulp.task('default',()=>{
	gulp.watch(['./src/sass/*.scss'],['sass']);
	gulp.watch(['./src/img/*'],['img']);
	gulp.watch(['./src/js/*.js'],['js']);
})
gulp.task('img',function(){
	gulp.src('./src/img/*')
	.pipe(imageMin({progressive:true}))
	.pipe(rename({'suffix':'.min'}))
	.pipe(gulp.dest('./dist/img'))
})
gulp.task('js',function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));
})


