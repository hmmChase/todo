import PropTypes from 'prop-types';
import styled from 'styled-components';

const HorizontalRule = props => {
  const { className } = props;

  return <HR className={className} />;
};

HorizontalRule.propTypes = {
  className: PropTypes.string
};

export default HorizontalRule;

export const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 0.2rem;
  margin: 0;
  width: 100%;
`;
