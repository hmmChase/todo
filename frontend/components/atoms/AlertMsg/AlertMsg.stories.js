import allCombos from '../../../.storybook/allCombos';
import Alert from './AlertMsg';

export default { title: 'Alert', component: Alert };

const data = {
  message: 'mock message',
  type: ['success', 'info', 'warning', 'error']
};

export const all = () => allCombos(Alert, data);
