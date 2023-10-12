import React, { useEffect, useState } from "react";
import { Chip as MUIToken } from "@mui/material";
import { IProps } from "./Token.types";
import { useStyles } from "./Token.styles";

export default function Token(props: IProps) {
  const { variant, label, value, checked, onSelect, onDeSelect, disabled } =
    props;
  const [isChecked, setIsChecked] = useState(checked);
  const { classes } = useStyles(props);
  let deteleIcon = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 2.2305L9.7695 0.75L6 4.5195L2.2305 0.75L0.75 2.2305L4.5195 6L0.75 9.7695L2.2305 11.25L6 7.4805L9.7695 11.25L11.25 9.7695L7.4805 6L11.25 2.2305Z"
        fill="white"
      />
    </svg>
  );
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  return (
    <MUIToken
      className={`${classes.root} ${isChecked ? classes.checked : ""} ${
        disabled ? classes.disabled : ""
      }`}
      label={label}
      disabled={disabled}
      variant={variant === "primary" ? "filled" : "outlined"}
      onClick={() => {
        if (variant === "primary") {
          setIsChecked(true);
          onSelect(value);
        }
      }}
      deleteIcon={deteleIcon ? deteleIcon : null}
      {...(variant !== "primary"
        ? {
            onDelete: (e) => {
              if (onDeSelect && e.key !== "Backspace") onDeSelect(value);
            },
          }
        : null)}
    />
  );
}
