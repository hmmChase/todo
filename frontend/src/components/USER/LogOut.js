import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_OUT } from '../../graphql/queries/user';
import graphQLErrors from '../../utils/graphQLErrors';
import { isLoggedInVar } from '../../graphql/cache';

//! Add logging out of all accounts

const LogOut = () => {
  useEffect(async () => await logOut(), [logOut]);

  const apolloClient = useApolloClient();

  const router = useRouter();

  const onCompleted = async data => {
    localStorage.removeItem('userId');

    isLoggedInVar(false);

    apolloClient.resetStore;

    await router.push('/');
  };

  const onError = error => {
    console.log('LogOut onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: data => onCompleted(data),

    onError: error => onError(error)
  });

  return <p>Logging out...</p>;
};

export default LogOut;
