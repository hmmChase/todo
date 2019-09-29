import * as query from '../../graphql/queries/user';

export const MOCK_IS_LOGGED_IN = {
  request: { query: query.IS_LOGGED_IN },
  result: { data: { isLoggedIn: true } }
};

export const MOCK_CURRENT_USER_QUERY = {
  request: { query: query.CURRENT_USER_QUERY },
  result: {
    data: {
      currentUser: { id: '1', email: 'mock@email.com', color: 'mock color' }
    }
  }
};

export const MOCK_ERROR_CURRENT_USER_QUERY = {
  request: { query: query.CURRENT_USER_QUERY },
  error: new Error('mock error')
};

export const MOCK_SIGN_UP_MUTATION = {
  request: {
    query: query.SIGN_UP_MUTATION,
    variables: {
      email: 'mock@email.com',
      password: 'mockpass',
      confirmPassword: 'confirmed mockpass'
    }
  },
  result: { data: { signUp: [{ id: '1' }] } }
};

export const MOCK_SIGN_IN_MUTATION = {
  request: {
    query: query.SIGN_IN_MUTATION,
    variables: { email: 'mock@email.com', password: 'mockpass' }
  },
  result: { data: { signIn: [{ id: '1' }] } }
};

export const MOCK_SIGN_OUT_MUTATION = {
  request: { query: query.SIGN_OUT_MUTATION },
  result: { data: { signOut: true } }
};

export const MOCK_REQUEST_RESET_MUTATION = {
  request: {
    query: query.REQUEST_RESET_MUTATION,
    variables: { email: 'mock@email.com' }
  },
  result: { data: { requestReset: true } }
};

export const MOCK_RESET_PASSWORD_MUTATION = {
  request: {
    query: query.RESET_PASSWORD_MUTATION,
    variables: {
      resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      password: 'mockpass',
      confirmPassword: 'mockpass'
    }
  },
  result: { data: { resetPassword: [{ id: '1', email: 'mock@email.com' }] } }
};
