import { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import useOnClickOutside from '../../utils/useOnClickOutside';

const Dropdown = props => {
  const { className, close, children } = props;

  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, close);

  return (
    <Container className={className} ref={ref}>
      <Ul>{children}</Ul>
    </Container>
  );
};

Dropdown.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  close: PropTypes.any
};

export default Dropdown;

const Container = styled.div`
  color: ${props => props.theme.colors.buttons.iconDefault};
  position: absolute;
  padding: 0 0.5rem;
  z-index: 999;
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

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;

  > li {
    cursor: pointer;
    padding: 10px 0;

    :not(:last-child) {
      border-bottom: 1px solid #e5e5e5;
    }

    > span {
      font-size: 0.9rem;

      :hover {
        color: ${props => props.theme.colors.text.primaryText};
      }
    }

    > a {
      color: inherit;
      text-decoration: none;

      > span {
        font-size: 0.9rem;

        :hover {
          color: ${props => props.theme.colors.text.primaryText};
        }
      }
    }
  }
`;
