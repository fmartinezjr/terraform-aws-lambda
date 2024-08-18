import { trace } from "@opentelemetry/api";
import { sdk } from "./tracer";
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

sdk.start();

// Create an instance of the EventBridgeClient
const eventBridgeClient = new EventBridgeClient({ region: "us-east-1" }); // Specify your region

export async function handler() {
  try {
    console.log("in handler");

    const message = await new Promise((resolve) => {
      setTimeout(() => {
        const msg = Math.random();
        resolve(msg);
      }, 2000);
    });

    // Create the EventBridge event
    const eventBridgeParams = {
      Entries: [
        {
          Source: "my.application",
          DetailType: "myDetailType",
          Detail: JSON.stringify({ message }),
          EventBusName:
            "arn:aws:events:us-east-1:208346347555:event-bus/default", // Replace with your EventBridge ARN
        },
      ],
    };

    // Send the event to EventBridge
    const eventBridgeResponse = await eventBridgeClient.send(
      new PutEventsCommand(eventBridgeParams),
    );
    console.log("EventBridge response:", eventBridgeResponse);

    console.log("EventBridge response:", eventBridgeResponse);

    console.log("message being returned", message);
    return {
      statusCode: 200,
      body: `Hello world! ${message}`,
    };
  } catch (error) {
    throw error;
  } finally {
    await sdk.shutdown(); // Ensure the SDK shuts down properly
  }
}
