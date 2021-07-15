import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_OUT } from '../graphql/queries/user';

function LogOut() {
  const client = useApolloClient();

  const router = useRouter();

  const [logOut] = useMutation(LOG_OUT);

  useEffect(async () => {
    await logOut();

    await client.resetStore;

    await router.push('/login');
  }, [logOut, client, router]);

  return <p>Logging out...</p>;
}

export default LogOut;
