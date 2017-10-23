const { mix } = require('laravel-mix');

mix
.options({
    publicPath: 'dist'
})

mix.js('src/event.js', 'dist')
    .js('src/mediafire.js', 'dist')
    .js('src/temaS2.js', 'dist')
    .copy('src/icon.png', 'dist')
    .copy('src/manifest.json', 'dist');