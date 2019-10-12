import SignOutBtn from '../SignOutBtn/SignOutBtn';
import IdeaCardForm from '../IdeaCardForm/IdeaCardForm';
import { title } from '../../constants';
import * as sc from './HeaderMain.style';

const HeaderMain = () => (
  <sc.HeaderMain>
    <sc.Title>{title}</sc.Title>

    <SignOutBtn />

    <IdeaCardForm />
  </sc.HeaderMain>
);

export default HeaderMain;
