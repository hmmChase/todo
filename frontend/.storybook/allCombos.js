import React from 'react';
// import { object } from '@storybook/addon-knobs';

const getCombinations = (data, currIndex = 0, combos = [], combo = {}) => {
  const propNames = Object.keys(data);
  const currProp = propNames[currIndex];
  const currPropValues = data[currProp];

  if (Array.isArray(currPropValues)) {
    // loop over values of current prop
    currPropValues.forEach(value => {
      // update the combo object
      // create/update prop key with current value
      combo[currProp] = value;

      // if next index is less than the number of props
      if (currIndex + 1 < propNames.length) {
        // rerun function on the next prop
        getCombinations(data, currIndex + 1, combos, combo);

        // if no more props
      } else {
        // clone current prop combination
        const clone = Object.assign({}, combo);

        // push prop combo object to combos array
        combos.push(clone);

        // go on to the next prop value
      }
    });
  } else {
    // update the combo object
    // create/update prop key with current value
    combo[currProp] = currPropValues;

    // if next index is less than the number of props
    if (currIndex + 1 < propNames.length) {
      // rerun function on the next prop
      getCombinations(data, currIndex + 1, combos, combo);

      // if no more props
    } else {
      // clone current prop combination
      const clone = Object.assign({}, combo);

      // push prop combo object to combos array
      combos.push(clone);

      // go on to the next prop value
    }
  }

  return combos;
};

export default (baseComp, data = [], actions = {}) => {
  if (!data || (data && !Object.keys(data).length)) {
    // object('key 1', {});

    const propComp = React.createElement(baseComp, { ...actions });

    // object(data, propComp.props);

    return <div style={{ margin: '1rem' }}>{propComp}</div>;
  }

  const combos = getCombinations(data);
  let key = 1;

  return combos.map(combo => {
    const propComp = React.createElement(baseComp, { ...combo, ...actions });

    // object(`key ${key} data`, propComp.props);

    return (
      <div key={key++} style={{ margin: '1rem' }}>
        {propComp}
      </div>
    );
  });
};
