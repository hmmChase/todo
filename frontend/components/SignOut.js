import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { SIGN_OUT, _IS_LOGGED_IN } from '../graphql/queries';
// import redirect from '../utils/redirect';

const update = (cache, _data) => {
  cache.writeData({ id: 'isLoggedIn', data: { isLoggedIn: false } });

  // cache.writeQuery({
  //   id: 'isLoggedIn',
  //   query: IS_LOGGED_IN,
  //   data: { isLoggedIn: false },
  // });
};

const onCompleted = (_data) => {
  setAccessToken('');

  localStorage.clear();

  // await apolloClient.cache.reset().then(() => {};

  Router.push('/welcome');
};

const SignOut = () => {
  const [signOut] = useMutation(SIGN_OUT, {
    update(cache, data) {
      update(cache, data);
    },

    onCompleted(data) {
      onCompleted(data);
    },
  });

  return (
    <button type='button' onClick={signOut}>
      logout
    </button>
  );
};

export default SignOut;
