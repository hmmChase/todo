import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

export const IdeaCardForm = styled(Form)`
  display: flex;
  position: relative;
`;

export const BoxImg = styled.img`
  position: absolute;
  left: 10px;
  top: -30px;
  width: 50px;
`;

export const InputTextArea = styled(Input.TextArea)`
  margin-bottom: 0 !important;
  border: none;
  border-right: 1px solid ${props => props.theme.color.black};

  &:focus {
    box-shadow: none;
  }
`;

export const SubmitBtn = styled(Button)`
  height: auto;
  border: none;
`;
