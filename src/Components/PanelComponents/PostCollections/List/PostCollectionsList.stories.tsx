import { Meta, Story } from "@storybook/react";
import React from "react";
import { MyListProps } from "../MyListHome.types";
import PostCollectionsList from "./PostCollectionList";
export default {
  title: "POST COLLECTIONS/PostCollectionsList",
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
  component: PostCollectionsList,
} as Meta;

const Template: Story<MyListProps> = (args) => (
  <PostCollectionsList {...args} />
);
export const Primary = Template.bind({});
Primary.args = {
  panel: {
    height: "1000px",
  },
};
