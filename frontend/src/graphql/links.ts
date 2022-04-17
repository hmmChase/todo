import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { backendUrl, development } from '../constants/config';

const errorLink = onError(error => {
  const { graphQLErrors, networkError, operation, response } = error;

  // console.log('operation: ', JSON.stringify(operation, null, 4));
  // console.log('response: ', JSON.stringify(response, null, 4));

  if (graphQLErrors)
    graphQLErrors.forEach(graphQLError => {
      const { extensions, message, path } = graphQLError;

      console.log(
        '%c[GraphQL error]:',
        'background: #222; color: #bada55',
        `${extensions.code}`,
        '\n',
        `Path: ${path}`,
        '\n',
        `Message: ${message}`
      );
    });

  if (networkError) {
    const { name, message, stack } = networkError;

    console.log(
      '[Network error]:',
      'background: #222; color: #bada55',
      `${name}`,
      '\n',
      `Message: ${message}`
    );
  }
});

const httpLink = new HttpLink({
  uri: `${backendUrl}/gql`,

  credentials: 'include'
});

const link = development ? from([errorLink, httpLink]) : from([httpLink]);

export default link;
