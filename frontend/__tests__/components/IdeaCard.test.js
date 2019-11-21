import { mount } from 'enzyme';
import { ApolloConsumer } from '@apollo/react-components';
import { MockedProvider } from '@apollo/react-testing';

import { load } from '../../utils/testing';
import IdeaCard from '../../components/IdeaCard/IdeaCard';
import {
  MOCK_CURRENT_USER,
  MOCK_UPDATE_IDEA,
  MOCK_DELETE_IDEA
} from '../../__mocks__/queries';
import { CURRENT_USER } from '../../graphql/queries';
import * as mock from '../../__mocks__/mocks';

describe('IdeaCard', () => {
  let mockProps;
  let mockQueries;
  let apolloClient;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { id: '1', content: 'mock idea 1 content' };
    mockQueries = [
      MOCK_UPDATE_IDEA,
      MOCK_DELETE_IDEA,
      MOCK_CURRENT_USER
    ];

    wrapper = mount(
      // <MockedProvider mocks={mockQueries} addTypename={false}>
      //   <IdeaCard {...mockProps} />
      // </MockedProvider>,
      <ApolloConsumer>
        {client => {
          apolloClient = client;
          return <IdeaCard {...mockProps} />;
        }}
      </ApolloConsumer>,
      {
        disableLifecycleMethods: true,
        wrappingComponent: MockedProvider,
        wrappingComponentProps: { mocks: mockQueries, addTypename: false }
      }
    );
  });

  it('matches snapshot', () => {
    // expect(
    //   wrapper
    //     .find('Mutation')
    //     .at(0)
    //     .renderProp('children')()
    // ).toMatchSnapshot();

    // expect(
    //   wrapper
    //     .find('Mutation')
    //     .at(1)
    //     .renderProp('children')()
    // ).toMatchSnapshot();

    expect(wrapper).toMatchSnapshot();
  });

  fit('matches snapshot - update idea - loading', async () => {
    console.log(wrapper.debug());

    // const handleClickDeleteBtn = (wrapper.find('IdeaCard').instance().handleClickDeleteBtn() = jest.fn());

    // const userIdeas1 = await apolloClient.query({ query: CURRENT_USER });
    // console.log(': userIdeas1', userIdeas1.data.getUserIdeas);

    const ideaInput1 = wrapper.find('IdeaCardstyle__deleteBtn');
    // console.log(': ideaInput1', ideaInput1.debug());

    // await load(wrapper);

    // console.log(ideaInput1.props());

    ideaInput1.prop('onClick')({ target: { disabled: false } });

    console.log(wrapper.debug());

    // expect(
    //   wrapper.find('IdeaCard').instance().handleClickDeleteBtn
    // ).toHaveBeenCalledTimes(1);

    // await load(wrapper);

    // console.log(wrapper.find('IdeaCard').instance().state);

    // console.log(apolloClient.readQuery({ query: CURRENT_USER }));

    // const userIdeas2 = await apolloClient.query({ query: CURRENT_USER });
    // console.log(': userIdeas2', userIdeas2);

    // const ideaInput2 = wrapper.find('input');
    // console.log(': ideaInput2', ideaInput2.debug());

    // // wrapper.update();

    // console.log(wrapper.debug());
  });
});
