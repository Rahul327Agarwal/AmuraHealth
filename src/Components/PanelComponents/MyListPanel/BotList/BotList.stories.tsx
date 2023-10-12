import { Meta, Story } from "@storybook/react";
import React from "react";
 import BotList from "./BotList";
import { IBotCard } from "./BotList.types";
export default {
  title: "My List New Design/BotList",
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
  component: BotList,
} as Meta;

const Template: Story<IBotCard> = (args) => <BotList {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
