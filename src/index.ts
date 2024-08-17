/* import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function main(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  return {};
}
 */

function helloWorld(): string {
  return "Hello, world!";
}

console.log(helloWorld());