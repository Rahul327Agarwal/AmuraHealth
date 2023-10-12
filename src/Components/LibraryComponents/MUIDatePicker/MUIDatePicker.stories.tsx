import { Meta, Story } from '@storybook/react';
import React from 'react';
import MUIDatePicker  from './MUIDatePicker';
import { IProps } from './MUIDatePicker.types';
import { useArgs } from '@storybook/preview-api';
import { addDays, subDays } from 'date-fns';
export default {
  title: 'LibraryComponents/MUIDatePicker',
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#FFFFFF' },
        { name: 'Panel', value: '#FFFFFF' },
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
  args: {
    date: new Date(),
    readOnly: true,
    maxDate: addDays(new Date(), 5),
    minDate: subDays(new Date(), 60),
    setDate: (date: any) => {},
  },
  component: MUIDatePicker,
} as Meta;

const Template: Story<IProps> = (args) => <MUIDatePicker {...args} />;
export const Primary = ({ ...args }) => {
  const [{ date, maxDate, setDate, minDate }, updateArgs] = useArgs();
  const onChange = (e: any) => {
    updateArgs({ date: e });
  };
  return (
    <div>
      <MUIDatePicker date={date} setDate={onChange} readOnly={true} maxDate={maxDate} minDate={minDate} changeBgColor={true} />
    </div>
  );
};
