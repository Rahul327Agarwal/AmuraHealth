import { debounce } from '@mui/material';
import { useState } from 'react';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import InputField from '../../../../LibraryComponents/InputField/InputField';
import ToggleButton from '../../../../LibraryComponents/ToggleButton/ToggleButton';
import { BackIcon, DropdownArrowIcon } from '../RecipesSelected.svg';
import { ingredientsItem, ingredientsUnitItem, nutritionalData, validateIngredientsFields } from './RecipesBuilder.function';
import { useStyles } from './RecipesBuilder.styles';
import { IPropsSelectIngredients } from './RecipesBuilder.types';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';

const initialState = {
  name: '',
  quantity: '',
  unit: 'grams',
  kcal: '',
  nutrition: [],
};

const SelectIngredients = (props: IPropsSelectIngredients) => {
  const { classes } = useStyles();
  const { setDisplayScreen, ingredientsData, setIngredientsData, ingredientTitle } = props;
  const { id: panelId } = useCurrentPanel();
  const [ingredient, setIngredient] = useState(initialState);
  const [ingredientError, setIngredientError] = useState(initialState);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [dropdownItem, setDropdownItem] = useState([]);
  const [nutritionalInfo, setNutritionalInfo] = useState(nutritionalData);

  const applySubmit = () => {
    let { isValid, ingredientsError } = validateIngredientsFields({ ...ingredient }, initialState);
    setIngredientError(ingredientsError);

    if (!isValid) return ErrorToaster(`Please Enter the required values`, panelId, 'error');

    const kcal = nutritionalInfo?.reduce((accumulator, curValue) => accumulator + curValue.kcal, 0);

    const newIngredients = {
      title: ingredientTitle.value,
      ingredients: [
        {
          ...ingredient,
          kcal,
          nutrition: nutritionalInfo,
        },
      ],
    };

    const copyIngredientsData = ingredientsData?.map((val, index) => {
      if (index === ingredientTitle?.index)
        return {
          title: ingredientTitle.value,
          ingredients: [
            ...val.ingredients,
            {
              ...ingredient,
              kcal,
              nutrition: nutritionalInfo,
            },
          ],
        };
      return val;
    });

    setIngredientsData(copyIngredientsData.length ? copyIngredientsData : [newIngredients]);
    setIngredient(initialState);
    setDisplayScreen('ADD_INGREDIENTS_SCREEN');
  };

  const handleChangeInput = (value) => {
    setSearchIngredient(value);
    const recipes = ingredientsItem?.filter((item) => item?.value.toLowerCase().includes(value.toLowerCase()));
    setDropdownItem(value ? recipes : []);
  };
  const handleItemClick = (name) => {
    setIngredient({ ...initialState, name });
    setDropdownItem([]);
    setSearchIngredient('');
  };
  const debounceFun: Function = debounce(handleChangeInput, 300);

  const handleCancel = () => {
    if (ingredient.name) return setIngredient(initialState);
    setDisplayScreen('ADD_INGREDIENTS_SCREEN');
  };

  return (
    <div className={classes.panel}>
      <div className={classes.panelBodySelectIngredient}>
        <div className={classes.headerDiv}>
          <span className={classes.buttonCursor} onClick={() => handleCancel()}>
            {<BackIcon />}
          </span>
          <span className={classes.titleSpan}>
            {/* TODO: */}
            {/* {ingredient.name || (
              <Search
                noSearchIcon
                handleSearchString={(e) => debounceFun(e)}
                placeHolder="Select Ingrediant"
                searchValue={searchIngredient}
              />
            )} */}
            {dropdownItem.length ? (
              <div className={classes.dropdownContainer}>
                {dropdownItem?.map((item, index) => {
                  return (
                    <button key={index} className={classes.buttonitem} onClick={() => handleItemClick(item.value)}>
                      {item.value}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </span>
        </div>
        {ingredient?.name && (
          <div className={classes.actionTextButtonWrap}>
            <div className={`${classes.actionTextWrap} action`}>
              <InputField
                autoFocus={true}
                label={'Specify quantity'}
                value={ingredient.quantity}
                onChange={(e) => setIngredient((pre) => ({ ...pre, quantity: e as any }))}
                showError={true}
                errorText={ingredientError.quantity}
              />
            </div>
            <div className={`${classes.actionButton} ${ingredientError.quantity ? 'error' : ''} action`}>
              <ToggleButton
                value={ingredient.unit}
                setValue={(e) => setIngredient((pre) => ({ ...pre, unit: e }))}
                toggleValues={ingredientsUnitItem}
                endIcon={<DropdownArrowIcon />}
              />
            </div>
          </div>
        )}

        {ingredient.quantity && (
          <div className={classes.tableWrapper}>
            <table className={classes.customTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>Weight</th>
                  <th>Kcal</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {nutritionalInfo?.map((val) => (
                  <tr key={val.head}>
                    <td>{val.head}</td>
                    <td>{val.weight}</td>
                    <td>{val.kcal}</td>
                    <td>{val.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* TODO: {ingredient?.name ? (
        <PanelFooter
          injectComponent={
            <div className={classes.footerButton}>
              <div className={classes.footerButtonText}>
                <ActionButton
                  variant="tertiary"
                  label={"Cancel"}
                  handleClick={() => handleCancel()}
                />
              </div>
              <div className={classes.footerButtonText}>
                <ActionButton
                  variant="primary"
                  label={"Continue"}
                  disabled={!Boolean(ingredient.quantity)}
                  handleClick={() => applySubmit()}
                />
              </div>
            </div>
          }
        />
      ) : null} */}
    </div>
  );
};

export default SelectIngredients;
