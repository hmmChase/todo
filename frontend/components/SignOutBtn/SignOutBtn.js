// import Router from 'next/router';
import Link from 'next/link';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGN_OUT } from '../../graphql/queries';
import { setAccessToken } from '../../utils/authenticate';
import * as sc from './SignOutBtn.style';

const SignOutBtn = () => {
  const apolloClient = useApolloClient();

  const handleCompleted = () => {
    setAccessToken('');

    apolloClient.clearStore();

    // Router.push('/welcome');

    // location.reload();
  };

  const [signOut, { loading }] = useMutation(SIGN_OUT, {
    onCompleted() {
      handleCompleted();
    },
    onError(_err) {}
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

      <Link href='/welcome'>
        <sc.SignOutBtn
          disabled={loading}
          aria-busy={loading}
          onClick={handleClickBtn}
        >
          Sign Out
        </sc.SignOutBtn>
      </Link>
    </>
  );
};

export default SignOutBtn;
