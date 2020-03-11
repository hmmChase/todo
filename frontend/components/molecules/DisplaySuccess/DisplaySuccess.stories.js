import DisplaySuccess from './DisplaySuccess';

export default { title: 'Molecules', component: DisplaySuccess };

const data = {
  message: 'this is a message',
  type: 'success'
};

export const displaySuccess = () => <DisplaySuccess {...data} />;
