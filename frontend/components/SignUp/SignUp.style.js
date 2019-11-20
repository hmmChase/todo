import styled from 'styled-components';
import { Form as formikForm } from 'formik';
import { Form, Input, Button, Icon, List, Typography } from 'antd';

export const SignUpForm = styled(formikForm)``;

export const TypographyText = styled(Typography.Text)``;

export const FormItem = styled(Form.Item)``;

export const FormItemBtn = styled(Form.Item)`
  float: right;
`;

export const InputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const InputEmail = styled(Input)``;

export const InputPassword = styled(Input.Password)``;

export const InputConfirmPassword = styled(Input.Password)``;

export const PassListContainer = styled.div`
  display: inline-block;
`;

export const PassList = styled(List)``;

export const PassListItem = styled(List.Item)`
  padding: 0;
`;

export const ListIcon = styled(Icon)`
  margin-right: 5px;
`;

export const SubmitBtn = styled(Button)`
  float: right;
`;
