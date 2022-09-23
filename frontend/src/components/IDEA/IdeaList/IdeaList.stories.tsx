import { ideas } from '@/models/__mocks__/idea';
import IdeaList from './IdeaList';

const story = { component: IdeaList, title: 'IDEA/IdeaList' };

export const ideaList = () => <IdeaList ideas={ideas} />;

export default story;
