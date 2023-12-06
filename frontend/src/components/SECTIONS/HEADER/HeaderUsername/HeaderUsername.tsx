// Not used

import { useQuery } from '@apollo/client';

import { CURRENT_USER } from '@/graphql/queries/user';

const HeaderUsername = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);

  const currentUser = data?.currentUser;

  return (
    <p>
      You{`&apos`}re signed in as {currentUser && currentUser.email}
    </p>
  );
};

export default HeaderUsername;
