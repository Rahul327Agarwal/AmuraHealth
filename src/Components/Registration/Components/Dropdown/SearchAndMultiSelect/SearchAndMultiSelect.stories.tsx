import React from "react";
import { Story, Meta } from "@storybook/react";
import { IProps } from "./SearchAndMultiSelect.types";
import Dropdown from "./SearchAndMultiSelect";
import { useArgs } from "@storybook/preview-api";
export default {
  title: "Library Components/Dropdown/SearchAndmultiSelect",
  component: Dropdown,
  args: {
    value: [
      { id: "Am", label: "Amura" },
      { id: "Ap", label: "Apollo" },
    ],
    options: [
      { id: "Am", label: "Amura" },
      { id: "Ap", label: "Apollo" },
      { id: "Sa", label: "Saturn" },
      { id: "Ch", label: "Chennai" },
      { id: "Ne", label: "New York" },
      { id: "USA", label: "USA" },
    ],
    disabled: false,
    labelParameter: "label",
    idParameter: "id",
    placeHolder: "Search and select",
    showTokens: false,
    showBorder: true,
    disableCloseOnSelect:true,
    onChange: (e) => {
      console.log(e);
    },
  },
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
};

export const Primary = ({ ...args }) => {
  const [
    {
      value,
      options,
      disabled,
      idParameter,
      labelParameter,
      showTokens,
      showBorder,
      placeHolder,
    },
    updateArgs,
  ] = useArgs();
  const onChange = (e) => {
    console.log(e);
    updateArgs({ value: e });
  };

  return (
    <div>
      <Dropdown
        onChange={(e) => {
          onChange(e);
        }}
        options={options}
        value={value}
        disabled={disabled}
        idParameter={idParameter}
        labelParameter={labelParameter}
        placeHolder={placeHolder}
        showTokens={showTokens}
        {...args}
      />
    </div>
  );
};
