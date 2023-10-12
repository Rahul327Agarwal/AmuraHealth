import { useState } from 'react';
import { nFormatter } from '../../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import MUIButton from '../../../../../LibraryComponents/MUIButton/MUIButton';
import PanelFooter from '../../../../../LibraryComponents/PanelFooter/PanelFooter';
import { AddIngrdients, ArrowDown, IngredientsIcon } from '../RecipesBuilder.svg';
import CaloriesCard from '../../RecipeBarGraph/CaloriesCard/CaloriesCard';
import NutrientsRow from '../../RecipeBarGraph/NutrientsRow/NutrientsRow';
import IngredientRow from '../../RecipePanel/Ingredients';
import { getCalorieCount, getNameValue, getNutrientValue, getUnitValue } from '../../RecipePanel/RecipePanel.function';
import { IngredientsProps } from '../RecipesBuilder.types';
import { useStyles } from './Ingredients.styles';

const Ingredients = (props: IngredientsProps) => {
  const { fields, setFiels, setAction, recipeData, setRecipesData, ingredientInfo, setIngredientInfo } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const [showNutrients, setShowNutrients] = useState(false);

  const handleAddIngrdient = () => {
    setAction({
      screen: 'INPUT_INGREDIENTS',
      payload: {
        screen: 'NAME',
        data: { name: '', unit: 'gram', quantity: '', ingredientInfo: {} },
      },
    });
  };

  const handleRightButton = () => {
    setRecipesData((pre) => ({ ...pre, ingredient: fields }));
    setAction({ screen: 'PREPARATION' });
  };
  return (
    <div className={classes.ingredientWrapper}>
      <div className={classes.ingredientsRowUL}>
        <div className={classes.contentAndButton}>
          <div className={classes.overflowAuto}>
            <div>
              <IngredientRow
                fields={fields}
                setFiels={setFiels}
                setAction={setAction}
                ingredientInfo={ingredientInfo}
                setIngredientInfo={setIngredientInfo}
                showDelete={true}
                isDetailsView={true}
              />
            </div>
            {fields?.length === 0 && (
              <div className={classes.contentWrapNew}>
                {<IngredientsIcon />}
                <p className={classes.text}>Add your recipe ingredients</p>
              </div>
            )}

            {fields?.length && Number(ingredientInfo?.calories || 0) != 0 ? (
              <div className={classes.caloriesCalcBox}>
                <CaloriesCard
                  headerTitle={'Calorie (kcal) details'}
                  variant={'outerBottom'}
                  totalKcal={ingredientInfo?.macroNutrients.reduce((s, info) => {
                    return Number(s) + Number(`${getNutrientValue('US Database', info)}`);
                  }, 0)}
                  total={nFormatter(Number(`${getCalorieCount('US Database', ingredientInfo)}` || 0), 0)}
                  calories={ingredientInfo?.macroNutrients.map((value) => ({
                    kcal: Number(`${Number(`${getNutrientValue('US Database', value)}`)}`),
                    value: `${Number(`${getNutrientValue('US Database', value)}`).toFixed(0)} ${getUnitValue(
                      'US Database',
                      value
                    )}`,
                    title: `${getNameValue('US Database', value)}`,
                  }))}
                />

                {(ingredientInfo?.macroNutrients?.length > 0 || ingredientInfo?.microNutrients?.length > 0) && (
                  <MUIButton
                    endIcon={<ArrowDown />}
                    className={`${classes.contentButton} ${showNutrients ? 'rotateArrow' : ''}`}
                    onClick={() => setShowNutrients((pre) => !pre)}
                  >
                    {showNutrients ? 'Hide' : 'Show'} nutrients value
                  </MUIButton>
                )}
                {showNutrients && (
                  <>
                    {ingredientInfo?.macroNutrients?.length > 0 && (
                      <div className={classes.nutrientBox}>
                        <div className={`${commonClasses.body17Medium} ${classes.hearder17}`}>Macro nutrients</div>
                        <div className={classes.nutrientsRowBox}>
                          {ingredientInfo?.macroNutrients.map((value) => {
                            let nutrientValue = Number(`${parseFloat(`${getNutrientValue('US Database', value)}`).toFixed(0)}`);
                            return nutrientValue ? (
                              <NutrientsRow
                                title={`${getNameValue('US Database', value)}`}
                                value={`${nutrientValue} ${getUnitValue('US Database', value)}`}
                                variant={'inner'}
                                noGraph
                              />
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    {ingredientInfo?.microNutrients?.length > 0 && (
                      <div className={classes.nutrientBox}>
                        <div className={`${commonClasses.body17Medium} ${classes.hearder17}`}>Other nutritional values</div>
                        <div className={classes.nutrientsRowBox}>
                          {ingredientInfo?.microNutrients.map((value) => {
                            let nutrientValue = Number(`${parseFloat(`${getNutrientValue('US Database', value)}`).toFixed(0)}`);
                            return nutrientValue ? (
                              <NutrientsRow
                                title={`${getNameValue('US Database', value)}`}
                                value={`${nutrientValue} ${getUnitValue('US Database', value)}`}
                                variant={'inner'}
                                noGraph
                              />
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>
          <div className={classes.padding16RL}>
            <MUIButton
              onClick={handleAddIngrdient}
              children="Add ingredients"
              variant="contained"
              size="large"
              fullWidth={true}
              startIcon={<AddIngrdients />}
            />
          </div>
        </div>
      </div>

      <PanelFooter
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Next'}
        handleLeftButton={() => setAction({ screen: 'BASIC_DETAILS' })}
        handleRightButton={() => handleRightButton()}
      />
    </div>
  );
};

export default Ingredients;
