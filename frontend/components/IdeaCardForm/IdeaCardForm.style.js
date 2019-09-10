import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

export const IdeaCardForm = styled(Form)`
  display: flex;
  position: relative;
  width: 100%;
`;

export const BoxImg = styled.img`
  left: 10px;
  position: absolute;
  top: -30px;
  width: 50px;
`;

export const IdeaFormItem = styled(Form.Item)``;

export const IdeaTextArea = styled(Input.TextArea)`
  margin-bottom: 0 !important;
  border: none;
  border-right: 1px solid black;

  &:hover {
    border: none;
    border-right: 1px solid black;
  }

  &:focus {
    border: none;
    border-right: 1px solid black;
    box-shadow: none;
  }
`;

export const SubmitBtn = styled(Button).attrs({
  type: 'primary',
  htmlType: 'submit'
})`
  height: auto;
  border: none;
`;
