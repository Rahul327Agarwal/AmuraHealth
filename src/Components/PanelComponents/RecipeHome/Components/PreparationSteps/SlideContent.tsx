import React from "react";
import { useStyles } from "./Screens.styles";
import { SlideContentProps } from "./PreparationSteps.types";
import { useCommonStyles } from "../../../../../Common/Theme/CommonStyles";
import { CookingImage } from "../../../../SVGs/ImageVariables";

const SlideContent = (props: SlideContentProps) => {
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const { bufferTime, img, description, screendata } = props;
  return (
    <div className={classes.slideContent}>
      <div className="sliderWrapper">
        <div className={classes.slideItem}>
          <span
            className={`${commanClass.body15Regular} ${classes.imgCaption} ${classes.textCenter}`}
          >
            {bufferTime}
          </span>
          {screendata.image ? (
            <img
              className={classes.recipeImg}
              alt="recipe image"
              src={`${import.meta.env.VITE_DP_URL}${screendata.image}`}
            />
          ) : screendata.videoLink ? (
            <iframe
              src={`${screendata.videoLink}`}
              className={classes.recipeImg}
            />
          ) : (
            <span className={classes.imgWrap}>{<CookingImage />}</span>
          )}

          <div className={classes.description}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
