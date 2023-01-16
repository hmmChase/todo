import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import displayMessages from '@/constants/displayMessages';
import Status from '@/components/COMMON/Status/Status';

type Keys = Array<keyof typeof displayMessages>;

interface Props {
  error: ApolloError | string;
}

const Error = ({ error }: Props) => {
  const gqlErrMsgs = (error: ApolloError) => {
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

  if (error instanceof ApolloError)
    return (
      <MsgList>
        {error.graphQLErrors.map((err, i) => {
          if (err.extensions.code !== 'BAD_USER_INPUT') return;

          return (
            <MsgItem key={`msg${i}`}>
              <Status status='error'>{gqlErrMsgs(error)}</Status>
            </MsgItem>
          );
        })}
      </MsgList>
    );

  return <Status status='error'>{error}</Status>;
};

export default Error;

const MsgList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MsgItem = styled.li`
  :not(:first-child) {
    margin-top: 10px;
  }
`;
