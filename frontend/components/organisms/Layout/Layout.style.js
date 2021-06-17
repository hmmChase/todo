import styled from 'styled-components';

//! Mobile first

export const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  min-height: 100vh; */
`;

export const Header = styled.header`
  /* padding: 0; */
  background-color: ${props => props.theme.color.lightBlue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  padding: 10px 0 0 0;

  > h1 {
    font-family: 'Play', sans-serif;
    letter-spacing: 0.05rem;
  }

  @media screen and (min-width: 900px) {
    padding: 10px 0 0 0;
  }
`;

export const Main = styled.main`
  padding: 10px;
`;

export const Footer = styled.footer``;

export const Container = styled.div`
  /* display: flex; */
  /* justify-content: center; */

  @media screen and (min-width: 900px) {
    margin: auto;
    max-width: 900px;
  }
`;
