import styled from 'styled-components';

import displayMsg from '@/constants/displayMsg';

const PassReqList = () => {
  const reqList = displayMsg.user.password.requirements.rules.map((req, i) => (
    <PassListItem key={`req${i}`}>{req}</PassListItem>
  ));

  return (
    <PassListContainer>
      <PassListTitle>
        {displayMsg.user.password.requirements.title}
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
