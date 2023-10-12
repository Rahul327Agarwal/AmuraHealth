import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./InputSlider.types";
import InputSlider from "./InputSlider";
export default {
  title: "Library Components/InputSlider",

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
  component: InputSlider,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <InputSlider {...args} />;
export const Range = TemplatePrimary.bind({});
Range.args = {
  value: 1,
  min: 0,
  max: 20,
  handleChange: (e) => {
    console.log("changed", e);
  },
};

const TemplateSecondary: Story<IProps> = (args) => <InputSlider {...args} />;
export const Slider = TemplateSecondary.bind({});
Slider.args = {
  value: [1, 2],
  min: 0,
  max: 20,
  handleChange: (e) => {
    console.log("changed");
  },
};
