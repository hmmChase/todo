import DisplaySuccess from './DisplaySuccess';

export default { title: 'Components|Molecules', component: DisplaySuccess };

const data = {
  message: 'this is a message',
  type: 'success'
};

export const displaySuccess = () => <DisplaySuccess {...data} />;
