import { Meta, Story } from "@storybook/react";
import React from "react";
import OTPField from "./OTPField";
import { IProps } from "./OTPField.types";
export default {
  title: "Registration/OTPField",
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
  component: OTPField,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <OTPField {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  shouldAutoFocus: true,
  value: "",
  onChange: () => {},
  className: "",
  numInputs: "",
  handleSubmit: () => {},
};
