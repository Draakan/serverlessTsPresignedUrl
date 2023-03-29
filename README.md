# Serverless Framework Project in NodeJS (Typescript)
This is a serverless framework project built with NodeJS. The project provides a template for building serverless applications on AWS Lambda. The main function of the application is to create a signed url for scalable file uploading.

### Prerequisites
In order to test and deploy this project you need to:
- Create an AWS account
If you don't already have an AWS account, sign up for one at https://aws.amazon.com/.

- Set up the AWS CLI
Install the AWS CLI by following the instructions at https://aws.amazon.com/cli/.

- Once the CLI is installed, configure it with your AWS credentials using the ```aws configure``` command

### Installation

- Install serverless framework globally via npm:
```sh
npm install -g serverless
```
- Clone the repository
- Install all dependencies
```sh
npm i
```
- Add .env file which will contain BUCKET and REGION env variables (.env.example)

### Usage

- To run the project locally, use the following command:
```sh
npm run start
```
- To deploy the project to AWS Lambda, use the following command:
```sh
npm run deploy
```