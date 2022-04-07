import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react';

import { User } from '../models';

interface ContextState {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<ContextState>({
  user: null,
  setUser: () => {}
});

interface Props {
  children: ReactNode;
  currentUser: User | null;
}

const UserProvider = ({ children, currentUser }: Props) => {
  const [user, setUser] = useState<User | null>(currentUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
