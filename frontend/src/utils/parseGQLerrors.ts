import displayMessages from '@/constants/displayMessages';
import type { ApolloError } from '@apollo/client';

type Keys = Array<keyof typeof displayMessages>;

const parseGQLerrors = (ApolloError: ApolloError) => {
  const { graphQLErrors } = ApolloError;

  const messages = [];

  if (graphQLErrors)
    for (const graphQLError of graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.displayCode &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
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

        // // Map displayKeyArr to displayMsg
        // const errMsg = displayKeyArr.reduce(
        //   (property, key) => property[key],
        //   displayMsg
        // );

        msgArr.push(errMsg);
      }

      // If no display code, return error message
      else msgArr.push(graphQLError.message);
    }

  return msgArr;
};

export default parseGQLErrors;
