import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';

import { siteTitle } from '../../configs/config';
import Header from '../SECTIONS/HEADER/Header';
import BackButton from '../OTHER/BackButton';
import Footer from '../SECTIONS/Footer';

const Layout = props => {
  const {
    isLoggedIn,
    title,
    description,
    hasHeader,
    hasBackButton,
    hasFooter,
    children
  } = props;

  // const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>

        <meta name='description' content={description} />
      </Head>

      <Container>
        {hasHeader && (
          <HeaderWrap>
            <MaxWidth>
              <Header isLoggedIn={isLoggedIn} />
            </MaxWidth>
          </HeaderWrap>
        )}

        <MainWrap>
          <MaxWidth>
            {hasBackButton && <BackButtonn />}

            {children}
          </MaxWidth>
        </MainWrap>

        {hasFooter && (
          <FooterWrap>
            <MaxWidth>
              <Footer />
            </MaxWidth>
          </FooterWrap>
        )}
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  hasBackButton: PropTypes.bool,
  hasFooter: PropTypes.bool,
  hasHeader: PropTypes.bool,
  isLoggedIn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Layout;

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  position: relative;
`;

const MaxWidth = styled.div`
  height: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    max-width: ${props => props.theme.width.page};
  }
`;

const HeaderWrap = styled.header`
  background-color: ${props => props.theme.background.tertiary};
  border-bottom: 1px solid ${props => props.theme.border.primary};
  grid-area: header;
`;

const MainWrap = styled.main`
  grid-area: main;
  padding-bottom: 51px; /* Footer height */
`;

const FooterWrap = styled.footer`
  background-color: ${props => props.theme.background.tertiary};
  border-top: 1px solid ${props => props.theme.border.primary};
  bottom: 0;
  display: flex;
  grid-area: footer;
  position: absolute;
  width: 100%;
`;

export const BackButtonn = styled(BackButton)`
  margin: 1rem auto 1rem 1rem;
`;
