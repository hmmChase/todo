import styled from 'styled-components';
import { Layout } from 'antd';

//! Mobile first

export const LayoutMain = styled(Layout)`
  min-height: 100vh;
`;

export const Container = styled.div`
  @media screen and (min-width: 900px) {
    max-width: 900px;
    width: 100%;
  }
`;

export const AntHeader = styled(Layout.Header)`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  padding: 0;

  h1 {
    color: ${props => props.theme.color.yellow_bright};
    font-family: 'Play', sans-serif;
    letter-spacing: 0.05rem;
    text-shadow: 1px 1px 1px ${props => props.theme.color.black};
  }

  @media screen and (min-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

export const AntContent = styled(Layout.Content)`
  padding: 20px;

  @media screen and (min-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

export const AntFooter = styled(Layout.Footer)`
  align-self: center;
`;
