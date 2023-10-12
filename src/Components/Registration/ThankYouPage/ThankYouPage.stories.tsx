import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./ThankYouPage.types";
import ThankYouPage from "./ThankYouPage";
export default {
  title:  "Panel/ThankYouPage/ThankYouPage",

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
  component: ThankYouPage,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ThankYouPage {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  value: true,
  label: "Amura",
  handleCheck: (e)=> {console.log(e)}
};
