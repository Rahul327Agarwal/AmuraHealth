import { useState } from 'react';
import { nFormatter, secondsToTime } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CaloriesIcon, CaloryIcon, CookingTimeNew, EasyIcon } from '../Components/RecipesSelected.svg';
import { useStyles } from '../RecipeHome.styles';
import { IRecipeProps } from '../RecipeHome.types';
import { getDietTypeSmallIcons } from './RecipesBuilder/BasicDetails/BasicDetails.function';

export default function Recipe(props: IRecipeProps) {
  const {
    onClick,
    imageUrl,
    recipeName,
    calories,
    easyToCook,
    isDisplayInLine,
    isButton,
    handleButton,
    buttonText,
    cookingTime,
    dietType,
  } = props;
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <div className={`${classes.recipe} ${isDisplayInLine ? classes.displayLine : ''}`} onClick={onClick}>
      <figure className={isDisplayInLine ? 'figureWrapper' : `${classes.figureWrapper}`}>
        <img
          className={classes.recipeImg}
          src={`${import.meta.env.VITE_DP_URL}${!fallbackImage ? imageUrl : 'SYSTEM/NoRecipeImage.png'}`}
          onError={(error) => {
            setFallbackImage(true);
          }}
        />
        {isDisplayInLine ? (
          ''
        ) : (
          <div className={classes.figureTagsWrap}>
            <span className={`${classes.foodProperties}`}>
              {/* {dietType && <i className={classes.iconWrap}>{dietType== 'Fruitarian' ? Fruitarian : dietType== 'Omnivore'? Pescatarian : dietType== 'Vegetarian'? VegetarianIcon: dietType== 'Vegan' ? Vegan : NonVegetarianIcon}</i>} */}
              {dietType && (
                <i className={`${classes.iconWrap} ${classes.fillIconColor}`}>{getDietTypeSmallIcons(dietType) || ''}</i>
              )}

              {dietType}
            </span>
            {easyToCook == true ? (
              <span className={`${classes.foodProperties}`}>
                <i className={classes.iconWrap}>{<EasyIcon />}</i>

                {easyToCook == true ? 'Easy' : 'Hard'}
              </span>
            ) : null}
          </div>
        )}
      </figure>

      <div className="contentDiv">
        <div className={classes.recipeNameDiv}>
          <span className={classes.recipeName}>{recipeName}</span>
        </div>
        <div className={classes.flex}>
          {calories != undefined && (
            <span className={classes.calories}>
              <span className={classes.calorieIcon}>{<CaloryIcon />}</span> {nFormatter(Number(calories), 0)} Kcal
            </span>
          )}
          {dietType != undefined && (
            <span className={` ${classes.calories}`}>
              <span className={classes.calorieIcon}>{getDietTypeSmallIcons(dietType) || ''}</span>
              {dietType}
            </span>
          )}

          {cookingTime != undefined && (
            <span className={classes.calories}>
              <span className={classes.calorieIcon}>{<CookingTimeNew />}</span>
              {secondsToTime(Number(cookingTime)).timeString}
            </span>
          )}

          {isDisplayInLine ? (
            <>
              {easyToCook != undefined && (
                <span className={` ${classes.calories}`}>
                  <span className={classes.calorieIcon}>{<CaloriesIcon />}</span>
                  {easyToCook == true ? ' Easy' : ' Hard'}
                </span>
              )}
            </>
          ) : (
            ''
          )}
        </div>

        {isButton && (
          <span className={classes.button} onClick={handleButton}>
            {buttonText}
          </span>
        )}
      </div>
    </div>
  );
}
