import SignOutBtn from '../SignOutBtn/SignOutBtn';
import IdeaCardForm from '../IdeaCardForm/IdeaCardForm';
import * as sc from './HeaderIndex.style';

const HeaderIndex = React.memo(() => (
  <sc.HeaderIndex>
    <sc.Title>Starter</sc.Title>

    <SignOutBtn />

    <IdeaCardForm />
  </sc.HeaderIndex>
));

export default HeaderIndex;
