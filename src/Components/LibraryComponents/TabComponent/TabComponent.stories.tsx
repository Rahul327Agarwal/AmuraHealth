import React from 'react';
import { Story, Meta } from '@storybook/react';
import TabComponent  from './TabComponent';
import { IProp } from './TabComponent.types';

export default {
  title: 'LibraryComponents/TabComponent',
  component: TabComponent,
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const TemplatePrimary: Story<IProp> = (args) => <TabComponent {...args} />;
export const Primary = TemplatePrimary.bind({});
// Primary.args = () => {
//   return (
//     <TabComponent>
//       <div title="Demo 1">
//         See ya later, <em>Alligator</em>!
//       </div>
//       <div title="Demo 2">
//         Nothing to see here, this tab is <em>extinct</em>!
//       </div>
//     </TabComponent>
//   )
// };
