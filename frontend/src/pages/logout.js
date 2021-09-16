import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_OUT } from '../graphql/queries/user';
import graphQLErrors from '../utils/graphQLErrors';
import { isLoggedInVar } from '../graphql/cache';

//! Add logging out of all accounts

const LogOutPage = () => {
  const apolloClient = useApolloClient();

  const router = useRouter();

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: async () => {
      localStorage.removeItem('userId');

      isLoggedInVar(true);

      await router.push('/');
    },

    onError: error => {
      console.log('LogOutPage LOG_OUT error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  useEffect(async () => {
    await logOut();

    await apolloClient.resetStore;
  }, [logOut, apolloClient, router]);

  return <p>Logging out...</p>;
};

export default LogOutPage;
