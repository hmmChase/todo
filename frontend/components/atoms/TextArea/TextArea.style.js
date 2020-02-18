import styled from 'styled-components';
import { Input } from 'antd';

export const InputTextArea = styled(Input.TextArea)`
  /* .textarea.ant-input {
    margin-bottom: 0;
  } */
  /* margin-bottom: 0 !important; */

  /* border: none; */
  /* border-right: 1px solid ${props => props.theme.color.black}; */

  &:focus {
    border-color: #d9d9d9;
    box-shadow: none;
   }

   &:hover {
    border-color: #d9d9d9;
    box-shadow: none;
   }
`;
