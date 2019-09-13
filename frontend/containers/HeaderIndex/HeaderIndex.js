import SignOutBtn from '../../components/SignOutBtn/SignOutBtn';
import IdeaCardForm from '../../components/IdeaCardForm/IdeaCardForm';
import * as sc from './HeaderIndex.style';

const HeaderIndex = React.memo(() => (
  <sc.HeaderIndex>
    <sc.Title>Starter</sc.Title>

    <SignOutBtn />

    <IdeaCardForm />
  </sc.HeaderIndex>
));

export default HeaderIndex;
