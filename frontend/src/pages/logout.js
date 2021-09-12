import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_OUT } from '../graphql/queries/user';

//! Add logging out of all accounts

const LogOutPage = () => {
  const apolloClient = useApolloClient();

  const router = useRouter();

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: async () => await router.push('/'),

    onError: error => console.log('LogOut LOG_OUT error: ', error)
  });

  useEffect(async () => {
    await logOut();

    await apolloClient.resetStore;
  }, [logOut, apolloClient, router]);

  return <p>Logging out...</p>;
};

export default LogOutPage;
