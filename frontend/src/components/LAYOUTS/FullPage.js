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
        <Header>
          <Link href='/'>
            <a>
              <Img src='images/ideabox.png' alt='ideabox' />

              <Title1>{siteTitle}</Title1>
            </a>
          </Link>
        </Header>

        <Content>
          <ContentHalf>
            <Title2>{title}</Title2>
          </ContentHalf>

          <HR />

          <ContentHalf>{children}</ContentHalf>
        </Content>
      </Container>
    </>
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
  /* padding-bottom: 20px; */
`;

export const Header = styled.header`
  /* display: flex; */
  /* align-items: center; */
  /* padding: 20px; */
`;

export const Content = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* gap: 2rem; */

  /* min-width: 15rem; */
  /* width: 80%; */
  /* max-width: 20rem; */
  /* flex-grow: 0; */

  /* @media screen and (min-width: 800px) { */
  /* position: relative; */
  /* flex-direction: row; */
  /* justify-content: space-around; */
  /* max-width: 900px; */
  /* } */
`;

export const ContentHalf = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  /* justify-items: center; */
  /* align-content: center; */

  @media screen and (min-width: 800px) {
    /* width: 50%; */
  }
`;

export const Img = styled.img`
  height: 4rem;
`;

export const Title1 = styled.h1`
  color: ${props => props.theme.colors.darkRed};
  font-family: 'Play', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  margin: 0;
`;

export const Title2 = styled.h2`
  margin: 0 auto;
  /* display: flex; */
  /* justify-content: flex-end; */
`;

export const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 0.2rem;
  /* margin: 2rem 0; */

  @media screen and (min-width: 800px) {
    width: 15rem;
    /* position: absolute; */
    /* top: 100px; */
    /* transform: rotate(90deg); */
  }
`;

// export const Container = styled.div`
//   display: flex;
//   /* flex-direction: column; */
//   background-color: ${props => props.theme.colors.lightBlue};
//   min-height: 100vh;
//   justify-content: center;
//   align-items: center;
//   /* padding-bottom: 20px; */
//   /* position: relative; */
// `;

// export const Header = styled.header`
//   position: absolute;

//   top: 0;

//   display: flex;
//   /* padding: 20px; */
// `;

// export const Content = styled.div`
//   /* width: 100%; */

//   display: flex;
//   /* flex-direction: column; */
//   /* min-width: 15rem; */
//   width: 80%;

//   gap: 2rem;
//   /* max-width: 20rem; */
//   /* flex-grow: 0; */
//   justify-content: center;

//   @media screen and (min-width: 800px) {
//     /* position: relative; */
//     /* flex-direction: row; */
//     /* justify-content: space-around; */
//     /* max-width: 900px; */
//   }
// `;

// export const ContentHalf = styled.div`
//   /* @media screen and (min-width: 800px) { */
//   /* width: 40%; */
//   /* } */

//   position: relative;
// `;

// export const Img = styled.img`
//   /* height: 4rem; */
// `;

// export const Title = styled.h1`
//   color: ${props => props.theme.colors.darkRed};
//   font-family: 'Play', sans-serif;
//   font-size: 3rem;
//   letter-spacing: 0.2rem;
//   margin: 0;
// `;

// export const HR = styled.hr`
//   background-image: linear-gradient(
//     to right,
//     rgba(0, 0, 0, 0),
//     rgba(0, 0, 0, 0.75),
//     rgba(0, 0, 0, 0)
//   );
//   border: 0;
//   height: 0.2rem;
//   margin: 0;

//   left: calc(50% - 10rem);

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   justify-self: center;
//   justify-items: center;
//   align-content: center;

//   /* @media screen and (min-width: 800px) { */
//   width: 20rem;
//   position: absolute;
//   /* top: 160px; */
//   transform: rotate(90deg);
//   /* } */
// `;
