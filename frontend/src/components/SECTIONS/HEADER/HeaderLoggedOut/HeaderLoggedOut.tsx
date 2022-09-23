import { FC, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/REUSEABLE/Button/Button';
import LogInModal from '@/components/USER/LogInModal/LogInModal';
import SignUpModal from '@/components/USER/SignUpModal/SignUpModal';

const HeaderLoggedOut: FC = () => {
  const [modalDisplay, setModalDisplay] = useState('');

  return (
    <Container>
      {modalDisplay === 'login' && (
        <LogInModal close={() => setModalDisplay('')} />
      )}

      <ButtonLogIn alt name='logIn' onClick={() => setModalDisplay('login')}>
        Log in
      </ButtonLogIn>

      {modalDisplay === 'signup' && (
        <SignUpModal close={() => setModalDisplay('')} />
      )}

      <Button name='signUp' onClick={() => setModalDisplay('signup')}>
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
