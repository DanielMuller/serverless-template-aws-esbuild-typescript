import type { APIGatewayProxyResult, APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { getMessage } from '@@controllers/hello'
import log from 'lambda-log'
const main = async (event: APIGatewayProxyHandlerV2): Promise<APIGatewayProxyResult> => {
  log.info('Event', { event })
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: getMessage(),
      input: event,
    }),
  }

  return response
}

export const handler = main
