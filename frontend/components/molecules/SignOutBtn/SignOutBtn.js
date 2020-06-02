import Router from 'next/router';
import { _useApolloClient, useMutation } from '@apollo/react-hooks';
import { clearAccessToken } from '../../../utils/accessToken';
import { SIGN_OUT, IS_LOGGED_IN } from '../../../graphql/queries';
import Button from '../../atoms/Button/Button';

const SignOutBtn = () => {
  // const apolloClient = useApolloClient();

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

    // location.reload();

    Router.push('/welcome');
  };

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
    <Button
      aria-label='log out'
      aria-busy={loading}
      type='default'
      disabled={loading}
      onClick={onClick}
    >
      Log Out
    </Button>
  );
};

export default SignOutBtn;
