// Módulos do GULP
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const php = require('gulp-connect-php');
const htmlMin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const bsConsoleQrcode = require('bs-console-qrcode');



// Variáveis de configuração
const srcPath = 'src/';
const distPath = 'dist/';



// Compressor de HTML
gulp.task('html', function() {
  gulp.src(srcPath + 'html/**/*.+(html|php)')
    // .pipe(htmlMin({
    //   collapseWhitespace: true
    // }))
    .pipe(gulp.dest(distPath))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Processador de SASS, compressor, gerador de sourcemaps e autoprefixador de CSS
gulp.task('sass', function() {
  gulp.src(srcPath + 'sass/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(distPath + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Compressor de Javascript
gulp.task('js', function() {
  gulp.src(srcPath + 'js/**/*.js')
    .pipe(uglify().on('error', function(uglify) {
      console.error(uglify.message);
      this.emit('end');
    }))
    .pipe(gulp.dest(distPath + 'js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Compressor de imagens
gulp.task('img', function() {
  gulp.src(srcPath + 'img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(distPath + 'img'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Copiar outros arquivos do projeto
gulp.task('files', function() {
  gulp.src(srcPath + 'files/**/*')
    .pipe(gulp.dest(distPath))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Inicializador do BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    port: 8080,
    startPath: '.',
    // plugins: [bsConsoleQrcode],
  });
});

// Assistir arquivos do projeto
gulp.task('watch', function() {
  gulp.watch(srcPath + 'html/**/*.+(html|php)', ['html']);
  gulp.watch(srcPath + 'sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch(srcPath + 'js/**/*.js', ['js']);
  gulp.watch(srcPath + 'img/**/*', ['img']);
  gulp.watch(srcPath + 'files/**/*', ['files']);
});


// Tarefa padrão
gulp.task('default', ['html', 'sass', 'js', 'img', 'files', 'browserSync', 'watch']);
