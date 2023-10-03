module.exports = {
    configureWebpack: (config) => {
        // Add a polyfill for the http module
        config.resolve.fallback = {
            "http": require.resolve("stream-http"),
            "url": require.resolve("url/"),
            "https": require.resolve("https-browserify"),
            "path": require.resolve("path-browserify"),
            "fs": require.resolve("browserify-fs"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
        };
    }
};