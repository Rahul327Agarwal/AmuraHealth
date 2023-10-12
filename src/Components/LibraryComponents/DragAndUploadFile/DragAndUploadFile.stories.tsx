import { Meta, Story } from "@storybook/react";
import React from "react";
import DragAndUploadFile from "./DragAndUploadFile";
import { IProps } from "./DragAndUploadFile.types";

export default {
  title: "Library Components/DragAndUploadFile",
  parameters: {
    backgrounds: {
      default: "Panel",
      values: [{ name: "Light", value: "#FFFFFF" }],
    },
  },
  component: DragAndUploadFile,
} as Meta;

const Template: Story<IProps> = (args) => <DragAndUploadFile {...args} />;
export const Primary = Template.bind({});
