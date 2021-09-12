import AddIdea from './AddIdea';
import IdeaList from './IdeaList';

const Ideas = props => {
  const { ideas } = props;

  return (
    <>
      <AddIdea />

      <IdeaList ideas={ideas} />
    </>
  );
};

export default Ideas;
