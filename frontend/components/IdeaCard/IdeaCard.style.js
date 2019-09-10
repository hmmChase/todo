import styled from 'styled-components';
import { List, Input, Icon } from 'antd';

export const IdeaCard = styled(List.Item)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const IdeaInput = styled(Input.TextArea).attrs({
  autosize: { minRows: 1, maxRows: 10 }
})``;

export const DetailIcon = styled(Icon).attrs({
  type: 'up-square',
  theme: 'twoTone'
})`
  font-size: 1.2rem;
`;

export const DeleteIcon = styled(Icon).attrs({
  type: 'close-square',
  theme: 'twoTone'
})`
  font-size: 1.2rem;
`;
