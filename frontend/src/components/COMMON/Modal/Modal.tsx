import { useRef } from 'react';
import styled from 'styled-components';
import type { ReactNode } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  children: ReactNode;
  close: () => void;
}

const Modal = ({ children, close }: Props) => {
  // create a ref that we add to the element for which we want to detect outside clicks
  const insideRef = useRef<HTMLDivElement>(null);

  // call hook passing in the ref and a function to call on outside click
  useOnClickOutside(close, insideRef);

  return (
    <Container>
      <Inner ref={insideRef}>{children}</Inner>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 111;
`;

const Inner = styled.div`
  background-color: ${props => props.theme.background.tertiary};
  border-radius: 10px;
  padding: 1rem 2rem;
  z-index: 999;
`;
