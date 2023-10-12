import { Meta, Story } from "@storybook/react";
import React from "react";
import MyListWidget from "./NavigationBar";
import { IProps } from "./NavigationBar.types";

export default {
  title: "New Library Components/NavigationBar",
  component: MyListWidget,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <MyListWidget {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  accordianTitle: "Accordion 1",
  children: (
    <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget.
    </span>
  ),
};
