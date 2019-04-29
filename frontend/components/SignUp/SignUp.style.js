import styled from 'styled-components';
import { form } from '../../styles/form.style';
import { submitInputBtn } from '../../styles/button.style';
import { input } from '../../styles/input.style';

export { form };

export const inputText = styled(input)`
  margin: 5px;
`;

export const inputBtn = styled(submitInputBtn)`
  margin-top: 5px;
  margin-left: auto;
`;

export const h3PassTitle = styled.h3`
  margin-bottom: 0;
  font-size: 1rem;
`;

export const ulPassList = styled.ul`
  margin: 5px 0 0 0;
  padding-left: 20px;
`;
