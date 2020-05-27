import styled from 'styled-components';
import { Form, Input, List } from 'antd';
import Button from '../../atoms/Button/Button';

export const InputPassword = styled(Input.Password)`
  /* width: 15rem; */
`;

export const InputConfirmPassword = styled(Input.Password)`
  /* width: 15rem; */
`;

export const PassListContainer = styled.div`
  display: inline-block;
  margin-top: 20px;
`;

export const PassListItem = styled(List.Item)`
  padding: 0;
`;

export const FormItemBtn = styled(Form.Item)`
  float: right;
`;

export const SubmitBtn = styled(Button)`
  margin-top: 20px;
`;
