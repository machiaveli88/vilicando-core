#!/usr/bin/env node
import express from "express";
import bodyParser from "body-parser";
// @ts-ignore
import expressLogging from "express-logging";
import queryString from "querystring";
import { join } from "path";
import { existsSync } from "fs";
import chalk from "chalk";

function handleErr(err: any, response: any) {
  response.statusCode = 500;
  response.write("Function invocation failed: " + err.toString());
  response.end();
  console.error("Error during invocation: ", err);
  return;
}

function handleInvocationTimeout(response: any, timeout: any) {
  response.statusCode = 500;
  response.write(`Function invocation took longer than ${timeout} seconds.`);
  response.end();
  console.warn(
    `Your lambda function took longer than ${timeout} seconds to finish.
If you need a longer execution time, you can increase the timeout using the -t or --timeout flag.
Please note that default function invocation is 10 seconds, check our documentation for more information (https://www.netlify.com/docs/functions/#custom-deployment-options).
`
  );
}

function createCallback(response: any) {
  return function callback(err: any, lambdaResponse: any) {
    if (err) {
      return handleErr(err, response);
    }

    response.statusCode = lambdaResponse.statusCode;
    for (const key in lambdaResponse.headers) {
      response.setHeader(key, lambdaResponse.headers[key]);
    }
    for (const key in lambdaResponse.multiValueHeaders) {
      const items = lambdaResponse.multiValueHeaders[key];
      response.setHeader(key, items);
    }

    if (lambdaResponse.body) {
      response.write(
        lambdaResponse.isBase64Encoded
          ? Buffer.from(lambdaResponse.body, "base64")
          : lambdaResponse.body
      );
    } else {
      if (
        response.statusCode !== 204 &&
        process.env.CONTEXT !== "production" &&
        !process.env.SILENCE_EMPTY_LAMBDA_WARNING
      )
        console.warn(
          `Your lambda function didn't return a body, which may be a mistake. Check our Usage docs for examples (https://github.com/netlify/netlify-lambda#usage). 
          If this is intentional, you can silence this warning by setting process.env.SILENCE_EMPTY_LAMBDA_WARNING to a truthy value or process.env.CONTEXT to 'production'`
        );
    }
    response.end();
  };
}

function promiseCallback(promise: any, callback: any) {
  if (!promise) return;
  if (typeof promise.then !== "function") return;
  if (typeof callback !== "function") return;

  return promise.then(
    function (data: any) {
      callback(null, data);
    },
    function (err: any) {
      callback(err, null);
    }
  );
}

function createHandler(dir: string, timeout: number, urlPrefix: string) {
  return function (request: any, response: any) {
    // handle proxies without path re-writes (http-servr)
    const cleanPath = request.path.replace(urlPrefix, "");

    const func = cleanPath.split("/").filter((e: any) => !!e)[0];
    if (typeof func === "undefined") {
      console.error(
        `Something went wrong and the function path derived from ${cleanPath} (raw form: ${request.path}) was undefined. Please doublecheck your function naming and toml configuration.`
      );
    }
    if (typeof dir === "undefined") {
      console.error(
        `Something went wrong and the function directory ${dir} was undefined. Please doublecheck your toml configuration.`
      );
    }
    let module: string;
    if (existsSync(join(process.cwd(), dir, func, `${func}.js`)))
      module = join(process.cwd(), dir, func, func);
    else module = join(process.cwd(), dir, func);

    let handler;
    try {
      handler = require(module);
    } catch (err) {
      handleErr(err, response);
      return;
    }

    const isBase64 =
      request.body &&
      !(request.headers["content-type"] || "").match(
        /text|application|multipart\/form-data/
      );
    const lambdaRequest = {
      path: request.path,
      httpMethod: request.method,
      queryStringParameters: queryString.parse(request.url.split(/\?(.+)/)[1]),
      headers: request.headers,
      body: isBase64
        ? Buffer.from(request.body.toString(), "utf8").toString("base64")
        : request.body,
      isBase64Encoded: isBase64,
    };

    const callback = createCallback(response);
    const promise = handler.handler(lambdaRequest, {}, callback);

    let invocationTimeoutRef: any = null;

    Promise.race([
      promiseCallback(promise, callback),
      new Promise(function (resolve) {
        invocationTimeoutRef = setTimeout(function () {
          handleInvocationTimeout(response, timeout);
          resolve();
        }, timeout * 1000);
      }),
    ]).then(
      result => {
        clearTimeout(invocationTimeoutRef);
        return result; // not used, but writing this to avoid future footguns
      },
      err => {
        clearTimeout(invocationTimeoutRef);
        throw err;
      }
    );
  };
}

export default (
  port: number,
  dir: string,
  timeout: number,
  urlPrefix: string
) => {
  const app = express();
  app.use(bodyParser.raw({ limit: "6mb" }));
  app.use(bodyParser.text({ limit: "6mb", type: "*/*" }));
  app.use(
    expressLogging(console, {
      blacklist: ["/favicon.ico"],
    })
  );

  app.get("/favicon.ico", (req, res) => res.status(204).end());
  app.get("/", (req, res) =>
    res
      .status(404)
      .send(
        `You have requested the root of http://localhost:${port}. This is likely a mistake. vilicando-lambda serves functions at http://localhost:${port}/${urlPrefix}/your-function-name; please fix your code.`
      )
  );
  app.all("*", createHandler(dir, timeout, urlPrefix));

  app.listen(port, (err: any) => {
    if (err) {
      console.error(`  ${chalk.red("✘")} Unable to start lambda server: `, err);
      process.exit(1);
    }

    console.info(
      `  ${chalk.magenta("►")} Lambda server is listening on ${port}`
    );
  });

  return {
    clearCache: (chunk: any) =>
      delete require.cache[require.resolve(join(process.cwd(), dir, chunk))],
  };
};
