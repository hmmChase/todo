import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import DisplayLoading from '../../molecules/DisplayLoading/DisplayLoading';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import IdeaInput from '../../molecules/IdeaInput/IdeaInput';
// import DeleteIcon from '../DeleteIcon/DeleteIcon';
import { CURRENT_USER_IDEA } from '../../../graphql/queries';
import * as sc from './IdeaDetail.style';

const IdeaDetail = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_IDEA, {
    variables: { id: props.ideaId },
    onError(_error) {},
  });

  return (
    <sc.IdeaDetail>
      <sc.BackButton />

      {loading ? (
        <DisplayLoading />
      ) : error ? (
        <DisplayError error={error} />
      ) : (
        <>
          <IdeaInput
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

export default IdeaDetail;
