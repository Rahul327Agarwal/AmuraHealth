import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { PMS_LOCALE, PMS_S3 } from '../../../../../Utils';
import ModalBox from '../../../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from '../../../../LibraryComponents/PageHeader/PageHeader';
import TabComponent from '../../../../LibraryComponents/TabComponent/Tab';
import RecipeHome from '../../RecipeHome';
import { getRecipeCheckByTitle } from '../../RecipeHome.functions';
import BasicDetails from './BasicDetails/BasicDetails';
import { defaultBasicDetailsState, validateBasicDetails } from './BasicDetails/BasicDetails.function';
import SearchTags from './BasicDetails/SearchTags';
import AddIngredients from './Ingredients/AddIngredients';
import Ingredients from './Ingredients/Ingredients';
import SearchIngredients from './Ingredients/SearchIngredients';
import Preparation from './Preparation/Preparation';
import {
  BUILDER_TABS,
  addRecipeAPI,
  convertIngredientInfoToString,
  getContributorName,
  getImage,
  initBasic,
  initPreparation,
  updateRecipeAPI,
  uploadFiles,
} from './RecipesBuilder.function';
import { useRecipeFiles } from './RecipesBuilder.state';
import { useStyles } from './RecipesBuilder.styles';
import { IProps, actionType } from './RecipesBuilder.types';
// import Steps from "./Steps/Steps"; TODO:
import SuccesScreen from './SuccesScreen';
import { useFetchUserName } from '../../../../../Common/Common.hooks';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';

const RecipesBuilderHome = (props: IProps) => {
  const { setActionType, sessions, isEdit, ClickedRecipesData, contributorNames, setContributorNames } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [action, setAction] = useState<actionType>({
    screen: 'BASIC_DETAILS',
    payload: {},
  });
  const [errorState, setErrorState] = useState(defaultBasicDetailsState);
  const [tabDetails, setTabDetails] = useState(JSON.parse(JSON.stringify(BUILDER_TABS)));
  const [basicStates, setBasicStates] = useState(initBasic());
  const [ingredientsState, setIngredientsState] = useState([]);
  const [preparationState, setPreparationState] = useState(initPreparation);
  const [recipeData, setRecipesData] = useState({
    basic: { recipeId: uuidv4(), files: [] } as any,
    ingredient: [],
    prepration: [],
  });
  const [ingredientInfo, setIngredientInfo] = useState({});
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [stepsScreen, setStepsScreen] = useState(false);
  const [initialScreen, setInitialScreen] = useState(true);
  const [isSubmitingRecipe, setIsSubmitingRecipe] = useState(false);

  const [recipeFiles, setRecipeFiles] = useRecipeFiles();
  const { fetchUserName } = useFetchUserName();

  const errorRef = useRef<typeof defaultBasicDetailsState>(defaultBasicDetailsState);
  const handleBack = () => {
    if (action.screen === 'INPUT_INGREDIENTS' || action.screen === 'ADD_INGREDIENTS') {
      setAction({ screen: 'INGREDIENTS' });
    } else if (action.screen === 'PREPARATION' && stepsScreen === true) {
      setInitialScreen(true);
      setAction({ screen: 'PREPARATION' });
      setStepsScreen(false);
    } else {
      setActionType('HOME');
      setRecipesData({
        basic: { recipeId: uuidv4(), files: [] } as any,
        ingredient: [],
        prepration: [],
      });
      setRecipeFiles({
        originalRecipeFilesURLs: [] as string[],
        editedOrignalFileURLs: [] as string[],
        recipeFiles: [] as File[],
        sourceRecipeFiles: [] as File[],
        originalPreparationFilesURLs: {},
        editedOrignalPreparationFileURLs: {},
        preparationFiles: {},
        sourcePreparationFiles: {},
      });
    }
  };
  const handletabchange = (screen) => {
    setAction({ screen: screen });
    setTabDetails((pre) =>
      pre.map((tab) => {
        if (tab.id === screen) {
          tab.showError = false;
          return tab;
        }
        return tab;
      })
    );
  };

  const getAllCuisines = async (props: any) => {
    let allCuisines = await PMS_S3.getObject(`pms-ql-cuisines/allCuisines.json`, import.meta.env.VITE_PLATFORM_BUCKET, {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    });
    return Promise.resolve(allCuisines);
  };

  useEffect(() => {
    if (isEdit === true) {
      (async () => {
        const contributorIdName = await getContributorName(
          ClickedRecipesData.contributorId,
          contributorNames,
          setContributorNames,
          fetchUserName
        );
        let basic = {
          recipeId: ClickedRecipesData.recipeId,
          name: ClickedRecipesData.title,
          description: ClickedRecipesData.description,
          tags: [],
          foodRestriction: ClickedRecipesData.dietType,
          cuisine: ClickedRecipesData.cuisine,
          noOfServing: ClickedRecipesData.numberOfServings,
          cookingTime: ClickedRecipesData.totalCookingTime,
          easyToCook: ClickedRecipesData.easyToCook === true ? 'yes' : 'no',
          files: ClickedRecipesData.files,
          contributorId: {
            value: ClickedRecipesData.contributorId,
            label: contributorIdName,
            subLabel: '',
          },
        };
        setRecipesData({
          basic: basic,
          ingredient: ClickedRecipesData.ingredients,
          prepration: ClickedRecipesData.steps,
        });
        setBasicStates({ ...basic });
        setIngredientsState(ClickedRecipesData.ingredients);
        setIngredientInfo(ClickedRecipesData.ingredientInfo);
        setPreparationState(ClickedRecipesData.steps);

        // ------- Load Recipes & Prepration images (Non-await)
        (async () => {
          const recipeFiles: File[] = (
            await Promise.all(
              basic.files?.map(async (url: string, index) => {
                return await getImage(url, props);
              })
            )
          ).filter((file) => file);
          const preparationFiles: Record<string, File> = {};
          const orignaPreperationURLs: Record<string, string> = {};
          await Promise.all(
            ClickedRecipesData.steps?.map(async (step: any) => {
              if (!step.image) {
                return;
              }
              preparationFiles[step.stepNo.toString()] = await getImage(step.image, props);
              orignaPreperationURLs[step.stepNo.toString()] = step.image;
            })
          );
          setRecipeFiles((p) => ({
            ...p,
            recipeFiles,
            sourceRecipeFiles: [...recipeFiles],
            originalRecipeFilesURLs: ClickedRecipesData.files,
            // preparation,
            preparationFiles,
            sourcePreparationFiles: { ...preparationFiles },
            originalPreparationFilesURLs: orignaPreperationURLs,
          }));
        })();
        // --------
      })();
    } else {
      setRecipeFiles({
        recipeFiles: [],
        sourceRecipeFiles: [],
        originalRecipeFilesURLs: [],
        preparationFiles: {},
        sourcePreparationFiles: {},
        originalPreparationFilesURLs: {},
        editedOrignalFileURLs: [],
        editedOrignalPreparationFileURLs: {},
      });
    }
  }, [isEdit]);

  useEffect(() => {
    getAllCuisines(props)
      .then((res) => {
        if (res) {
          const options = res?.map((data) => ({
            label: data.name,
            value: data.name,
          }));
          setCuisineOptions(options);
        } else {
          console.log('error');
        }
      })
      .catch((err: any) => {
        console.log('allCuisines error', err);
      });
  }, []);

  const checkRecipeNameExists = async (searchText?: string, isOnFocus?: boolean) => {
    const searchResponse = await getRecipeCheckByTitle(props, searchText);
    return searchResponse.length > 0;
  };
  const checkUpdatedRecipeNameExists = async (title?: string) => {
    const response = await getRecipeCheckByTitle(props, title);
    const isExists =
      response.length === 1 && response[0]?._source?.recipeName === title && response[0]?._id !== recipeData.basic.recipeId;
    return isExists;
  };

  const submitRecipe = async () => {
    let error = '';

    let { isValid, errorMessages } = validateBasicDetails(recipeData.basic, recipeData.basic);
    let switchedTab = false;
    if (!errorMessages.name) {
      let isExist = await (() => {
        if (isEdit) {
          return checkUpdatedRecipeNameExists(recipeData.basic.name);
        }
        return checkRecipeNameExists(recipeData.basic.name);
      })();

      if (isExist) {
        errorMessages = {
          ...errorMessages,
          ['name']: isExist ? 'A recipe exists with the same name.' : '',
        };
        isValid = false;
      }
    }
    let tab = [
      { id: 'BASIC_DETAILS', title: 'Basic details', showError: false },
      { id: 'INGREDIENTS', title: 'Ingredients', showError: false },
      { id: 'PREPARATION', title: 'Preparation', showError: false },
    ];
    if (!isValid) {
      error += 'Please enter valid input in basic details.';
      tab[0].showError = false;
      handletabchange(tab[0].id);
      switchedTab = true;
    }
    if (!ingredientsState) {
      error += 'Please add ingredients.';
      tab[1].showError = true;
      isValid = false;
      if (!switchedTab) {
        tab[1].showError = false;
        handletabchange(tab[1].id);
        switchedTab = true;
      }
    }
    if (ingredientsState && ingredientsState.length === 0) {
      error += 'Please add ingredients.';
      tab[1].showError = true;
      isValid = false;
      if (!switchedTab) {
        tab[1].showError = false;
        handletabchange(tab[1].id);
        switchedTab = true;
      }
    }
    if (!recipeData?.prepration && recipeData.prepration.length === 0) {
      error += 'Please add preparation steps';
      tab[2].showError = true;
      isValid = false;
      if (!switchedTab) {
        tab[2].showError = true;
        handletabchange(tab[2].id);
      }
    }
    setTabDetails(tab);
    setErrorState(errorMessages);
    if (!isValid) {
      ErrorToaster(error, panelId, 'error');
      return;
    }
    let totalCookingTime = 0;
    recipeData.prepration.forEach((item) => {
      totalCookingTime += Number(item?.preparationTime);
    });
    let resultIngredients = ingredientsState.map((ingredient) => {
      let result = JSON.parse(JSON.stringify(ingredient));
      if ('ingredientInfo' in result) {
        result.ingredientInfo = convertIngredientInfoToString(ingredient.ingredientInfo);
      }
      return result;
    });
    let resultIngredientInfo = convertIngredientInfoToString(ingredientInfo);

    try {
      setIsSubmitingRecipe(true);

      // --- Upload recipe Files

      let indexOfFinalRecipeFilesURL = [];
      const recipeFilesToUpload = recipeFiles.recipeFiles.map((file) => {
        const isOriginalFile = recipeFiles.originalRecipeFilesURLs.map((url) => url.split('/').pop()).includes(file.name);
        if (isOriginalFile) {
          indexOfFinalRecipeFilesURL.push(
            recipeFiles.originalRecipeFilesURLs.map((url) => url.split('/').pop()).indexOf(file.name)
          );
        }
        const isEdited = recipeFiles.editedOrignalFileURLs.map((url) => url.split('/').pop()).includes(file.name);
        if (!isOriginalFile) return file;
        if (isOriginalFile && isEdited) return file;
        return undefined;
      });

      const finalRecipeFilesURL = await Promise.all(
        recipeFilesToUpload.map(async (file, i) => {
          if (file) {
            return await uploadFiles(file, (basicStates as any).recipeId, props.sessions);
          }
          // here is the bug. modify the index
          return recipeFiles.originalRecipeFilesURLs[indexOfFinalRecipeFilesURL[i]] ?? '';
        })
      );

      // -- upload preparation files
      const preparationFilesToUpload: Record<string, File | undefined> = {};
      recipeData.prepration.forEach((item) => {
        const key = item.stepNo.toString();
        const file = recipeFiles.preparationFiles[key];

        if (!file) {
          preparationFilesToUpload[key] = undefined;
          return;
        }

        const isOriginalFile = recipeFiles.originalPreparationFilesURLs[key]
          ? recipeFiles.originalPreparationFilesURLs[key].split('/').pop() === file.name
          : false;

        const isEdited = recipeFiles.editedOrignalPreparationFileURLs[key]
          ? recipeFiles.editedOrignalPreparationFileURLs[key].split('/').pop() === file.name
          : false;
        if (!isOriginalFile) {
          preparationFilesToUpload[key] = file;
          return;
        }
        if (isOriginalFile && isEdited) {
          preparationFilesToUpload[key] = file;
          return;
        }
        preparationFilesToUpload[key] = undefined;
      });

      const finalPreperationFilesURL: Record<string, string> = {};
      await Promise.all(
        Object.keys(preparationFilesToUpload).map(async (key) => {
          const file = preparationFilesToUpload[key];
          const originalURL = recipeFiles.originalPreparationFilesURLs[key];
          const isEdited = recipeFiles.editedOrignalPreparationFileURLs[key];

          // FILE IS DELTED | NOT EDITED | NOT UPLOADED
          if (!file) {
            // FILE IS DELETED
            if (originalURL && isEdited) {
              finalPreperationFilesURL[key] = '';
            } else if (originalURL && !isEdited) {
              // FILE IS NOT EDITED
              finalPreperationFilesURL[key] = originalURL;
            }
          } else {
            // NEW FILE
            finalPreperationFilesURL[key] = await uploadFiles(file, (basicStates as any).recipeId, props.sessions);
          }
        })
      );

      const finalPreparation = recipeData.prepration
        .map((item) => {
          return {
            ...item,
            image: finalPreperationFilesURL[item.stepNo] !== undefined ? finalPreperationFilesURL[item.stepNo] ?? '' : '',
          };
        })
        .sort((a, b) => a.stepNo - b.stepNo);

      // --- -------------------

      const finalData = {
        title: recipeData.basic.name,
        recipeName: recipeData.basic.name.toUpperCase(),
        recipeId: (basicStates as any).recipeId,
        description: recipeData.basic.description,
        is_published: true,
        // files: recipeData.basic.files,
        files: finalRecipeFilesURL,
        tags: recipeData.basic.tags,
        numberOfServings: recipeData.basic.noOfServing,
        dietType: recipeData.basic.foodRestriction,
        cuisine: recipeData.basic.cuisine,
        easyToCook: recipeData.basic.easyToCook === 'yes',
        nutritionalValues: [],
        totalCookingTime: totalCookingTime,
        totalCalories: 0,
        likes: 0,
        ingredients: resultIngredients,
        ingredientInfo: resultIngredientInfo,
        // steps: recipeData.prepration,
        steps: finalPreparation,
        created_on: new Date().toISOString(),
        contributorId: recipeData.basic?.contributorId?.value,
        proteinTarget: [],
        moreNutrients: '',
        calorieTarget: [],
        carbsTarget: [],
        fatTarget: [],
        goodFor: '',
      };

      const response = await (() => {
        if (isEdit) {
          return updateRecipeAPI(props, finalData);
        }
        return addRecipeAPI(props, finalData);
      })();
      if (response?.status === 'success') {
        setAction({ screen: 'SUCCES_SCREEN' });
        setBasicStates(initBasic());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitingRecipe(false);
    }
  };

  const renderComponent = () => {
    switch (action.screen) {
      case 'BASIC_DETAILS':
        return (
          <BasicDetails
            sessions={sessions}
            setShowConfirm={setShowConfirm}
            recipeData={recipeData}
            setRecipesData={setRecipesData}
            setActionType={setActionType}
            fields={basicStates}
            setFiels={setBasicStates}
            setAction={setAction}
            payload={action.payload}
            errorState={errorState}
            cuisineOptions={cuisineOptions}
            setErrorState={setErrorState}
            errorRef={errorRef}
            isEdit={isEdit}
          />
        );
      case 'INGREDIENTS':
        return (
          <Ingredients
            setIngredientInfo={setIngredientInfo}
            recipeData={recipeData}
            setRecipesData={setRecipesData}
            fields={ingredientsState}
            setFiels={setIngredientsState}
            setAction={setAction}
            ingredientInfo={ingredientInfo}
          />
        );
      case 'PREPARATION':
        return (
          <Preparation
            sessions={sessions}
            recipeData={recipeData}
            setRecipesData={setRecipesData}
            fields={preparationState}
            setFiels={setPreparationState}
            setAction={setAction}
            ingredientInfo={ingredientInfo}
            submitRecipe={submitRecipe}
            setShowConfirm={setShowConfirm}
            stepsScreen={stepsScreen}
            setStepsScreen={setStepsScreen}
            initialScreen={initialScreen}
            setInitialScreen={setInitialScreen}
            isSubmitingRecipe={isSubmitingRecipe}
          />
        );
      case 'INPUT_TAGS':
        return <SearchTags setAction={setAction} />;
      case 'INPUT_INGREDIENTS':
        return (
          <SearchIngredients
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            ingredientOptions={ingredientOptions}
            panel={props.panel}
            fields={ingredientsState}
            setFields={setIngredientsState}
            payload={action?.payload}
            setAction={setAction}
            sessions={sessions}
            ingredientInfo={ingredientInfo}
            setIngredientInfo={setIngredientInfo}
            setIngredientOptions={setIngredientOptions}
          />
        );
      case 'ADD_INGREDIENTS':
        return (
          <AddIngredients
            setIngredientInfo={setIngredientInfo}
            ingredientInfo={ingredientInfo}
            setAction={setAction}
            alreadyAddedIngredients={ingredientsState}
            setAlreadyAddedIngredients={setIngredientsState}
            payload={action?.payload}
          />
        );
      case 'ADD_STEPS':
        // return <Steps />; TODO:
        return <div>Steps TODO</div>;
      case 'HOME':
        return <RecipeHome selectedClient={{}} {...props} />;
      case 'SUCCES_SCREEN':
        return <SuccesScreen recipeData={recipeData} setActionType={setActionType} setAction={setAction} />;
    }
  };
  const isTabs = useMemo(() => ['BASIC_DETAILS', 'INGREDIENTS', 'PREPARATION'].includes(action.screen), [action.screen]);

  return (
    <div className={classes.rootContainer}>
      <div className={classes.headerWrapper}>
        {action.screen !== 'SUCCES_SCREEN' && action.screen !== 'HOME' && (
          <PageHeader
            handleBack={() => {
              setShowConfirm(true);
            }}
            headerContent={isEdit ? 'Edit Recipe' : 'New Recipe'}
            customStyle={classes.mb}
          />
        )}
      </div>

      {isTabs && !stepsScreen && (
        <div className={classes.tabWrapper}>
          {tabDetails.map((data: any) => (
            <TabComponent
              key={data.id}
              isActive={action.screen === data.id}
              title={data.title}
              onClick={() => handletabchange(data.id)}
              isError={data.showError}
            />
          ))}
        </div>
      )}

      <div className={classes.tabContentWrapperNew}>{renderComponent()}</div>

      {/* <div className={action.screen !== 'INPUT_INGREDIENTS' ? classes.tabContentWrapper : classes.searchIngredientWrapper}>
        {renderComponent()}
      </div> */}
      <ModalBox
        panelWidth={props.panel?.width}
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        modalTitle={'Are you sure?'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: () => {
              setShowConfirm(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Continue'),
            variant: 'contained',
            onClick: () => {
              handleBack();
              setShowConfirm(false);
            },
          },
        ]}
      >
        <div className={classes.modalWrapper}>{`You want to go back to ${
          action.screen === 'INPUT_INGREDIENTS' || action.screen === 'ADD_INGREDIENTS'
            ? 'Ingredients tab'
            : action.screen === 'PREPARATION' && stepsScreen === true
            ? 'Preparation Tab'
            : 'Recipe home page.'
        }`}</div>
      </ModalBox>
    </div>
  );
};

export default RecipesBuilderHome;
