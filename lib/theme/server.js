"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withLess = require('@zeit/next-less');
const theme = require('./theme');
exports.default = (modifyVars) => withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: {
            ...theme,
            ...modifyVars
        }
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles))
                        return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback);
                    }
                    else {
                        callback();
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ];
            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader'
            });
        }
        return config;
    }
});
//# sourceMappingURL=server.js.map