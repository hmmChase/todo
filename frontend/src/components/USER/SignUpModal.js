import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from '../REUSEABLE/Modal';
import HorizontalRule from '../REUSEABLE/HorizontalRule';
import SignUpForm from './SignUpForm';

const SignUpModal = props => {
  const { close } = props;

  return (
    <Modal close={close}>
      <Container>
        <Title>Sign up</Title>

        <HorizontalRule />

        <SignUpForm close={close} />
      </Container>
    </Modal>
  );
};

SignUpModal.propTypes = {
  close: PropTypes.func.isRequired
};

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
