import DisplayError from './DisplayError';

export default { title: 'Molecules/Display Error', component: DisplayError };

const data1 = { error: { message: 'this is a message' } };

export const error = () => <DisplayError {...data1} />;

const data2 = {
  error: {
    graphQLErrors: [
      { message: 'this is 1 message' },
      { message: 'this is 2 message' }
    ]
  }
};

export const graphQLErrors = () => <DisplayError {...data2} />;
