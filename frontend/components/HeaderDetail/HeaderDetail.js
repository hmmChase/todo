import SignOutBtn from '../SignOutBtn/SignOutBtn';
import * as sc from './HeaderDetail.style';

const HeaderDetail = React.memo(props => (
  <sc.HeaderDetail>
    <sc.Title>{props.ideaId}</sc.Title>

    <SignOutBtn />
  </sc.HeaderDetail>
));

export default HeaderDetail;
