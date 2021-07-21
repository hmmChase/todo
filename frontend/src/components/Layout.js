import PropTypes from 'prop-types';
import Head from 'next/head';
import styled, { withTheme } from 'styled-components';

import { siteTitle } from '../../config';

const Layout = props => {
  const { children, title } = props;

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>
      </Head>

      <Main>{children}</Main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  theme: PropTypes.object
};

export default withTheme(Layout);

const Main = styled.main`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100%;
`;
