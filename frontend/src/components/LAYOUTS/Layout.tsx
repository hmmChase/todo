import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import { siteTitle } from '../../constants/config';
import { isLoggedInVar } from '../../graphql/cache';
import Header from '../SECTIONS/Header/Header';
import BackButton from '../OTHER/BackButton';
import Footer from '../SECTIONS/Footer';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  isLoggedIn: boolean;
  hasBackButton?: boolean;
  hasFooter?: boolean;
  hasHeader?: boolean;
}

const Layout: FC<Props> = props => {
  const {
    isLoggedIn,
    title,
    description,
    hasHeader,
    hasBackButton,
    hasFooter,
    children
  } = props;

  isLoggedInVar(isLoggedIn);

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
              <Header />
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
