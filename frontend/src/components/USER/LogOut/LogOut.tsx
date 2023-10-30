import { useApolloClient, useMutation } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { isLoggedInVar } from '@/graphql/cache';
import { LOG_OUT } from '@/graphql/queries/user';
import { UserCtx } from '@/context/User';

const LogOut = () => {
  const { setUser } = useContext(UserCtx);

  const router = useRouter();

  const apolloClient = useApolloClient();

  const onCompleted = async () => {
    /*
    Since we're logging out, remove all traces of the current user from the
    cache. First use `cache.evict()` to remove the stored `currentUser` reference

    Then trigger garbage collection using `cache.gc()` to remove the cached
    `User` object that is no longer reachable.
    */

    apolloClient.cache.evict({ fieldName: 'currentUser' });

    apolloClient.cache.gc();

    // apolloClient.cache.reset();

    // apolloClient.clearStore();

    // apolloClient.resetStore();

    // Let other parts of the application that are relying on logged in
    // state know we're now logged out.
    setUser(null);

    isLoggedInVar(false);

    await router.push('/login');
  };

  const [logOut] = useMutation(LOG_OUT, { onCompleted, onError: () => {} });

  useEffect(() => {
    const logout = async () => await logOut();

    logout();
  }, [logOut]);

  return null;
};

export default LogOut;
