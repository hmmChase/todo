// import { signOut, IdeaCardForm } from '..';
import SignOut from '../SignOut/SignOut';
import IdeaCardForm from '../IdeaCardForm/IdeaCardForm';
import * as sc from './Header.style';

const Header = React.memo(() => (
  <sc.header>
    <sc.h1>Starter</sc.h1>

    <SignOut />

    <IdeaCardForm />
  </sc.header>
));

export default Header;
