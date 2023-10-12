import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FreeMode, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { setRangeSliderValue, setTempFilters } from '../../../DisplayFramework/State/Slices/RecipeSlice';
import { IRootState, useAppSelector } from '../../../DisplayFramework/State/store';
import SearchField from '../../LibraryComponents/SearchField/SearchField';
import { BackIcon, Filter, PlusIcon, RecipeSearchIcon } from '../RecipeHome/Components/RecipesSelected.svg';
import ScreenOne from './Components/PreparationSteps/ScreenOne';
import Recipe from './Components/Recipe';
import RecipePanel from './Components/RecipePanel/RecipePanel';
import RecipesBuilderHome from './Components/RecipesBuilder/RecipesBuilder';
import RecipesSelected from './Components/RecipesSelected';
import {
  fetchRecipeById,
  getCookIn30Recipes,
  getFavouriteRecipe,
  getNewlyAddedRecipes,
  getRecipeByTitle,
} from './RecipeHome.functions';
import { useStyles } from './RecipeHome.styles';
import { Actions, IProps, IUserNameObj } from './RecipeHome.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function RecipeHome(props: IProps) {
  const { sessions } = props;
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const { tempFilters } = useSelector((state: IRootState) => state.Recipe);
  const [actionType, setActionType] = useState<Actions>('HOME');
  const [recipes, setRecipes] = useState<any>([]);
  const [defaultRecipes, setDefaultRecipes] = useState({
    recipes: [],
    searchedvalue: '',
    searchedData: [],
    header: 'VIEW_ALL',
  });
  const [recipesData, setRecipesData] = useState({});
  const [action, setAction] = useState<Actions>('HOME');
  const [filtericon, setFiltericon] = useState(true);
  const [navigatedFrom, setNavigatedFrom] = useState('HOME');
  const [initialNavigatedFrom, setInitialNavigatedFrom] = useState('HOME');
  const [isEdit, setIsEdit] = useState(false);
  const [contributorNames, setContributorNames] = useState<IUserNameObj>({});
  const loggedInUserInfo = useAppSelector((state) => state.displayFrameWork.loggedInUserInformation);
  const isStaffUser = loggedInUserInfo?.allRoles.length;

  useEffect(() => {
    if (actionType === 'HOME') {
      setDefaultRecipes({ ...defaultRecipes, header: 'VIEW_ALL' });
      dispatch(setTempFilters({ ...tempFilters, diet: [] }));
      dispatch(setRangeSliderValue(30));

      callGetRecipesAPI('');
    }
  }, [actionType]);
  const handleBack = () => {
    callGetRecipesAPI();
    setFiltericon(true);
  };

  const callGetRecipesAPI = async (searchText?: string, isOnFocus?: boolean) => {
    try {
      if (searchText) {
        if (isOnFocus) {
          const searchResponse = await getFavouriteRecipe(props);
          const recipesData = [];
          recipesData.push({
            category_id: 'search',
            category_name: 'Search Results',
            recipes: searchResponse,
          });
          setRecipes(recipesData);
          return;
        } else {
          const searchResponse = await getRecipeByTitle(props, searchText);
          const recipesData = [];
          recipesData.push({
            category_id: 'search',
            category_name: 'Search Results',
            recipes: searchResponse,
          });
          setRecipes(recipesData);
          return;
        }
      }
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
    const recipesData = [];

    try {
      const newlyAddedResponse = await getNewlyAddedRecipes(props, 10, searchText);
      if (newlyAddedResponse?.length) {
        recipesData.push({
          category_id: 'NEWLY_ADDED',
          category_name: 'Newly Added',
          recipes: newlyAddedResponse,
        });
      }
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
    try {
      const cookIn30MinResponse = await getCookIn30Recipes(props, 10, searchText);
      if (cookIn30MinResponse?.length) {
        recipesData.push({
          category_id: 'COOK_UNDER_30',
          category_name: 'Cook in 30 min',
          recipes: cookIn30MinResponse,
        });
      }
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }

    setRecipes(recipesData);
  };
  const handleFilterOptions = () => {
    setNavigatedFrom('HOME');
    setInitialNavigatedFrom('HOME');
    setActionType('FILTER_OPTION');
  };

  const callGetAny50Recipes = async () => {
    // let recipes = [];
    // recipes = await getFavouriteRecipe(props);
    // // const recipesData = [];
    // // recipesData.push({
    // //   category_id: "search",
    // //   category_name: "Search Results",
    // //   recipes: recipes,
    // // });
    // setDefaultRecipes({recipes: recipes})
    setActionType('VIEW_ALL');
    setNavigatedFrom('VIEW_ALL');
    setInitialNavigatedFrom('VIEW_ALL');
    // setRecipes(recipesData);
  };

  const debounceOnFocus: Function = debounce(callGetAny50Recipes, 500);

  // const handleFavourite = async () => {
  //   setActionType('FAVOURITE');
  //   setSelectedRecipes({});
  // };

  const handlePreviewRecipe = (recipe, action) => {
    if (Object.keys(recipe).length) {
      setAction(action);
      setRecipesData(recipe);
      setActionType('PREVIEW_RECIPE');
    }
  };

  switch (actionType) {
    case 'HOME': {
      return (
        <div className={classes.mainContainer}>
          <div className={classes.fexContainer}>
            <div className={classes.headerDiv}>
              <div className={classes.backBtnContainer}>
                {filtericon !== true && (
                  <span className={classes.backIcon} onClick={() => handleBack()}>
                    {<BackIcon />}
                  </span>
                )}
                {/* <PageHeader isClearAll={false} headerContent="Recipes" handleClearAll={() => {}} /> */}
              </div>
              <div className={classes.searchCardWrap}>
                <div className={classes.searchFieldWrap}>
                  <SearchField
                    customStyle={classes.seachbox}
                    value={''}
                    placeholder={'Search items'}
                    handleSearch={() => {}}
                    isReadOnly
                    disableAutoFocus
                    onClick={() => debounceOnFocus()}
                    searchIcon={<RecipeSearchIcon />}
                  />
                </div>
                <span className={classes.squareIconDiv} onClick={handleFilterOptions}>
                  {<Filter />}
                </span>
              </div>
            </div>
            <div className={classes.bodyDiv} data-header-hidable>
              {recipes?.map((data) => (
                <div className={classes.recipesDiv} key={data?.category_id}>
                  <div className={classes.recipeHead}>
                    <span className={classes.recipeCategory}>{data?.category_name}</span>
                    <span
                      className={`${classes.viewAll} ${commanClass.caption12Medium}`}
                      onClick={() => {
                        setDefaultRecipes({
                          ...defaultRecipes,
                          header: data?.category_id,
                        });
                        setActionType(data?.category_id);
                        setNavigatedFrom(data?.category_id);
                        setInitialNavigatedFrom(data?.category_id);
                      }}
                    >
                      View All
                    </span>
                  </div>
                  <Swiper
                    slidesPerView={1.15}
                    freeMode={true}
                    modules={[FreeMode, Mousewheel]}
                    className="mySwiper"
                    // loopFillGroupWithBlank={false}
                    // loop={false}
                    slidesOffsetAfter={0}
                    mousewheel={{
                      releaseOnEdges: true,
                      // forceToAxis: true,
                    }}
                    // direction={'horizontal'}
                    // edgeSwipeThreshold={20}
                    spaceBetween={20}
                    centeredSlides={false}
                  >
                    {data?.recipes?.map((item, index) => {
                      const {
                        nutritionalFacts,
                        title,
                        files,
                        foodType,
                        dietType,
                        totalCookingTime,
                        totalCalories,
                        easyToCook,
                        recipeId,
                        totalTime,
                        ingredientInfo,
                      } = item || {};
                      const calories = ingredientInfo?.calories
                        ? ingredientInfo?.calories
                        : nutritionalFacts?.reduce((accumulator, curValue) => accumulator + curValue.kcal, 0);
                      const cookingTime = totalCookingTime ? totalCookingTime : totalTime;
                      return (
                        <SwiperSlide
                          key={recipeId}
                          onClick={async () => {
                            const recipeDetails = await fetchRecipeById(panelId, props, item.recipeId);

                            console.log('recipeDetails', recipeDetails);
                            if (!recipeDetails) return;
                            handlePreviewRecipe(recipeDetails, actionType);
                          }}
                        >
                          <Recipe
                            onClick={() => {}}
                            recipeName={title}
                            imageUrl={files?.[0]}
                            foodType={foodType?.split('__')[0]}
                            calories={calories}
                            cookingTime={cookingTime}
                            dietType={dietType}
                            easyToCook={easyToCook}
                            {...props}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              ))}
            </div>
            {isStaffUser > 0 && (
              <div className={classes.footerDiv}>
                <span className={classes.addButtonWrapper}>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setActionType('ADD_RECIPE');
                    }}
                    className={classes.addButton}
                  >
                    {<PlusIcon />}
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    case 'ADD_RECIPE': {
      return (
        <RecipesBuilderHome
          isEdit={isEdit}
          ClickedRecipesData={recipesData}
          setActionType={setActionType}
          sessions={sessions}
          contributorNames={contributorNames}
          setContributorNames={setContributorNames}
          {...props}
        />
      );
    }
    case 'PREPARE_STEPS': {
      return <ScreenOne recipesData={recipesData} setActionType={setActionType} />;
    }
    case 'PREVIEW_RECIPE': {
      return (
        <RecipePanel
          recipesData={recipesData}
          setRecipesData={setRecipesData}
          setActionType={setActionType}
          action={action}
          setNavigatedFrom={setNavigatedFrom}
          handleViewByUser={() => {}}
          panel={props.panel}
          sessions={sessions}
          setIsEdit={setIsEdit}
          contributorNames={contributorNames}
          setContributorNames={setContributorNames}
        />
      );
    }
    default: {
      return (
        <RecipesSelected
          actionType={actionType}
          setActionType={setActionType}
          selectedRecipes={defaultRecipes}
          setSelectedRecipes={setDefaultRecipes}
          handlePreviewRecipe={(recipe, action) => handlePreviewRecipe(recipe, action)}
          navigatedFrom={navigatedFrom}
          setNavigatedFrom={setNavigatedFrom}
          initialNavigatedFrom={initialNavigatedFrom}
          {...props}
        />
      );
    }
  }
}
