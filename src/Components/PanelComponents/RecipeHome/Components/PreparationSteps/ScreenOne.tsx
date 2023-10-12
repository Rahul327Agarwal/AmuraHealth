import React, { useState } from 'react';
import { secondsToTime } from '../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUIButton from '../../../../LibraryComponents/MUIButton/MUIButton';
import { BackButtonIcon, BackIcon, FinalRecipe, NextButtonIcon } from '../RecipesSelected.svg';
import { CookingImage } from '../../../../SVGs/ImageVariables';
import { IProps } from '../RecipePanel/RecipePanel.types';
import { useStyles } from './Screens.styles';
import SlideContent from './SlideContent';

const ScreenOne = (props: IProps) => {
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const { recipesData, setActionType } = props;
  const [stepNo, setStepNo] = useState(1);
  const [screendata, setScreendata] = useState(recipesData.steps[0]);
  const totalCookingTime = secondsToTime(Number(recipesData.totalCookingTime)).timeString;
  const nextStep = () => {
    const nextdata = recipesData.steps.filter((item) => {
      return item.stepNo == stepNo + 1;
    });

    if (stepNo < recipesData.steps.length) {
      setStepNo(stepNo + 1);
      setScreendata(nextdata[0]);
    } else {
      setStepNo(stepNo + 1);
    }
  };
  const backStep = () => {
    const nextdata = recipesData.steps.filter((item) => {
      return item.stepNo == stepNo - 1;
    });

    if (stepNo > 1) {
      setStepNo(stepNo - 1);
      setScreendata(nextdata[0]);
    }
  };
  const handleClickBack = () => {
    setActionType('PREVIEW_RECIPE');
  };
  return (
    <div className={classes.wrapper}>
      <span className={`${commanClass.body17Medium} ${classes.headerWrap}`}>
        <span className={classes.backArrowStyle} onClick={handleClickBack}>
          {<BackIcon />}
        </span>
        {recipesData.title}
      </span>
      <span className={`${commanClass.caption12Medium} ${classes.caption}`}>Total time : {totalCookingTime}</span>

      {stepNo < recipesData.steps.length + 1 && (
        <>
          <div className={classes.scrollBody}>
            <SlideContent
              bufferTime={secondsToTime(Number(screendata.preparationTime)).timeString}
              img={<CookingImage />}
              description={screendata.description}
              screendata={screendata}
            />
          </div>

          <div className={classes.footerWrapper}>
            <div className={classes.footerContent}>
              <div className={classes.buttonWrap}>
                <span className={stepNo == 1 ? `${classes.hidden}` : `${classes.playBtns} ${classes.backBtn}`} onClick={backStep}>
                  {<BackButtonIcon />}
                </span>
                <p className={`${commanClass.body15Medium} ${classes.stepsNumber}`}>
                  Step {stepNo}
                  <span className={`${commanClass.body15Regular} ${classes.totalSteps}`}>of {recipesData.steps.length}</span>
                </p>
                <span className={`${classes.playBtns} ${classes.nextBtn}`} onClick={nextStep}>
                  {<NextButtonIcon />}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      {stepNo == recipesData.steps.length + 1 && (
        <div className={classes.finalScreenWrapper}>
          <div className={classes.finalWrapper}>
            <span className={classes.finalImg}> {<FinalRecipe />} </span>
            <div className={`${commanClass.body15Regular} ${classes.finalContent}`}>
              Hope you have prepared
              <b> {recipesData.title}</b> nicely.<br></br>
              Have a great meal :){' '}
            </div>
          </div>

          <MUIButton children="Done" variant="contained" size="large" fullWidth={false} onClick={() => setActionType('HOME')} />
          <span className={`${commanClass.caption12Medium} ${classes.prevLink}`} onClick={() => backStep()}>
            Go to Previous Step
          </span>
        </div>
      )}
    </div>
  );
};

export default ScreenOne;
