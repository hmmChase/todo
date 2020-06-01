import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { title } from '../../../config';
import { CURRENT_USER } from '../../../graphql/queries';
import SignOutBtn from '../../molecules/SignOutBtn/SignOutBtn';
import * as sc from './Header.style';

const Header = (props) => {
  const { data } = useQuery(CURRENT_USER, { onError(_error) {} });

  return (
    <sc.Header>
      <sc.TitleHeader>{props.title ? props.title : title}</sc.TitleHeader>

      {data && data.currentUser && (
        <div>
          <sc.Welcome>Welcome {data.currentUser.username}</sc.Welcome>

          <SignOutBtn />
        </div>
      )}

      <sc.Bottom>{props.children}</sc.Bottom>
    </sc.Header>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};

export default React.memo(Header);
