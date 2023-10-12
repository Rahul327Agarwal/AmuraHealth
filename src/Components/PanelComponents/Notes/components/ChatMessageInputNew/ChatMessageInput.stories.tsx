import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./ChatMessageInput.types";
import ChatMessageInput from "./ChatMessageInput";
export default {
  title: "Library Components/Chat Components/ChatMessageInput New",

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
  component: ChatMessageInput,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ChatMessageInput {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args={
  value:"saiba"
}
