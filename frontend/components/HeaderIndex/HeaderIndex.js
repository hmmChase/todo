import SignOut from '../SignOut/SignOut';
import IdeaCardForm from '../IdeaCardForm/IdeaCardForm';
import * as sc from './HeaderIndex.style';

const HeaderIndex = React.memo(() => (
  <sc.HeaderIndex>
    <sc.headerH1>Starter</sc.headerH1>

    <SignOut />

    <IdeaCardForm />
  </sc.HeaderIndex>
));

export default HeaderIndex;
