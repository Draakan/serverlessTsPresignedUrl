import { StatusCodes } from 'http-status-codes';

export const formatJSONResponse = (statusCode: StatusCodes, response: Record<string, unknown>) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
