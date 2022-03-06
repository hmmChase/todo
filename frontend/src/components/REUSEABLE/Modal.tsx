import { FC, ReactNode, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useOnClickOutside from '../../utils/useOnClickOutside';

interface Props {
  close: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = props => {
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
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired
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
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 666;
`;

const Inner = styled.div`
  background-color: ${props => props.theme.background.tertiary};
  border-radius: 10px;
  padding: 1rem 2rem;
  z-index: 999;
`;
