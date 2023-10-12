import React from "react";
import { Story, Meta } from "@storybook/react";
import BlueDotClosePopUp from "./BlueDotClosePopUp";
import { IProps } from "./BlueDotClosePopUp.types";

export default {
  title: "New Library Components/ChatComponent/BlueDotClose Pop up",
  component: BlueDotClosePopUp,
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

const TemplatePrimary: Story<IProps> = (args) => (
  <BlueDotClosePopUp {...args} />
);
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  userDetails: [
    { userId: "mani", userName: "mani 123" },
    { userId: "mano", userName: "mano 123" },
    { userId: "mani23", userName: "mani 12323" },
    { userId: "mano234", userName: "mano 12re3" },
    { userId: "mani234wer", userName: "mani 1er23" },
    { userId: "manoerweffsdf", userName: "mano 1sdf23" },
    { userId: "manisdfsdf", userName: "mani 123sdf" },
    { userId: "manosfsdf", userName: "ssfdfsdfsdff sdfusdigsydf  uuf syddfgdsuyfgyguygs yfgs dudyf df" },
  ],
  blueDotDetails: [
    {
      original_owner: "test",
      current_owner: "mani23",
      name: "Test  asd  as d123",
      createdOn: "2022-10-14T11:37:33.131Z",
      createdBy: "mano23",
      tenantId: "amura",
    },
    {
      original_owner: "test",
      current_owner: "mani23",
      name: "Test asd asd asdasda ssxxcaadda sdfsd fsdf sdf sdf sdfsd fsff ascx asdd asd asd asd asdasd 123",
      createdOn: "2022-10-14T11:37:33.131Z",
      createdBy: "mano23",
      tenantId: "amura",
    },
    {
      original_owner: "test",
      current_owner: "mani234wer",
      name: "Test 123",
      createdOn: "2022-10-14T11:37:33.131Z",
      createdBy: "mano23",
      tenantId: "amura",
    },
    {
      original_owner: "test",
      current_owner: "mani234wer",
      name: "Test 123",
      createdOn: "2022-10-14T11:37:33.131Z",
      createdBy: "mano23",
      tenantId: "amura",
    },
    {
      original_owner: "test",
      current_owner: "manosfsdf",
      name: "Test 123",
      createdOn: "2022-10-14T11:37:33.131Z",
      createdBy: "mano23",
      tenantId: "amura",
    },
    {
      original_owner: "test",
      current_owner: "manosfsdf",
      name: "Test 123",
      createdOn: "2022-10-14T11:37:33.131Z",
      createdBy: "mano23",
      tenantId: "amura",
    },
  ],
};
