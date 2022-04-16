import { ApolloError } from '@apollo/client';

import displayMessages from '../constants/displayMessages';

type Keys = Array<keyof typeof displayMessages>;

const errorMessages = (error: ApolloError) => {
  let errMsg = displayMessages.error;

  // Apollo UserInputError w/ displayCode
  if (error.graphQLErrors)
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.displayCode &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
        // Get display code
        const displayCode = graphQLError.extensions.displayCode as string;

        // Split display code into array of keys
        const displayKeyArr = displayCode.split('.') as Keys;

        // Init current object position
        let currObjPos = displayMessages;

        // Loop through object to get correct property
        // Final loop will return correct error message
        displayKeyArr.forEach((key, i) => {
          // If last item in array, return error message
          if (i === displayKeyArr.length - 1)
            errMsg = currObjPos[key] as string;
          // Else update current object to sub-object
          else
            currObjPos = currObjPos[key] as unknown as typeof displayMessages;
        });
      }
    }

  return errMsg;
};

export default errorMessages;
