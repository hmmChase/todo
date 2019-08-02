import styled from 'styled-components';
import { form } from '../../../styles/form.style';
import { input } from '../../../styles/input.style';
import { submitInputBtn } from '../../../styles/button.style';

export { form };

export const inputText = styled(input)`
  margin: 5px;
`;

export const inputBtn = styled(submitInputBtn)`
  margin-left: auto;
  margin-top: 10px;
`;
