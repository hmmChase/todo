import Head from 'next/head';
import styled from 'styled-components';
import type { ReactNode } from 'react';

import { siteTitle } from '@/constants/config';
import BackButton from '@/components/COMMON/BackButton/BackButton';
import Footer from '@/components/SECTIONS/Footer/Footer';
import Header from '@/components/SECTIONS/HEADER/Header/Header';

interface Props {
  children: ReactNode;
  description: string;
  hasBackButton?: boolean;
  hasFooter?: boolean;
  hasHeader?: boolean;
  title: string;
}

const App = ({
  children,
  description,
  hasBackButton,
  hasFooter,
  hasHeader,
  title
}: Props) => (
  <>
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>

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

export default App;

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
  padding: 1rem 0 calc(1rem + 51px) 0; /* Add Footer height to bottom */
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
