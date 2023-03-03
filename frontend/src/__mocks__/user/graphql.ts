import { admin, user1, users } from '@/mocks/user';
import * as userQuery from '@/graphql/queries/user';

//* - Queries ----------

export const IS_LOGGED_IN = {
  request: { query: userQuery.IS_LOGGED_IN },
  result: { data: { isLoggedIn: true } }
};

export const READ_USER = {
  request: { query: userQuery.READ_USER, variables: { id: '1' } },
  result: { data: { user: user1 } }
};

export const READ_USERS = {
  request: { query: userQuery.READ_USERS },
  result: { data: { users: users } }
};

export const CURRENT_USER = {
  request: { query: userQuery.CURRENT_USER },
  result: { data: { currentUser: user1 } }
};

//* - Mutations ----------

export const LOG_IN = {
  request: {
    query: userQuery.LOG_IN,
    variables: { email: 'user1@email.com', password: 'asdf1234' }
  },
  result: { data: { user: user1 } }
};

export const LOG_OUT = {
  request: { query: userQuery.LOG_OUT },
  result: { data: { logOut: true } }
};

export const SIGN_UP = {
  request: {
    query: userQuery.SIGN_UP,
    variables: { email: 'user1@email.com', password: 'asdf1234' }
  },
  result: { data: { signUp: { user: user1 } } }
};

export const PASS_RESET_REQ = {
  request: {
    query: userQuery.PASS_RESET_REQ,
    variables: {
      email: 'user1@email.com'
      // resetPassToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72'
    }
  },
  result: { data: { passResetReq: true } }
};

export const PASS_RESET = {
  request: {
    query: userQuery.PASS_RESET,
    variables: {
      resetPassToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      newPassword: 'asdf1234'
    }
  },
  result: { data: { passReset: { user: user1 } } }
};
