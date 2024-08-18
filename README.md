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

## Build, Tag, and Push the Docker Image

1. **Authenticate Docker to ECR**:

   ```bash
   aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com
   ```

2. **Build the Docker Image**:

   ```bash
   yarn build-docker
   ```

3. **Tag the Image for ECR**:

   ```bash
   docker tag terraform-aws-lambda-app:latest <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/<ecr_repository>:latest
   ```

4. **Push the Image to ECR**:
   ```bash
   docker push <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-repository:latest
   ```

## Deplying with terraform

1. **Terraform plan**:

   ```bash
   terraform plan -var-file="secret.tfvars"
   ```

2. **Terraform apply**:
   ```bash
   terraform apply -var-file="secret.tfvars"
   ```

docker run -it --entrypoint sh terraform-aws-lambda-app
