import Link from 'next/link';
import styled from 'styled-components';

const LogInLinks = () => (
  <Link href='/login'>
    <A>Already have an account?</A>
  </Link>
);

export default LogInLinks;

const A = styled.a``;
