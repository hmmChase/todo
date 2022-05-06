import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import { CURRENT_USER } from '../graphql/queries/user';
import { User } from '../models';

interface UserState {
  error?: ApolloError;
  loading: boolean;
  user: User | null;
}

interface ContextState {
  user: UserState | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserCtx = createContext<ContextState>({
  user: null,
  setUser: () => {}
});

interface Props {
  children: ReactNode;
  // currentUser: User | null;
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const { error, loading } = useQuery(CURRENT_USER, {
    errorPolicy: 'all',

    fetchPolicy: 'cache-first',

    onCompleted: data => {
      setUser(data.currentUser);

      // isLoggedInVar(!!data.currentUser.user.id);
    }
  });

  const userState: UserState = { error, loading, user };

  return (
    <UserCtx.Provider value={{ user: userState, setUser }}>
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
