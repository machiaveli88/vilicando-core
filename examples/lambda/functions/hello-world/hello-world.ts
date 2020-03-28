import { APIGatewayEvent } from "aws-lambda";

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export const handler = async (event: APIGatewayEvent) => {
  try {
    const subject = event.queryStringParameters.name || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
