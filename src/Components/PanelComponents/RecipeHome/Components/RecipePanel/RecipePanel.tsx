import React, { useEffect, useMemo, useState } from 'react';
import { getCalorieCount, getNameValue, getNutrientValue, getUnitValue } from './RecipePanel.function';
import { useStyles } from './RecipePanel.styles';
import { IProps } from './RecipePanel.types';
import CaloriesCard from '../RecipeBarGraph/CaloriesCard/CaloriesCard';
import NutrientsRow from '../RecipeBarGraph/NutrientsRow/NutrientsRow';
import Ingredients from './Ingredients';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { nFormatter, secondsToTime } from '../../../../../Common/Common.functions';
import { deleteRecipeAPI, getContributorName } from '../RecipesBuilder/RecipesBuilder.function';
import {
  ArrowDown,
  BackArrowIconWhite,
  CaloryIcon,
  CookingTime,
  EasyIconNew,
  EditIcon,
  NewDeleteIcon,
  PrepareIcon,
  RecipeArrow,
} from '../RecipesSelected.svg';
import ThreeDotMenu from '../../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { getDietTypeIcon, VIEWING_DB } from '../RecipesBuilder/BasicDetails/BasicDetails.function';
import ReadMore from '../../../../LibraryComponents/ReadMore/ReadMore';
import MUIButton from '../../../../LibraryComponents/MUIButton/MUIButton';
import MUIAutoSelect from '../../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import MUIDrawer from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PanelFooter from '../../../../LibraryComponents/PanelFooter/PanelFooter';
import { useSelector } from 'react-redux';
import { IRootState, useAppSelector } from '../../../../../DisplayFramework/State/store';
import { useFetchUserName } from '../../../../../Common/Common.hooks';

let initial_DB = { value: 'US Database', label: 'US Database' };
const RecipePanel = (props: IProps) => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const commanClass = useCommonStyles();
  const {
    showFooter,
    recipesData,
    setRecipesData,
    setDisplayScreen,
    action,
    setActionType,
    setNavigatedFrom,
    sessions,
    handleViewByUser,
    setIsEdit,
    contributorNames,
    setContributorNames,
  } = props;

  // const curr_userName = `${sessions?.user?.first_name} ${sessions?.user?.last_name}`;
  // const userId = sessions?.user?.id;
  const totalCookingTime = secondsToTime(Number(recipesData.totalCookingTime)).timeString;
  const [servingNo, setServingNo] = useState(recipesData?.numberOfServings);
  // const [recipesData, setRecipesData] = useState(dummydata);
  const [fallbackImage, setFallbackImage] = useState({} as any);
  const [showNutrients, setShowNutrients] = useState(false);
  const [viewingDB, setViewingDB] = useState<any>('US Database');
  const [dataBase, setDataBase] = useState(initial_DB);
  const [imageIndex, setImageIndex] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmDialogFor, setConfirmDialogFor] = useState<'edit' | 'delete' | undefined>(undefined);
  // const totalKCAL = Math.round(recipesData?.ingredients?.reduce((accumulator, curValue) => accumulator + curValue.kcal, 0));
  const [userName, setUserName] = useState('');

  const loggedInUserInfo = useAppSelector((state) => state.displayFrameWork.loggedInUserInformation);
  const isStaffUser = loggedInUserInfo?.allRoles.length;
  const { fetchUserName } = useFetchUserName();

  useEffect(() => {
    (async () => {
      const contributor = await getContributorName(
        recipesData?.contributorId,
        contributorNames,
        setContributorNames,
        fetchUserName
      );
      console.log('!!contributor', contributor);
      setUserName(contributor);
    })();
  }, [recipesData?.contributorId]);

  const handleScreenOne = () => {
    setActionType('PREPARE_STEPS');
  };
  const handleMore = () => {};

  const handleServingsChange = (variant) => {
    if (variant) {
      setServingNo(servingNo >= 10 ? 10 : Number(servingNo) + 1);
    } else {
      setServingNo(servingNo <= 1 ? 1 : servingNo - 1);
    }
  };
  const handleClickArrrow = (status) => {
    if (status) {
      if (recipesData?.files?.length - 1 > imageIndex) {
        setImageIndex(imageIndex + 1);
      }
    } else {
      setImageIndex(imageIndex === 0 ? 0 : imageIndex - 1);
    }
  };
  const handleDeleteRecipeAPI = async () => {
    try {
      const response = await deleteRecipeAPI(sessions, {
        recipeId: recipesData?.recipeId,
      });
      if (response?.status === 'success') {
        setOpenConfirm(false);
        setNavigatedFrom('PREVIEW');
        setActionType(action);
      }
    } catch (error) {
      console.log(error, 'error in deleteing Recipe API');
    }
  };

  return (
    <div className={classes.body}>
      <span
        className={classes.backBtn}
        onClick={() => {
          setNavigatedFrom('PREVIEW');
          setActionType(action);
        }}
      >
        {<BackArrowIconWhite />}
      </span>
      {isStaffUser > 0 && (
        <ThreeDotMenu
          isRotate
          isDivider
          options={[
            { label: 'Edit', value: 'edit', icon: <EditIcon /> },
            { label: 'Delete', value: 'delete', icon: <NewDeleteIcon /> },
          ]}
          handleClick={(event) => {
            setOpenConfirm(true);
            setConfirmDialogFor(event);
          }}
          customStyle={classes.bookmarks}
        />
      )}
      <div className={classes.recipePanelWrap}>
        {recipesData?.files?.length ? (
          <figure className={classes.figureWrap}>
            <img
              src={
                fallbackImage[imageIndex]
                  ? `${import.meta.env.VITE_DP_URL}SYSTEM/NoRecipeImage.png`
                  : `${import.meta.env.VITE_DP_URL}${recipesData?.files[imageIndex]}`
              }
              onError={(error) => {
                setFallbackImage((prev) => {
                  return { ...prev, [imageIndex]: true };
                });
              }}
              alt="recipe picture"
            />
            {imageIndex !== 0 && (
              <span
                className={`${classes.arrowLeft} ${imageIndex !== 0 ? classes.arrowDisable : classes.arrowEnable}`}
                onClick={() => handleClickArrrow(false)}
              >
                {<RecipeArrow />}
              </span>
            )}
            {recipesData?.files?.length > 1 && recipesData?.files?.length - 1 > imageIndex && (
              <span
                className={`${classes.arrowRight} ${
                  recipesData?.files?.length > 1 && recipesData?.files?.length - 1 > imageIndex
                    ? classes.arrowDisable
                    : classes.arrowEnable
                }`}
                onClick={() => handleClickArrrow(true)}
              >
                {<RecipeArrow />}
              </span>
            )}
          </figure>
        ) : (
          <figure className={classes.figureWrap}>
            <img src={`${import.meta.env.VITE_DP_URL}SYSTEM/NoRecipeImage.png`} alt="recipe picture" />
          </figure>
        )}

        <div className={classes.recipeContentWrap}>
          <div className={classes.contentHeader}>
            <span className={`${commanClass.caption12Medium} ${classes.contentTag}`}>{recipesData?.cuisine}</span>
          </div>
          <div className={classes.contentWrap}>
            <div>
              <h2 className={`${commanClass.body17Medium} ${classes.title}`}>{recipesData?.title}</h2>
              <span className={`${commanClass.caption12Regular} ${classes.caption}`}>by {userName}</span>
              <div className={classes.propertiesWrap}>
                <div className={classes.propertiesCard}>
                  <i className={classes.propertiesIcon}> {<CaloryIcon />}</i>
                  <strong className={`${commanClass.caption12Medium} ${classes.properties}`}>
                    {nFormatter(
                      Number(
                        parseFloat(
                          `${
                            (Number(getCalorieCount(viewingDB, recipesData.ingredientInfo)) * Number(servingNo)) /
                            Number(recipesData?.numberOfServings)
                          }`
                        ).toFixed(0)
                      ) || 0,
                      2
                    )}{' '}
                    kcal
                  </strong>
                </div>
                <div className={classes.propertiesCard}>
                  <i className={classes.propertiesIcon}> {<CookingTime />}</i>
                  <strong className={`${commanClass.caption12Medium} ${classes.properties}`}>{totalCookingTime}</strong>
                </div>
                {recipesData?.easyToCook ? (
                  <div className={classes.propertiesCard}>
                    <i className={classes.propertiesIcon}> {<EasyIconNew />}</i>
                    <strong className={`${commanClass.caption12Medium} ${classes.properties}`}>
                      {/* {recipesData.easyToCook == true ? ' Easy' : ' Hard'} */}
                      Easy
                    </strong>
                  </div>
                ) : null}
                <div className={classes.propertiesCard}>
                  {recipesData?.dietType && (
                    <i className={classes.propertiesIcon}> {getDietTypeIcon(recipesData?.dietType) || ''}</i>
                  )}
                  <strong className={`${commanClass.caption12Medium} ${classes.properties}`}>{recipesData?.dietType}</strong>
                </div>
              </div>
              <ReadMore text={recipesData?.description} />
              <div>
                <div className={classes.caloriesCalcBox}>
                  {recipesData?.ingredientInfo && Object.keys(recipesData?.ingredientInfo).length ? (
                    <div className={classes.caloriesCalcBox}>
                      <CaloriesCard
                        headerTitle={'Calorie (kcal) details'}
                        variant={'outerBottom'}
                        totalKcal={
                          Number(
                            parseFloat(
                              `${
                                (recipesData?.ingredientInfo?.macroNutrients.reduce((s, info) => {
                                  return Number(s) + Number(getNutrientValue(viewingDB, info));
                                }, 0) *
                                  Number(servingNo)) /
                                Number(recipesData?.numberOfServings)
                              }`
                            ).toFixed(0)
                          ) || 0
                        }
                        total={nFormatter(
                          Number(
                            parseFloat(
                              `${
                                (Number(getCalorieCount(viewingDB, recipesData.ingredientInfo)) * Number(servingNo)) /
                                Number(recipesData?.numberOfServings)
                              }`
                            ).toFixed(0)
                          ) || 0,
                          2
                        )}
                        calories={recipesData?.ingredientInfo.macroNutrients.map((value) => ({
                          kcal: Number(
                            parseFloat(
                              `${
                                (Number(getNutrientValue(viewingDB, value)) * Number(servingNo)) /
                                Number(recipesData?.numberOfServings)
                              }`
                            ).toFixed(0)
                          ),
                          value: `${Number(
                            parseFloat(
                              `${
                                (Number(getNutrientValue(viewingDB, value)) * Number(servingNo)) /
                                Number(recipesData?.numberOfServings)
                              }`
                            ).toFixed(0)
                          )} ${getUnitValue(viewingDB, value)}`,
                          title: `${getNameValue(viewingDB, value)}`,
                        }))}
                      />
                      <MUIButton
                        endIcon={<ArrowDown />}
                        className={`${classes.contentButton} ${showNutrients ? 'rotateArrow' : ''}`}
                        onClick={() => setShowNutrients((pre) => !pre)}
                      >
                        {showNutrients ? 'Hide' : 'Show'} nutrients value
                      </MUIButton>
                      {showNutrients && (
                        <>
                          {recipesData?.ingredientInfo?.macroNutrients.length > 0 && (
                            <div className={classes.nutrientBox}>
                              <div className={`${commonClasses.body17Medium} ${classes.hearder17}`}>Macro nutrients</div>
                              <div className={classes.nutrientsRowBox}>
                                {recipesData?.ingredientInfo?.macroNutrients.map((value) => {
                                  const numberValue = Number(
                                    parseFloat(
                                      `${
                                        (Number(getNutrientValue(viewingDB, value)) * Number(servingNo)) /
                                        Number(recipesData?.numberOfServings)
                                      }`
                                    ).toFixed(0)
                                  );
                                  if (numberValue) {
                                    return (
                                      <NutrientsRow
                                        title={`${getNameValue(viewingDB, value)}`}
                                        value={`${numberValue} ${getUnitValue(viewingDB, value)}`}
                                        variant={'inner'}
                                        noGraph
                                      />
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          )}
                          {recipesData?.ingredientInfo?.microNutrients.length > 0 && (
                            <div className={classes.nutrientBox}>
                              <div className={`${commonClasses.body17Medium} ${classes.hearder17}`}>Other nutritional values</div>
                              <div className={classes.nutrientsRowBox}>
                                {recipesData?.ingredientInfo?.microNutrients.map((value) => {
                                  const numberValue = Number(
                                    parseFloat(
                                      `${
                                        (Number(getNutrientValue(viewingDB, value)) * Number(servingNo)) /
                                        Number(recipesData?.numberOfServings)
                                      }`
                                    ).toFixed(0)
                                  );
                                  if (numberValue) {
                                    return (
                                      <NutrientsRow
                                        title={`${getNameValue(viewingDB, value)}`}
                                        value={`${numberValue} ${getUnitValue(viewingDB, value)}`}
                                        variant={'inner'}
                                        noGraph
                                      />
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ) : null}
                  <div>
                    <div className={`${classes.dbHeading} ${commonClasses.body15Medium}`}>
                      <div>
                        <span>{`The above nutritional values are based on the`}</span>
                      </div>
                    </div>
                    <div className={classes.dbSelect}>
                      <MUIAutoSelect
                        options={VIEWING_DB}
                        onChange={(event, value) => {
                          setViewingDB(value.value);
                          setDataBase(value);
                        }}
                        value={dataBase}
                        defaultValue={initial_DB}
                        disableClearable
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.headerWrap}>
                <strong className={`${commanClass.body15Medium} ${classes.headerText}`}>Ingredients</strong>
                <div className={classes.buttonWrap}>
                  <span className={`${commanClass.body15Medium} ${classes.buttonText}`}>Servings</span>
                  <div className={classes.buttonGrp}>
                    <span
                      className={`${commanClass.body15Medium} ${classes.actionBtn}`}
                      onClick={() => handleServingsChange(false)}
                    >
                      -
                    </span>
                    <span className={` ${commanClass.body15Medium} ${classes.btnText}`}>{servingNo}</span>
                    <span
                      className={` ${commanClass.body15Medium} ${classes.actionBtn}`}
                      onClick={() => handleServingsChange(true)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
              <Ingredients
                isDetailsView={true}
                fields={recipesData.ingredients}
                servingToMultiply={Number(servingNo) / Number(recipesData?.numberOfServings)}
              />
            </div>

            {/* <div> */}
          </div>
        </div>
      </div>
      <div className={classes.footerButton}>
        <MUIButton
          children="Prepare it"
          variant="contained"
          size="large"
          fullWidth={true}
          startIcon={<PrepareIcon />}
          onClick={() => handleScreenOne()}
        />
      </div>
      {openConfirm && (
        <MUIDrawer
          anchor="bottom"
          open={openConfirm}
          headerTitle={confirmDialogFor === 'edit' ? 'Edit Recipe' : confirmDialogFor === 'delete' ? 'Delete Recipe' : ''}
          handleClose={() => {
            setOpenConfirm(false);
          }}
        >
          <>
            <div>
              <div className={`${commonClasses.body15Medium} ${classes.mainHeading}`}>
                {confirmDialogFor === 'edit'
                  ? `Do you want to Edit`
                  : confirmDialogFor === 'delete'
                  ? `Do you want to Delete`
                  : ''}
              </div>
            </div>
            <PanelFooter
              customStyle={classes.prescriptionFooter}
              leftButtonText={'No'}
              righButtontText={'Yes'}
              handleLeftButton={() => {
                setOpenConfirm(false);
              }}
              handleRightButton={() => {
                if (confirmDialogFor === 'edit') {
                  setActionType('ADD_RECIPE');
                  setIsEdit(true);
                } else if (confirmDialogFor === 'delete') {
                  handleDeleteRecipeAPI();
                }
              }}
              btnStyle={classes.btnHeight}
            />
          </>
        </MUIDrawer>
      )}
    </div>
  );
};

export default RecipePanel;
