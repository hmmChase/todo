import styled from 'styled-components';

//! Mobile first

export const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* min-height: 100vh; */
`;

export const Header = styled.header`
  /* padding: 0; */

  /* h1 { */
  /* font-family: 'Play', sans-serif; */
  /* letter-spacing: 0.05rem; */
  /* } */
`;

export const Main = styled.main`
  padding: 10px;
  @media screen and (min-width: 900px) {
  }
`;

export const Footer = styled.footer``;

export const Container = styled.div`
  /* display: flex; */
  /* justify-content: center; */

  @media screen and (min-width: 900px) {
    /* margin: auto; */
    /* max-width: 900px; */
  }
`;
