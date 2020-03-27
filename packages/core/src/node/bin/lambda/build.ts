import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import webpack from 'webpack';

const test = /\.(m?js|ts)?$/;
const testFilePattern = '\\.(test|spec)\\.?';
const exclude = new RegExp(
  `(node_modules|bower_components|${testFilePattern})`
);

function getFiles(dir: string): Array<string> {
  const dirents = readdirSync(dir, { withFileTypes: true });

  const files = dirents.map(dirent => {
    const res = resolve(dir, dirent.name);

    return dirent.isDirectory() ? getFiles(res) : res;
  });

  return Array.prototype.concat(...files);
}

function webpackConfig(srcDir: string, destDir: string) {
  const srcPath = resolve(join(process.cwd(), srcDir));
  const destPath = resolve(join(process.cwd(), destDir));

  if (srcPath === destPath) {
    throw new Error(
      `
      netlify-lambda Error: Function source folder (specified in netlify-lambda serve/build command) and publish folder (specified in netlify.toml)
      should be different. They are both set to ${srcPath}.

      This is a common mistake for people switching from Netlify Dev to netlify-lambda. For an easy fix, change your functions key inside netlify.toml to something else, like "functions-build".
      You will then need to build your functions to that directory before they will work locally and the built functions will also need to be pushed to your repo.
      For more info, check https://github.com/netlify/netlify-lambda#usage
      `
    );
  }

  // Keep the same NODE_ENV if it was specified
  const nodeEnv = process.env.NODE_ENV || 'production';

  const webpackConfig = {
    mode: 'development' as const,
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.ts'],
      mainFields: ['module', 'main']
    },
    module: {
      rules: [
        {
          test,
          exclude,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              presets: ['next/babel']
            }
          }
        }
      ]
    },
    context: srcPath,
    entry: {},
    target: 'node' as const,
    plugins: [new webpack.IgnorePlugin(/vertx/)],
    output: {
      path: destPath,
      filename: '[name].js',
      libraryTarget: 'commonjs' as const
    },
    optimization: {
      nodeEnv
    },
    stats: {
      colors: true
    }
  };

  getFiles(srcPath)
    .filter(file => !file.match(exclude))
    .map(file => file.replace(srcPath, ''))
    .forEach((file: string) => {
      if (file.match(test)) {
        const name = file.replace(test, '');

        if (!name.match(new RegExp(testFilePattern))) {
          webpackConfig.entry[name] = './' + file;
        }
      }
    });

  if (!Object.keys(webpackConfig.entry).length) {
    console.warn(
      `
      ---Start netlify-lambda notification---
      WARNING: No valid single functions files (ending in .mjs, .js or .ts) were found. 
      If this is expected (e.g. you have a zipped function built somewhere else), you may ignore this.
      ---End netlify-lambda notification---
      `
    );
  }

  return webpackConfig;
}

export default function(
  srcDir: string,
  destDir: string,
  cb: (err: any, stats: any) => void
) {
  const config = webpackConfig(srcDir, destDir);

  const compiler = webpack(config);
  compiler.watch({}, cb);
}
