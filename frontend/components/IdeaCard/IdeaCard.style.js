import styled from 'styled-components';
import { Input, Icon, List } from 'antd';

export const LI = styled(List.Item)`
  list-style: none;
  margin: 15px;
  position: relative;
`;

export const IdeaInput = styled(Input.TextArea).attrs({
  autosize: { minRows: 1, maxRows: 50 }
})``;

export const DetailIcon = styled(Icon).attrs({
  type: 'up-square',
  theme: 'twoTone'
})`
  font-size: 1.2rem;
  position: absolute;
  right: 40px;
  top: -10px;

  &:hover {
    border: 1px solid black;
  }
`;

export const DeletIcon = styled(Icon).attrs({
  type: 'close-square',
  theme: 'twoTone'
})`
  font-size: 1.2rem;
  position: absolute;
  right: 10px;
  top: -10px;

  &:hover {
    border: 1px solid black;
  }
`;
