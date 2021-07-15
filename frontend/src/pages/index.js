// import { useEffect } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { CURRENT_USER } from '../graphql/queries/user';

const IndexPage = () => {
  // const router = useRouter();

  const { loading, error, data } = useQuery(CURRENT_USER);

  const currentUser = data?.currentUser;

  // const shouldRedirect = !(loading || error || currentUser);

  // useEffect(() => shouldRedirect && router.push('/login'), [shouldRedirect]);

  if (error) {
    console.log('IndexPage CURRENT_USER error: ', error);

    // return <p>{error.message}</p>;
  }

  if (!loading && !currentUser) {
    return (
      <Link href='/login'>
        <a>login</a>
      </Link>
    );
  }

  if (currentUser) {
    return (
      <>
        <p>You're signed in as {currentUser.email}</p>

        <Link href='/logout'>
          <a>logout</a>
        </Link>
      </>
    );
  }

  return <p>Loading...</p>;
};

export default IndexPage;
