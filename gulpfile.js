const { src, dest, watch, series } = require("gulp");

//CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
// const sourcemaps = require("gulp-sourcemap");
const cssnano = require("cssnano");//minificar y mejorar nuestro css

//Imagenes
const imagemin = require("gulp-imagemin");//tenemos que npm install la version 7.1
const webp = require("gulp-webp");
const avif = require("gulp-avif");

const css = (done) => {
    src("src/scss/app.scss")
        // .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"))
    done();
}

const imagenes = () => {
    return src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));

}

const versionWebp = () => {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'));
}

const versionAvif = () => {
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('build/img'));
}

const dev = () => {
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
