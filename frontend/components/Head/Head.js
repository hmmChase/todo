import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = React.memo(props => (
  <NextHead>
    <title>{props.title ? `Starter | ${props.title}` : 'Starter'}</title>
  </NextHead>
));

Head.propTypes = {
  title: PropTypes.string.isRequired
};

export default Head;
