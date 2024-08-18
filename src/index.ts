import { trace } from "@opentelemetry/api";
import { sdk } from "./tracer";

sdk.start();

export async function handler() {
  const tracer = trace.getTracer("tracer-1");

  return tracer.startActiveSpan("time-span", async (span) => {
    try {
      console.log("in handler");

      const message = await new Promise((resolve) => {
        setTimeout(() => {
          const msg = Math.random();
          resolve(msg);
        }, 2000);
      });

      // Optionally, you can add attributes to the span
      span.setAttribute("name of function", "panch-function");

      console.log("message being returned", message);
      return {
        statusCode: 200,
        body: `Hello world! ${message}`,
      };
    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end(); // End the span
      await sdk.shutdown(); // Ensure the SDK shuts down properly
    }
  });
}
