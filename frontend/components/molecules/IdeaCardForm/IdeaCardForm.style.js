import styled from 'styled-components';
import { Form } from 'antd';
import { AntButton } from '../../atoms/Button/Button.style';
import { InputTextArea } from '../../atoms/TextArea/TextArea.style';

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

export const IdeaInput = styled(InputTextArea)`
  /* margin-bottom: 0 !important; */
  /* border: none; */
  /* border-top-right-radius: 0; */
  /* border-bottom-right-radius: 0; */
  /* border-right: 1px solid ${props => props.theme.color.black}; */

  /* &:focus {
    box-shadow: none;
  } */
`;

export const SubmitBtn = styled(AntButton)`
  height: auto;
  border: none;
`;
