import type { ApolloError } from '@apollo/client';

import displayMsg from '@/constants/displayMsg';

type Keys = Array<keyof typeof displayMsg>;

const parseGQLErrors = (GQLErrors: ApolloError) => {
  const { clientErrors, graphQLErrors, networkError } = GQLErrors;

  const msgArr = [];

  if (clientErrors.length) msgArr.push(displayMsg.error);

  if (networkError) msgArr.push(displayMsg.error);

  if (graphQLErrors.length)
    for (const graphQLError of graphQLErrors) {
      if (graphQLError.extensions && graphQLError.extensions.displayCode) {
        // Get display code
        const displayCode = graphQLError.extensions.displayCode as string;

        // Split display code into array of keys
        const displayKeyArr = displayCode.split('.') as Keys;

        // Default error message
        let errMsg = displayMsg.error;

        // Init current object position
        let index = displayMsg;

        // Loop through object to get correct property
        // Final loop will return correct error message
        displayKeyArr.forEach((key, i) => {
          // If last item in array, return error message
          if (i === displayKeyArr.length - 1) errMsg = index[key] as string;
          // Else update current object to sub-object
          else index = index[key] as unknown as typeof displayMsg;
        });

        msgArr.push(errMsg);
      }

      // If no display code, return error message
      else msgArr.push(displayMsg.error);
    }

  return msgArr;
};

export default parseGQLErrors;
