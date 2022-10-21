import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler2: APIGatewayProxyHandlerV2 = async (event) => {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Test ${event.requestContext.time}.`,
    };
  };