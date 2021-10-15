// import PropTypes from 'prop-types';
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

        <SignUpForm />
      </Container>
    </Modal>
  );
};

// ModalLogin.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default SignUpModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;
