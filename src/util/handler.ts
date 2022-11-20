// src/util/handler.ts
import { APIGatewayProxyResult, Callback, Context, Handler } from 'aws-lambda';

export default function handler(lambda: Handler) {
  return async function (
    event: any,
    context: Context,
    callback: Callback
  ): Promise<APIGatewayProxyResult> {
    let body, statusCode;

    try {
      // 람다 실행
      body = await lambda(event, context, callback);
      statusCode = 200;
    } catch (e: any) {
      console.error(e);
      body = { error: e.message };
      statusCode = 500;
    }

    // HTTP 응답 return
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}