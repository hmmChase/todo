import allCombos from '../../../.storybook/allCombos';
import AlertMsg from './AlertMsg';

export default { title: 'Atoms', component: AlertMsg };

const data = {
  message: 'mock message',
  type: ['success', 'info', 'warning', 'error']
};

export const alertMsg = () => allCombos(AlertMsg, data);
