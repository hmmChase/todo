import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import { siteTitle } from '../../config';

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
          {/* <ContentHalf> */}
          <PageTitle>{title}</PageTitle>
          {/* </ContentHalf> */}

          <ContentHalf>
            <HR />

            {children}
          </ContentHalf>
        </Content>
      </Container>
    </>
  );
};

export default FullPage;

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
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
  gap: 2rem;

  @media screen and (min-width: 800px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ContentHalf = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 800px) {
    /* flex: 1; */

    position: relative;
    justify-content: center;

    /* flex-direction: row; */
    /* align-items: center; */
    /* width: 60%; */

    /* align-items: center; */
    /* justify-items: center; */
    /* align-content: center; */
  }
`;

const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 0.2rem;
  margin: 0;

  width: 100%;

  @media screen and (min-width: 800px) {
    width: 150%;
    position: absolute;
    transform: rotate(90deg);
    left: calc(-75% - 1rem);
    align-self: center;
  }
`;
