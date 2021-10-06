import Link from 'next/link';
import styled from 'styled-components';

import { siteTitle } from '../../config';

const FullPage = props => {
  const { children } = props;

  return (
    <Container>
      <Header>
        <Link href='/'>
          <a>
            <Img src='images/ideabox.png' alt='ideabox' />

            <Title>{siteTitle}</Title>
          </a>
        </Link>
      </Header>

      <HR />
      <Content>
        <ContentHalf>{children}</ContentHalf>
      </Content>
    </Container>
  );
};

export default FullPage;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.lightBlue};
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15rem;
  width: 80%;
  max-width: 20rem;
  flex-grow: 0;

  @media screen and (min-width: 800px) {
    position: relative;
    flex-direction: row;
    justify-content: space-around;
    max-width: 900px;
  }
`;

export const ContentHalf = styled.div`
  @media screen and (min-width: 800px) {
    width: 40%;
  }
`;

export const Img = styled.img`
  height: 4rem;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.darkRed};
  font-family: 'Play', sans-serif;
  font-size: 3rem;
  letter-spacing: 0.2rem;
  margin: 0;
`;
