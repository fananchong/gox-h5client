module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: __dirname,
        publicPath: './src',
        filename: './src/bundle.js'
    },
    devServer: {
        "addr": "localhost",
        "port": 8000,
        "open": true,
        "browser": ["chrome", '--allow-file-access-from-files', '--disable-web-security', '--user-data-dir=./userdata'],
        "watch_js": ['./src/index.js', './src/app/**/*.js'],
        "watch_html": ['./src/**/*.html']
    },
    node: {
        fs: 'empty'
    }
};