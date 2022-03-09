import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useMutation,
  useApolloClient,
  ApolloCache,
  FetchResult
} from '@apollo/client';

import { LOG_OUT, IS_LOGGED_IN } from '../../graphql/queries/user';
import { isLoggedInVar } from '../../graphql/cache';

//! Add logging out of all accounts

const LogOut: FC = () => {
  const apolloClient = useApolloClient();

  const router = useRouter();

  const update = (cache: ApolloCache<any>, data: FetchResult<any>) => {
    const isLoggedIn = !data?.logOut;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn }
    });
  };

  const onCompleted = async () => {
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

    // Remove user details from localStorage.
    localStorage.removeItem('userId');

    // Let other parts of the application that are relying on logged in
    // state know we're now logged out.
    isLoggedInVar(false);

    await router.push('/');
  };

  const [logOut] = useMutation(LOG_OUT, {
    update: (cache, data) => update(cache, data),

    onCompleted
  });

  useEffect(async () => await logOut(), [logOut]);

  // useEffect(() => {
  //   document.cookie = cookie.serialize('authorization', '', {
  //     maxAge: -1,
  //     path: '/',
  //     sameSite: 'lax',
  //     secure: process.env.NODE_ENV === 'production'
  //   });

  //   apolloClient.resetStore().then(() => router.push('/'));
  // }, [apolloClient]);

  return <p>Logging out...</p>;
};

export default LogOut;
