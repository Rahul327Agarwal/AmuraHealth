import React from "react";
import { Story, Meta } from "@storybook/react";
import AvailableSlotPicker from "./AvailableSlotPicker";
import { IProps } from "./AvailableSlotPicker.types";
export default {
  title: "Library Components/DatePicker/AvailableSlotPicker",
  parameters: {
    backgrounds: {
      default: "Panel",
      values: [
        { name: "Dark", value: "#000000" },
        { name: "Panel", value: "#1B1B1B" },
        { name: "Light", value: "#FFFFFF" },
      ],
    },
    viewport: {
      viewports: {
        Iphone12: {
          name: "IPhone 12",
          styles: {
            width: "390px",
            height: "844px",
          },
        },
        ipadPro: {
          name: "Ipad Pro",
          styles: {
            width: "1024px",
            height: "1366px",
          },
        },
        laptop: {
          name: "Laptop 1080p",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
        laptop1: {
          name: "Laptop 2K",
          styles: {
            width: "2560px",
            height: "1440px",
          },
        },
        laptop2: {
          name: "Laptop 2K",
          styles: {
            width: "3840px",
            height: "2160px",
          },
        },
      },
    },
  },
  component: AvailableSlotPicker,
} as Meta;

const Template: Story<IProps> = (args) => <AvailableSlotPicker {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  selectedDate: new Date("2022-03-02"),
  availableTimeSlots: [
    {
      timeSlot: new Date("2022-03-01T13:00:00.000Z"),
      participants: [{ name: "Mano", color: "#FF9110", id: "Mano" }],
    },
    {
      timeSlot: new Date("2022-03-01T15:00:00.000Z"),
      participants: [
        { name: "Mano", color: "#FF9110", id: "Mano" },
        { name: "Mani", color: "#CEEF00", id: "Mani" },
      ],
    },
    {
      timeSlot: new Date("2022-03-01T17:00:00.000Z"),
      participants: [{ name: "Mani", color: "#CEEF00", id: "Mani" }],
    },
    {
      timeSlot: new Date("2022-03-01T12:00:00.000Z"),
      participants: [
        { name: "Mano", color: "#FF9110", id: "Mano" },
        { name: "Mani", color: "#CEEF00", id: "Mani" },
      ],
    },
    {
      timeSlot: new Date("2022-03-01T20:00:00.000Z"),
      participants: [
        { name: "Mano", color: "#FF9110", id: "Mano" },
        { name: "Mani", color: "#CEEF00", id: "Mani" },
      ],
    },
  ],
  onTimeSlotSelected: (slot: Date) => {
    console.log(slot);
  },
  availableDates: [
    new Date("2022-03-01"),
    new Date("2022-03-02"),
    new Date("2022-03-11"),
    new Date("2022-03-22"),
    new Date("2022-03-24"),
    new Date("2022-03-25"),
  ],
  handleDateChange: (slot: Date) => {
    console.log(slot);
  },
};
