import Link from 'next/link';
import styled, { css } from 'styled-components';

const HeaderLoggedOut = () => {
  return (
    <Container>
      <Link href='/login'>
        <ALogIn>Log in</ALogIn>
      </Link>

      <Link href='/signup'>
        <ASignUp>Sign up</ASignUp>
      </Link>
    </Container>
  );
};

export default HeaderLoggedOut;

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  @media screen and (min-width: ${props =>
      props.theme.widths.regularPageWidth}px) {
    margin-right: 0;
  }
`;

const linkStyles = css`
  border-radius: 4px;
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const ALogIn = styled.a`
  ${linkStyles}

  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text.primaryText};
  margin-right: 1rem;
`;

const ASignUp = styled.a`
  ${linkStyles}

  background-color: ${props => props.theme.colors.buttons.actionButton};
  color: ${props => props.theme.colors.text.secondaryText};
`;
