import Link from 'next/link';
import styled from 'styled-components';

import Button from '../REUSEABLE/Button';
import Left from '../DESIGN/icons/Left';

const BackButton = () => (
  <Link href='/'>
    <div>
      <Buttonn aria-label='back' type='text'>
        <Leftt />
        Back
      </Buttonn>
    </div>
  </Link>
);

export default BackButton;

const Buttonn = styled(Button)`
  align-items: center;
  display: flex;
  margin: 1rem 0 0 1rem;
  padding-left: 6px;
`;

const Leftt = styled(Left)`
  fill: ${props => props.theme.fill.primary};
  height: 1rem;
  margin-right: 8px;
`;
