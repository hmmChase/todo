import Link from 'next/link';
import styled from 'styled-components';

const HeaderLoggedOut = props => {
  return (
    <UL>
      <LI>
        <Link href='/login'>
          <A>Log in</A>
        </Link>
      </LI>

      <LI>
        <Link href='/signup'>
          <A>Sign up</A>
        </Link>
      </LI>
    </UL>
  );
};

export default HeaderLoggedOut;

/** styled components */

const UL = styled.ul`
  list-style: none;
`;

const LI = styled.ul`
  display: inline;
`;

const A = styled.a`
  background-color: ${props => props.theme.colors.buttons.actionButton};
  border-radius: 4px;
  /* border: none; */
  color: ${props => props.theme.colors.buttons.text};
  padding: 0.6rem 1rem;
  cursor: pointer;
`;
