import React from "react";
import { Story, Meta } from "@storybook/react";
import InputField from "./DatePicker";
import { IProps } from "./DatePicker.types";
export default {
  title: "Library Components/DatePicker/InputField",
  parameters: {
    backgrounds: {
      default: "Panel",
      values: [
        { name: "Dark", value: "#000000" },
        { name: "Panel", value: "#1B1B1B" },
        { name: "Light", value: "#FFFFFF" },
      ],
    },
  },
  component: InputField,
} as Meta;

const Template: Story<IProps> = (args) => <InputField {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  placeholder: "start date",
  startDate: "2022-01-01",
  handleDateChange: (e) => {
    console.log(e);
  },
  disabled: false,
  variant: "date",
};
