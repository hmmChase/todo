import styled from 'styled-components';
import type { ReactNode, RefObject } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  children: ReactNode;
  className?: string;
  close: () => void;
  insideRef: RefObject<HTMLDivElement>;
}

const Dropdown = ({ children, className, close, insideRef }: Props) => {
  useOnClickOutside(close, insideRef);

  return <Container className={className}>{children}</Container>;
};

export default Dropdown;

const Container = styled.div`
  position: absolute;
`;
