import { ApolloError } from '@apollo/client';

import displayMessages from '../constants/displayMessages';

type Keys = Array<keyof typeof displayMessages>;

const gqlErrMsgMap = (error: ApolloError) => {
  let dispayMessage = '';

  for (const graphQLError of error.graphQLErrors) {
    if (
      // UserInputError w/ displayCode
      graphQLError.extensions &&
      graphQLError.extensions.displayCode &&
      graphQLError.extensions.code === 'BAD_USER_INPUT'
    ) {
      const displayCode = graphQLError.extensions.displayCode as string;

      // Split display code into array of keys
      const displayKeyArr = displayCode.split('.') as Keys;

      // Init current object position
      let currObjPos = displayMessages;

      // Map through object to get correct property
      // Final loop will return correct error message
      displayKeyArr.forEach((key, i) => {
        // If last item in array, return error message
        if (i === displayKeyArr.length - 1) {
          dispayMessage = currObjPos[key] as string;
        } else {
          // Update current object to sub-object
          currObjPos = currObjPos[key] as unknown as typeof displayMessages;
        }
      });
    }
  }

  return dispayMessage;
};

export default gqlErrMsgMap;
