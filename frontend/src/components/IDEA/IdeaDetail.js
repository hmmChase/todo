import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { CURRENT_USER_IDEA } from '../../../graphql/queries';
import DisplayLoading from '../../molecules/DisplayLoading/DisplayLoading';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import IdeaCardInput from '../../molecules/IdeaCardInput/IdeaCardInput';
// import DeleteIcon from '../DeleteIcon/DeleteIcon';

const IdeaDetail = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_IDEA, {
    variables: { id: props.ideaId },

    onError(_error) {}
  });

  return (
    <IdeaDetaill>
      {loading && <DisplayLoading />}

      {error && <DisplayError error={error} />}

      {!loading && !error && data && data.currentUserIdea && (
        <>
          <IdeaCardInput
            id={data.currentUserIdea.id}
            content={data.currentUserIdea.content}
          />

          {/* <DeleteIcon id={data.currentUserIdea.id} /> */}
        </>
      )}
    </IdeaDetaill>
  );
};

IdeaDetail.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default IdeaDetail;

const IdeaDetaill = styled.section`
  margin-bottom: 2rem;
`;
