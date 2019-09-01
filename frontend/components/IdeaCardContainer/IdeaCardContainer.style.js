import styled from 'styled-components';

import { greenLinkBtn } from '../Styled/button.style';

export const IdeaContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const ul = styled.ul`
  padding: 0;
`;

export const loadMoreBtn = styled(greenLinkBtn)`
  align-self: center;
  appearance: none;
  background-color: ${props => props.theme.color.green};

  &:hover {
    border-color: ${props => props.theme.color.black};
  }
`;
