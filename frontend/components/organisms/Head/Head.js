import PropTypes from 'prop-types';
import NextHead from 'next/head';
import { title } from '../../../constants';

const Head = props => (
  <NextHead>
    <title>{props.title ? `${title} | ${props.title}` : `${title}`}</title>
  </NextHead>
);

Head.propTypes = { title: PropTypes.string };

export default React.memo(Head);
