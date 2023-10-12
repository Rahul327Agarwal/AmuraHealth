import { useCommonStyles } from "../../../../../Common/Theme/CommonStyles";
import MUIButton from "../../../../LibraryComponents/MUIButton/MUIButton";
import { SuccessIcon } from "../../../../SVGs/Common";
import { IProps } from "../RecipePanel/RecipePanel.types";
import { useStyles } from "./RecipesBuilder.styles";

const SuccesScreen = (props: IProps) => {
  const { setAction, setActionType, recipeData } = props;

  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  return (
    <div className={classes.screenWrapper}>
      <div className={classes.screenContent}>
        <i className={classes.iconWrap}>{<SuccessIcon />}</i>
        <p className={`${commanClass.body20Regular} ${classes.successText}`}>
          Your recipe will be reviwed shortly and it will get published. Our
          team will contact you if any clarification required.
        </p>
        <MUIButton
          variant="contained"
          size="large"
          onClick={() => {
            setAction({ screen: "HOME" });
            setActionType("HOME");
          }}
          children="Ok"
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default SuccesScreen;
