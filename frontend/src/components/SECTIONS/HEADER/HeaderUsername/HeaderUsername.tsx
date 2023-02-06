// Not used

import { CURRENT_USER } from '@/graphql/queries/user';
import { useQuery } from '@apollo/client';

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
