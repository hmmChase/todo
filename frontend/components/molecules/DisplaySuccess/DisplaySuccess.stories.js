import DisplaySuccess from './DisplaySuccess';

export default { title: 'Molecules', component: DisplaySuccess };

const data = {
  message: 'this is a message'
};

export const displaySuccess = () => <DisplaySuccess {...data} />;
