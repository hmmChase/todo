import styled from 'styled-components';
import { Form as formikForm } from 'formik';
import { Form, Input, Button, Icon } from 'antd';

export const SignInForm = styled(formikForm)``;

export const FormItem = styled(Form.Item)``;

export const InputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const InputEmail = styled(Input)``;

export const InputPassword = styled(Input.Password)``;

export const SubmitBtn = styled(Button)`
  float: right;
`;
