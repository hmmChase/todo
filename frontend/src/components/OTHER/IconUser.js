import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import DropDownUserIcon from '../USER/DropDownUserIcon';

import userSvg from '../../public/images/user.svg';

const IconUser = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Container isDropdownOpen={isDropdownOpen}>
      {isDropdownOpen && (
        <DropDownUserIcon
          isDropdownOpen={isDropdownOpen}
          close={() => setDropdownOpen(false)}
        />
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
  /* border-top-left-radius: 50%; */
  /* border-top-right-radius: 50%; */
  height: 2rem;
  width: 2rem;
  padding: 2px;
  cursor: pointer;
  position: relative;
`;

const IconUserDefault = styled(Image)`
  background-color: ${props => props.theme.colors.text.secondaryText};
  border: 2px solid ${props => props.theme.colors.text.secondaryText};
  fill: ${props => props.theme.colors.backgrounds.widgetsHeader};
  border-radius: 50%;

  :hover {
    background-color: ${props => props.theme.colors.text.primaryText};
  }
`;
