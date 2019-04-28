import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = React.memo(props => (
  <NextHead>
    <title>{`next-graphql-starter | ${props.title}`}</title>
  </NextHead>
));

Head.propTypes = {
  title: PropTypes.string.isRequired
};

export default Head;
