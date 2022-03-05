import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

import Button from '../REUSEABLE/Button';
import Left from '../DESIGN/icons/Left';

const BackButton = props => {
  const { className } = props;

  return (
    <Link href='/'>
      <div className={className}>
        <Buttonn aria-label='back' type='text'>
          <Leftt />
          Back
        </Buttonn>
      </div>
    </Link>
  );
};

BackButton.propTypes = {
  className: PropTypes.string
};

export default BackButton;

const Buttonn = styled(Button)`
  align-items: center;
  display: flex;
  gap: 0.25rem;
  padding-left: 0.5rem;
`;

const Leftt = styled(Left)`
  fill: ${props => props.theme.fill.primary};
  height: 0.8rem;
`;
