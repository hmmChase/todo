import { ApolloConsumer, Mutation } from '@apollo/react-components';

import { SIGN_OUT_MUTATION } from '../../graphql/queries';
import * as sc from './SignOut.style';

const SignOut = React.memo(() => {
  const handleClickBtn = signOut => signOut();

  const handleError = error => error;

  const handleUpdate = cache =>
    cache.writeData({ data: { isLoggedIn: false } });

  const handleCompleted = apolloClient => apolloClient.resetStore();

  return (
    <ApolloConsumer>
      {apolloClient => (
        <Mutation
          mutation={SIGN_OUT_MUTATION}
          onError={handleError}
          update={handleUpdate}
          onCompleted={() => handleCompleted(apolloClient)}
        >
          {(signOut, { loading }) => (
            <sc.signOutBtn
              disabled={loading}
              aria-busy={loading}
              onClick={() => handleClickBtn(signOut, apolloClient)}
            >
              Sign Out
            </sc.signOutBtn>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  );
});

export default SignOut;
