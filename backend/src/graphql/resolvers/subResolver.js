const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const subResolver = {
  Query: {
    currentNumber() {
      return currentNumber;
    }
  },

  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED'])
    }
  }
};

export default subResolver;

// let currentNumber = 0;

// const incrementNumber = () => {
//   currentNumber++;

//   pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });

//   setTimeout(incrementNumber, 1000);
// };

// incrementNumber();
