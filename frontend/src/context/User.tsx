import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react';

import { User } from '../models';

interface ContextState {
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
}

export const UserContext = createContext<ContextState>({
  setUser: () => {},
  user: null
});

interface Props {
  children: ReactNode;
  userPayload: User | null;
}

const UserProvider = ({ children, userPayload }: Props) => {
  const [user, setUser] = useState<User | null>(userPayload);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
