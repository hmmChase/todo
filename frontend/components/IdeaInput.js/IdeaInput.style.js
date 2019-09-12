import styled from 'styled-components';
import { Input } from 'antd';

export const IdeaInput = styled(Input.TextArea).attrs({
  autosize: { minRows: 1, maxRows: 10 }
})``;
