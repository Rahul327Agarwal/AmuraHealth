import { debounce } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { getSearchUsers } from '../../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import InputField from '../../../../../LibraryComponents/InputField/InputField';
import MUIAutoSelect from '../../../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import RadioGroup from '../../../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import PanelFooter from '../../../../../LibraryComponents/PanelFooter/PanelFooter';
import Select from '../../../../../LibraryComponents/Select/Select';
import { getRecipeCheckByTitle } from '../../../RecipeHome.functions';
import RecipeUpload from '../../RecipeUpload/RecipeUpload';
import { uploadFiles } from '../RecipesBuilder.function';
import { useStyles } from '../RecipesBuilder.styles';
import {
  FOOD_RESTRICTIONS_OPTIONS,
  defaultBasicDetailsState,
  easyToCookOptions,
  validateBasicDetails,
} from './BasicDetails.function';
import { BasicDetailsProps } from './BasicDetails.types';

const MemoInputField = memo(InputField);
const MemoSelect = memo(Select);
const MemoRadioGroup = memo(RadioGroup);
const MemoMUIAutoSelect = memo(MUIAutoSelect);
const fileTypes = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'bmp', 'eps', 'psd', 'gif'];

const BasicDetails = (props: BasicDetailsProps) => {
  const {
    setShowConfirm,
    setAction,
    payload,
    fields,
    setFiels,
    setActionType,
    recipeData,
    setRecipesData,
    sessions,
    errorState,
    cuisineOptions,
    setErrorState,
    errorRef,
    isEdit,
  } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const [errors, setErrors] = useState(defaultBasicDetailsState);
  const [isExist, setIsExist] = useState(false);
  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    callSearchUsersAPI('');
  }, []);

  useEffect(() => {
    if (errorState) {
      setErrors(JSON.parse(JSON.stringify(errorState)));
      errorRef.current = JSON.parse(JSON.stringify(errorState));
    }
  }, [errorState]);

  useEffect(() => {
    return () => {
      setErrorState(errors);
    };
  }, []);

  useEffect(() => {
    if (recipeData?.basic?.files?.length > 0) {
      setErrors((prev) => {
        return { ...prev, image: '' };
      });
      errorRef.current.image = '';
    }
  }, [recipeData.basic.files]);

  useEffect(() => {
    if (payload?.tags?.length) {
      setFiels((pre) => ({ ...pre, ...payload }));
    }
  }, [payload]);

  const updateError = () => {
    setErrorState(errors);
  };
  const handleNext = async (recipeData) => {
    let { isValid, errorMessages } = validateBasicDetails(
      { ...fields, contributorId: fields?.contributorId?.value },
      recipeData.basic
    );
    let isExist = await (() => {
      if (isEdit) {
        return checkUpdatedRecipeNameExists(fields.name.toUpperCase());
      }
      return checkRecipeNameExists(fields.name.toUpperCase());
    })();

    if (isExist) {
      errorMessages = {
        ...errorMessages,
        exist: isExist ? 'A recipe exists with the same name.' : '',
      };
      isValid = false;
    }
    errorRef.current = errorMessages;
    setErrors(errorMessages);
    setErrorState(errorMessages);
    if (!isValid) return;
    setAction({ screen: 'INGREDIENTS', payload: '' });
  };

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const handleTags = () => setAction({ screen: 'INPUT_TAGS' });

  const checkRecipeNameExists = async (searchText?: string) => {
    const searchResponse = await getRecipeCheckByTitle(props, searchText);
    setIsExist(searchText ? searchResponse.length > 0 : false);
    return searchResponse.length > 0;
  };

  const checkUpdatedRecipeNameExists = async (title?: string) => {
    const response = await getRecipeCheckByTitle(props, title);
    const isExistCurr = title ? response.length > 0 && response[0]?.recipeId && response[0]?.recipeId !== fields.recipeId : false;
    setIsExist(isExistCurr);
    return isExistCurr;
  };

  useEffect(() => {
    setErrors((prev) => {
      return {
        ...prev,
        exist: isExist ? 'A recipe exists with the same name.' : '',
      };
    });
    errorRef.current.exist = isExist ? 'A recipe exists with the same name.' : '';
  }, [isExist]);

  useEffect(() => {
    debounceFun(fields?.name?.trim().toUpperCase() || '');
  }, [fields.name]);

  const callSearchRecipesAPI = async (e, isOnFocus) => {
    if (isEdit) {
      checkUpdatedRecipeNameExists(e);
    } else {
      checkRecipeNameExists(e);
    }
  };
  const debounceFun: Function = debounce(callSearchRecipesAPI, 500);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setRecipesData((pre) => ({
      ...pre,
      basic: { ...pre.basic, [name]: value.trim() ? value : value.trim() },
    }));
    setFiels((pre) => ({
      ...pre,
      [name]: value.trim() ? value : value.trim(),
    }));

    setErrors((prev) => {
      return { ...prev, [name]: '', exist: isExist ? 'A recipe exists with the same name.' : '' };
    });
    errorRef.current.name = '';
    errorRef.current.description = '';
    errorRef.current.exist = isExist ? 'A recipe exists with the same name.' : '';
  }, []);
  const handleFoodRestriction = useCallback((value) => {
    setRecipesData((pre) => ({
      ...pre,
      basic: { ...pre.basic, foodRestriction: value },
    }));
    setFiels((pre) => ({ ...pre, foodRestriction: value }));

    setErrors((prev) => {
      return { ...prev, foodRestriction: '' };
    });
    errorRef.current.foodRestriction = '';
  }, []);
  const handleCuisine = useCallback((value) => {
    setRecipesData((pre) => ({
      ...pre,
      basic: { ...pre.basic, cuisine: value },
    }));
    setFiels((pre) => ({ ...pre, cuisine: value }));
    setErrors((prev) => {
      return { ...prev, cuisine: '' };
    });
    errorRef.current.cuisine = '';
  }, []);
  const handleSetTime = useCallback(({ totalMinutes }) => {
    setRecipesData((pre) => ({
      ...pre,
      basic: { ...pre.basic, cookingTime: totalMinutes.toString() },
    }));
    setFiels((pre) => ({ ...pre, cookingTime: totalMinutes.toString() }));
  }, []);
  const handleEasyToCook = useCallback((value) => {
    setRecipesData((pre) => ({
      ...pre,
      basic: { ...pre.basic, easyToCook: value },
    }));
    setFiels((pre) => ({ ...pre, easyToCook: value }));
    setErrors((prev) => {
      return { ...prev, easyToCook: '' };
    });
    errorRef.current.easyToCook = '';
  }, []);
  const handleOnChange = (e) => {
    if (e === '' || (e != 0 && Number(e) <= 10)) {
      setRecipesData((pre) => ({
        ...pre,
        basic: {
          ...pre.basic,
          noOfServing: e.trim() ? e.replace(/[^0-9]+/g, '') : e.trim().replace(/[^0-9]+/g, ''),
        },
      }));
      setFiels((pre) => ({
        ...pre,
        noOfServing: e.trim() ? e.replace(/[^0-9]+/g, '') : e.trim().replace(/[^0-9]+/g, ''),
      }));
    }

    setErrors((prev) => {
      return { ...prev, noOfServing: '' };
    });
    errorRef.current.noOfServing = '';
  };

  const onAuthorChange = useCallback((event, contributorId) => {
    setRecipesData((pre) => ({
      ...pre,
      basic: { ...pre.basic, contributorId },
    }));
    setFiels((pre) => ({ ...pre, contributorId }));
    setErrors((prev) => ({ ...prev, contributorId: '' }));
    errorRef.current.contributorId = '';
  }, []);

  const callSearchUsersAPI = async (search: string) => {
    try {
      const response = await getSearchUsers(search);
      const filteredOption = [];
      response?.forEach((data) => {
        const { profile, user_id } = data._source || {};
        const label = `${profile?.first_name || ''} ${profile?.last_name || ''}`;
        filteredOption.push({
          value: user_id,
          label: label,
          subLabel: '',
        });
      });
      setAuthorOptions(filteredOption || []);
    } catch (erro) {}
  };

  const debounceSearchFun: any = debounce((_, search) => callSearchUsersAPI(search), 500);

  return (
    <div className={classes.basicDetailsContainer}>
      <div className={classes.inputContainer}>
        <MemoInputField
          onChange={handleChange}
          name="name"
          label="Recipe Name"
          value={fields.name}
          helperText={errors.name ? errors.name : errors.exist}
        />
        <MemoInputField
          name="description"
          onChange={handleChange}
          label="Description"
          value={fields.description}
          multiline
          maxRows={5}
          helperText={errors.description}
        />

        <MemoSelect
          headerTitle={'Food restriction'}
          options={FOOD_RESTRICTIONS_OPTIONS}
          values={fields.foodRestriction}
          setValues={handleFoodRestriction}
          optionsType={'label'}
          position={'bottom'}
          placeholder={'Food restriction'}
          isDivider
          isAutoOk
          helperText={errors.foodRestriction}
          isWithIcon
          listAutoHeight={true}
        />
        <MemoSelect
          headerTitle={'Cuisine'}
          options={cuisineOptions}
          values={fields.cuisine}
          setValues={handleCuisine}
          optionsType={'label'}
          position={'bottom'}
          placeholder={'Cuisine'}
          isDivider
          isAutoOk
          isSearch
          helperText={errors.cuisine}
        />
        <MemoInputField
          name="noOfServing"
          onChange={(e) => handleOnChange(e.target.value)}
          label="No of Serving (1 - 10)"
          value={fields.noOfServing}
          helperText={errors.noOfServing}
        />
        <MemoMUIAutoSelect
          options={authorOptions}
          InputProps={{
            label: 'Author',
            placeholder: '',
            helperText: errors.contributorId,
          }}
          error={Boolean(errors.contributorId)}
          onChange={onAuthorChange}
          value={fields.contributorId}
          onInputChange={debounceSearchFun}
          fullWidth
        />
        <div className={classes.easyToCookWrapper}>
          <div className={`${commonClass.body17Regular} label`}>Easy to cook</div>
          <MemoRadioGroup
            variant={'tokenWithoutCross'}
            options={easyToCookOptions}
            value={fields.easyToCook}
            setValue={handleEasyToCook}
          />
          {errors?.easyToCook && <span className={classes.errorText}>{errors.easyToCook}</span>}
        </div>
        <div className={classes.easyToCookWrapper}>
          <div className={`${commonClass.body17Regular} label`}>Images</div>
          <RecipeUpload
            maxFileSizeMb={10}
            uploadFiles={uploadFiles}
            recipeId={recipeData.basic.recipeId}
            sessions={sessions}
            setRecipesData={setRecipesData}
            recipeData={recipeData}
            imageUrl={recipeData.basic.files}
            setImageupload={(event) => {}}
            acceptedFiles={fileTypes}
            multiple
          />
          {errors.image && <span className={classes.errorText}>{errors.image}</span>}
        </div>
      </div>

      <PanelFooter
        customStyle={classes.footerStyle}
        leftButtonText={'Back'}
        righButtontText={'Next'}
        handleLeftButton={handleCancel}
        handleRightButton={() => {
          handleNext(recipeData);
        }}
      />
    </div>
  );
};

export default BasicDetails;
