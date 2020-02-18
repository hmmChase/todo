import PropTypes from 'prop-types';
import SignOutBtn from '../../SignOutBtn/SignOutBtn';
import { title } from '../../../constants';
import * as sc from './Header.style';

const Header = props => {
  return (
    <sc.Header>
      <sc.HeaderTitle>{props.ideaId ? props.ideaId : title}</sc.HeaderTitle>

      <SignOutBtn />

      <sc.Bottom>{props.children}</sc.Bottom>
    </sc.Header>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  ideaId: PropTypes.string
};

export default React.memo(Header);
