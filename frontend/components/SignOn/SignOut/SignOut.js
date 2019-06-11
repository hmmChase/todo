import { Mutation } from 'react-apollo';
import * as query from './SignOut.query';
import * as sc from './SignOut.style';

const SignOut = React.memo(() => {
  const handleClickBtn = async (signOut, client) => {
    await signOut();
    await client.resetStore();
  };

  const handleError = error => error;

  return (
    <Mutation
      mutation={query.SIGN_OUT_MUTATION}
      onError={handleError}
      errorPolicy="all"
    >
      {(signOut, { loading, client }) => (
        <sc.purpleLinkBtn
          snapshot="SignOut"
          disabled={loading}
          aria-busy={loading}
          onClick={() => handleClickBtn(signOut, client)}
        >
          Sign Out
        </sc.purpleLinkBtn>
      )}
    </Mutation>
  );
});

export default SignOut;
