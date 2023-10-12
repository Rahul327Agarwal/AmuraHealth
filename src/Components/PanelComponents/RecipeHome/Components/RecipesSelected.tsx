import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setDiet, setRangeSliderValue, setTempFilters } from '../../../../DisplayFramework/State/Slices/RecipeSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { AutoSizer, List } from '../../../../Utilities/AutoResizerWrapper';
import Accordian from '../../../LibraryComponents/Accordian/Accordian';
import InputSlider from '../../../LibraryComponents/InputSlider/InputSlider';
import Token from '../../../LibraryComponents/MUIToken/MUIToken';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../../LibraryComponents/PannelFooter/PannelFooter';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import { BackIcon, Filter, SearchIconRecipe } from './RecipesSelected.svg';
import {
  FOOD_RESTRICTIONS_OPTIONS,
  fetchRecipeById,
  getAction,
  getCookIn30Recipes,
  getFavouriteRecipe,
  getFilteredRecipes,
  getNewlyAddedRecipes,
  getRecipeByTitle,
  removeFavoriteRecipes,
  searchAndShowRecipe,
} from '../RecipeHome.functions';
import { HEADER, ISelectedRecipeProps } from '../RecipeHome.types';
import Recipe from './Recipe';
import { getHAndMinString } from './RecipePanel/RecipePanel.function';
import { useStyles } from './RecipesSelected.styles';
import { NoSearchResultIcon, SearchResultIconNew } from './RecipesSelected.svg';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function RecipesSelected(props: ISelectedRecipeProps) {
  const {
    actionType,
    setActionType,
    handlePreviewRecipe,
    navigatedFrom,
    initialNavigatedFrom,
    setNavigatedFrom,
    setSelectedRecipes,
    selectedRecipes,
    panel,
  } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const { isFavourite, isFilter, isViewAll, isFilterOption } = getAction(actionType);
  const initSelectedFilter = {
    category: 'cookingTime',
    filters: ['under30min'],
    query: JSON.stringify({ range: { totalCookingTime: { lte: 30 * 60 } } }),
  };
  const [selectedFilter, setSelectedFilter] = useState([initSelectedFilter]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [tempSearchRecipes, setTempSearchRecipes] = useState([]);

  const [search, setSearch] = useState('');

  // const [rangeSliderValue, setRangeSliderValue] = useState(30);

  const [isLoading, setIsLoading] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const dispatch = useDispatch();

  const { tempFilters, diet, rangeSliderValue } = useSelector((state: IRootState) => state.Recipe);

  useEffect(() => {
    setIsLoading(true);
    if (navigatedFrom !== 'PREVIEW') {
      setSelectedRecipes({ ...selectedRecipes, recipes: [], searchedvalue: '', searchedData: [] });
      callSearchRecipesAPI('');
    }
  }, []);
  useEffect(() => {
    if (tempFilters.diet.length > 0) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [tempFilters]);

  useEffect(() => {
    if (navigatedFrom === 'PREVIEW') {
      setSearch(selectedRecipes.searchedvalue);
      setTempSearchRecipes(
        selectedRecipes.searchedvalue.trim().length > 2
          ? selectedRecipes.searchedData?.filter((item) =>
              item?.title?.toLowerCase().includes(selectedRecipes.searchedvalue?.toLowerCase().trim())
            )
          : selectedRecipes.searchedData
      );
      if (selectedRecipes.recipes.length > 0) {
        setIsFilterApplied(true);
        setIsLoading(false);
      }
    }
  }, [navigatedFrom]);

  const callSearchRecipesAPI = async (e) => {
    // setSearch(e);
    try {
      let recipes = [];
      if ('NEWLY_ADDED' === actionType) {
        recipes = await getNewlyAddedRecipes(props, 50, e);
        setTempSearchRecipes(recipes);
        setIsLoading(false);
        return recipes;
      } else if ('VIEW_ALL' === actionType) {
        // recipes = await getFavouriteRecipe(props);
        setTempSearchRecipes(recipes);
        setIsLoading(false);
        return recipes;
      } else if ('COOK_UNDER_30' === actionType) {
        recipes = await getCookIn30Recipes(props, 50, e);
        setTempSearchRecipes(recipes);
        setIsLoading(false);
        return recipes;
      }
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
  };
  const handleFilter = async (payload, searchvalue?: string) => {
    setIsFilterApplied(true);
    dispatch(setDiet([...tempFilters.diet]));
    try {
      const must = [];
      payload.forEach((el) => {
        must.push(JSON.parse(el.query));
      });
      if (searchvalue.length) {
        must.push({ match_phrase_prefix: { title: `${searchvalue}` } });
      }
      if (navigatedFrom === 'COOK_UNDER_30') {
        must.push({ range: { totalCookingTime: { lte: 30 * 60 } } });
      }
      if (rangeSliderValue && navigatedFrom !== 'COOK_UNDER_30') {
        // must.push({ range: { totalCookingTime: { [rangeSliderValue > 120 * 60 ? 'gt' : 'lte']: rangeSliderValue * 60 } } });
        must.push({ range: { totalCookingTime: { [rangeSliderValue > 120 ? 'gt' : 'lte']: rangeSliderValue * 60 } } });
      }
      let query: any = {
        query: { bool: { filter: { bool: { must: [{ bool: { must } }] } } } },
        size: 10000,
      };
      if (navigatedFrom === 'NEWLY_ADDED') {
        query = { ...query, sort: [{ createdOn: { order: 'desc' } }] };
      }
      const response = await getFilteredRecipes(props, query);
      setTempSearchRecipes(response);
      setSelectedRecipes({ ...selectedRecipes, recipes: response });
      setIsFilterApplied(true);
      setIsLoading(false);
      setActionType('FILTER');
      setNavigatedFrom(selectedRecipes.header);
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
  };

  const handleSearchString = async (value) => {
    setSearch(value);
    if (isFilterApplied) {
      return await handleFilter(selectedFilter, value);
    }
    try {
      let searchResponse = [];
      if (value.length > 2) {
        setIsLoading(true);
        switch (initialNavigatedFrom) {
          case 'COOK_UNDER_30':
            searchResponse = await getCookIn30Recipes(props, 10000, value);
            break;
          case 'NEWLY_ADDED':
          case 'VIEW_ALL':
          case 'PREVIEW':
            searchResponse = await getRecipeByTitle(props, value);
            break;
          default:
            searchResponse = [];
            break;
        }
        setTempSearchRecipes(searchResponse);
        setIsSearchApplied(true);
      } else {
        await handleclear(true);
        setIsSearchApplied(false);
      }
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const callGetAny50Recipes = async () => {
    let recipes = [];
    recipes = await getFavouriteRecipe(props);
    setSearchedRecipes(recipes);
  };

  // const debounceOnFocus: Function = debounce(callSearchRecipesAPI, 500);

  const debounceFun: Function = debounce(handleSearchString, 500);

  /** Opens up the Filter screen */
  const handleFilterOptions = () => {
    setActionType('FILTER_OPTION');
    // dispatch(setTempFilters({ sliderValue: rangeSliderValue, diet: diet, filters: selectedFilter }));
  };

  const handleClearAll = () => {
    setIsFilterApplied(false);
    // setTempFilters({ sliderValue: rangeSliderValue, diet: diet, filters: selectedFilter });
    setSelectedFilter([]);
    dispatch(setRangeSliderValue(30));
    dispatch(setDiet([]));
    handleTimeRange(30);
    setActionType('HOME');
  };

  const handleFilterBack = () => {
    setNavigatedFrom(navigatedFrom === 'HOME' ? 'HOME' : selectedRecipes.header);
    setActionType(actionType === 'FILTER_OPTION' ? (navigatedFrom === 'HOME' ? 'HOME' : selectedRecipes.header) : 'HOME');

    // set filters state from tempFilters
    setSelectedFilter(tempFilters.filters);
    // setRangeSliderValue(tempFilters.sliderValue);
    dispatch(setTempFilters({ ...tempFilters, diet: [...diet] }));
  };
  const handleClearFilter = async () => {
    if (!isFilterApplied) return;
    setNavigatedFrom(navigatedFrom === 'HOME' ? 'HOME' : selectedRecipes.header);
    setSelectedFilter([]);
    dispatch(setRangeSliderValue(30));
    dispatch(setDiet([]));
    handleTimeRange(30);
    setIsFilterApplied(false);

    if (!search && navigatedFrom === 'VIEW_ALL') {
      setTempSearchRecipes([]);
    }

    if (!search && navigatedFrom === 'NEWLY_ADDED') {
      let recipes = await getNewlyAddedRecipes(props, 50);
      setTempSearchRecipes(recipes);
    }
    if (!search && navigatedFrom === 'COOK_UNDER_30') {
      let recipes = await getCookIn30Recipes(props, 50);
      setTempSearchRecipes(recipes);
    }
    if (search) {
      await searchAndShowRecipe(panelId, {
        setIsLoading,
        initialNavigatedFrom,
        search,
        props,
        setTempSearchRecipes,
        setIsSearchApplied,
      });
    }
    dispatch(setTempFilters({ sliderValue: 30, diet: [], filters: [] }));
  };

  const handleRemove = (recipeId) => {
    removeFavoriteRecipes(panelId, { ...props, recipeId });
  };

  const handleclear = async (isfromSearchText?: boolean) => {
    try {
      if (!isfromSearchText) {
        setIsFilterApplied(false);
        setSelectedFilter([]);
        dispatch(setRangeSliderValue(30));
        dispatch(setDiet([]));
        setSearch('');
      }
      if (initialNavigatedFrom === 'VIEW_ALL') {
        setTempSearchRecipes([]);
      } else if (initialNavigatedFrom === 'COOK_UNDER_30') {
        let recipes = await getCookIn30Recipes(props, 50);
        setTempSearchRecipes(recipes);
      } else if (initialNavigatedFrom === 'NEWLY_ADDED') {
        let recipes = await getNewlyAddedRecipes(props, 50);
        setTempSearchRecipes(recipes);
      } else {
        setTempSearchRecipes([]);
      }
    } catch (error) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
  };

  const handleTimeRange = (e) => {
    setIsFilterApplied(true);
    const category = 'cookingTime';
    var option = '';
    var query = '';
    if (e <= 120) {
      option = 'under30min';
      query = JSON.stringify({ range: { totalCookingTime: { lte: e * 60 } } });
      handleSelect(category, option, query);
      return;
    }
    if (e === 121) {
      option = 'morethan1hr';
      query = JSON.stringify({ range: { totalCookingTime: { gte: 120 * 60 + 1 } } });
      handleSelect(category, option, query);
      return;
    }
    // handleSelect(category, option, query);
  };

  const handleSelect = (category, option, query) => {
    setSelectedFilter((pre) => {
      let finalFilters = [];
      if (pre?.length) {
        let newtest: any = {};
        let samecategory = false;
        pre?.forEach((v) => {
          if (v.category === category) {
            const filters = v?.filters?.includes(option) ? v?.filters : [option];
            newtest = { category, filters, query };
            samecategory = true;
          } else if (!samecategory) {
            newtest = { category, filters: [option], query };
          }
        });
        const modified = pre.filter((v) => v.category !== category);
        if (newtest.filters.length === 0) {
          finalFilters = modified;
        } else {
          finalFilters = [...modified, newtest];
        }
      } else {
        finalFilters = [{ category, filters: [option], query }];
      }
      if (category === 'diet' && !option?.length) {
        finalFilters = finalFilters.filter((v) => v.category !== 'diet');
      }
      return finalFilters;
    });
  };
  const handleDiet = (value) => {
    let indexOfSelectedFilter = -1;
    for (let i = 0; i < tempFilters.diet.length; i++) {
      if (tempFilters.diet[i] === value) {
        indexOfSelectedFilter = i;
        break;
      }
    }
    let selections;

    if (indexOfSelectedFilter >= 0) {
      selections = tempFilters.diet.filter((item) => item !== value);
      dispatch(setTempFilters({ ...tempFilters, diet: selections }));
    } else {
      selections = [...tempFilters.diet, value];
      dispatch(setTempFilters({ ...tempFilters, diet: [...tempFilters.diet, value] }));
    }
    handleSelect('diet', selections, JSON.stringify({ terms: { dietType: selections } }));
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.fexContainer}>
        {selectedRecipes.header === 'VIEW_ALL' ? (
          <></>
        ) : (
          <div className={classes.headerDiv}>
            <PageHeader
              customStyle={classes.headerDivWidth}
              isClearAll={actionType === 'FILTER_OPTION'}
              startAdornment={
                <span className={classes.backIcon} onClick={handleFilterBack}>
                  {<BackIcon />}
                </span>
              }
              headerContent={actionType === 'FILTER_OPTION' ? 'Filter' : HEADER[selectedRecipes.header]}
              clearAllText={
                <span className={`${isFilterApplied ? classes.darkText : classes.clearText} ${commonClass.caption12Medium}`}>
                  {actionType === 'FILTER_OPTION' ? 'Clear All' : ''}
                </span>
              }
              handleClearAll={() => {
                setIsFilterApplied(false);
                if (actionType === 'FILTER_OPTION') {
                  handleClearFilter();
                }
              }}
            />
          </div>
        )}

        <div className={`${classes.bodyDiv} subBodyDiv ${isFilterOption ? classes.maxHeight : ''}`}>
          {/* Filter - Cooking */}
          {isFilterOption && (
            <div>
              <Accordian
                defaultExpanded
                // disabled={navigatedFrom === 'COOK_UNDER_30'}
                customStyle={classes.accordianWrap}
                accordianTitle="Cooking time"
                subTitle={`${rangeSliderValue > 120 ? 'Over' : 'Under'} ${getHAndMinString(
                  rangeSliderValue === 121 ? 120 : rangeSliderValue
                )}`}
              >
                <div className={classes.rangeSlider}>
                  <InputSlider
                    value={rangeSliderValue}
                    min={15}
                    max={121}
                    handleChange={(e) => {
                      dispatch(setRangeSliderValue(e));
                      handleTimeRange(e);
                    }}
                  />
                </div>
              </Accordian>
            </div>
          )}

          {/* Filter - Food Type */}
          {isFilterOption && (
            <Accordian defaultExpanded customStyle={classes.accordianWrap} accordianTitle="Food restriction">
              {/* <RadioGroup variant="tokenMultiselect" valueArray={diet} setValue={handleDiet} options={FOOD_RESTRICTIONS_OPTIONS} /> */}
              <div className={classes.groupRadioWrapper}>
                {FOOD_RESTRICTIONS_OPTIONS?.map((data, index) => (
                  <Token
                    key={index}
                    label={data.label}
                    onClick={() => {
                      // setIsFilterSelected(true);
                      handleDiet(data.value);
                    }}
                    // disabled={disabled}
                    active={Boolean(tempFilters.diet.includes(data.value))}
                    {...(tempFilters.diet.includes(data.value) ? { onDelete: () => handleDiet(data.value) } : {})}
                  />
                ))}
              </div>
            </Accordian>
          )}
          {!isFilterOption && (
            <>
              <div className={`${classes.searchCardWrap} ${classes.addMarginRL}`}>
                <div className={classes.searchFieldWrap}>
                  {selectedRecipes.header === 'VIEW_ALL' && (
                    <BackIcon onClick={handleFilterBack} className={classes.backArrowIcon} />
                  )}

                  <SearchField
                    customStyle={classes.seachbox}
                    value={search}
                    searchIcon={<SearchIconRecipe />}
                    placeholder={'Search for recipes'}
                    handleSearch={debounceFun}
                    autoFocus={'VIEW_ALL' ? true : false}
                  />
                </div>
                <span
                  className={`${classes.squareIconDiv} ${isFilterApplied ? classes.bgDark : classes.bgLight}`}
                  onClick={handleFilterOptions}
                >
                  {isFilterApplied && <span className={classes.filterbadge}></span>}
                  {<Filter />}
                </span>
              </div>

              <div className={`${classes.searchResultBox} ${classes.addMarginRL}`}>
                {isFilterApplied || search.length > 0 ? (
                  <>
                    <div className={`${commonClass.caption12Medium} ${classes.resultCount}`}>
                      {!isLoading && `${tempSearchRecipes?.length} results found`}
                    </div>
                    <div className={`${commonClass.caption12Medium} ${classes.clearColor}`} onClick={() => handleclear()}>
                      Clear all
                    </div>
                  </>
                ) : null}
              </div>

              {tempSearchRecipes?.length ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      height: 'calc(100% - 100px)',
                    }}
                    className={`${classes.subRecipesDiv} ${isFavourite || isViewAll ? classes.isDisplayInLine : ''}`}
                  >
                    <AutoSizer
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {({ height, width }) => (
                        <List
                          className={classes.listStyle}
                          tabIndex={-1}
                          data={tempSearchRecipes}
                          width={width}
                          // height={parseInt(panel?.height) - 200}
                          height={height}
                          rowCount={tempSearchRecipes.length}
                          rowHeight={151}
                          rowRenderer={({ index, style }) => {
                            const data = tempSearchRecipes[index] || {};
                            const { title, files, foodType, totalCookingTime, dietType, ingredientInfo, easyToCook } = data;
                            const calories = ingredientInfo?.calories || 0;
                            return (
                              <div className={classes.recipeList} key={index} style={style}>
                                <Recipe
                                  onClick={async () => {
                                    setSelectedRecipes({
                                      ...selectedRecipes,
                                      searchedvalue: search,
                                      searchedData: tempSearchRecipes,
                                    });
                                    const recipeDetails = await fetchRecipeById(panelId, props, data.recipeId);
                                    if (!recipeDetails) return;

                                    handlePreviewRecipe(recipeDetails, actionType);
                                  }}
                                  key={data?._id}
                                  calories={calories}
                                  recipeName={title}
                                  imageUrl={files?.[0]}
                                  foodType={foodType?.split('__')[0]}
                                  cookingTime={totalCookingTime}
                                  dietType={dietType}
                                  easyToCook={easyToCook}
                                  isDisplayInLine
                                  {...((isFavourite || isViewAll) && {
                                    isDisplayInLine: true,
                                    isButton: Boolean(isFavourite),
                                    buttonText: 'Remove',
                                    handleButton: () => handleRemove(data?.recipe_id),
                                  })}
                                  {...props}
                                />
                              </div>
                            );
                          }}
                        />
                      )}
                    </AutoSizer>
                  </div>
                </>
              ) : (
                !isLoading &&
                tempSearchRecipes?.length == 0 && (
                  <div className={classes.noSearchcontainer}>
                    <span className={classes.noSearchIcon}>
                      {search.trim().length > 2 ? <NoSearchResultIcon /> : <SearchResultIconNew />}
                    </span>
                    <p className={`${classes.paraStyle} ${commonClass.body17Medium} primary`}>
                      {search.trim().length > 2 ? 'No search result found' : 'Search for recipe'}
                    </p>
                    {/* <p className={`${classes.paraStyle} primary`}>No search result found</p> */}
                    {/* <p className={classes.paraSubStyle}>Try changing your filters</p> */}
                  </div>
                )
              )}
            </>
          )}
        </div>

        {/* Filter Footer */}
        {isFilterOption && (
          <div className={classes.footerDiv}>
            <PannelFooter
              handleAdd={() => {
                handleFilter(selectedFilter, search);
              }}
              handleCancel={() => {
                // handleClearAll();
                // setActionType('HOME');
                handleFilterBack();
              }}
              buttonOneTitle="Cancel"
              buttonTwoTitle="Apply"
            />
          </div>
        )}
      </div>
    </div>
  );
}
