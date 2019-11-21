import Router from 'next/router';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGN_OUT } from '../../graphql/queries';
import * as sc from './SignOutBtn.style';

const SignOutBtn = () => {
  // `apolloClient` is now set to the `ApolloClient` instance being used by the
  // application (that was configured using something like `ApolloProvider`)
  const apolloClient = useApolloClient();

  const handleCompleted = () => {
    apolloClient.clearStore();

    Router.push('/welcome');
  };

  const [signOut, { loading }] = useMutation(SIGN_OUT, {
    onCompleted() {
      handleCompleted();
    },
    onError(_err) {}
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
