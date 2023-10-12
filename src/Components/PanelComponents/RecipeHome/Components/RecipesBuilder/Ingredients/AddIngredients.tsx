import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import InputField from '../../../../../LibraryComponents/InputField/InputField';
import MUIButton from '../../../../../LibraryComponents/MUIButton/MUIButton';
import PanelFooter from '../../../../../LibraryComponents/PanelFooter/PanelFooter';
import { ArrowDown, EditIcon } from '../../../../../SVGs/Common';
import CaloriesCard from '../../RecipeBarGraph/CaloriesCard/CaloriesCard';
import NutrientsRow from '../../RecipeBarGraph/NutrientsRow/NutrientsRow';
import { getCalorieCount, getNutrientValue } from '../../RecipePanel/RecipePanel.function';
import {
  addIngredientsDeafult,
  calculateTwoIngredients,
  getIngredientsValuePerGrams,
  validateAddIngredients,
} from './Ingredients.function';
import { useStyles } from './Ingredients.styles';
import { AddIngredientsProps, IIngredient } from './Ingredients.types';

const AddIngredients = (props: AddIngredientsProps) => {
  const { setAction, ingredientInfo, setIngredientInfo, payload, alreadyAddedIngredients, setAlreadyAddedIngredients } = props;
  const { classes } = useStyles(props);
  const [showNutrients, setShowNutrients] = useState(false);
  const commanClass = useCommonStyles();
  const [ingredientState, setIngredientState] = useState(addIngredientsDeafult);
  const [errors, setErrors] = useState({
    name: '',
    quantity: '',
    unitOfMeasurement: '',
    ingredientInfo: '',
  });
  const [ingredientValueWithoutCurrent, setIngredientValueWithtoutCurrent] = useState(ingredientInfo);

  useEffect(() => {
    if (payload?.name && payload?.quantity) {
      setIngredientState({
        name: payload.name,
        quantity: payload.quantity,
        unit: payload.unit,
        ingredientInfo: payload.ingredientInfo,
        totalIngredientInfo: payload.totalIngredientInfo,
      });
    }
    let cameBackToEdit = alreadyAddedIngredients.find((ingredient) => ingredient.name === payload?.name);
    if (cameBackToEdit) {
      setIngredientValueWithtoutCurrent(
        calculateTwoIngredients(
          ingredientInfo,
          getIngredientsValuePerGrams(payload.ingredientInfo, Number(payload.quantity)),
          '-'
        )
      );
    }
  }, [payload]);

  const handleName = () =>
    setAction({
      screen: 'INPUT_INGREDIENTS',
      payload: {
        screen: 'NAME',
        data: {
          name: ingredientState?.name || '',
          quantity: ingredientState?.quantity || '',
          unit: ingredientState?.unit || 'gram',
          ingredientInfo: ingredientState?.ingredientInfo || {},
        },
      },
    });
  const handleQuantity = () =>
    setAction({
      screen: 'INPUT_INGREDIENTS',
      payload: {
        screen: 'QUANTITY',
        data: {
          name: ingredientState?.name || '',
          quantity: ingredientState?.quantity || '',
          unit: ingredientState?.unit || 'gram',
          ingredientInfo: ingredientState?.ingredientInfo || {},
        },
      },
    });

  const handleAdd = () => {
    let { isValid, errorMessages } = validateAddIngredients(ingredientState);
    setErrors(errorMessages);
    setIngredientInfo(JSON.parse(JSON.stringify(ingredientState.totalIngredientInfo)));
    let tempIngredient = [...alreadyAddedIngredients];
    let ingredientAlreadyAdded = tempIngredient.find((ingredient) => ingredient.name === ingredientState.name);
    if (alreadyAddedIngredients) {
      tempIngredient = tempIngredient.map((value) =>
        value.name === ingredientState.name
          ? {
              name: ingredientState.name,
              quantity: ingredientState.quantity,
              unit: ingredientState.unit,
              ingredientInfo: ingredientState.ingredientInfo,
            }
          : value
      );
    }
    if (!ingredientAlreadyAdded) {
      tempIngredient.push({
        name: ingredientState.name,
        quantity: ingredientState.quantity,
        unit: ingredientState.unit,
        ingredientInfo: ingredientState.ingredientInfo,
      });
    }
    setAlreadyAddedIngredients(JSON.parse(JSON.stringify(tempIngredient)));
    setAction({ screen: 'INGREDIENTS', payload: {} });
  };

  return (
    <div>
      <div className={classes.mainWraper}>
        <div className={classes.ingredientsRow}>
          <InputField
            label={'ingredients'}
            value={ingredientState?.name}
            helperText={errors.name}
            InputProps={{
              endAdornment: <IconButton onClick={handleName}>{<EditIcon />}</IconButton>,
              readOnly: true,
            }}
          />
        </div>
        <div className={classes.quantityRow}>
          <InputField
            label={'Quantity'}
            value={ingredientState?.quantity}
            helperText={errors.quantity}
            InputProps={{
              endAdornment: <IconButton onClick={handleQuantity}>{<EditIcon />}</IconButton>,
              readOnly: true,
            }}
            inputProps={{ maxLength: 5 }}
          />
        </div>
        <div className={classes.caloriesCalcBox}>
          {ingredientState?.ingredientInfo?.calories && (
            <CaloriesCard
              headerTitle={'Calorie (kcal) details'}
              variant={'outerTop'}
              totalKcal={Number(`${getCalorieCount('US Database', ingredientState?.totalIngredientInfo)}` || 0)}
              calories={[
                {
                  kcal: Number(getCalorieCount('US Database', ingredientValueWithoutCurrent)) || 0,
                  value: `${parseFloat(`${Number(getCalorieCount('US Database', ingredientValueWithoutCurrent)) || 0}`).toFixed(
                    0
                  )} kcal`,
                  title: 'Ingredients already added',
                },
                {
                  kcal: Number(getCalorieCount('US Database', ingredientState?.ingredientInfo)) || 0,
                  value: `${parseFloat(`${Number(getCalorieCount('US Database', ingredientState?.ingredientInfo)) || 0}`).toFixed(
                    0
                  )} kcal`,
                  title: 'This ingredient',
                },
              ]}
            />
          )}
          {showNutrients && (
            <>
              <div className={classes.nutrientBox}>
                <div className={`${commanClass.body17Medium} ${classes.hearder17}`}>Macro nutrients</div>
                <div className={classes.nutrientsRowBox}>
                  {ingredientState?.totalIngredientInfo?.macroNutrients.map((value: IIngredient, index: number) => (
                    <NutrientsRow
                      title={`${getNutrientValue('US Database', value)}`}
                      value={`${getNutrientValue('US Database', value)}`}
                      variant={'inner'}
                      calories={[
                        {
                          kcal:
                            (ingredientValueWithoutCurrent?.macroNutrients &&
                              ingredientValueWithoutCurrent.macroNutrients[index] &&
                              Number(
                                parseFloat(
                                  `${getNutrientValue('US Database', ingredientValueWithoutCurrent.macroNutrients[index])}`
                                ).toFixed(0)
                              )) ||
                            0,
                        },
                        {
                          kcal:
                            (ingredientState?.ingredientInfo?.macroNutrients &&
                              ingredientState?.ingredientInfo.macroNutrients[index] &&
                              Number(
                                parseFloat(
                                  `${getNutrientValue('US Database', ingredientState?.ingredientInfo.macroNutrients[index])}`
                                ).toFixed(0)
                              )) ||
                            0,
                        },
                      ]}
                      totalKcal={
                        (ingredientState?.totalIngredientInfo?.macroNutrients &&
                          ingredientState?.totalIngredientInfo.macroNutrients[index] &&
                          Number(
                            parseFloat(
                              `${getNutrientValue('US Database', ingredientState?.totalIngredientInfo.macroNutrients[index])}`
                            ).toFixed(0)
                          )) ||
                        0
                      }
                    />
                  ))}
                </div>
              </div>
              <div className={classes.nutrientBox}>
                <div className={`${commanClass.body17Medium} ${classes.hearder17}`}>Micro nutrients</div>
                <div className={classes.nutrientsRowBox}>
                  {ingredientState?.totalIngredientInfo.microNutrients.map((value: IIngredient, index: number) => (
                    <NutrientsRow
                      title={`${getNutrientValue('US Database', value)}`}
                      value={`${getNutrientValue('US Database', value)}`}
                      variant={'inner'}
                      calories={[
                        {
                          kcal:
                            (
                              ingredientValueWithoutCurrent?.microNutrients &&
                              ingredientValueWithoutCurrent.microNutrients[index] &&
                              parseFloat(
                                `${getNutrientValue('US Database', ingredientValueWithoutCurrent.microNutrients[index])}`
                              )
                            ).toFixed(0) || 0,
                        },
                        {
                          kcal:
                            (
                              ingredientState?.ingredientInfo?.microNutrients &&
                              ingredientState?.ingredientInfo.microNutrients[index] &&
                              parseFloat(
                                `${getNutrientValue('US Database', ingredientState?.ingredientInfo.microNutrients[index])}`
                              )
                            ).toFixed(0) || 0,
                        },
                      ]}
                      totalKcal={
                        (ingredientState?.totalIngredientInfo?.microNutrients &&
                          ingredientState?.totalIngredientInfo.microNutrients[index] &&
                          Number(
                            parseFloat(
                              `${getNutrientValue('US Database', ingredientState?.totalIngredientInfo.microNutrients[index])}`
                            ).toFixed(0)
                          )) ||
                        0
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          <MUIButton
            endIcon={<ArrowDown />}
            className={`${classes.contentButton} ${showNutrients ? 'rotateArrow' : ''}`}
            onClick={() => setShowNutrients((pre) => !pre)}
          >
            Show {showNutrients ? 'Less' : 'More'}
          </MUIButton>
        </div>
      </div>
      <PanelFooter
        customStyle={classes.footerStyle}
        leftButtonText={'Back'}
        righButtontText={'Add'}
        handleLeftButton={() => setAction({ screen: 'INGREDIENTS' })}
        handleRightButton={() => handleAdd()}
      />
    </div>
  );
};

export default AddIngredients;
