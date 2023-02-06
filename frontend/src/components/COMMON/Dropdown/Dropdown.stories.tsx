import { createRef, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'COMMON/Dropdown',

  component: Dropdown,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    children: <p>Item</p>,
    close: () => {},
    insideRef: createRef()
  }
};

// export const Default: Story = {
//   render: args => (
//     <Dropdown {...args}>
//       <div>
//         <p>Item</p>
//       </div>
//     </Dropdown>
//   ),

//   args: {
//     close: function (): void {
//       throw new Error('Function not implemented.');
//     },
//     insideRef: createRef<HTMLDivElement>(),
//     children: 'Dropdown'
//   }
// };

// export const Default = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const insideRef = useRef<HTMLDivElement>(null);

//   return (
//     <div ref={insideRef}>
//       {isDropdownOpen && (
//         <Dropdown close={() => setDropdownOpen(false)} insideRef={insideRef}>
//           <div>
//             <p>Item</p>
//           </div>
//         </Dropdown>
//       )}

//       <div onClick={() => setDropdownOpen(!isDropdownOpen)}>
//         <button>Menu</button>
//       </div>
//     </div>
//   );
// };
