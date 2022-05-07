import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { backendUrl, development } from '../constants/config';
import coloredLog from '../utils/coloredLog';

const errorLink = onError(error => {
  const { graphQLErrors, networkError, operation, response } = error;

  // console.log('operation: ', JSON.stringify(operation, null, 4));
  // console.log('response: ', JSON.stringify(response, null, 4));

  if (graphQLErrors)
    graphQLErrors.forEach(graphQLError => {
      const { extensions, message, path } = graphQLError;

      coloredLog(
        'GraphQL error',
        `Message: ${message} \nCode: ${extensions.code} \nPath: ${path}`,
        '#C0FFEE'
      );
    });

  if (networkError) {
    const { name, message, stack } = networkError;

    coloredLog('Network error', `${name} \nMessage: ${message}`, '#C0FFEE');
  }
});

const httpLink = new HttpLink({
  uri: `${backendUrl}/gql`,

  credentials: 'include'
});

const link = development ? from([errorLink, httpLink]) : from([httpLink]);

export default link;
