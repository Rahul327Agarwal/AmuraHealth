import React from 'react';
import { Story, Meta } from '@storybook/react';
import Token  from './CallWizard';
import { IProps } from './CallWizard.types';

export default {
  title: 'LibraryComponents/schedules',
  component: Token,
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

const TemplatePrimary: Story<IProps> = (args) => <Token {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  messageData: {
    userId: '0207e297-ff0f-4f8f-8dfb-e0135e0bad24',
    EventName: 'chat-categorizer',
    tenantId: 'amura',
    senderId: '948aee3d-6712-48a9-a03b-c926f5f99915',
    messageId: '24dfbfcd-20da-4aa6-97c4-a279af7f7573',
    message: '',
    receivedTime: '2022-12-05T17:01:32.827Z',
    ContextType: '@call',
    loginUserId: '948aee3d-6712-48a9-a03b-c926f5f99915',
    operation: '@UPDATE_ENTITY',
    scheduleData: {
      channel: 'voice',
      duration: '200',
      timeUnits: 'mins',
      participants: [
        {
          userId: 'ce1348c6-3e02-4aae-8710-04a4279f6f36',
          roleId: 'amura_guidance_counselor_level2',
        },
        {
          userId: '9a173655-05eb-40bc-abab-e20ebcce596f',
          roleId: 'amura_consulting_physician',
        },
      ],
      title: 'test for testing',
      patientId: '0207e297-ff0f-4f8f-8dfb-e0135e0bad24',
    },
    IDToken:
      'eyJraWQiOiJDb0NLT2Q5Y3ZTNGpYQTI1bjhmbmRqWWRTS3pTeU5GTUNUNFJDM1U4UTNNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NDhhZWUzZC02NzEyLTQ4YTktYTAzYi1jOTI2ZjVmOTk5MTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0hNeXQ4SjE1TSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6Ijk0OGFlZTNkLTY3MTItNDhhOS1hMDNiLWM5MjZmNWY5OTkxNSIsImdpdmVuX25hbWUiOiJNYW5vIiwiYXVkIjoiMm1xcnAzdmxyOWUybmQyZjM2a2UxcTRsaWgiLCJldmVudF9pZCI6IjBjOTg4YzMzLTE1MWEtNDAwZi1iYjY5LWIzZjAxZGU0ZTdlYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY4ODQ1NTM1LCJwaG9uZV9udW1iZXIiOiIrOTE4MjQ4OTA4NzMzIiwiZXhwIjoxNjcwMzE5MDc1LCJpYXQiOjE2NzAyMzI2NzUsImZhbWlseV9uYW1lIjoiTWVuYW0ifQ.nevUdiON1sMwhaVl7apam8yJ_4KY1SeeTqRAR5t0EOdq_VRKAsWmLgIqdX4BOYo_L5JMTEGgkq4Aunn8WEsGtjShret6kn0047XxLdQ0J12zgJeo81IAdwTxgiOXBmBDskC8Ay_llBgedMNU_XBPMKKR76XirfdCnHI1gG6XBxPacbXQouJ1Rhtp0G4rhq5c5qyHoWD5IbZSwMlZlDt-U4gaoPVS2haMgOkaZ4RXrqL9ytTVqSnSUG28V-ne-lPL80INoczPJF_Hwrk8z8z2EyDqP7E0oha-2AhKodvLbdUTFROPzEQvRlFiA60weWE2XlH4Y1pcZk3O9sPt97Lj0Q',
    UserName: '948aee3d-6712-48a9-a03b-c926f5f99915',
    LoggedInUserName: 'மனோ Menam',
    UserEmail: '',
    UserPool: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_HMyt8J15M',
    UserPoolId: 'ap-south-1_HMyt8J15M',
    AppClientId: '2mqrp3vlr9e2nd2f36ke1q4lih',
    loggedInUserName: 'மனோ Menam',
    userPoolId: 'ap-south-1_HMyt8J15M',
  },
};
