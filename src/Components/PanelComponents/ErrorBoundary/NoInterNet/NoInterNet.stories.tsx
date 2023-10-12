import React from "react";
import { Story, Meta } from "@storybook/react";
import NoInterNet from "./NoInterNet";
import { IProps } from "./NoInterNet.types";

export default {
  title: "New Library Components/NoInterNetError",
  component: NoInterNet,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <NoInterNet {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
};
