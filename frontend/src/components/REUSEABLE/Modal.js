import { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import useOnClickOutside from '../../utils/useOnClickOutside';

const Modal = props => {
  const { close, children } = props;

  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, close);

  return (
    <Container>
      <Outer />

      <Inner ref={ref}>{children}</Inner>
    </Container>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  close: PropTypes.any
};

export default Modal;

const Container = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const Outer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 666;
`;

const Inner = styled.div`
  background-color: ${props => props.theme.colors.lightBlue};
  border-radius: 10px;
  padding: 1em;
  z-index: 999;
`;
