import Router from 'next/router';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import { SIGN_OUT_MUTATION } from '../../graphql/queries';
import * as sc from './SignOutBtn.style';

const SignOutBtn = () => {
  // `apolloClient` is now set to the `ApolloClient` instance being used by the
  // application (that was configured using something like `ApolloProvider`)
  const apolloClient = useApolloClient();

  const handleUpdate = cache =>
    cache.writeData({ data: { isLoggedIn: false } });

  const handleCompleted = () => {
    apolloClient.resetStore();

    Router.push('/');
  };

  // Suppress console output
  const handleError = err => err;

  const [signOut, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    update(cache, { data }) {
      handleUpdate(cache, data);
    },
    onCompleted() {
      handleCompleted();
    },
    onError(err) {
      handleError(err);
    }
  });

  const handleClickBtn = () => signOut();

  return (
    <sc.SignOutBtn
      disabled={loading}
      aria-busy={loading}
      onClick={handleClickBtn}
    >
      Sign Out
    </sc.SignOutBtn>
  );
};

export default SignOutBtn;
