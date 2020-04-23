// import jwt from 'jsonwebtoken';
// import { _accessTokenSecret, refreshTokenSecret } from '../constants';
// import redirect from './redirect';
// import { getAccessToken } from './accessToken';
// import { CURRENT_USER } from '../graphql/queries';

// export default async (req, _res, _pathname, _apolloClient) => {
//   if (req && req.headers && req.headers.cookie) {
//     console.log('WithApollo.getInitialProps cookie');
//     // Get cookies
//     const parsedCookies = req.headers.cookie.replace('rt=', '');

//     // If Refresh token available
//     if (parsedCookies.rt) {
//       try {
//         // Verify Refresh token
//         await jwt.verify(
//           parsedCookies.rt,
//           refreshTokenSecret,
//           // Fetch Access token
//           async (err, _decoded) => {
//             if (!err) {
//               try {
//                 // Fetch Access Token
//                 const accessToken = await fetchAccessToken(parsedCookies.rt);
//                 // Set Access Token
//                 setAccessToken(accessToken);
//                 // Update serverAccessToken
//                 serverAccessToken = accessToken;
//               } catch (error) {
//                 console.error('withApollo token fetch error: ', error);
//               }
//             }
//           }
//         );
//       } catch (error) {
//         console.error('withApollo token verify error: ', error);
//       }
//     }
//   }
// };

// export default (req, res, pathname, apolloClient) => {
//   const accessToken = getAccessToken();

//   console.log('authenticate accessToken: ', accessToken);

//   if (accessToken) {
//     try {
//       jwt.verify(accessToken, accessTokenSecret);

//       apolloClient.cache.writeData({ data: { isLoggedIn: true } });

//       if (pathname === '/welcome') redirect(res, '/');
//     } catch (error) {
//       apolloClient.cache.writeData({ data: { isLoggedIn: false } });

//       if (pathname !== '/welcome') redirect(res, '/welcome');
//     }
//   } else if (pathname !== '/welcome') {
//     apolloClient.cache.writeData({ data: { isLoggedIn: false } });

//     redirect(res, '/welcome');
//   }
// };

// export const togLoggedCache = (apolloClient, boolean) => {
//   apolloClient.cache.writeData({
//     id: 'isLoggedIn',
//     data: { isLoggedIn: boolean },
//   });
// };

// export const togLoggedCache = boolean => (
//   <ApolloConsumer>
//     {apolloClient =>
//       console.log('TCL: apolloClient', apolloClient) &&
//       apolloClient.cache.writeData({
//         id: 'isLoggedIn',
//         data: { isLoggedIn: boolean }
//       })
//     }
//   </ApolloConsumer>
// );

// export const graphQLAuth = async (apolloClient) => {
//   const { loading, error, data } = await apolloClient.query({
//     query: CURRENT_USER,
//   });

//   if (!loading && !error && data) {
//     apolloClient.cache.writeData({ data: { isLoggedIn: true } });
//   } else if (error) {
//     apolloClient.cache.writeData({ data: { isLoggedIn: false } });
//   }
// };

// export const checkLoggedIn = (apolloClient) => {
//   apolloClient
//     .query({
//       query: gql`
//         query getUser {
//           user {
//             id
//             name
//           }
//         }
//       `,
//     })
//     .then(({ data }) => {
//       return { loggedInUser: data };
//     })
//     .catch(() => {
//       // Fail gracefully
//       return { loggedInUser: {} };
//     });
// };

// export const isLoggedIn = async (apolloClient) => {
//   try {
//     const {
//       data: { isLoggedIn },
//     } = await apolloClient.query({ query: IS_LOGGED_IN });

//     return isLoggedIn;
//   } catch {
//     return null;
//   }
// };
