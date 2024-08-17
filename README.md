# terraform-aws-lambda

Using terraform to create aws lambda

## Running the project locally

1. **Build Docker Image**:
   ```bash
   yarn build-docker
   ```

2. **Run Docker Container**:
   ```bash
   docker run -p 3200:3200 terraform-aws-lambda-app
   ```

3. **Send a Request**:
   ```bash
   curl -X POST http://localhost:3200/events -H "Content-Type: application/json" -d '{"key":"value"}'
   ```

