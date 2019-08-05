import styled from 'styled-components';
import { form } from '../../styles/form.style';
import { input } from '../../styles/input.style';
import { submitInputBtn } from '../../styles/button.style';

export { form };

export const inputText = styled(input)`
  margin: 5px;
`;

export const inputBtn = styled(submitInputBtn)`
  margin-left: auto;
  margin-top: 10px;
`;

export const h3PassTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0;
`;

export const ulPassList = styled.ul`
  margin: 5px 0 0 0;
  padding-left: 20px;
`;
