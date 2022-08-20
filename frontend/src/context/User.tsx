import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react';
import { useQuery } from '@apollo/client';

import { CURRENT_USER, IS_LOGGED_IN } from '@/graphql/queries/user';
import { isLoggedInVar } from '@/graphql/cache';
import { User } from '@/models';

interface UserState extends User {
  // error?: ApolloError;
  loading: boolean;
}

type Userr = User | null;

interface ContextState {
  user: UserState | null;
  setUser: Dispatch<SetStateAction<Userr>>;
}

export const UserCtx = createContext<ContextState>({
  user: null,
  setUser: () => {}
});

interface Props {
  children: ReactNode;
  // currentUser: Userr;
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Userr>(null);

  const { loading } = useQuery(CURRENT_USER, {
    errorPolicy: 'all',

    fetchPolicy: 'cache-first',

    onCompleted: (data: { currentUser: Userr }) => {
      if (data.currentUser) {
        setUser(data.currentUser);

        isLoggedInVar(!!data.currentUser);
      }
    }
  });

  // const { data } = useQuery(IS_LOGGED_IN);

  const userState: UserState = { loading, ...user! };

  return (
    <UserCtx.Provider value={{ user: userState, setUser }}>
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
