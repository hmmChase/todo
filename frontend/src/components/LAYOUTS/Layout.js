import PropTypes from 'prop-types';
import Head from 'next/head';
import styled, { withTheme } from 'styled-components';

import { siteTitle } from '../../config';
import Header from '../SECTIONS/Header/Header';
import BackButton from '../OTHER/BackButton';
import Footer from '../SECTIONS/Footer';

const Layout = props => {
  const {
    isLoggedIn,
    onIdeaPage,
    hasHeader,
    hasBackButton,
    children,
    title,
    description
  } = props;

  // const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>

        <meta name='description' content={description} />
      </Head>

      <LayoutWrap>
        {hasHeader && (
          <HeaderWrap>
            <MaxWidth>
              <Header isLoggedIn={isLoggedIn} onIdeaPage={onIdeaPage} />
            </MaxWidth>
          </HeaderWrap>
        )}

        <MainWrap>
          <MaxWidth>
            {hasBackButton && <BackButton />}

            {children}
          </MaxWidth>
        </MainWrap>

        <FooterWrap>
          <MaxWidth>
            <Footer />
          </MaxWidth>
        </FooterWrap>
      </LayoutWrap>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ]),
  title: PropTypes.string,
  theme: PropTypes.object
};

export default withTheme(Layout);

const LayoutWrap = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
`;

const MaxWidth = styled.div`
  @media screen and (min-width: ${props =>
      props.theme.widths.regularPageWidth}px) {
    max-width: ${props => props.theme.widths.regularPageWidth}px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
`;

const HeaderWrap = styled.header`
  grid-area: header;
  background-color: ${props => props.theme.colors.lightBlue};
  border-bottom: 1px solid ${props => props.theme.colors.black};

  /* position: fixed; */
`;

const MainWrap = styled.main`
  grid-area: main;
`;

const FooterWrap = styled.footer`
  grid-area: footer;
  border-top: 1px solid ${props => props.theme.colors.black};
`;
