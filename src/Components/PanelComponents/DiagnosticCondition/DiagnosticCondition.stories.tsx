import { ComponentMeta, ComponentStory } from '@storybook/react';
import DiagnosticCondition from './DiagnosticCondition';
import React from 'react';

export default {
  title: 'PanelComponents/DiagnosticCondition/DiagnosticCondition',
  component: DiagnosticCondition,
  argTypes: { backgroundColor: { control: 'color' } },
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
} as ComponentMeta<typeof DiagnosticCondition>;

const Template: ComponentStory<typeof DiagnosticCondition> = (args) => <DiagnosticCondition {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  childEventTrigger: () => {},
  injectComponent: null,
  patientId: '',
  registerEvent: () => {},
  unRegisterEvent: () => {},
  selectedClient: {},
  sessions: {},
  selectedTenant: {},
  panel: {},
};
