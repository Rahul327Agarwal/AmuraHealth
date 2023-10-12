import { Meta, Story } from "@storybook/react";
import React from "react";
import ToggleButton from "./ToggleButton";
import { IProps } from "./ToggleButton.types";

export default {
  title: "Library Components/ToggleButton",
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
  component: ToggleButton,
} as Meta;

const Template: Story<IProps> = (args) => <ToggleButton {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  value: "Kcal",
  toggleValues: ["Kcal", "gms", "Kg"],
};
