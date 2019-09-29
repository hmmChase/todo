import SignOutBtn from '../../components/SignOutBtn/SignOutBtn';
import IdeaCardForm from '../../components/IdeaCardForm/IdeaCardForm';
import { title } from '../../constants';
import * as sc from './HeaderMain.style';

const HeaderMain = React.memo(() => (
  <sc.HeaderMain>
    <sc.Title>{title}</sc.Title>

    <SignOutBtn />

    <IdeaCardForm />
  </sc.HeaderMain>
));

export default HeaderMain;
