import { title } from '../../../config';
import * as sc from './SignOn.style';

const SignOn = () => (
  <sc.SignOn>
    <sc.Header>
      <sc.Img src='images/ideabox.png' alt='ideabox' />

      <sc.Title>{title}</sc.Title>
    </sc.Header>

    <sc.Content>
      <sc.SignInn />

      <sc.HR />

      <sc.SignUpp />
    </sc.Content>
  </sc.SignOn>
);

export default SignOn;
