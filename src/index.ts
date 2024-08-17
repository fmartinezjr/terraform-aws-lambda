import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function main(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: "Hello world!"
  };
}
