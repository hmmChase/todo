import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { CURRENT_USER_IDEA } from '../../../graphql/queries';
import DisplayLoading from '../../molecules/DisplayLoading/DisplayLoading';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import IdeaCardInput from '../../molecules/IdeaCardInput/IdeaCardInput';
// import DeleteIcon from '../DeleteIcon/DeleteIcon';
import * as sc from './IdeaDetail.style';

const IdeaDetail = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_IDEA, {
    variables: { id: props.ideaId },

    onError(_error) {},
  });

  return (
    <sc.IdeaDetail>
      <sc.BackBtnn path='/' />

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
    </sc.IdeaDetail>
  );
};

IdeaDetail.propTypes = {
  ideaId: PropTypes.string.isRequired,
};

export default React.memo(IdeaDetail);
