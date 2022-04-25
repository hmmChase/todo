import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react';
// import { useQuery } from '@apollo/client';

// import { CURRENT_USER } from '../graphql/queries/user';
import { User } from '../models';

interface ContextState {
  user: User | null;
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

const UserProvider = (props: Props) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  // const { error, loading, data } = useQuery(CURRENT_USER, {
  //   fetchPolicy: 'no-cache',

  //   onCompleted: data => {
  //     setUser(data.currentUser);

  //     // isLoggedInVar(!!data.currentUser.user.id);
  //   }
  // });

  return (
    <UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>
  );
};

export default UserProvider;
