import React from "react";
import { Story, Meta } from "@storybook/react";
import Token from "./Token";
import { IProps } from "./Token.types";

export default {
  title: "Library Components/Token",
  parameters: {
    backgrounds: {
      default: "Panel",
      values: [
        { name: "Dark", value: "#000000" },
        { name: "Panel", value: "#3F4044" },
        { name: "Light", value: "#FFFFFF" },
      ],
    },
  },
  component: Token,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <Token {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  label: "Amura",
  value: "Amura",
  onSelect: (e: string | number) => {
    console.log("Checked", e);
  },
};
const TemplateChip: Story<IProps> = (args) => <Token {...args} />;
export const Chip = TemplateChip.bind({});
Chip.args = {
  label: "Amura",
  variant: "Chip",
  value: "Amura",
  onDeSelect: (e: string | number) => {
    console.log("Deselected", e);
  },
};
