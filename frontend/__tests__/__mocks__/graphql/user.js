import * as query from '../../../graphql/queries/user';

export const MOCK_IS_LOGGED_IN = {
  request: { query: query.IS_LOGGED_IN },
  result: { data: { isLoggedIn: true } }
};

export const MOCK_CURRENT_USER = {
  request: { query: query.CURRENT_USER },
  result: {
    data: {
      currentUser: { id: '1', email: 'mock@email.com', color: 'mock olor' }
    }
  }
};

export const MOCK_ERROR_CURRENT_USER = {
  request: { query: query.CURRENT_USER },
  error: new Error('mock error')
};

export const MOCK_USERS = {
  request: { query: query.USERS },
  result: {
    data: {
      users: [
        { id: '1', email: 'mock1@email.com' },
        { id: '2', email: 'mock2@email.com' }
      ]
    }
  }
};

export const MOCK_SIGN_UP = {
  request: {
    query: query.SIGN_UP,
    variables: {
      email: 'mock@email.com',
      password: 'Mockpass#3',
      confirmPassword: 'Mockpass#3'
    }
  },
  result: { data: { signUp: { accessToken: '534978', user: { id: '1' } } } }
};

export const MOCK_ERROR_SIGN_UP = {
  request: {
    query: query.SIGN_UP,
    variables: {
      email: 'mock@email.com',
      password: 'Mockpass#3',
      confirmPassword: 'Mockpass#3'
    }
  },
  error: new Error('mock error')
};

export const MOCK_SIGN_IN = {
  request: {
    query: query.SIGN_IN,
    variables: { email: 'mock@email.com', password: 'Mockpass#3' }
  },
  result: { data: { signIn: { accessToken: '534978', user: { id: '1' } } } }
};

export const MOCK_ERROR_SIGN_IN = {
  request: {
    query: query.SIGN_IN,
    variables: { email: 'mock@email.com', password: 'Mockpass#3' }
  },
  error: new Error('mock error')
};

export const MOCK_SIGN_OUT = {
  request: { query: query.SIGN_OUT },
  result: { data: { signOut: true } }
};

export const MOCK_ERROR_SIGN_OUT = {
  request: { query: query.SIGN_OUT },
  error: new Error('mock error')
};

export const MOCK_REQUEST_RESET = {
  request: {
    query: query.REQUEST_RESET,
    variables: { email: 'mock@email.com' }
  },
  result: { data: { requestReset: true } }
};

export const MOCK_ERROR_REQUEST_RESET = {
  request: {
    query: query.REQUEST_RESET,
    variables: { email: 'mock@email.com' }
  },
  error: new Error('mock error')
};

// { variables: { ...values, resetToken: props.resetToken } }

export const MOCK_RESET_PASSWORD = {
  request: {
    query: query.RESET_PASSWORD,
    variables: {
      resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      password: 'Mockpass#3',
      confirmPassword: 'Mockpass#3'
    }
  },
  result: { data: { resetPassword: true } }
};

export const MOCK_RESET_RESET_PASSWORD = {
  request: {
    query: query.RESET_PASSWORD,
    variables: {
      resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      password: 'Mockpass#3',
      confirmPassword: 'Mockpass#3'
    }
  },
  error: new Error('mock error')
};
