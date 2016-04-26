var
		autoprefixer = require('gulp-autoprefixer'),
		combineMq    = require('gulp-combine-mq'),
		concat       = require('gulp-concat'),
		cssminifiy   = require('gulp-minify-css'),
		connect      = require('gulp-connect'),
		data         = require('gulp-data'),
		gulp         = require('gulp'),
		gutil        = require('gulp-util'),
		jade         = require('gulp-jade'),
		livereload   = require('gulp-livereload'),
		notify       = require('gulp-notify'),
		plumber      = require('gulp-plumber'),
		rename       = require('gulp-rename'),
		replace      = require('gulp-replace'),
		sass         = require('gulp-ruby-sass'),
		uglify       = require('gulp-uglify');

var
	src_folder = '_source',
	dist_folder = 'public',
	project_port = 8013;

var onError = function (err) {
	gutil.beep();
	console.log(err);
};

gulp.task('connect', function() {
  connect.server({
    root: dist_folder,
		port: project_port,
    livereload: true
  });
});

gulp.task( 'scss_styles' , function(cb) {
	return sass( src_folder + '/scss')
		.pipe(replace(/!hosita(\s{1}tupa)?/g, '!important'))
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(combineMq())
		.pipe(gulp.dest(  dist_folder + '/assets/css'))
		.pipe(notify({message: 'CSS OK'}))
		.pipe(cssminifiy())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(  dist_folder + '/assets/css' ) );
});

gulp.task('js_plugins', function(){
	return gulp.src([ src_folder + '/js/plugins/*.js'])
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe( concat('plugins.js') )
		.pipe( gulp.dest( dist_folder + '/assets/js/') )
		.pipe( notify({message: 'PLUGINS OK'}));
});

gulp.task('js_scripts', function(){
	return gulp.src([ src_folder + '/js/*.js'])
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe( gulp.dest( dist_folder + '/assets/js/') )
		.pipe( rename({suffix: '.min'} ) )
		.pipe( uglify() )
		.pipe( gulp.dest( dist_folder + '/assets/js/') )
		.pipe( notify({message: 'JS OK'}));
});

gulp.task('jade_templates', function() {
  var YOUR_LOCALS = {};

  gulp.src( src_folder + '/jade/*.jade')
  	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(data( function(file) {
                  return require('./_source/data/cv.json');
                } ))
    .pipe(jade())

    .pipe(gulp.dest( dist_folder +'/'))
    .pipe( notify({message: 'JADE OK'}));
});

gulp.task('html', function () {
  gulp.src( dist_folder +'/*.html')
    .pipe(connect.reload());
});


gulp.task('watch', function(){
	livereload.listen();
	gulp.watch( src_folder + '/js/plugins/*.js', ['js_plugins']).on('change', livereload.changed);
	gulp.watch( src_folder + '/js/*.js', ['js_scripts']).on('change', livereload.changed);
	gulp.watch( src_folder + '/scss/*.scss', ['scss_styles']);
	gulp.watch( src_folder + '/jade/*.jade', ['jade_templates', 'html']);
	gulp.watch( dist_folder + '/assets/css/*.css').on('change', livereload.changed);
	gulp.watch( dist_folder + '/*.html' ).on('change', livereload.changed);
	//gulp.watch([dist_folder + '/*.html'], ['html']);
});

gulp.task('default', ['connect','watch']);
