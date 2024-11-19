import type { APIGatewayProxyResult, APIGatewayProxyHandlerV2, Context } from 'aws-lambda'
import { getMessage } from '@@controllers/hello'
import { logger } from '@@shared/utils/logger'

const main = async (
  event: APIGatewayProxyHandlerV2,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    logger.addContext(context)
    logger.logEventIfEnabled(event)

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: getMessage(),
        input: event,
      }),
    }

    logger.debug('response', response)
    return response
  } catch (error) {
    logger.error('Error', {
      error: error as Error,
    })
  } finally {
    logger.resetKeys()
  }
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Error',
    }),
  }
}

export const handler = main
