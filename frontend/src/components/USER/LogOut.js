import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_OUT, IS_LOGGED_IN } from '../../graphql/queries/user';
import graphQLErrors from '../../utils/graphQLErrors';
import { isLoggedInVar } from '../../graphql/cache';

//! Add logging out of all accounts

const LogOut = () => {
  const apolloClient = useApolloClient();

  const router = useRouter();

  const onCompleted = async data => {
    /*
    Since we're logging out, remove all traces of the current user from the
    cache. First use `cache.evict()` to remove the stored `currentUser` reference

    Then trigger garbage collection using `cache.gc()` to remove the cached
    `User` object that is no longer reachable.
    */

    apolloClient.cache.evict({ fieldName: 'currentUser' });

    apolloClient.cache.gc();

    apolloClient.clearStore();

    apolloClient.resetStore();

    apolloClient.cache.reset();

    // Let other parts of the application that are relying on logged in
    // state know we're now logged out.
    isLoggedInVar(false);

    apolloClient.cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn: false }
    });

    // Remove user details from localStorage.
    localStorage.removeItem('userId');

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

  useEffect(async () => await logOut(), [logOut]);

  // useEffect(() => {
  //   document.cookie = cookie.serialize('authorization', '', {
  //     maxAge: -1,
  //     path: '/',
  //     sameSite: 'lax',
  //     secure: process.env.NODE_ENV === 'production'
  //   });

  //   client.resetStore().then(() => router.push('/'));
  // }, [client]);

  return <p>Logging out...</p>;
};

export default LogOut;
