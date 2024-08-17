import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.log("in handler")
  return {
    statusCode: 200,
    body: "Hello world!",
  };
}
