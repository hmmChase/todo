import { useContext } from 'react';
// import { useQuery } from '@apollo/client';

import { UserContext } from '../context/User';
// import { CURRENT_USER } from '../graphql/queries/user';
// import { isLoggedInVar } from '../graphql/cache';

const useUser = () => {
  // const [user, setUser] = useState();

  const { user, setUser } = useContext(UserContext);

  // const { error, loading, data } = useQuery(CURRENT_USER, {
  //   fetchPolicy: 'no-cache',

  //   onCompleted: data => {
  //     // setUser(data.currentUser);

  //     isLoggedInVar(!!data.currentUser.user.id);
  //   }
  // });

  // return { error, loading, data };

  return { user, setUser };
};

export default useUser;
