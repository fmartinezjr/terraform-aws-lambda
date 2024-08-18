import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.log("in handler");

  const message = await new Promise((resolve) =>
    setTimeout(() => {
      resolve("Time out complete");
    }, 2000),
  );

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
}
