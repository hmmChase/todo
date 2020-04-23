import Router from 'next/router';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
// import { useApolloClient, useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { SIGN_OUT, IS_LOGGED_IN } from '../graphql/queries';
// import redirect from '../utils/redirect';

const SignOut = () => {
  const apolloClient = useApolloClient();

  const [signOut] = useMutation(SIGN_OUT, {
    async onCompleted() {
      setAccessToken('');

      localStorage.clear();

      console.log('onCompleted -> apolloClient.cache', apolloClient.cache);

      // await apolloClient.cache.reset();

      // apolloClient.writeData({ id: 'isLoggedIn', data: { isLoggedIn: false } });

      apolloClient.writeQuery({ query: IS_LOGGED_IN, data: true });

      Router.push('/welcome');

      // if (apolloClient.cache) {
      //   apolloClient.cache.reset().then(() => {
      //     // Redirect to a more useful page when signed out

      //     apolloClient.writeData({ data: { isLoggedIn: false } });

      //     Router.push('/welcome');

      //     // redirect({}, '/welcome');

      //     // Router.reload();
      //   });
      // } else {
      //   // Router.reload();

      //   Router.push('/welcome');
      // }
    },
  });

  return (
    <button type='button' onClick={signOut}>
      logout
    </button>
  );
};

export default SignOut;
