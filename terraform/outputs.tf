output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.supplements_lambda.function_name
}

output "api_endpoint" {
  description = "API Gateway endpoint URL"
  value       = "${aws_apigatewayv2_api.lambda_api.api_endpoint}/check-interaction"
} 