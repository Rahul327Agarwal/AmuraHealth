import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./Select.types";
import Dropdown from "./Select";
export default {
  title: "Library Components/Dropdown",

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
  component: Dropdown,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <Dropdown {...args} />;
export const Select = TemplatePrimary.bind({});
Select.args = {
  value: "Select a dropdown",
  options: [
    { id: "Select a dropdown", label: "Select a dropdown" },
    { id: "Amura", label: "Amura" },
    { id: "Apollo", label: "Apollo" },
  ],
  onChange: (e) => {
    console.log(e, "Changed");
  },
  disabled: false,
  labelParameter: "id",
  showBorder: true,
};
