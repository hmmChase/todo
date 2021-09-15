import IdeaCard from './IdeaCard';

const Ideas = props => {
  const { ideas } = props;

  const ideaCards = ideas.map(idea => (
    //? onClick={() => Router.push('/idea/[id]', `/idea/${idea.id}`)}

    <li key={idea.id}>
      <IdeaCard id={idea.id} content={idea.content} />
    </li>
  ));

  return <ul>{ideaCards}</ul>;
};

export default Ideas;
