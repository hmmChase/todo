import Link from 'next/link';
import styled from 'styled-components';

const ForgotPassword = () => {
  return (
    <Link href='/reqpassreset'>
      <A>Forgot Password?</A>
    </Link>
  );
};

export default ForgotPassword;

const A = styled.a``;
