import { Meta, Story } from '@storybook/react';
import React from 'react';
import MUIDrawer  from './MUIDrawer';
import { IProps } from './MUIDrawer.types';
export default {
  title: 'LibraryComponents/MUIDrawer',
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
    viewport: {
      viewports: {
        Iphone12: {
          name: 'IPhone 12',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        ipadPro: {
          name: 'Ipad Pro',
          styles: {
            width: '1024px',
            height: '1366px',
          },
        },
        laptop: {
          name: 'Laptop 1080p',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        laptop1: {
          name: 'Laptop 2K',
          styles: {
            width: '2560px',
            height: '1440px',
          },
        },
        laptop2: {
          name: 'Laptop 2K',
          styles: {
            width: '3840px',
            height: '2160px',
          },
        },
      },
    },
  },
  component: MUIDrawer,
} as Meta;

const Template: Story<IProps> = (args) => <MUIDrawer {...args} />;
export const Primary = Template.bind({
  open: true,
  anchor: 'bottom',
  children: <>Hi</>,
  disableCross: true,
});
