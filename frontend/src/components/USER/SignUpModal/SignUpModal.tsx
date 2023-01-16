import { FC } from 'react';
import styled from 'styled-components';

import HorizontalRule from '@/components/COMMON/HorizontalRule/HorizontalRule';
import Modal from '@/components/COMMON/Modal/Modal';
import SignUpForm from '@/components/USER/SignUpForm/SignUpForm';

interface Props {
  close: () => void;
}

const SignUpModal: FC<Props> = ({ close }) => (
  <Modal close={close}>
    <Container>
      <Title>Sign up</Title>

      <HorizontalRule />

      <SignUpForm close={close} />
    </Container>
  </Modal>
);

export default SignUpModal;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fontSize.h3};
  margin: 0;
`;
