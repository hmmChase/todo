import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { CURRENT_USER_IDEA } from '../graphql/queries';
import BackBtn from './BackBtn';
import IdeaCardInput from './IdeaCardInput';
// import DeleteBtn from './DeleteBtn';

const IdeaDetail = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_IDEA, {
    variables: { id: props.ideaId },

    onError(_error) {},
  });

  return (
    <>
      <BackBtn path='/' />

      {loading && <p>loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && data && data.currentUserIdea && (
        <>
          <IdeaCardInput
            id={data.currentUserIdea.id}
            content={data.currentUserIdea.content}
          />

          {/* <DeleteIcon id={data.currentUserIdea.id} /> */}
        </>
      )}
    </>
  );
};

IdeaDetail.propTypes = {
  ideaId: PropTypes.string.isRequired,
};

export default React.memo(IdeaDetail);
