import styled from 'styled-components';

import { passwordRequirements } from '../../config';

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
  /* display: inline-block; */
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
