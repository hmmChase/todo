import styled from 'styled-components';
import { Layout } from 'antd';

export const LayoutMain = styled(Layout)`
  min-height: 100vh;
`;

export const AntHeader = styled(Layout.Header)`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  display: flex;
  justify-content: center;
  padding: 0;

  h1 {
    color: ${props => props.theme.color.yellow_bright};
    font-family: 'Play', sans-serif;
    letter-spacing: 0.05rem;
    text-shadow: 1px 1px 1px ${props => props.theme.color.black};
  }
`;

export const AntContent = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  padding: 20px;

  @media screen and (min-width: 940px) {
    padding: 20px 0;
  }
`;

export const AntFooter = styled(Layout.Footer)`
  display: flex;
  justify-content: center;
`;
