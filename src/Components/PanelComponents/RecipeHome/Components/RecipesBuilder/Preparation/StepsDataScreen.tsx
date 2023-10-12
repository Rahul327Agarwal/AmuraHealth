import { useCommonStyles } from "../../../../../../Common/Theme/CommonStyles";
import { EditIcon } from "../../../../../SVGs/Common";
import { useStyles } from "./Preparation.styles";
import { StepsDataScreenProps } from "./Preparation.types";

const StepsDataScreen = (props: StepsDataScreenProps) => {
  const {
    stepsData,
    setStepsData,
    setStepsScreen,
    setIsEdit,
    isEdit,
    recipeData,
    setRecipesData,
  } = props;
  const { classes } = useStyles();
  const commanClass = useCommonStyles();

  const sorteddata = stepsData.sort((a, b) => a.stepNo - b.stepNo);
  const handleEdit = (
    stepNo,
    description,
    videoLink,
    image,
    preparationTime
  ) => {
    setStepsScreen(true);
    setIsEdit({
      ...isEdit,
      val: true,
      step: stepNo,
      description: description,
      videoLink: videoLink,
      image: image,
      preparationTime: preparationTime,
    });
  };

  return sorteddata?.map((item, idx) => {
    return (
      <div
        className={` ${commanClass.caption12Medium} ${classes.stepsWrapper}`}
        key={idx}
      >
        <div className={classes.flex}>
          <span className={classes.stepid}>{item?.stepNo}</span>
          <p
            className={`${commanClass.body15Regular} ${classes.stepsDescription}`}
          >
            {item?.description}
          </p>
        </div>

        <i
          className={classes.dotIcon}
          onClick={() =>
            handleEdit(
              item?.stepNo,
              item?.description,
              item?.videoLink,
              item?.image,
              item?.preparationTime
            )
          }
        >
          {<EditIcon />}
        </i>
      </div>
    );
  });
};

export default StepsDataScreen;
