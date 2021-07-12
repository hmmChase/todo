import { passwordRequirements } from '../../../config';
import * as sc from './PassReqList.style';

const PassReqList = () => {
  const passReqList = passwordRequirements =>
    passwordRequirements.map(passReq => (
      <sc.PassListItem>
        <p>{passReq}</p>
      </sc.PassListItem>
    ));

  return (
    <sc.PassListContainer data-testid='passList'>
      <p strong>{passwordRequirements.title}</p>

      <ul>{passReqList(passwordRequirements.reqs)}</ul>
    </sc.PassListContainer>
  );
};

export default PassReqList;
