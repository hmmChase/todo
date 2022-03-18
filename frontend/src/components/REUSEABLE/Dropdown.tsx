import { FC, ReactNode, RefObject } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '../../hooks/useOnClickOutside';

interface Props {
  children: ReactNode;
  className?: string;
  close: () => void;
  insideRef: RefObject<HTMLDivElement>;
}

const Dropdown: FC<Props> = ({ children, className, close, insideRef }) => {
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(close, insideRef);

  return <Container className={className}>{children}</Container>;
};

export default Dropdown;

const Container = styled.div`
  position: absolute;
`;
