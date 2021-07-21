import PropTypes from 'prop-types';
import Router from 'next/router';
import { _useApolloClient, useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { clearAccessToken } from '../../../utils/accessToken';
import { SIGN_OUT, IS_LOGGED_IN } from '../../../graphql/queries/user';
import Button from '../../atoms/Button/Button';

const SignOutBtn = props => {
  // const apolloClient = useApolloClient();

  const update = cache => {
    cache.reset();

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn: false }
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

    onError(_error) {}
  });

  const onClick = () => signOut();

  return (
    <Button
      className={props.className}
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

SignOutBtn.propTypes = {
  className: PropTypes.string
};

export default SignOutBtn;
