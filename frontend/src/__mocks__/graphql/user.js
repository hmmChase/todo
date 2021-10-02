import * as userQuery from '../../graphql/queries/user';
import { user, users } from '../user';

//* - Queries ----------

export const IS_LOGGED_IN = {
  request: { query: userQuery.IS_LOGGED_IN },
  result: { data: { isLoggedIn: true } }
};

export const READ_USER = {
  request: { query: userQuery.READ_USER, variables: { id: '1' } },
  result: { data: { user: user.user1 } }
};

export const READ_USERS = {
  request: { query: userQuery.READ_USERS },
  result: { data: { users: users } }
};

export const CURRENT_USER = {
  request: { query: userQuery.CURRENT_USER },
  result: { data: { currentUser: user.user1 } }
};

//* - Mutations ----------

export const LOG_IN = {
  request: {
    query: userQuery.LOG_IN,
    variables: { email: 'user1@email.com', password: 'asdf1234' }
  },
  result: { data: { user: user.user1 } }
};

export const LOG_OUT = {
  request: { query: userQuery.LOG_OUT },
  result: { data: { logOut: true } }
};

export const CREATE_USER = {
  request: {
    query: userQuery.CREATE_USER,
    variables: { email: 'user1@email.com', password: 'asdf1234' }
  },
  result: { data: { createUser: { user: user.user1 } } }
};

export const REQ_PASS_RESET = {
  request: {
    query: userQuery.REQ_PASS_RESET,
    variables: {
      email: 'user1@email.com',
      resetPassToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72'
    }
  },
  result: { data: { reqPassReset: true } }
};

export const CHANGE_PASSWORD = {
  request: {
    query: userQuery.CHANGE_PASSWORD,
    variables: {
      resetPassToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      password: 'asdf1234'
    }
  },
  result: { data: { resetPassword: { user: user.user1 } } }
};
