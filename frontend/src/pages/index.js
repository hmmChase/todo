// import { useEffect } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { CURRENT_USER } from '../graphql/queries/user';
import Ideas from '../components/Ideas';

const IndexPage = () => {
  // const router = useRouter();

  const { loading, data } = useQuery(CURRENT_USER, {
    onError: error => console.log('CURRENT_USER error: ', error)
  });

  const currentUser = data?.currentUser;

  // const shouldRedirect = !(loading || error || currentUser);

  // useEffect(() => shouldRedirect && router.push('/login'), [shouldRedirect]);

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

        <Ideas />
      </>
    );
  }

  return <p>Loading...</p>;
};

export default IndexPage;
