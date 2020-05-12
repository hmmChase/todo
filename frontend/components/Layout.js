import PropTypes from 'prop-types';
import Head from 'next/head';
import { title } from '../config';

const Layout = (props) => (
  <>
    <Head>
      <title>{props.title ? `${title} | ${props.title}` : `${title}`}</title>
    </Head>

    <div>{props.header}</div>

    <div>{props.content}</div>

    <div>{props.footer}</div>
  </>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  header: PropTypes.element,
  content: PropTypes.element.isRequired,
  footer: PropTypes.element,
};

export default React.memo(Layout);
