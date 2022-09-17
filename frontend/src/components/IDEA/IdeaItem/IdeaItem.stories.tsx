import IdeaItem from './IdeaItem';

const story = { component: IdeaItem, title: 'IDEA/IdeaItem' };

export const ideaItem = () => (
  <IdeaItem authorId={'authorId'} content={'content'} ideaId={'ideaId'} />
);

export default story;
