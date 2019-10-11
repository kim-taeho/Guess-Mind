import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import bro from "gulp-browserify";
import babel from "babelify";

sass.compiler = require("node-sass");

const paths = {
    styles: {
        src: "assets/scss/styles.scss",
        dest: "src/static/styles",
        watch: "assets/scss/**/*.scss"        
    },
    js: {
        src: "assets/js/main.js",
        dest: "src/static/js",
        watch: "assets/js/**/*.js"
    }
}
function clean() {
    return del(["src/static"]);
}
function styles(){
    return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 2 versions"],
            cascade: false
        })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

const js = () => {
    return(
        gulp
            .src(paths.js.src)
            .pipe(
                bro({transform: [
                babel.configure({
                    presets: ["@babel/preset-env"]
                })
            ]
        })
            )
            .pipe(gulp.dest(paths.js.dest))
    );  
}

function watchFiles(){
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.styles.watch, js);
}

const dev = gulp.series(clean, styles, js, watchFiles);

export const build = gulp.series(clean, styles, js);

export default dev;