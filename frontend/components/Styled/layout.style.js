import styled from 'styled-components';
import { Layout } from 'antd';

import { HeaderIndex } from '../HeaderIndex/HeaderIndex.style';
import { IdeaCardList } from '../IdeaCardList/IdeaCardList.style';

const { Header, Content, Footer } = Layout;

export const AntLayout = styled(Layout)`
  min-height: 100vh;

  ${HeaderIndex} {
    max-width: 900px;
    width: 100%;
  }

  ${IdeaCardList} {
    max-width: 900px;
    width: 100%;
  }
`;

export const AntHeader = styled(Header)`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  display: flex;
  height: auto;
  justify-content: center;
`;

export const AntContent = styled(Content)`
  display: flex;
  justify-content: center;
`;

export const AntFooter = styled(Footer)``;
