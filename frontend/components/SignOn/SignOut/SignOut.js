import { Mutation } from 'react-apollo';
import * as user from '../../../graphql/queries/user';
import * as Styled from './SignOut.style';

const SignOut = React.memo(() => (
  <Mutation
    mutation={user.SIGN_OUT_MUTATION}
    refetchQueries={[{ query: user.ME_QUERY }]}
  >
    {signOut => (
      <Styled.div>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </Styled.div>
    )}
  </Mutation>
));

export default SignOut;
