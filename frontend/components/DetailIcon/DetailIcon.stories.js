import React from 'react';
import allCombos from '../../.storybook/allCombos';
import DetailIcon from './DetailIcon';

export default { title: 'DetailIcon', component: DetailIcon };

const props = {
  id: ['1']
};

export const all = () => allCombos(DetailIcon, props);
