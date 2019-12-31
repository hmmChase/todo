import * as query from '../../graphql/queries/user';

export const MOCK_IS_LOGGED_IN = {
  request: { query: query.IS_LOGGED_IN },
  result: { data: { isLoggedIn: true } }
};

export const MOCK_CURRENT_USER = {
  request: { query: query.CURRENT_USER },
  result: {
    data: {
      currentUser: { id: '1', email: 'mock@email.com', color: 'mock color' }
    }
  }
};

export const MOCK_ERROR_CURRENT_USER = {
  request: { query: query.CURRENT_USER },
  error: new Error('mock error')
};

export const MOCK_SIGN_UP = {
  request: {
    query: query.SIGN_UP,
    variables: {
      email: 'mock@email.com',
      password: 'mockpass',
      confirmPassword: 'confirmed mockpass'
    }
  },
  result: { data: { signUp: [{ id: '1' }] } }
};

export const MOCK_SIGN_IN = {
  request: {
    query: query.SIGN_IN,
    variables: { email: 'mock@email.com', password: 'mockpass' }
  },
  result: { data: { signIn: [{ id: '1' }] } }
};

export const MOCK_SIGN_OUT = {
  request: { query: query.SIGN_OUT },
  result: { data: { signOut: true } }
};

export const MOCK_REQUEST_RESET = {
  request: {
    query: query.REQUEST_RESET,
    variables: { email: 'mock@email.com' }
  },
  result: { data: { requestReset: true } }
};

export const MOCK_RESET_PASSWORD = {
  request: {
    query: query.RESET_PASSWORD,
    variables: {
      resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      password: 'mockpass',
      confirmPassword: 'mockpass'
    }
  },
  result: { data: { resetPassword: [{ id: '1', email: 'mock@email.com' }] } }
};
