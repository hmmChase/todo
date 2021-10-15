import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import userSvg from '../../images/user.svg';
import Dropdown from '../REUSEABLE/Dropdown';
import HeaderLoggedIn from '../SECTIONS/Header/HeaderLoggedIn';

const IconUser = () => {
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

      <IconUserDefault
        // https://styled-components.com/docs/api#transient-props
        $isdropdownopen={isDropdownOpen}
        src={userSvg}
        alt='User icon'
        onClick={() => setDropdownOpen(true)}
      />
    </Container>
  );
};

export default IconUser;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: ${props =>
    props.isDropdownOpen ? props.theme.colors.backgrounds.dropdown : 'inherit'};
`;

const Dropdownn = styled(Dropdown)`
  background-color: ${props => props.theme.colors.backgrounds.dropdown};
  color: ${props => props.theme.colors.text.secondaryText};
  top: 32px;
  right: 0;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const IconUserDefault = styled(Image).attrs({ height: '33px', width: '33px' })`
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  padding: 2px !important;
  border: 1px solid ${props => props.theme.colors.backgrounds.dropdown} !important;
  background-color: ${props =>
    props.$isdropdownopen
      ? props.theme.colors.backgrounds.dropdown
      : props.theme.colors.text.secondaryText};

  :hover {
    background-color: ${props => props.theme.colors.backgrounds.dropdown};
  }
`;
