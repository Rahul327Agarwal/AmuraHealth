import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import MUIButton from '../../../../../LibraryComponents/MUIButton/MUIButton';
import PanelFooter from '../../../../../LibraryComponents/PanelFooter/PanelFooter';
import { PreparationButtonIcon, PreparationIcon } from '../RecipesBuilder.svg';
import { PreparationProps } from '../RecipesBuilder.types';
import { initialState, validateDetails } from './Preparation.function';
import { useStyles } from './Preparation.styles';
import PreparationSteps from './PreparationSteps';
import StepsDataScreen from './StepsDataScreen';

const Preparation = (props: PreparationProps) => {
  const {
    setAction,
    fields,
    setFiels,
    recipeData,
    setRecipesData,
    sessions,
    initialScreen,
    setInitialScreen,
    stepsScreen,
    setStepsScreen,
    ingredientInfo,
    submitRecipe,
    setShowConfirm,
    isSubmitingRecipe,
  } = props;
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const [preparationData, setPreparationData] = useState(JSON.parse(JSON.stringify(initialState)));
  const [step, setStep] = useState(recipeData.prepration.length + 1);
  const [stepsData, setStepsData] = useState([]);
  // const [stepsScreen, setStepsScreen] = useState(false);
  const [errors, setError] = useState<{}>('');
  // const [initialScreen, setInitialScreen] = useState(true);
  const [isEdit, setIsEdit] = useState({ val: false, step: 0 });
  const [imageupload, setImageupload] = useState(0);

  const addData = () => {
    let { isValid, errorMessages } = validateDetails(preparationData, imageupload);
    setError(errorMessages);

    if (isValid) {
      if (isEdit.val) {
        const filtereddata = fields.filter((item) => item.stepNo != isEdit.step);
        setFiels((pre) => [...filtereddata, { ...preparationData, stepNo: isEdit.step }]);
        setRecipesData((pre) => ({
          ...pre,
          prepration: [...filtereddata, { ...preparationData, stepNo: isEdit.step }],
        }));
      } else {
        setFiels((pre) => [...pre, { ...preparationData, stepNo: step }]);

        setRecipesData((pre) => ({
          ...pre,
          prepration: [...pre.prepration, { ...preparationData, stepNo: step }],
        }));
      }

      setStep(isEdit.val ? step : step + 1);
      setStepsScreen(false);
      setInitialScreen(false);
      if (isEdit.val) isEdit.val = false;
    }
  };

  useEffect(() => {
    let { isValid, errorMessages } = validateDetails(preparationData, imageupload);
    setError({
      ...errors,
      videoLink: errorMessages.videoLink,
    });
  }, [imageupload]);

  if (fields?.length == 0 && initialScreen) {
    return (
      <div className={classes.screenWrapperNew}>
        <div className={classes.screenContentNew}>
          <div>
            <div className={classes.iconWrap}>{<PreparationIcon />}</div>
            <p className={` ${classes.watermarkText}`}>Please add preparation steps to cook the recipe well</p>
            <MUIButton
              variant="contained"
              size="large"
              onClick={() => {
                setInitialScreen(false);
                setStepsScreen(true);
              }}
              children="Add preparation steps"
              fullWidth={true}
              startIcon={<PreparationButtonIcon />}
            />
          </div>
        </div>
      </div>
    );
  } else if (stepsScreen) {
    return (
      <div className={`${classes.wrapper}`}>
        <div className={`${classes.stepNo} ${commanClass.body20Medium}`}>Step {isEdit.val ? isEdit.step : `${step}`}</div>

        <PreparationSteps
          setPreparationData={setPreparationData}
          preparationData={preparationData}
          errors={errors}
          setError={setError}
          setImageupload={setImageupload}
          sessions={sessions}
          recipeData={recipeData}
          setRecipesData={setRecipesData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <PanelFooter
          customStyle={classes.footerStyle}
          leftButtonText={'Back'}
          righButtontText={'Add'}
          handleLeftButton={() => {
            setShowConfirm(true);
            // if (isEdit.val) isEdit.val = false;
            // setInitialScreen(true);
            // setStepsScreen(false);
          }}
          handleRightButton={() => {
            addData();
          }}
        />
      </div>
    );
  } else {
    return (
      <div className={`${classes.wrapper}`}>
        <div className={classes.stepsContainer}>
          <span className={`${classes.stepsData} ${commanClass.body15Medium}`}>Steps</span>
          <StepsDataScreen
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setStepsScreen={setStepsScreen}
            stepsData={fields}
            setStepsData={setFiels}
            recipeData={recipeData}
            setRecipesData={setRecipesData}
          />
          <MUIButton
            variant="contained"
            size="large"
            onClick={() => {
              setStepsScreen(true);
              setPreparationData(
                JSON.parse(
                  JSON.stringify({
                    ...initialState,
                    stepNo: fields?.length + 1,
                  })
                )
              );
              setIsEdit(JSON.parse(JSON.stringify({ val: false, step: 0 })));
            }}
            children="Add prepation steps"
            fullWidth={true}
          />
        </div>
        <PanelFooter
          customStyle={classes.footerStyle}
          leftButtonText={'Back'}
          righButtontText={
            <div className={classes.loaderParent}>
              {isSubmitingRecipe ? <CircularProgress className={classes.loader} /> : null}
              <span>Submit</span>
            </div>
          }
          handleLeftButton={() => setAction({ screen: 'INGREDIENTS' })}
          handleRightButton={() => submitRecipe()}
          disableRightButton={isSubmitingRecipe}
        />
      </div>
    );
  }
};

export default Preparation;
