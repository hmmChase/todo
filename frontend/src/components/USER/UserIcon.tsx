import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Dropdown from '@/components/REUSEABLE/Dropdown';
import HeaderLoggedIn from '@/components/SECTIONS/HEADER/HeaderLoggedIn';
import userSvg from '@/public/images/user.svg';

const UserIcon: FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Create a ref that we add to the element for which we want to detect outside clicks
  const insideRef = useRef<HTMLDivElement>(null);

  return (
    <Container $isDropdownOpen={isDropdownOpen} ref={insideRef}>
      {isDropdownOpen && (
        <Dropdownn close={() => setDropdownOpen(false)} insideRef={insideRef}>
          <HeaderLoggedIn />
        </Dropdownn>
      )}

      <IconUser
        // https://styled-components.com/docs/api#transient-props
        $isDropdownOpen={isDropdownOpen}
        alt='User icon'
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        src={userSvg}
      />
    </Container>
  );
};

export default UserIcon;

interface scProps {
  $isDropdownOpen: boolean;
}

const Container = styled.div<scProps>`
  background-color: ${props =>
    props.$isDropdownOpen ? props.theme.background.quinary : 'inherit'};
  border-top-left-radius: ${props => props.theme.borderRadius.round};
  border-top-right-radius: ${props => props.theme.borderRadius.round};
  display: flex;
  position: relative;
`;

const Dropdownn = styled(Dropdown)`
  background-color: ${props => props.theme.background.quinary};
  border-bottom-left-radius: ${props => props.theme.borderRadius.primary};
  border-bottom-right-radius: ${props => props.theme.borderRadius.primary};
  border-top-left-radius: ${props => props.theme.borderRadius.primary};
  color: ${props => props.theme.text.secondary};
  right: 0;
  top: 33px; /* UserIcon height */
`;

const IconUser = styled(Image).attrs({
  height: '33px',
  width: '33px'
})<scProps>`
  background-color: ${props =>
    props.$isDropdownOpen
      ? props.theme.background.quinary
      : props.theme.background.primary};
  border-bottom-left-radius: ${props => props.theme.borderRadius.primary};
  border-bottom-right-radius: ${props => props.theme.borderRadius.primary};
  border-top-left-radius: ${props => props.theme.borderRadius.round};
  border-top-right-radius: ${props => props.theme.borderRadius.round};
  cursor: pointer;
  padding: 2px !important;

  &:hover {
    background-color: ${props => props.theme.background.quinary};
  }
`;
