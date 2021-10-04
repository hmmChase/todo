import IdeaCard from './IdeaCard';

export default { component: IdeaCard, title: 'IDEA/IdeaCard' };

export const ideaCard = () => (
  <IdeaCard ideaId={'1'} content={'mock idea'} authorId={'1'} />
);
