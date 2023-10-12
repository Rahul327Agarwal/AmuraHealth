import { memo, useCallback, useEffect } from 'react';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import InputField from '../../../../../LibraryComponents/InputField/InputField';
import MUISetTime from '../../../../../LibraryComponents/MUISetTime/MUISetTime';
import RecipeUpload from '../../RecipeUpload/RecipeUpload';
import { uploadFiles } from '../RecipesBuilder.function';
import { useStyles } from './Preparation.styles';
import { PreparationStepsProps } from './Preparation.types';

const MemoInputField = memo(InputField);
const MemoMUISetTime = memo(MUISetTime);
const fileTypes = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'bmp', 'eps', 'psd', 'gif'];
const PreparationSteps = (props: PreparationStepsProps) => {
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const {
    sessions,
    setPreparationData,
    preparationData,
    errors,
    setError,
    setImageupload,
    recipeData,
    setRecipesData,
    isEdit,
    setIsEdit,
  } = props;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'videoLink') {
      setError((pre) => ({ ...pre, videoLink: '' }));
      setPreparationData((pre) => ({
        ...pre,
        [name]: value.trim() ? value.replace('watch?v=', 'embed/') : value.trim(),
      }));
    } else {
      setError((pre) => ({ ...pre, description: '' }));
      setPreparationData((pre) => ({
        ...pre,
        [name]: value.trim() ? value : value.trim(),
      }));
    }
  }, []);

  const handleSetTime = useCallback(({ totalSeconds }) => {
    setError((pre) => ({ ...pre, preparationTime: '' }));
    setPreparationData((pre) => ({
      ...pre,
      preparationTime: totalSeconds.toString(),
    }));
  }, []);

  useEffect(() => {
    if (isEdit.val) {
      setImageupload(isEdit.image == '' ? 0 : 1);
      setPreparationData({
        description: isEdit.description,
        image: isEdit.image,
        videoLink: isEdit.videoLink,
        preparationTime: isEdit.preparationTime,
      });
    } else setImageupload(0);
  }, []);

  return (
    <div className={classes.inputWrapNew}>
      <MemoInputField
        onChange={handleChange}
        name="description"
        label="Description"
        value={preparationData.description}
        helperText={errors.description}
        multiline
        maxRows={5}
      />
      <MemoMUISetTime
        // headerTitle={" "}
        inputLabel={'Set Time'}
        isSuggestion
        onTimeChange={handleSetTime}
        helperText={errors.preparationTime}
        inputValue={preparationData.preparationTime}
        validMinutes={true}
        allowSeconds
      />
      <MemoInputField
        onChange={handleChange}
        name="videoLink"
        label="Video link"
        value={preparationData.videoLink}
        helperText={errors.videoLink}
      />
      <span className={`${commanClass.body15Regular} ${classes.optionText}`}>Or</span>
      <div className={classes.imgWrap}>
        <span className={`${commanClass.body17Regular} ${classes.imgText}`}>Image</span>
        <RecipeUpload
          maxFileSizeMb={10}
          setImageupload={setImageupload}
          uploadFiles={uploadFiles}
          recipeId={recipeData.basic.recipeId}
          sessions={sessions}
          setPreparationData={setPreparationData}
          preparationData={preparationData}
          multiple={false}
          imageUrl={JSON.parse(JSON.stringify(preparationData.image == '' ? [] : [preparationData.image]))}
          acceptedFiles={fileTypes}
          noView={true}
          preparationStepNo={isEdit.val ? isEdit.step : preparationData?.stepNo}
        />
      </div>
    </div>
  );
};

export default PreparationSteps;
