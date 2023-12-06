import { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { CURRENT_USER } from '@/graphql/queries/user';
import type { User } from '@/models/index';
// import { isLoggedInVar } from '@/graphql/cache';

type Userr = User | null;

interface ContextState {
  loading: boolean;
  user: Userr;
  setUser: Dispatch<SetStateAction<Userr>>;
}

interface Props {
  children: ReactNode;
}

export const UserCtx = createContext<ContextState>({
  loading: true,
  user: null,
  setUser: () => {}
});

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Userr>(null);

  const { data, loading, error } = useQuery(CURRENT_USER, {
    errorPolicy: 'all',

    fetchPolicy: 'network-only', // 'cache-first'

    onCompleted: (data: { currentUser: Userr }) => {
      if (data.currentUser) {
        setUser(data.currentUser);

        // isLoggedInVar(!!data.currentUser);
      }
    }
  });

  return (
    <UserCtx.Provider value={{ loading, user, setUser }}>
      {children}
    </UserCtx.Provider>
  );
};

export const useUser = () => useContext(UserCtx);

export default UserProvider;
