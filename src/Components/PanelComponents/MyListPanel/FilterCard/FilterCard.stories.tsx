import React from "react";
import { Story, Meta } from "@storybook/react";
import FilterCard from "./FilterCard";
//import { IProps } from "./FilterCard.types";
export default {
  title: "My List New Design/FilterCard",
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
  component: FilterCard,
} as Meta;

// const Template: Story<IProps> = (args) => <FilterCard {...args} />;
// export const Primary = Template.bind({});
// Primary.args = {};
