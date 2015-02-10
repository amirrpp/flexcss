var path = require("path");
var webpack = require("webpack");
module.exports = {
    watch: false,
    module: {
        loaders: [
            {test: /\.js$/, loader: '6to5-loader?experimental&runtime&optional=selfContained'}
        ],
        postLoaders: [{ //
            test: /\.js$/,
            exclude: /(test|node_modules|bower_components)\//,
            loader: 'istanbul-instrumenter'
        }]
    },
    resolve: {
        // add bower components and main source to resolved
        root: [path.join(__dirname, "bower_components"),
            path.join(__dirname, 'src/main'),
            path.join(__dirname, 'src/test_helpers')]
    },
    output: {
        filename: 'app.js',
        libraryTarget: 'umd',
        library: 'FlexCss'
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.ProvidePlugin({
            to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
        })
    ]
};