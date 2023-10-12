import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./CheckBox.types";
import CheckBox from "./CheckBox";
export default {
  title: "Library Components/CheckBox",

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
  component: CheckBox,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <CheckBox {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  value: true,
  label: "Amura",
  labelPlacement: "end",
  handleCheck: (e)=> {console.log(e)}
};
