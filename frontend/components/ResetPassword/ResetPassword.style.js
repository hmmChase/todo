import styled from 'styled-components';

export { form } from '../Styled/form.style';

export const ResetPassword = styled.section`
  background-color: ${props => props.theme.color.blue};
  display: grid;
  min-height: 100vh;
  place-items: center center;
`;

export const InputText = styled.input`
  margin: 5px;
`;

export const InputSubmit = styled.input`
  margin-left: auto;
  margin-top: 10px;
`;

export const PassTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0;
`;

export const PassList = styled.ul`
  margin: 5px 0 0 0;
  padding-left: 20px;
`;
