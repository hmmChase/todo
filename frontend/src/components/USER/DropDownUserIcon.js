import styled from 'styled-components';
// import PropTypes from 'prop-types';

import Dropdown from '../REUSEABLE/Dropdown';
import HeaderLoggedIn from '../SECTIONS/Header/HeaderLoggedIn';

const DropdownUserIcon = props => {
  const { className, isDropdownOpen, close } = props;

  return (
    <Dropdownn
      className={className}
      isDropdownOpen={isDropdownOpen}
      close={close}
    >
      <HeaderLoggedIn />
    </Dropdownn>
  );
};

// DropdownUserIcon.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default DropdownUserIcon;

export const Dropdownn = styled(Dropdown)`
  /* background-color: ${props =>
    props.isDropdownOpen ? props.theme.colors.backgrounds.features : 'inherit'};
  color: ${props =>
    props.isDropdownOpen
      ? props.theme.colors.text.secondaryText
      : 'inherit'}; */

  top: 35px;
  right: 0;
  width: 89px;
`;
