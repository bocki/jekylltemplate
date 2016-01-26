var gulp = require('gulp');

var jekyllDir = './jekyll/';

gulp.task('jekyll', function (gulpCallBack){
	var spawn = require('child_process').spawn;
	var jekyll = spawn('bundle', ['exec','jekyll','build'], {stdio: 'inherit', cwd:jekyllDir});

	jekyll.on('exit', function(code) {
		gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
	});
});

gulp.task('default', ['jekyll']);
