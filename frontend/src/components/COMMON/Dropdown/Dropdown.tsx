import styled from 'styled-components';
import type { FC, ReactNode, RefObject } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  children: ReactNode;
  className?: string;
  close: () => void;
  insideRef: RefObject<HTMLDivElement>;
}

const Dropdown: FC<Props> = ({ children, className, close, insideRef }) => {
  useOnClickOutside(close, insideRef);

  return <Container className={className}>{children}</Container>;
};

export default Dropdown;

const Container = styled.div`
  position: absolute;
`;