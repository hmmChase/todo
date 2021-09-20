import Link from 'next/link';
import styled from 'styled-components';

import Button from '../REUSEABLE/Button';
import Left from '../DESIGN/icons/Left/Left';

const BackButton = () => (
  <Link href='/'>
    <div>
      <Buttonn aria-label='back'>
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
  padding-left: 6px;
`;

const Leftt = styled(Left)`
  fill: #fff;
  height: 1rem;
  margin-right: 8px;
`;
