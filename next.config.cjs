module.exports = {
    // webpack: (config, { isServer }) => {
    //     // Fixes npm packages that depend on `fs` module
    //     if (!isServer) {
    //         config.node = {
    //             fs: 'empty',
    //             dns: 'empty',
    //             net: 'empty',
    //             tls: 'empty'
    //         };
    //     }
    //     return config;
    // },
    // webpack(config) {
    //     config.resolve.extensions.push('.ts', '.tsx');
    //     return config;
    // },
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /node_modules\/mongodb\//,
    //         loader: 'null-loader',
    //     });
    //     return config;
    // },
};