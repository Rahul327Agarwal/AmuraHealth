import { ThreeDotIcon } from "../../../../../../SVGs/Common";
import { useStyles } from "./ReceipeSteps.styles";

const ReceipeSteps = (props) => {
  const { no, des } = props;
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.cardWrap}>
        <div className={classes.contentWrap}>
          <div className={classes.imgWrap}>
            <h1 className={classes.IDnumber}>{no}</h1>
          </div>
          <p className={classes.description}>{des}</p>
        </div>
        <div className={classes.contentWrap}>{<ThreeDotIcon />}</div>
      </div>
    </div>
  );
};

export default ReceipeSteps;
