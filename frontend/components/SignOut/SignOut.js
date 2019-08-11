import { ApolloConsumer, Mutation } from 'react-apollo';

import { SIGN_OUT_MUTATION } from '../../graphql/queries';
import * as sc from './SignOut.style';

const SignOut = React.memo(() => {
  const handleClickBtn = async (signOut, client) => {
    await signOut();
    await client.resetStore();
  };

  const handleError = error => error;

  const handleCompleted = apolloClient =>
    apolloClient.writeData({ data: { isLoggedIn: false } });

  return (
    <ApolloConsumer>
      {apolloClient => (
        <Mutation
          mutation={SIGN_OUT_MUTATION}
          onError={handleError}
          onCompleted={() => handleCompleted(apolloClient)}
        >
          {(signOut, { loading, client }) => (
            <sc.signOutBtn
              disabled={loading}
              aria-busy={loading}
              onClick={() => handleClickBtn(signOut, client)}
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
