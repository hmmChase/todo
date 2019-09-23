import styled from 'styled-components';
import { Layout } from 'antd';

//! Mobile first

export const LayoutMain = styled(Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* justify-content: center; */
  /* align-content: center; */
  /* align-items: center; */
  /* align-items: stretch; */
  /* align-self: center; */
  /* align-self: stretch; */
  /* width: 100%; */
  /* flex-grow: 1; */
`;

export const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  /* align-content: center; */
  /* align-items: center; */
  /* align-items: stretch; */
  /* align-self: center; */
  /* align-self: stretch; */
  /* width: 100%; */
  /* flex-grow: 1; */

  > * {
    /* justify-content: center; */
    /* align-content: center; */
    /* align-items: center; */
    /* align-items: stretch; */
    /* align-self: center; */
    /* align-self: stretch; */
    /* width: 100%; */
    flex-grow: 1;
  }

  @media screen and (min-width: 900px) {
    max-width: 900px;
  }
`;

export const AntHeader = styled(Layout.Header)`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  padding: 0;

  /* justify-content: center; */
  /* align-content: center; */
  /* align-items: center; */
  /* align-items: stretch; */
  /* align-self: center; */
  /* align-self: stretch; */
  /* width: 100%; */
  /* flex-grow: 1; */

  h1 {
    color: ${props => props.theme.color.yellow_bright};
    font-family: 'Play', sans-serif;
    letter-spacing: 0.05rem;
    text-shadow: 1px 1px 1px ${props => props.theme.color.black};
  }

  @media screen and (min-width: 900px) {
  }
`;

export const AntContent = styled(Layout.Content)`
  padding: 20px;
  /* justify-content: center; */
  /* align-content: center; */
  /* align-items: center; */
  /* align-items: stretch; */
  /* align-self: center; */
  /* align-self: stretch; */
  /* width: 100%; */
  /* flex-grow: 1; */

  @media screen and (min-width: 900px) {
  }
`;

export const AntFooter = styled(Layout.Footer)``;
