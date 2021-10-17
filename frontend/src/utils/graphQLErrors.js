import displayMessages from './displayMessages';

const graphQLErrors = error => {
  let dispayMessage = '';

  if (error.graphQLErrors)
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT' // UserInputError
      ) {
        // Split error into array of keys
        const splitErrorArr = error.message.split('.');

        // Current object section
        let displayMessagesObj = displayMessages;

        // Path through keys to the correct object section
        // Final loop will return error message
        for (let i = 0; i < splitErrorArr.length; i++) {
          displayMessagesObj = displayMessagesObj[splitErrorArr[i]];

          dispayMessage = displayMessagesObj;
        }
      }
    }

  return dispayMessage;
};

export default graphQLErrors;
