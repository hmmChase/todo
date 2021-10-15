import displayMessages from './displayMessages';

const graphQLErrors = error => {
  if (error.graphQLErrors)
    for (const graphQLError of error.graphQLErrors)
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT' // UserInputError
      )
        graphQLError.message;

  const splitErrorArr = error.message.split('.');

  let errorMessageObj = displayMessages;

  for (let i = 0; i < splitErrorArr.length; i++)
    errorMessageObj = errorMessageObj[splitErrorArr[i]];

  return errorMessageObj;
};

export default graphQLErrors;
