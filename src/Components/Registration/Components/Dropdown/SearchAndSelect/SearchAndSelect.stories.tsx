import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./SearchAndSelect.types";
import Dropdown from "./SearchAndSelect";
export default {
  title: "Library Components/Dropdown",

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
  component: Dropdown,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <Dropdown {...args} />;
export const SearchAndSelect = TemplatePrimary.bind({});
SearchAndSelect.args = {
  value: "Amura",
  options: [
    { id: "Amura", label: "Amura" },
    { id: "Apollo", label: "Apollo" },
    { id: "Saturn", label: "Saturn" },
    { id: "Chennai", label: "Chennai" },
    { id: "New York", label: "New York" },
    { id: "USA", label: "USA" },
  ],
  onChange: (e) => {
    console.log(e, "Changed");
  },
  disabled: false,
  labelParameter: "id",
  placeHolder: "Search and select",
  showBorder: true,
};
