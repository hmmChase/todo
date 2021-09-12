import Link from 'next/link';

import EditIdea from './EditIdea';
import RemoveIdea from './RemoveIdea';

const IdeaList = props => {
  const { ideas } = props;

  const ideaLinks = ideas.map(idea => (
    //? onClick={() => Router.push('/idea/[id]', `/idea/${idea.id}`)}

    <li key={idea.id}>
      <Link href={`/idea/${idea.id}`}>
        <a>{idea.content}</a>
      </Link>

      <EditIdea ideaId={idea.id} />

      <RemoveIdea ideaId={idea.id} />
    </li>
  ));

  return <ul>{ideaLinks}</ul>;
};

export default IdeaList;
