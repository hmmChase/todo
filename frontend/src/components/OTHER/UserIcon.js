import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import userSvg from '../../images/user.svg';
import Dropdown from '../REUSEABLE/Dropdown';
import HeaderLoggedIn from '../SECTIONS/HEADER/HeaderLoggedIn';

const UserIcon = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Container isDropdownOpen={isDropdownOpen}>
      {isDropdownOpen && (
        <Dropdownn
          isDropdownOpen={isDropdownOpen}
          close={() => setDropdownOpen(false)}
        >
          <HeaderLoggedIn />
        </Dropdownn>
      )}

      <IconUser
        // https://styled-components.com/docs/api#transient-props
        $isdropdownopen={isDropdownOpen}
        src={userSvg}
        alt='User icon'
        onClick={() => setDropdownOpen(true)}
      />
    </Container>
  );
};

export default UserIcon;

const Container = styled.div`
  background-color: ${props =>
    props.isDropdownOpen ? props.theme.background.quinary : 'inherit'};
  border-top-left-radius: ${props => props.theme.borderRadius.round};
  border-top-right-radius: ${props => props.theme.borderRadius.round};
  display: flex;
  position: relative;
`;

const Dropdownn = styled(Dropdown)`
  background-color: ${props => props.theme.background.quinary};
  border-top-left-radius: ${props => props.theme.borderRadius.primary};
  border-bottom-left-radius: ${props => props.theme.borderRadius.primary};
  border-bottom-right-radius: ${props => props.theme.borderRadius.primary};
  color: ${props => props.theme.text.secondary};
  right: 0;
  top: 33px; /* UserIcon height */
`;

const IconUser = styled(Image).attrs({ height: '33px', width: '33px' })`
  background-color: ${props =>
    props.$isdropdownopen
      ? props.theme.background.quinary
      : props.theme.background.primary};
  border-top-left-radius: ${props => props.theme.borderRadius.round};
  border-top-right-radius: ${props => props.theme.borderRadius.round};
  border-bottom-left-radius: ${props => props.theme.borderRadius.primary};
  border-bottom-right-radius: ${props => props.theme.borderRadius.primary};
  cursor: pointer;
  padding: 2px !important;

  &:hover {
    background-color: ${props => props.theme.background.quinary};
  }
`;
