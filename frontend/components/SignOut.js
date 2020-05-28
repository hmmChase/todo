import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { clearAccessToken } from '../utils/accessToken';
import { SIGN_OUT, IS_LOGGED_IN } from '../graphql/queries';

const update = (cache) => {
  cache.reset();

  cache.writeQuery({
    id: 'isLoggedIn',
    query: IS_LOGGED_IN,
    data: { isLoggedIn: false },
  });
};

const onCompleted = () => {
  clearAccessToken();

  localStorage.clear();

  // apolloClient.clearStore();

  // apolloClient.resetStore();

  Router.push('/welcome');

  // location.reload();
};

const SignOut = () => {
  const [signOut, { loading }] = useMutation(SIGN_OUT, {
    update(cache, _data) {
      update(cache);
    },

    onCompleted(_data) {
      onCompleted();
    },

    onError(_error) {},
  });

  const onClick = () => signOut();

  return (
    <button
      aria-label='log out'
      aria-busy={loading}
      disabled={loading}
      onClick={onClick}
    >
      Log Out
    </button>
  );
};

export default SignOut;
