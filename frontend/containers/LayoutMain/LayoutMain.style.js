import styled from 'styled-components';
import { Layout } from 'antd';

export const LayoutMain = styled(Layout)`
  min-height: 100vh;
`;

export const AntHeader = styled(Layout.Header)`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  display: flex;
  padding: 0;
  justify-content: center;

  > * {
    max-width: 900px;
    width: 100%;
  }
`;

export const AntContent = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  padding: 20px;

  > * {
    max-width: 900px;
    width: 100%;
  }

  @media screen and (min-width: 940px) {
    padding: 20px 0;
  }
`;

export const AntFooter = styled(Layout.Footer)`
  display: flex;
  justify-content: center;
`;
