import { Mutation } from 'react-apollo';

import { SIGN_OUT_MUTATION } from '../../graphql/queries';
import * as sc from './SignOut.style';

const SignOut = React.memo(() => {
  const handleClickBtn = async (signOut, client) => {
    await signOut();
    await client.resetStore();
  };

  const handleError = error => error;

  return (
    <Mutation mutation={SIGN_OUT_MUTATION} onError={handleError}>
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
  );
});

export default SignOut;
