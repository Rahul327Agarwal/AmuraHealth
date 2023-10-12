import { useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../../../Utils';
import ModalBox from '../../../../LibraryComponents/ModalBox/ModalBox';
import { FoodIcon } from '../RecipesSelected.svg';
import { calculateTwoIngredients } from '../RecipesBuilder/Ingredients/Ingredients.function';
import { checkNegligible, fractionalDigits, ingredientsUnit } from '../RecipesBuilder/RecipesBuilder.function';
import { getIngredientName } from './RecipePanel.function';
import { useStyles } from './RecipePanel.styles';
import { IProps } from './RecipePanel.types';
import ThreeDotMenu from '../../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';

const Ingredients = (props: IProps) => {
  const {
    fields,
    setFiels,
    setAction,
    setIngredientInfo,
    ingredientInfo,
    showDelete,
    servingToMultiply,
    viewingDB,
    isDetailsView,
  } = props;
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const [deleteIngredient, setDeleteIngredientName] = useState({} as any);
  const [showConfirm, setShowConfirm] = useState(false);
  const [unit, setUnit] = useState('');

  const renderUnit = (unit, isDetailsView) => {
    let u = ingredientsUnit?.find((unitOption) => unitOption.value === unit);
    if (!u) return unit;
    return isDetailsView && u.abbreviation ? u.abbreviation : u.label;
  };

  const handleDelete = () => {
    setFiels(fields.filter((recipe) => recipe.name != deleteIngredient.name));
    setIngredientInfo((value) => {
      console.log('Previous value', value, 'After value', calculateTwoIngredients(value, deleteIngredient.ingredientInfo, '-'));
      return calculateTwoIngredients(value, deleteIngredient.ingredientInfo, '-');
    });
    setDeleteIngredientName({});
  };
  return (
    <div className={classes.ingredientsWrap}>
      <ul className={classes.listWrap}>
        {fields?.map(({ name, quantity, unit, ingredientInfo }, idx) => {
          return (
            <li className={classes.listItem} key={idx}>
              <span className={classes.textWrap}>
                <i className={classes.listIcon}>{<FoodIcon />}</i>
                <span className={` ${commanClass.caption12Medium} ${classes.listText}`}>
                  {getIngredientName(viewingDB, fields[idx])}
                </span>
              </span>
              <div className={classes.subContainer}>
                <span className={` ${commanClass.caption12Regular} ${classes.quantity} marginRight`}>
                  {!checkNegligible(unit) &&
                    parseFloat(`${Number(quantity) * (servingToMultiply || 1)}`)
                      .toFixed(fractionalDigits(unit))
                      .replace(/\.?0+$/, '')}
                  {'  '}
                  {/* {ingredientsUnit?.find((unitOption) => unitOption.value === unit)?.abbreviation || unit} */}
                  {renderUnit(unit, isDetailsView)}
                </span>
                {showDelete && (
                  // <i
                  //   style={{ cursor: "pointer" }}
                  //   onClick={() => {
                  //     setShowConfirm(true);
                  //     setDeleteIngredientName({
                  //       name,
                  //       quantity,
                  //       unit,
                  //       ingredientInfo,
                  //     });
                  //   }}
                  // >
                  //   {<DeleteIcon />}
                  // </i>
                  <ThreeDotMenu
                    isRotate
                    isDivider
                    options={[{ label: 'Delete', value: 'delete' }]}
                    handleClick={(value) => {
                      if (value === 'delete') {
                        setShowConfirm(true);
                        setDeleteIngredientName({
                          name,
                          quantity,
                          unit,
                          ingredientInfo,
                        });
                      }
                    }}
                    // customStyle={classes.bookmarks}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <ModalBox
        panelWidth={props.panel?.width}
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        modalTitle={'Remove ingredient?'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('No'),
            variant: 'text',
            onClick: () => {
              setShowConfirm(false);
              setDeleteIngredientName({});
            },
          },
          {
            text: PMS_LOCALE.translate('Yes'),
            variant: 'contained',
            onClick: () => {
              setShowConfirm(false);
              handleDelete();
            },
          },
        ]}
      >
        <div className={classes.modalWrapper}>{`Are you sure you want to remove ${deleteIngredient?.name}`}</div>
      </ModalBox>
    </div>
  );
};

export default Ingredients;
