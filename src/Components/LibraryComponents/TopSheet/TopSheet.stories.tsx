import React from "react";
import { Story, Meta } from "@storybook/react";
import Token from "./TopSheet";
import { IProps } from "./TopSheet.types";

export default {
  title: "Library Components/TopSheet",
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
  isOpen: true,
  children: (
    <div>
      <div>assdasd</div>
      <div>asdasdasd</div>
    </div>
  ),
  ref: null,
};
