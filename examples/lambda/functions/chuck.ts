import fetch from "node-fetch";
import { Context } from "aws-lambda";

// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

export async function handler(event: any, context: Context) {
  const headers = { "Access-Control-Allow-Origin": "http://localhost:3000" };

  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return {
        statusCode: response.status,
        headers,
        body: response.statusText,
      };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ msg: data.value }),
    };
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
