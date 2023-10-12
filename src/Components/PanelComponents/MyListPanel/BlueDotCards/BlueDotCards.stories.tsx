import React from "react";
import { Story, Meta } from "@storybook/react";
import BlueDotCards from "./BlueDotCards";
import { BlueDotCardsProps } from "../MyListHome.types";
export default {
  title: "My List New Design/BlueDotCards",
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
  component: BlueDotCards,
} as Meta;

const Template: Story<BlueDotCardsProps> = (args) => <BlueDotCards {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
