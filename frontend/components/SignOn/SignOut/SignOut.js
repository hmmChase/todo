import { Mutation } from 'react-apollo';
import Error from '../../Error/Error';
import * as query from './SignOut.query';
import * as Styled from './SignOut.style';

const SignOut = React.memo(() => (
  <Mutation
    mutation={query.SIGN_OUT_MUTATION}
    refetchQueries={[{ query: query.ME_QUERY }]}
  >
    {(signOut, { error, loading }) => (
      <Styled.div>
        {error && <Error error={error} />}

        <button
          type="button"
          disabled={loading}
          aria-busy={loading}
          onClick={signOut}
        >
          Sign Out
        </button>
      </Styled.div>
    )}
  </Mutation>
));

export default SignOut;
