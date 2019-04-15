import Router from 'next/router';
import { Mutation } from 'react-apollo';
import Error from '../../Error/Error';
import * as query from './SignOut.query';
import * as Styled from './SignOut.style';

const SignOut = React.memo(() => {
  const onClickBtn = async (signOut, client) => {
    await signOut();
    await client.resetStore();
  };

  const onCompleted = () => {
    Router.push('/');
  };

  return (
    <Mutation
      mutation={query.SIGN_OUT_MUTATION}
      onCompleted={() => onCompleted()}
    >
      {(signOut, { error, loading, client }) => (
        <Styled.div>
          {error && <Error error={error} />}

          <button
            type="button"
            disabled={loading}
            aria-busy={loading}
            onClick={() => onClickBtn(signOut, client)}
          >
            Sign Out
          </button>
        </Styled.div>
      )}
    </Mutation>
  );
});

export default SignOut;
