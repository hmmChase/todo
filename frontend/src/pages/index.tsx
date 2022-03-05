import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { ApolloError, useQuery } from '@apollo/client';

import type { ReactElement } from 'react';
// import { useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useQuery } from '@apollo/client';
// import jwt from 'jsonwebtoken';
// import fetch from 'isomorphic-unfetch';

import { READ_IDEAS } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';
import isLoggedIn from '../utils/isLoggedIn';
import QueryResult from '../components/REUSEABLE/QueryResult';
import Layout from '../components/LAYOUTS/Layout';
import Ideas from '../components/IDEA/Ideas';
// import { initializeApollo } from '../graphql/apolloClient';

const IndexPage: NextPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  // const router = useRouter();

  const onError = (error: ApolloError) => {
    console.log('IndexPage onError error: ', error);

    // Will set only UserInputError errors
    setErrorMsg(graphQLErrors(error));
  };

  const { loading, error, data } = useQuery(READ_IDEAS, {
    onError: error => onError(error)
  });

  const ideas = data?.ideas;

  // const shouldRedirect = !(loading || error || currentUser);

  // useEffect(() => shouldRedirect && router.push('/login'), [shouldRedirect]);

  return (
    <QueryResult error={errorMsg} loading={loading} data={data}>
      <Ideas ideas={ideas} />
    </QueryResult>
  );
};

/*
 Here you can check authentication status directly before rendering the page,
 however the page would be a serverless function, which is more expensive and
 slower than a static page with client side authentication

 getServerSideProps is also called on client side route changes
*/

// IndexPage.getLayout = page => (
//   <Layout
//     title='Home'
//     description='Home page'
//     isLoggedIn={page.props.isLoggedIn}
//     hasHeader
//     hasFooter
//   >
//     {page}
//   </Layout>
// );

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title='Home'
      description='Home page'
      isLoggedIn={page.props.isLoggedIn}
      hasHeader
      hasFooter
    >
      {page}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  return { props: { isLoggedIn: isLoggedIn(ctx.req.headers) } };
};

// export const getServerSideProps = async ctx => {
//   if (ctx.req.headers.cookie) {
//     let options = {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Server': `${typeof window === 'undefined'}`
//       },

//       body: JSON.stringify({
//         operationName: 'currentUser',
//         variables: {},
//         query: `query currentUser {
//           currentUser {
//             id
//             email
//             __typename
//           }
//         }`
//       })
//     };

//     options.headers.cookie = ctx.req.headers.cookie;

//     try {
//       // won't show in devtools because it's server-side
//       const response = await fetch('http://localhost:8008/gql', options);

//       // const delay = request =>
//       //   new Promise(resolve => setTimeout(() => resolve(request), 5 * 1000));

//       // const response = await delay(request);

//       const data = await response.json();

//       return { props: { currentUser: data.data.currentUser } };
//     } catch {}
//   }

//   return { props: { currentUser: null } };
// };

// // Parse Refresh token
// const accessToken = req.headers.cookie
//   ? req.headers.cookie.replace('at=', '')
//   : null;

// const apolloClient = initializeApollo();

// let currentUser;

// if (accessToken) {
//   const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

//   // If valid Access token, fetch user
//   const jwtCallback = async (error, decoded) => {
//     if (error) console.log('IndexPage jwtCallback error: ', error);

//     if (decoded.userId) {
//       const { data } = await apolloClient.query({
//         query: CURRENT_USER,

//         // fetchPolicy: 'network-only',

//         update: cache =>
//           cache.writeQuery({
//             id: 'isLoggedIn',
//             query: IS_LOGGED_IN,
//             data: true
//           }),

//         onError: error => console.log('IndexPage CURRENT_USER error: ', error)
//       });

//       currentUser = data?.currentUser;

//     }
//   };

//   try {
//     // Decode payload if signature is valid and JWT not expired
//     const payload = await jwt.verify(accessToken, secret, jwtCallback);

//     console.log('payload 1:', payload);
//   } catch (error) {
//     // If Access token invalid
//     console.error('IndexPage jwt.verify error: ', error);

//     return false;
//   }
// }

// will be passed to the page component as props
// return {
// props: {
// initialApolloState: apolloClient.cache.extract()
// currentUser
// }

// };
// };

export default IndexPage;