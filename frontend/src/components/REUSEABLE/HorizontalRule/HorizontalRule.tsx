import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const HorizontalRule: FC<Props> = ({ className }) => (
  <HR className={className} />
);

export default HorizontalRule;

export const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 0.2rem;
  margin: 0;
  width: 100%;
`;
