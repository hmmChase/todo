import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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
        src={userSvg}
        alt='Picture of the author'
        onClick={() => setDropdownOpen(true)}
      />
    </Container>
  );
};

export default IconUser;

const Container = styled.div`
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  height: 2rem;
  width: 2rem;
  padding: 2px;
  cursor: pointer;
  position: relative;

  background-color: ${props =>
    props.isDropdownOpen ? props.theme.colors.backgrounds.dropdown : 'inherit'};
`;

const Dropdownn = styled(Dropdown)`
  background-color: ${props => props.theme.colors.backgrounds.dropdown};

  color: ${props => props.theme.colors.text.secondaryText};

  top: 35px;
  right: 0;
  width: 90px;
`;

const IconUserDefault = styled(Image)`
  border: 2px solid ${props => props.theme.colors.text.secondaryText};
  fill: ${props => props.theme.colors.backgrounds.widgetsHeader};
  border-radius: 50%;

  background-color: ${props =>
    props.isDropdownOpen
      ? props.theme.colors.backgrounds.dropdown
      : props.theme.colors.text.secondaryText};

  :hover {
    background-color: ${props => props.theme.colors.backgrounds.dropdown};
  }
`;
