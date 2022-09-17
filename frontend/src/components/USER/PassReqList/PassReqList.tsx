import { FC } from 'react';
import styled from 'styled-components';

import displayMessages from '@/constants/displayMessages';

const PassReqList: FC = () => {
  const reqList = displayMessages.user.password.requirements.rules.map(
    (req, i) => <PassListItem key={`req${i}`}>{req}</PassListItem>
  );

  return (
    <PassListContainer>
      <PassListTitle>
        {displayMessages.user.password.requirements.title}
      </PassListTitle>

      <PassListList>{reqList}</PassListList>
    </PassListContainer>
  );
};

export default PassReqList;

const PassListContainer = styled.div`
  margin-bottom: 0.5rem;
`;

const PassListTitle = styled.p`
  margin: 0;
`;

const PassListList = styled.ul`
  margin: 0;
`;

const PassListItem = styled.li`
  /* padding: 0; */
`;
