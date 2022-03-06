import { FC, ReactNode, useRef } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '../../utils/useOnClickOutside';

interface Props {
  className?: string;
  close: () => void;
  children: ReactNode;
}

const Dropdown: FC<Props> = props => {
  const { className, close, children } = props;

  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, close);

  return (
    <Container className={className} ref={ref}>
      {children}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  position: absolute;
`;
