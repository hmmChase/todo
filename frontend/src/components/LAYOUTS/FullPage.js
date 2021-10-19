import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import { siteTitle } from '../../configs/config';
import HorizontalRule from '../REUSEABLE/HorizontalRule';

const FullPage = props => {
  const { children, title, description } = props;

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>

        <meta name='description' content={description} />
      </Head>

      <Container>
        <LogoWrapper>
          <Link href='/'>
            <Logo>
              <Img src='images/ideabox.png' alt='ideabox' />

              <SiteTitle>{siteTitle}</SiteTitle>
            </Logo>
          </Link>
        </LogoWrapper>

        <Content>
          <PageTitle>{title}</PageTitle>

          <PageWrapper>
            <HorizontalRulee />
            {children}
          </PageWrapper>
        </Content>
      </Container>
    </>
  );
};

export default FullPage;

const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.lightBlue};
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  margin: 2rem 0 0 2rem;
  cursor: pointer;
`;

const Img = styled.img`
  height: 4rem;
`;

const SiteTitle = styled.h1`
  color: ${props => props.theme.colors.darkRed};
  font-family: 'Play', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  margin: 0;
`;

const PageTitle = styled.h2`
  margin: 0 auto;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 800px) {
    position: relative;
    justify-content: center;
  }
`;

export const HorizontalRulee = styled(HorizontalRule)`
  margin-bottom: 1rem;

  @media screen and (min-width: 800px) {
    width: 150%;
    position: absolute;
    transform: rotate(90deg);
    left: calc(-75% - 1rem);
  }
`;
