import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useOnClickOutside from '../../utils/useOnClickOutside';

const Dropdown = props => {
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

Dropdown.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  close: PropTypes.func.isRequired
};

export default Dropdown;

const Container = styled.div`
  position: absolute;
  /* padding: 0 0.5rem; */
  /* z-index: 999; */

  /* display: flex; */
  /* overflow: auto; */
  /* margin: 0; */
  /* right: 0px; */
  /* top: 0px; */
  /* width: 180px; */
  /* background-color: ${props => props.theme.colors.backgrounds.fullApp}; */
  /* border-bottom-left-radius: 0.5rem; */
  /* border-top-left-radius: 0.5rem; */
  /* background-color: black; */
`;
