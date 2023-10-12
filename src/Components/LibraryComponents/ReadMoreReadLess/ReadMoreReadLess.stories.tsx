import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReadMoreReadLess  from './ReadMoreReadLess';
import { IProps } from './ReadMoreReadLess.types';

export default {
  title: 'LibraryComponents/ReadMoreReadLess',
  component: ReadMoreReadLess,
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ReadMoreReadLess {...args} />;

export const Primary = TemplatePrimary.bind({});
Primary.args = {
  charLimit: 150,
  ellipsis: '...',
  readMoreText: 'Read more',
  readLessText: 'Read less',
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo perferendis, nulla, quos voluptas laboriosam rem reprehenderit facilis nam dolorum id aut atque dolorem porro quidem soluta. Veniam nam hic vel iusto laboriosam est ullam optio rem tempora nisi tenetur quasi, voluptates ipsam aut eligendi delectus corrupti voluptatem, mollitia quisquam? Possimus corrupti ipsam perspiciatis optio incidunt reprehenderit minus dicta modi?',
};
