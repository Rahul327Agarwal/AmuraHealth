import React from "react";

import { Card, CardActions, CardContent } from "@mui/material";
import MUIButton from "../MUIButton/MUIButton";
import { useStyles } from "./InfoCard.styles";
import { IProps } from "./InfoCard.types";

const InfoCard = (props: IProps) => {
  const { classes } = useStyles();

  return (
    <Card>
      <CardContent>
        <h3 className={classes.title}>{props.title}</h3>
        <p className={classes.textContent}>{props.textContent}</p>
      </CardContent>
      <CardActions>
        <div className={classes.btnWrap}>
          <MUIButton
            disableRipple
            disabled={props.disableSubmit}
            className={`${classes.btnTitle}`}
            variant="text"
            onClick={(e) => {
              props.handleSubmit();
            }}
            title={props.submitBtnTitle}
          >
            {props.submitBtnTitle}
          </MUIButton>
          <MUIButton
            disableRipple
            disabled={props.disableCancel}
            className={`${classes.btnTitle}`}
            variant="text"
            onClick={(e) => {
              props.handleCancel();
            }}
            title={props.cancelBtnTitle}
          >
            {props.cancelBtnTitle}
          </MUIButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default InfoCard;
