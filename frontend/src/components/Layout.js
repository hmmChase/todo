import PropTypes from 'prop-types';
import Head from 'next/head';
import styled, { withTheme } from 'styled-components';

import { siteTitle } from '../config';

const Layout = props => {
  const { children, title, description, theme } = props;

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>

        <meta name='description' content={description} />
      </Head>

      <Main>{children}</Main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  title: PropTypes.string,
  theme: PropTypes.object
};

export default withTheme(Layout);

const Main = styled.main`
	min-height: 100%;
`;
