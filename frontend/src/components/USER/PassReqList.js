import styled from 'styled-components';

import { passwordRequirements } from '../../constants/config';

const PassReqList = () => {
  const reqList = passwordRequirements.reqs.map((req, index) => (
    <PassListItem key={index}>{req}</PassListItem>
  ));

  return (
    <PassListContainer>
      <PassListTitle>{passwordRequirements.title}</PassListTitle>

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
