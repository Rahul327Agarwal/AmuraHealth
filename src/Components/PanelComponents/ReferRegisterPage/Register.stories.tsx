import React from "react";
import { Story, Meta } from "@storybook/react";
import { IRegisterNewForm } from "./Register.types";
import Register from "./Register";
export default {
  title: "NewReferForm",

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
  component: Register,
} as Meta;

const TemplatePrimary: Story<IRegisterNewForm> = (args) => <Register {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
    FirstName: "",
    LastName: "",
    EmailId: "",
    PhoneNumber: "",
    HealthObjective: "",
    askToTalk: "false",
    isStaff: true,
    Country: "",
    State: "",
    City: "",
    TimeZone: "",
    TimeZoneName:"",
    PreferredLanguages: [],
};
