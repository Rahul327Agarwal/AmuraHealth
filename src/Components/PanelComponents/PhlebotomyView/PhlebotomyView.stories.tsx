import React from 'react';
import { Story, Meta } from '@storybook/react';
import PhlebotomyView from './PhlebotomyView';
import { store } from './../../../DisplayFramework/State/store';
import { Provider } from 'react-redux';
export default {
  title: 'PanelComponents/PhlebotomyView/PhlebotomyView',
  component: PhlebotomyView,
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
const TemplatePrimary: Story<any> = (args) => (
  <Provider store={store}>
    {' '}
    <PhlebotomyView {...args} />{' '}
  </Provider>
);
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  urlImg: 'https://image.shutterstock.com/image-photo/thailand-ko-samui-panorama-twilight-260nw-232653724.jpg',
  bioData: {
    lipid: ['HDL', 'LDL', 'SDL', 'MDL'],
    lipid2: ['HDL', 'LDL', 'SDL', 'MDL'],
    lipd3: ['HDL', 'LDL', 'SDL', 'MDL'],
  },
  titleName: 'Test Pacakage',
  price: 1000,
  message:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi excepturi est voluptatem pariatur possimus delectus quaerat veniam consequuntur dolores saepe autem adipisci dicta enim harum maxime, similique placeat. Soluta, ratione',
  submessage: 'this is available in india',
};
