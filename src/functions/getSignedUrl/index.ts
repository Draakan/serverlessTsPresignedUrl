import { handlerPath } from '@utils/handler-resolver';

export const getSignedUrl = {
  handler: `${handlerPath(__dirname)}/handler.getSignedUrl`,
  events: [
    {
      http: {
        method: 'post',
        path: 'get-signed-url',
      },
    },
  ],
};
