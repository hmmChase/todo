import Link from 'next/link';
// import styled from 'styled-components';

const LogInLinks = () => (
  <>
    <Link href='/reqpassreset'>
      <a>Forgot Password?</a>
    </Link>

    <div>
      <span>New to Reddit?</span>

      <Link href='/signup'>
        <a> SIGN UP</a>
      </Link>
    </div>
  </>
);

export default LogInLinks;
