import styled from 'styled-components';
import { Layout } from 'antd';

import { HeaderIndex } from '../../containers/HeaderIndex/HeaderIndex.style';
import { IdeaList } from '../IdeaList/IdeaList.style';

const { Header, Content, Footer } = Layout;

export const AntLayout = styled(Layout)`
  min-height: 100vh;

  ${HeaderIndex} {
    max-width: 900px;
    width: 100%;
  }

  ${IdeaList} {
    max-width: 900px;
    width: 100%;
  }
`;

export const AntHeader = styled(Header)`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  display: flex;
  height: auto;
  padding: 0;
  justify-content: center;
`;

export const AntContent = styled(Content)`
  display: flex;
  justify-content: center;
  padding: 20px;

  @media screen and (min-width: 940px) {
    padding: 20px 0;
  }
`;

export const AntFooter = styled(Footer)`
  display: flex;
  justify-content: center;
`;
