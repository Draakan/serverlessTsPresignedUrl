import { APIGatewayProxyEvent } from 'aws-lambda';
import { z } from 'zod';

export const EventBodyValidationSchema = z
  .object({
    fileType: z
      .string()
      .regex(/^([a-z]+\/[a-z0-9-]+)(\+[a-z0-9-]+)?$/i) // application/json
      .nonempty(),
    fileName: z
      .string()
      .regex(/\.[a-z0-9]+$/i) // name.txt
      .nonempty(),
  })
  .required()
  .strict();

export type APIValidatedGatewayEvent = Omit<APIGatewayProxyEvent, 'body'> & {
  body: z.infer<typeof EventBodyValidationSchema>;
};
