const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat"); 
const uglify = require("gulp-uglify");
 
function compileSass() {
  return gulp
    .src("sass/*.scss")
    .pipe(sass({ outputStyle: "compressed",
      silenceDeprecations: ['import'] }))
    
    .pipe(gulp.dest("assets/css/"))
    .pipe(browserSync.stream());
}

gulp.task("sass", compileSass);

function pluginsCSS() {
  return gulp
    .src("assets/css/lib/*.css")
    .pipe(concat("plugins.css"))
    .pipe(gulp.dest("assets/css/"))
    .pipe(browserSync.stream());
}

gulp.task("plugincss", pluginsCSS);

function gulpJs() {
  return gulp
    .src("assets/js/scripts/*.js")
    .pipe(concat("all.js")) 
    .pipe(uglify())
    .pipe(gulp.dest("assets/js/"))
    .pipe(uglify());
}

gulp.task("alljs", gulpJs);

function pluginsJs() {
  return gulp
    .src([])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("assets/js/"))
    .pipe(browserSync.stream());
}

gulp.task("pluginjs", pluginsJs);

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

gulp.task("browser-sync", browser);
 

function watch() {
  gulp.watch("sass/*.scss", compileSass);
  gulp.watch("assets/css/lib/*.css", pluginsCSS);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("assets/js/scripts/*", gulpJs);
  gulp.watch("assets/js/lib/*.js", pluginsJs); 
}

gulp.task("watch", watch);

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "browser-sync",
    "sass",
    "alljs",    
  )
);