import React from "react";
import { Story, Meta } from "@storybook/react";
import { IRegisterWithoutOTPStaff } from "./Registernew.types";
import Registernew from "./Registernew";
export default {
  title: "Registration/RegisterUserWithoutOTPStaff",

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
  component: Registernew,
} as Meta;

const TemplatePrimary: Story<IRegisterWithoutOTPStaff> = (args) => (
  <Registernew {...args} />
);
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
  TimeZoneName: "",
  PreferredLanguages: [],
};
