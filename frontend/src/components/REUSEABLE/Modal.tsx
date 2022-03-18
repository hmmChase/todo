import { FC, ReactNode, useRef } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '../../hooks/useOnClickOutside';

interface Props {
  children: ReactNode;
  close: () => void;
}

const Modal: FC<Props> = ({ children, close }) => {
  // create a ref that we add to the element for which we want to detect outside clicks
  const insideRef = useRef<HTMLDivElement>(null);

  // call hook passing in the ref and a function to call on outside click
  useOnClickOutside(close, insideRef);

  return (
    <Container>
      <Outer />

      <Inner ref={insideRef}>{children}</Inner>
    </Container>
  );
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
