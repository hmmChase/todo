import PropTypes from 'prop-types';
import NextHead from 'next/head';

const Head = props => (
  <NextHead>
    <title>{props.title ? `Starter | ${props.title}` : 'Starter'}</title>
  </NextHead>
);

Head.propTypes = { title: PropTypes.string.isRequired };

export default React.memo(Head);
