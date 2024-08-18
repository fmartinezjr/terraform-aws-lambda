import { NodeSDK } from "@opentelemetry/sdk-node";
import { awsLambdaDetector } from "@opentelemetry/resource-detector-aws";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { Resource } from "@opentelemetry/resources";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { AwsLambdaInstrumentation } from "@opentelemetry/instrumentation-aws-lambda";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

export const sdk = new NodeSDK({
  spanProcessors: [
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url:
          process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
          "https://opentelemetry.io/",
        headers: {},
      }),
    ),
  ],
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "terraform-aws-lambda",
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-http": {
        ignoreIncomingPaths: [/\/prometheus/],
      },
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
    new AwsLambdaInstrumentation({
      disableAwsContextPropagation: true,
    }),
  ],
  resourceDetectors: [awsLambdaDetector],
});

// Start the SDK with error handling
try {
  sdk.start();
} catch (error) {
  console.error("Error starting OpenTelemetry SDK", error);
  process.exit(1);
}

// Function to shut down the SDK gracefully
export async function shutdownSdk() {
  try {
    console.log("Shutting down OpenTelemetry SDK...");
    await sdk.shutdown();
    console.log("OpenTelemetry SDK shutdown completed.");
  } catch (error) {
    console.error("Error shutting down OpenTelemetry SDK", error);
  }
}
