import { AmuraLoginLog } from "../../SVGs/Common";
import LoginScreenImage from "../assets/LoginScreenImage.png";
import pageBottom from "../assets/pageBottom.png";
import ThankYouPage from "../ThankYouPage/ThankYouPage";

import { useStyles } from "./Login.styles";
// import ThankYouPage from "../../ThankYouPage/ThankYouPage";
export default function StaffRegistration(props: any) {
  const { classes } = useStyles();
  return (
    <div className={classes.body}>
      <div className={classes.topIcon}>
        <span className={classes.logo}>{<AmuraLoginLog />}</span>
      </div>
      <div className={classes.bodyContent}>
        <div className={classes.bodyContentFlex}>
          <div className={classes.bodyContextChild1}>
            <div className={classes.loginCard}>
              {/* <div className={classes.logo}>{AmuraLoginLog}</div> */}
              <ThankYouPage />
            </div>
          </div>
          <div className={`${classes.hideLeftImage} ${classes.rightImageDiv}`}>
            <div>
              <span className={classes.rightImageSpan}>
                <img
                  width="760"
                  height="913"
                  src={LoginScreenImage}
                  className={classes.rightImage}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.bottomImage}>
        <img src={pageBottom} width={"100%"} className={classes.visibility} />
      </div>
    </div>
  );
}
