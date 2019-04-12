import Router from 'next/router';
import { Mutation } from 'react-apollo';
import Error from '../../Error/Error';
import * as query from './SignOut.query';
import * as Styled from './SignOut.style';

const SignOut = React.memo(() => (
  <Mutation
    mutation={query.SIGN_OUT_MUTATION}
    onCompleted={() => Router.push('/')}
  >
    {(signOut, { client, error, loading }) => (
      <Styled.div>
        {error && <Error error={error} />}

        <button
          type="button"
          disabled={loading}
          aria-busy={loading}
          onClick={async () => {
            await signOut();
            await client.resetStore();
          }}
        >
          Sign Out
        </button>
      </Styled.div>
    )}
  </Mutation>
));

export default SignOut;
