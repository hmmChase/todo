import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { SIGN_OUT, IS_LOGGED_IN } from '../graphql/queries';

const update = (cache) => {
  cache.writeQuery({
    id: 'isLoggedIn',
    query: IS_LOGGED_IN,
    data: { isLoggedIn: false },
  });
};

const onCompleted = () => {
  setAccessToken('');

  localStorage.clear();

  // await apolloClient.cache.reset().then(() => {};

  Router.push('/welcome');
};

const SignOut = () => {
  const [signOut] = useMutation(SIGN_OUT, {
    update(cache, _data) {
      update(cache);
    },

    onCompleted(_data) {
      onCompleted();
    },

    onError(_error) {},
  });

  return (
    <button aria-label='log out' onClick={signOut}>
      Log Out
    </button>
  );
};

export default SignOut;
