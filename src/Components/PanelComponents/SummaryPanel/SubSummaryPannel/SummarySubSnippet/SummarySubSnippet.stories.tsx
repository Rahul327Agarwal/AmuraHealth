import React from "react";
import { Story, Meta } from "@storybook/react";
import SummarySubSnippet from "./SummarySubSnippet";
import { IProps } from "./SummarySubSnippet.types";
export default {
  title: "SummarySubSnippet",
  parameters: {
    backgrounds: {
      default: "Light",
      values: [
        { name: "Dark", value: "#000000" },
        { name: "Panel", value: "#1B1B1B" },
        { name: "Light", value: "#FFFFFF" },
      ],
    },
  },
  component: SummarySubSnippet,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => (
  <SummarySubSnippet {...args} />
);
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  textValue: "hai",
  title: "name",
  icon: "@",
};
