import PropTypes from 'prop-types';

import SignOutBtn from '../../components/SignOutBtn/SignOutBtn';
import * as sc from './HeaderDetail.style';

const HeaderDetail = React.memo(props => (
  <sc.HeaderDetail>
    <sc.Title>{props.ideaId}</sc.Title>

    <SignOutBtn />
  </sc.HeaderDetail>
));

HeaderDetail.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default HeaderDetail;
