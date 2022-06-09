import { FC } from 'react';
import styled from 'styled-components';

import HorizontalRule from '../REUSEABLE/HorizontalRule';
import Modal from '../REUSEABLE/Modal';
import SignUpForm from './SignUpForm';

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