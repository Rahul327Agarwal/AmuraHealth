import { debounce, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ErrorToaster from '../../../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import IndeterminateLoader from '../../../../../LibraryComponents/InderminateLoader/InderminateLoader';
import InputField from '../../../../../LibraryComponents/InputField/InputField';
import MUIButton from '../../../../../LibraryComponents/MUIButton/MUIButton';
import RadioGroup from '../../../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import SearchField from '../../../../../LibraryComponents/SearchField/SearchField';
import { ArrowDown, EditIcon, RecipeSearchIcon } from '../RecipesBuilder.svg';
import CaloriesCard from '../../RecipeBarGraph/CaloriesCard/CaloriesCard';
import NutrientsRow from '../../RecipeBarGraph/NutrientsRow/NutrientsRow';
import { getCalorieCount, getNameValue, getNutrientValue, getUnitValue } from '../../RecipePanel/RecipePanel.function';
import SearchResult from '../Common/SearchResult';
import { checkNegligible, ingredientsUnit } from '../RecipesBuilder.function';
import { useStyles } from '../RecipesBuilder.styles';
import { SearchIngredientsProps } from '../RecipesBuilder.types';
import {
  getGraphValues,
  getIngredientsValuePerGrams,
  searchIngredients,
  searchInputDefault,
  validatesearchInput,
} from './Ingredients.function';
import { IIngredient } from './Ingredients.types';
import MUISkeleton from '../../../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../../../DisplayFramework/Components/Panel/Panel.hooks';
const SearchIngredients = (props: SearchIngredientsProps) => {
  const {
    payload,
    setAction,
    fields,
    ingredientInfo,
    ingredientOptions,
    isLoading,
    setFields,
    setIngredientInfo,
    setIsLoading,
    setIngredientOptions,
  } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commanClass = useCommonStyles();
  const commonClasses = useCommonStyles();

  const [screen, setScreen] = useState(payload.screen ? payload.screen : payload);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState(JSON.parse(JSON.stringify(searchInputDefault)));
  const [ingredientState, setIngredientState] = useState(JSON.parse(JSON.stringify(searchInputDefault)));
  const [showNutrients, setShowNutrients] = useState(false);
  const [ingredientResponse, setIngredientResponse] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [ingredientData, setIngredientdata] = useState([]);
  const [selectedGrams, setSelectedGrams] = useState(0);
  const [totalComputedValue, setTotalComputedValue] = useState({} as any);
  const [computedValue, setComputedValue] = useState({} as any);
  const [searchString, setSearchString] = useState('');

  const [selectedIngredientInfo, setSelectedIngredientInfo] = useState({} as any);
  const [showHeading, setShowHeading] = useState(0);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);
  const elementRef2 = useRef(null);
  // useEffect(()=>{
  //   setSearch('');
  //   setSearchResult([]);
  //   setIngredientResponse([]);
  //   setIngredientdata([]);
  //   setIngredientOptions([]);
  //   setIngredientState(JSON.parse(JSON.stringify(searchInputDefault)));
  // },[screen==='NAME'])
  // useEffect(() => {
  //   if(selectedGrams > 0 && showNutrients){
  //   setHeight(elementRef2.current.clientHeight ? elementRef2.current.clientHeight : 0);
  //   setShowHeading(elementRef.current.clientHeight? elementRef.current.clientHeight : 0);
  //   }

  // }, [height, showHeading]);

  useEffect(() => {
    if (screen === 'NAME') {
      setSearch('');
      setSearchResult([]);
      setIngredientResponse([]);
      setIngredientdata([]);
      setIngredientOptions([]);
      setIngredientState(JSON.parse(JSON.stringify(searchInputDefault)));
    }
  }, []);

  useEffect(() => {
    setSearchResult([]);
  }, []);

  const clearSearchData = () => {
    setSearch('');
    setSearchResult([]);
    setIngredientResponse([]);
    setIngredientdata([]);
    setIngredientOptions([]);
    setIngredientState(JSON.parse(JSON.stringify(searchInputDefault)));
  };

  useEffect(() => {
    if (ingredientOptions.length > 0) {
      setIngredientdata(ingredientOptions);
      const data = ingredientOptions.map((ele) => {
        // return ele.ingredientName;
        return ele._source.ingredientName;
      });
      let addedName = [];
      fields.forEach((element) => {
        const name = element.name;
        addedName.push(name);
        if ('indianName' in element) {
          addedName.push(element.indianName);
        }
        if ('usdaName' in element) {
          addedName.push(element.usdaName);
        }
      });

      let common = data.filter((x) => !addedName.includes(x));
      setIngredientResponse(common);
      setSearchResult(common);
    } else {
      setSearchResult([]);
    }
  }, [ingredientOptions]);

  useEffect(() => {
    // console.log('selectedGrams', selectedGrams);
    if (selectedGrams) {
      setTotalComputedValue(getGraphValues(ingredientInfo, selectedIngredientInfo, Number(selectedGrams), fields));
      setComputedValue(getIngredientsValuePerGrams(selectedIngredientInfo, Number(selectedGrams)));
    }
  }, [selectedGrams]);

  useEffect(() => {
    setErrors(JSON.parse(JSON.stringify(searchInputDefault)));
  }, [screen]);

  useEffect(() => {
    if (ingredientState.unit) {
      let unit = ingredientsUnit.find((value) => value.value === ingredientState.unit);
      if (!unit) return;
      let specificGravity = 1;
      if (unit.value !== 'grams') {
        specificGravity = (selectedIngredientInfo.specificGravity && Number(selectedIngredientInfo.specificGravity)) || 1;
      }
      if (unit.value === 'asPerTaste') {
        setSelectedGrams(0);
        return;
      }
      setSelectedGrams(unit.conversion * Number(ingredientState.quantity || 0) * specificGravity);
    }
  }, [ingredientState]);

  const handleSearch = async (searchData) => {
    if (searchData.length > 2) {
      setSearchString(searchData);
      setIsLoading(true);

      const response: any = await searchIngredients(panelId, {
        ...props,
        searchedString: searchData.toLowerCase(),
      });
      if (response?.data?.body.length > 0) {
        setIngredientOptions(response.data?.body);
        // setSearchResult(response?.data?.body);
      } else {
        setSearchResult([]);
      }
      setIsLoading(false);
    } else {
      setSearchString('');
      setSearchResult([]);
    }

    // let searcheValue = ingredientResponse.filter((value) => value.toLowerCase()?.includes(searchData.toLowerCase()));
  };

  const debounceSearchFun: Function = debounce(handleSearch, 500);

  const handleSelectResult = (data) => {
    setSearch('');
    setSearchResult([]);
    setIngredientOptions([]);
    setSearchResult(ingredientResponse);
    let selectedIngredient = ingredientData.find((ingredient) => ingredient._source.ingredientName === data);
    setSelectedIngredientInfo(selectedIngredient._source);
    setIngredientState(JSON.parse(JSON.stringify(searchInputDefault)));
    let selectedUpdate = { ...selectedIngredient._source };
    delete selectedUpdate.macroNutrients;
    delete selectedUpdate.microNutrients;
    setIngredientState((pre) => ({
      ...pre,
      name: data,
      quantity: '',
      ...selectedUpdate,
    }));
    setScreen('QUANTITY');
  };
  const handleName = () => {
    setSearch('');
    setScreen('NAME');
    setSearchResult([]);
    setSearchString('');
  };

  const handleQuantity = (e) => {
    setIngredientState((pre) => ({
      ...pre,
      quantity: e,
    }));
  };

  const handleDone = () => {
    const duplicate = fields.filter(
      (ingredient) =>
        ingredient.name == ingredientState.name ||
        ingredient?.indianName == ingredientState.name ||
        ingredient?.usdaName === ingredientState.name
    );
    if (duplicate.length !== 0)
      return ErrorToaster(`This ingredient is already added.Please choose a different one`, panelId, 'error');
    let { isValid, errorMessages } = validatesearchInput(ingredientState);
    setErrors(errorMessages);
    if (!isValid) return;

    if (Number(ingredientState.quantity) === 0) {
      setAction({
        screen: 'INGREDIENTS',
      });
      setIngredientInfo(getGraphValues(ingredientInfo, selectedIngredientInfo, Number(0), fields));
      setFields([
        ...fields,
        {
          ...ingredientState,
          name: ingredientState.name,
          quantity: `${ingredientState.quantity}`,
          unit: `${ingredientState.unit}`,
          ingredientInfo: getIngredientsValuePerGrams(selectedIngredientInfo, Number(selectedGrams)),
        },
      ]);
      clearSearchData();
      return;
    }
    setIngredientInfo(JSON.parse(JSON.stringify(totalComputedValue)));
    setFields([
      ...fields,
      {
        ...ingredientState,
        name: ingredientState.name,
        quantity: `${ingredientState.quantity}`,
        unit: `${ingredientState.unit}`,
        ingredientInfo: computedValue,
      },
    ]);
    setAction({
      screen: 'INGREDIENTS',
    });
    clearSearchData();
  };

  switch (screen) {
    case 'NAME':
      return (
        <div className={classes.mainConatianer}>
          <SearchField
            placeholder={'Search ingredients'}
            handleSearch={debounceSearchFun}
            // disabled={isLoading}
            autoFocus={!isLoading}
            setSearchResult={setSearchResult}
            setSearchString={setSearchString}
          />
          <div className={classes.ingredientFeilds}>
            {isLoading && (
              <>
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="60px"
                  width="100%"
                  style={{ margin: '20px 16px 8px 16px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="60px"
                  width="100%"
                  style={{ margin: '0 16px 8px 16px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="60px"
                  width="100%"
                  style={{ margin: '0 16px 8px 16px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="60px"
                  width="100%"
                  style={{ margin: '0 16px 8px 16px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="60px"
                  width="100%"
                  style={{ margin: '0 16px 8px 16px' }}
                />
              </>
            )}

            {searchResult.length && !isLoading ? <SearchResult options={searchResult} handleSelect={handleSelectResult} /> : null}
            {searchResult.length === 0 && !isLoading && searchString && (
              <div className={classes.noResultsContainer}>
                <span className={classes.serachIconStyle}>{<RecipeSearchIcon />}</span>
                <span className={`${commanClass.body20Medium} ${classes.subparaStyle}`}>No search result found</span>
              </div>
            )}
          </div>
        </div>
      );
    case 'QUANTITY':
      return (
        <div className={classes.quantityFieldsContainer}>
          <div className={classes.quantityFieldsNew}>
            <div className={classes.quantityWrapper}>
              {isLoading && <IndeterminateLoader panelWidth={props?.panel?.width} />}
              <InputField
                label={'ingredients'}
                value={ingredientState.name}
                helperText={errors.name}
                InputProps={{
                  endAdornment: <IconButton onClick={handleName}>{<EditIcon />}</IconButton>,
                  readOnly: true,
                }}
              />
              <div className={classes.unitWrapper}>
                <div className="radioWrapper">
                  <RadioGroup
                    variant={'radio'}
                    flexDirection="column"
                    options={ingredientsUnit.filter((unit) => selectedIngredientInfo?.measurements?.indexOf(unit.value) > -1)}
                    value={ingredientState.unit}
                    setValue={(data) => {
                      if ((data == 'teaSpoon' || data == 'tableSpoon') && ingredientState.quantity.length > 0) {
                        setIngredientState((pre) => ({
                          ...pre,
                          unit: data,
                          quantity:
                            pre.quantity >= 9999.95 && pre.quantity <= 9999.99
                              ? 9999.9
                              : Number(`${parseFloat(pre.quantity).toFixed(1)}`),
                        }));
                      } else {
                        setIngredientState((pre) => ({ ...pre, unit: data }));
                      }
                    }}
                  />
                </div>
                <div className="inputWrapper">
                  {ingredientState.unit && !checkNegligible(ingredientState.unit) && (
                    <InputField
                      label="Quantity"
                      value={ingredientState.quantity}
                      helperText={errors.quantity}
                      onChange={(e) => {
                        setErrors((prev) => {
                          return { ...prev, quantity: '' };
                        });
                        let value = e.target.value;
                        let unitsCheck =
                          ingredientState?.unit == 'teaSpoon' ? true : ingredientState?.unit == 'tableSpoon' ? true : false;
                        //let regex = unitsCheck ? /^(\d{0,4})+(\.?\d{0,1})?$/ : /^(\d{0,4})+(\.?\d{0,2})?$/;
                        let regex = unitsCheck ? /^\d{1,4}(\.\d{0,1})?$/ : /^\d{1,4}(\.\d{0,2})?$/;
                        if ((regex.test(value) && Number(value) <= 9999.99) || value === '') handleQuantity(value);
                      }}
                      //inputProps={{ maxLength: 5 }}
                    />
                  )}
                </div>
              </div>
              {selectedGrams > 0 ? (
                <div className={classes.caloriesCalcBox}>
                  <CaloriesCard
                    headerTitle={'Calorie (kcal) details'}
                    variant={'outerTop'}
                    totalKcal={Number(`${getCalorieCount('US Database', totalComputedValue)}` || 0)}
                    calories={[
                      {
                        kcal: Number(`${getCalorieCount('US Database', ingredientInfo)}` || 0),
                        value: `${parseFloat(`${Number(getCalorieCount('US Database', ingredientInfo)) || 0}`).toFixed(0)} kcal`,
                        title: 'Ingredients already added',
                      },

                      {
                        kcal: Number(`${getCalorieCount('US Database', computedValue)}` || 0),
                        value: `${parseFloat(`${Number(getCalorieCount('US Database', computedValue)) || 0}`).toFixed(0)} kcal`,
                        title: 'This ingredient',
                      },
                    ]}
                  />
                  {showNutrients && (
                    <>
                      {totalComputedValue?.macroNutrients.length > 0 && (
                        <div className={classes.nutrientBox}>
                          {totalComputedValue?.macroNutrients.length ? (
                            <div className={`${commonClasses.body17Medium} ${classes.hearder17}`}>Macro nutrients</div>
                          ) : null}
                          <div className={classes.nutrientsRowBox} ref={elementRef}>
                            {totalComputedValue?.macroNutrients?.map((value: IIngredient, index: number) => {
                              if (
                                ((value && Number(parseFloat(`${getNutrientValue('US Database', value)}`).toFixed(0))) || 0) === 0
                              ) {
                                return null;
                              }
                              let indexInExisting = ingredientInfo?.macroNutrients?.find(
                                (a: IIngredient) => value.nutrientId === a.nutrientId
                              );
                              let computedIndex = computedValue?.macroNutrients?.find(
                                (a: IIngredient) => value.nutrientId === a.nutrientId
                              );
                              if (
                                ((indexInExisting &&
                                  Number(parseFloat(`${getNutrientValue('US Database', indexInExisting)}`).toFixed(0))) ||
                                  0) +
                                  ((computedIndex &&
                                    Number(parseFloat(`${getNutrientValue('US Database', computedIndex)}`).toFixed(0))) ||
                                    0) ===
                                0
                              ) {
                                return null;
                              }
                              return (
                                <NutrientsRow
                                  title={`${getNameValue('US Database', value)}`}
                                  value={`${getUnitValue('US Database', value)}`}
                                  variant={'inner'}
                                  calories={[
                                    {
                                      kcal:
                                        (indexInExisting &&
                                          Number(parseFloat(`${getNutrientValue('US Database', indexInExisting)}`).toFixed(0))) ||
                                        0,
                                    },
                                    {
                                      kcal:
                                        (computedIndex &&
                                          Number(parseFloat(`${getNutrientValue('US Database', computedIndex)}`).toFixed(0))) ||
                                        0,
                                    },
                                  ]}
                                  totalKcal={
                                    ((indexInExisting &&
                                      Number(parseFloat(`${getNutrientValue('US Database', indexInExisting)}`).toFixed(0))) ||
                                      0) +
                                    ((computedIndex &&
                                      Number(parseFloat(`${getNutrientValue('US Database', computedIndex)}`).toFixed(0))) ||
                                      0)
                                  }
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {totalComputedValue?.microNutrients.length > 0 && (
                        <div className={classes.nutrientBox}>
                          {totalComputedValue?.microNutrients.length ? (
                            <div className={`${commonClasses.body17Medium} ${classes.hearder17}`}>Micro nutrients</div>
                          ) : null}
                          <div className={classes.nutrientsRowBox} ref={elementRef2}>
                            {totalComputedValue?.microNutrients?.map((value: IIngredient, index: number) => {
                              let indexInExisting = ingredientInfo?.microNutrients?.find(
                                (a: IIngredient) => value.nutrientId === a.nutrientId
                              );
                              let computedIndex = computedValue?.microNutrients?.find(
                                (a: IIngredient) => value.nutrientId === a.nutrientId
                              );
                              if (
                                ((value && Number(parseFloat(`${getNutrientValue('US Database', value)}`).toFixed(0))) || 0) === 0
                              ) {
                                return null;
                              }
                              if (
                                ((indexInExisting &&
                                  Number(parseFloat(`${getNutrientValue('US Database', indexInExisting)}`).toFixed(0))) ||
                                  0) +
                                  ((computedIndex &&
                                    Number(parseFloat(`${getNutrientValue('US Database', computedIndex)}`).toFixed(0))) ||
                                    0) ===
                                0
                              ) {
                                return null;
                              }
                              return (
                                <NutrientsRow
                                  title={`${getNameValue('US Database', value)}`}
                                  value={`${getUnitValue('US Database', value)}`}
                                  variant={'inner'}
                                  calories={[
                                    {
                                      kcal:
                                        (indexInExisting &&
                                          Number(parseFloat(`${getNutrientValue('US Database', indexInExisting)}`).toFixed(0))) ||
                                        0,
                                    },
                                    {
                                      kcal:
                                        (computedIndex &&
                                          Number(parseFloat(`${getNutrientValue('US Database', computedIndex)}`).toFixed(0))) ||
                                        0,
                                    },
                                  ]}
                                  totalKcal={
                                    ((indexInExisting &&
                                      Number(parseFloat(`${getNutrientValue('US Database', indexInExisting)}`).toFixed(0))) ||
                                      0) +
                                    ((computedIndex &&
                                      Number(parseFloat(`${getNutrientValue('US Database', computedIndex)}`).toFixed(0))) ||
                                      0)
                                  }
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <MUIButton
                    endIcon={<ArrowDown />}
                    className={`${classes.contentButton} ${showNutrients ? 'rotateArrow' : ''}`}
                    onClick={() => setShowNutrients((pre) => !pre)}
                  >
                    {showNutrients ? 'Hide' : ' Show'} nutrients value
                  </MUIButton>
                </div>
              ) : null}
            </div>
          </div>

          <div className={`${classes.buttonPadding} ${classes.doneButton}`}>
            <MUIButton size="large" variant="contained" fullWidth onClick={handleDone}>
              Done
            </MUIButton>
          </div>
        </div>
      );
  }
};

export default SearchIngredients;
