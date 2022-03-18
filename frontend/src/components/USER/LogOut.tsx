import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { isLoggedInVar } from '../../graphql/cache';
import { LOG_OUT } from '../../graphql/queries/user';
import useUser from '../../hooks/useUser';

const LogOut = () => {
  const router = useRouter();

  const apolloClient = useApolloClient();

  const { setUser } = useUser();

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

    // Let other parts of the application that are relying on logged in
    // state know we're now logged out.
    isLoggedInVar(false);

    setUser(null);

    await router.push('/');
  };

  const [logOut] = useMutation(LOG_OUT, { onCompleted });

  useEffect(() => {
    const logout = async () => await logOut();

    logout();
  }, [logOut]);

  return null;
};

export default LogOut;
