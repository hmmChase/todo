import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { backendUrl, development } from '../constants/config';
import coloredLog from '../utils/coloredLog';

// import { TokenRefreshLink } from 'apollo-link-token-refresh';

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

// // Fetch a new Access token if one is present and expired
// const refreshLink = new TokenRefreshLink({
//   accessTokenField: 'accessToken',

//   isTokenValidOrUndefined: () => {
//     // Return true if:
//     // 1. Access token doesn't exist
//     // 2. Access token isn't expired
//     // False triggers fetchAccessToken

//     // If Access token doesn't exist
//     if (!accessToken) return true;

//     // Check if Access token is valid
//     try {
//       jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//       // If valid
//       return true;
//     } catch (error) {
//       // devConErr(['isTokenValidOrUndefined error: ', error]);

//       // If invalid
//       return false;
//     }
//   },

//   fetchAccessToken: () => {
//     const refreshUrl =
//       process.env.NODE_ENV === 'production' ? refreshUrlProd : refreshUrlDev;

//     return fetch(refreshUrl, { method: 'GET', credentials: 'include' });
//   },

//   handleFetch: newAccessToken => {
//     accessToken = newAccessToken;

//     // setAccessToken(newAccessToken);
//   },

//   handleError: error => {
//     // devConLog(['refreshLink handleError: ', error]);
//     // your custom action here
//     // user.logout();
//   }
// });

const httpLink = new HttpLink({
  uri: `${backendUrl}/gql`,

  credentials: 'include'
});

const link = development ? from([errorLink, httpLink]) : from([httpLink]);

export default link;
