import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_OUT } from '../graphql/queries/user';

function LogOut() {
  const client = useApolloClient();

  const router = useRouter();

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: async () => await router.push('/login')
  });

  useEffect(async () => {
    await logOut();

    await client.resetStore;
  }, [logOut, client, router]);

  return <p>Logging out...</p>;
}

export default LogOut;
