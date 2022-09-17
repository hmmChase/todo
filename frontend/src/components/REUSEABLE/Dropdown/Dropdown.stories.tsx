import { createRef } from 'react';

import Dropdown from './Dropdown';

const story = { component: Dropdown, title: 'REUSEABLE/Dropdown' };

export const dropdown = () => (
  <Dropdown
    close={function (): void {
      throw new Error('Function not implemented.');
    }}
    insideRef={createRef()}
  >
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
  </Dropdown>
);

export default story;
