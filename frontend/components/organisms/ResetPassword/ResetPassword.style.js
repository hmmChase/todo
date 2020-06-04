import styled from 'styled-components';
import { Form, List } from 'antd';
import { Form as FormikForm } from 'formik';
import Button from '../../atoms/Button/Button';

export const FormikFormm = styled(FormikForm)`
  max-width: 300px;
  margin: 0 auto;
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
