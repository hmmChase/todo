import IdeaItem from './IdeaItem';

export default { component: IdeaItem, title: 'IDEA/IdeaItem' };

export const ideaItem = () => (
  <IdeaItem ideaId={'1'} content={'mock idea'} authorId={'1'} />
);
