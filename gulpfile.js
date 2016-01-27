var gulp = require('gulp');

var browserSync = require('browser-sync');

var jekyllDir = './jekyll/';

gulp.task('jekyll-build', function (gulpCallBack){
	var spawn = require('child_process').spawn;
	var jekyll = spawn('bundle', ['exec','jekyll','build','--incremental'], {stdio: 'inherit', cwd:jekyllDir});

	jekyll.on('exit', function(code) {
		gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
	});
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});


gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: jekyllDir+'_site'
		}
	});
});

gulp.task('watch', function () {
	// gulp.watch(jekyllDir+'_scss/*.scss', ['sass']);
	gulp.watch([
		jekyllDir+'*.html', 
		jekyllDir+'_layouts/*.html', 
		jekyllDir+'_posts/*'
		], ['jekyll-rebuild']);
});



gulp.task('default', ['browser-sync', 'watch']);
