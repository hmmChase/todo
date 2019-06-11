import SignOn from '../SignOn/SignOn';
import IdeaCardForm from '../IdeaCardForm/IdeaCardForm';
import * as sc from './Header.style';

const Header = React.memo(() => (
  <sc.header snapshot="Header">
    <sc.h1>Starter</sc.h1>

    <SignOn />

    <IdeaCardForm />
  </sc.header>
));

export default Header;
