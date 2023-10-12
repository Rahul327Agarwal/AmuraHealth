import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./MessageView.types";
import MessageView from "./MessageView";
export default {
  title: "Post Management/MessageView",
  parameters: {
    backgrounds: {
      default: "lightGray",
      values: [
        { name: "Dark", value: "#000000" },
        { name: "Panel", value: "#1B1B1B" },
        { name: "Light", value: "#FFFFFF" },
        { name: "lightGray", value: "#F5F5F5" },
      ],
    },
  },
  component: MessageView,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <MessageView {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  message:{
    message: "Health of happiness",
    msgSent:"09.34 AM",
  }
    
};
