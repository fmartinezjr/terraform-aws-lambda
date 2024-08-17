provider "aws" {
  region = "us-east-1"
  profile = var.aws_profile
}

resource "aws_ecr_repository" "terraform_aws_lambda_ecr" {
  name = "terraform_aws_lambda_ecr"
}

resource "aws_iam_role" "lambda_execution_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "terraform_aws_lambda" {
  function_name = "terraform_aws_lambda"
  role          = aws_iam_role.lambda_execution_role.arn
  package_type  = "Image"
  image_uri     = "${var.aws_account}.dkr.ecr.us-east-1.amazonaws.com/terraform_aws_lambda_ecr:latest"

  depends_on = [aws_ecr_repository.terraform_aws_lambda_ecr]
}

output "lambda_function_arn" {
  value = aws_lambda_function.terraform_aws_lambda.arn
}
