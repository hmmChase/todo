import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/COMMON/Button/Button';
import LogInModal from '@/components/USER/LogInModal/LogInModal';
import SignUpModal from '@/components/USER/SignUpModal/SignUpModal';

const HeaderLoggedOut = () => {
  const [modalName, setModalName] = useState('');

  return (
    <Container data-testid='header-logged-out'>
      {modalName === 'login' && <LogInModal close={() => setModalName('')} />}

      <ButtonLogIn alt name='logIn' onClick={() => setModalName('login')}>
        Log in
      </ButtonLogIn>

      {modalName === 'signup' && <SignUpModal close={() => setModalName('')} />}

      <Button name='signUp' onClick={() => setModalName('signup')}>
        Sign up
      </Button>
    </Container>
  );
};

export default HeaderLoggedOut;

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    margin-right: 0;
  }
`;

export const ButtonLogIn = styled(Button)`
  margin-right: 1rem;
`;
