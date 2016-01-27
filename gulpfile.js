var gulp = require('gulp');

var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var prefix        = require('gulp-autoprefixer');
var childprocess  = require('child_process');

var jekyllDir = './jekyll/';

gulp.task('jekyll-build', function (gulpCallBack){
  var spawn = childprocess.spawn;
  var jekyll = spawn('bundle', ['exec','jekyll','build','--incremental'], {stdio: 'inherit', cwd:jekyllDir});

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});


gulp.task('browser-sync', ['sass','jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: jekyllDir+'_site'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src(jekyllDir+'_sass/main.scss')
    .pipe(sass({
        includePaths: [jekyllDir+'_sass'],
        outputStyle: 'compressed',
        onError: browserSync.notify
    }))
    .pipe(prefix(['last 2 versions', '> 5%', 'not ie < 11'], { cascade: true }))
    .pipe(gulp.dest(jekyllDir+'_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(jekyllDir+'css'));
});

gulp.task('watch', function () {
  gulp.watch([
    jekyllDir+'_sass/*.scss'
    ], ['sass']);
  gulp.watch([
    jekyllDir+'*.html', 
    jekyllDir+'_layouts/*.html', 
    jekyllDir+'_posts/*'
    ], ['jekyll-rebuild']);
});



gulp.task('default', ['browser-sync', 'watch']);
