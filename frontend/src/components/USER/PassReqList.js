import styled from 'styled-components';

import { passwordRequirements } from '../../config';

const PassReqList = () => {
  const reqList = passwordRequirements.reqs.map((req, index) => (
    <PassListItem key={index}>{req}</PassListItem>
  ));

  return (
    <PassListContainer>
      <p>{passwordRequirements.title}</p>

      <ul>{reqList}</ul>
    </PassListContainer>
  );
};

export default PassReqList;

const PassListContainer = styled.div`
  /* display: inline-block; */
`;

const PassListItem = styled.li`
  /* padding: 0; */
`;
