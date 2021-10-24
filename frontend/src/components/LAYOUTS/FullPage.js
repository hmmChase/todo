import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { siteTitle } from '../../configs/config';
import Ideabox from '../../../public/images/ideabox.png';
import HorizontalRule from '../REUSEABLE/HorizontalRule';

const FullPage = props => {
  const { title, description, children } = props;

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
              <BoxImg src={Ideabox} alt='ideabox' />

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

FullPage.propTypes = {
  children: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default FullPage;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: ${props => props.theme.background.tertiary};
`;

const LogoWrapper = styled.div`
  left: 0;
  position: absolute;
  top: 0;
`;

const Logo = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 2rem 0 0 2rem;
`;

const BoxImg = styled(Image).attrs({
  layout: 'fixed',
  width: 50,
  height: 41
})``;

const SiteTitle = styled.h1`
  color: ${props => props.theme.text.tertiary};
  font-family: 'Play', sans-serif;
  font-size: ${props => props.theme.fontSize.h1};
  letter-spacing: 0.2rem;
  margin: 0;
`;

const PageTitle = styled.h2`
  display: flex;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    align-items: center;
    flex-direction: row;
    gap: 2rem;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    justify-content: center;
    position: relative;
  }
`;

export const HorizontalRulee = styled(HorizontalRule)`
  margin-bottom: 1rem;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    left: calc(-75% - 1rem);
    position: absolute;
    transform: rotate(90deg);
    width: 150%;
  }
`;
