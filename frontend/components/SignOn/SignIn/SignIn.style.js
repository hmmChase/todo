import styled from 'styled-components';
import { form } from '../../../styles/form.style';
import { submitInputBtn } from '../../../styles/button.style';
import { input } from '../../../styles/input.style';

export { form };

export const aForgotPass = styled.a`
  cursor: pointer;
`;

export const inputText = styled(input)`
  margin: 5px;
`;

export const inputBtn = styled(submitInputBtn)`
  margin-top: 10px;
  margin-left: auto;
`;
