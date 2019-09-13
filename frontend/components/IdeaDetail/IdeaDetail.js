import PropTypes from 'prop-types';
import Link from 'next/link';
import { Query } from 'react-apollo';

import DisplayLoading from '../DisplayLoading/DisplayLoading';
import DisplayError from '../DisplayError/DisplayError';

import {
  CURRENT_USER_IDEA,
  UPDATE_IDEA_MUTATION,
  DELETE_IDEA_MUTATION
} from '../../graphql/queries';

import * as sc from './IdeaDetail.style';

const IdeaDetail = React.memo(props => {
  const handleError = error => error;

  return (
    <Query
      query={CURRENT_USER_IDEA}
      variables={{ id: props.ideaId }}
      onError={handleError}
    >
      {({ loading, error, data }) => {
        if (loading) return <DisplayLoading />;
        if (error) return <DisplayError error={error} />;

        return (
          <sc.IdeaDetail>
            <Link href={{ pathname: '/' }}>
              <sc.BackBtn>{'<- Back'}</sc.BackBtn>
            </Link>

            <p>{data.currentUserIdea.content}</p>
          </sc.IdeaDetail>
        );
      }}
    </Query>
  );
});

IdeaDetail.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default IdeaDetail;
