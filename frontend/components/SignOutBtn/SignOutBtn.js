import Router from 'next/router';
// import Link from 'next/link';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGN_OUT } from '../../graphql/queries';
import { clearAccessToken } from '../../utils/accessToken';
import * as sc from './SignOutBtn.style';

const SignOutBtn = () => {
  const apolloClient = useApolloClient();

  const handleCompleted = () => {
    clearAccessToken();

    apolloClient.clearStore();

    // apolloClient.resetStore();

    Router.push('/welcome');

    // location.reload();
  };

  const [signOut, { loading }] = useMutation(SIGN_OUT, {
    update(cache) {
      cache.writeData({ data: { isLoggedIn: false } });
    },
    onCompleted() {
      handleCompleted();
    },
    onError(_error) {}
  });

  const handleClickBtn = () => signOut();

  return (
    <>
      {/* <sc.SignOutBtn
        disabled={loading}
        aria-busy={loading}
        onClick={handleClickBtn}
      >
        Sign Out
      </sc.SignOutBtn> */}

      {/* <Link href='/welcome'> */}

      <sc.SignOutBtn
        aria-label='sign out button'
        disabled={loading}
        aria-busy={loading}
        onClick={handleClickBtn}
      >
        Sign Out
      </sc.SignOutBtn>
      {/* </Link> */}
    </>
  );
};

export default SignOutBtn;
