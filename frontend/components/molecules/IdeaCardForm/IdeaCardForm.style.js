import styled from 'styled-components';
import { Form } from 'antd';
import TextArea from '../../atoms/TextArea/TextArea';
import Button from '../../atoms/Button/Button';

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

export const IdeaInput = styled(TextArea)`
  border-radius: 0;

  /* border: none; */
  /* border-top-right-radius: 0; */
  /* border-bottom-right-radius: 0; */
  /* border-right: 1px solid ${props => props.theme.color.black}; */

  /* &:focus {
    box-shadow: none;
  } */

    &:focus {
    border-color: #d9d9d9;
    box-shadow: none;
   }

   &:hover {
    border-color: #d9d9d9;
    box-shadow: none;
   }
`;

export const SubmitBtn = styled(Button)`
  border: none;
  border-radius: 0;
  height: auto;
`;
