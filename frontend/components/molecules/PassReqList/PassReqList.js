import { List, Typography } from 'antd';
import { passwordRequirements } from '../../../config';
import * as sc from './PassReqList.style';

const PassReqList = () => (
  <sc.PassListContainer data-testid='passList'>
    <Typography.Text strong>{passwordRequirements.title}</Typography.Text>

    <List
      split={false}
      dataSource={passwordRequirements.reqs}
      renderItem={item => (
        <sc.PassListItem>
          <Typography.Text>{item}</Typography.Text>
        </sc.PassListItem>
      )}
    />
  </sc.PassListContainer>
);

export default PassReqList;
