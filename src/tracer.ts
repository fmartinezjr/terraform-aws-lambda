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
