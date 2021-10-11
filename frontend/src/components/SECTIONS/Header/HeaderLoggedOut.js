import { useState } from 'react';
// import Link from 'next/link';
import styled from 'styled-components';

import LoginModal from '../../USER/LoginModal';
import SignUpModal from '../../USER/SignUpModal';
import Button from '../../REUSEABLE/Button';

const HeaderLoggedOut = () => {
  const [modalDisplay, setModalDisplay] = useState(null);

  return (
    <Container>
      {/* <Link href='/login'>
        <ALogIn>Log in</ALogIn>
      </Link> */}

      {modalDisplay === 'login' && (
        <LoginModal close={() => setModalDisplay(null)} />
      )}

      <ButtonLogIn type='text' onClick={() => setModalDisplay('login')}>
        Log in
      </ButtonLogIn>

      {/* <Link href='/signup'>
        <ASignUp>Sign up</ASignUp>
      </Link> */}

      {modalDisplay === 'signup' && (
        <SignUpModal close={() => setModalDisplay(null)} />
      )}

      <ButtonSignUp type='text' onClick={() => setModalDisplay('signup')}>
        Sign up
      </ButtonSignUp>
    </Container>
  );
};

export default HeaderLoggedOut;

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  @media screen and (min-width: ${props =>
      props.theme.widths.regularPageWidth}px) {
    margin-right: 0;
  }
`;

// const ALogIn = styled.a`
//   background-color: ${props => props.theme.colors.white};
//   color: ${props => props.theme.colors.text.primaryText};
//   margin-right: 1rem;
// `;

// const ASignUp = styled.a`
//   background-color: ${props => props.theme.buttons.actionButton};
//   color: ${props => props.theme.colors.text.secondaryText};
// `;

export const ButtonLogIn = styled(Button)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text.primaryText};
  margin-right: 1rem;

  :hover {
    background-color: ${props => props.theme.colors.white};
    /* color: ${props => props.theme.buttons.actionButton}; */
  }
`;

export const ButtonSignUp = styled(Button)`
  /* background-color: ${props => props.theme.buttons.actionButton}; */
  /* color: ${props => props.theme.colors.text.secondaryText}; */

  :hover {
    background-color: ${props => props.theme.buttons.actionButton};
    /* color: ${props => props.theme.buttons.actionButton}; */
  }
`;
