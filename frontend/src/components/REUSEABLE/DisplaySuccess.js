import PropTypes from 'prop-types';
import styled from 'styled-components';

const DisplaySuccess = props => (
  <Wrapper>
    <span>{props.message}</span>
  </Wrapper>
);

DisplaySuccess.propTypes = {
  message: PropTypes.string.isRequired
};

export default DisplaySuccess;

const Wrapper = styled.div`
  padding: 4px;
  border: 1px solid #000;
  background-color: ${props => props.theme.statusDisplays.success.background};
  color: ${props => props.theme.statusDisplays.success.text};
  border-radius: ${props => props.theme.buttons.borderRadius};
`;
