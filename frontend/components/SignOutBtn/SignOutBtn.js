import Router from 'next/router';
import { ApolloConsumer, Mutation } from '@apollo/react-components';

import { SIGN_OUT_MUTATION } from '../../graphql/queries';
import * as sc from './SignOutBtn.style';

const SignOutBtn = React.memo(() => {
  const handleClickBtn = signOut => signOut();

  const handleError = error => error;

  const handleUpdate = cache =>
    cache.writeData({ data: { isLoggedIn: false } });

  const handleCompleted = apolloClient => {
    apolloClient.resetStore();

    Router.push('/');
  };

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
            <sc.SignOutBtn
              disabled={loading}
              aria-busy={loading}
              onClick={() => handleClickBtn(signOut, apolloClient)}
            >
              Sign Out
            </sc.SignOutBtn>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  );
});

export default SignOutBtn;
