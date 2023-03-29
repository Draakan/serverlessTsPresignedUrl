import { formatJSONResponse } from '@utils/format-response';
import { middyfy } from '@utils/middy-middleware';
import { S3 } from 'aws-sdk';
import { APIValidatedGatewayEvent, EventBodyValidationSchema } from './schema';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

const handler = async ({ body }: APIValidatedGatewayEvent) => {
  const { fileName, fileType } = body;

  const s3Client = new S3({
    signatureVersion: 'v4',
    region: process.env.REGION,
  });

  const params = {
    Bucket: process.env.BUCKET,
    ContentType: fileType,
    Expires: 300, // sec
    Key: fileName,
  };

  const signedUrl: string = await s3Client.getSignedUrlPromise('putObject', params);

  return {
    signedUrl,
  };
};

export const getSignedUrl = middyfy(handler)
  .before((request) => {
    request.event.body = EventBodyValidationSchema.parse(request.event.body);
  })
  .after(({ response }) => {
    return formatJSONResponse(StatusCodes.OK, response);
  })
  .onError((request) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let error: string | ZodError = request.error.message;

    if (request.error instanceof ZodError) {
      statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      error = request.error;
    }

    console.log(request.error);

    return formatJSONResponse(statusCode, { error });
  });
