import { useState } from "react";

import Link from "../Components/Link/Link";
import { ACCOUNT_CREATED } from "../Registration.types";
import { useStyles } from "./ThankYouPage.styles";
// import { PMS_LOCALE } from "pms-ui-utils";
export default function ThankYouPage(props: any) {
  const { value, handleCheck, disabled, label } = props;
  const [checked, setChecked] = useState(value);
  const { classes } = useStyles();
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: confirmed,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  return (
    <div className={classes.margin12px}>
      <span className={classes.successAccount}>{`${ACCOUNT_CREATED} `}</span>
      {/* TODO: lottie not available... add lottie or find rplacement*/}
      {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
      <span className={classes.successAccount}>
        <Link
          handleClick={() => {
            window.location.href = "/staff";
          }}
          label={`Add another user`}
          underline={true}
          color={"#000000"}
        />
      </span>
    </div>
  );
}
