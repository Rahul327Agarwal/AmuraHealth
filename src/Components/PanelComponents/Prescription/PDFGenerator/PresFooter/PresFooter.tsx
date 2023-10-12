import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { AmuraLogo } from '../../../../SVGs/Common';
import { useStyles } from './PresFooter.styles';

const PresFooter = () => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={`${classes.maindiv} ${classes.footer}`}>
      <div className={classes.headerWrap}>{/* <p>Page 1 | 2</p> */}</div>
      <div className={`${classes.flex}`}>
        <div className={classes.footerdiv}>
          <p className={`${commonClasses.caption12Regular} ${classes.pmargin}`}>
            3F, Neelambari, Doshi Symphony, 129, Velachery - Tambaram Main Rd,
            <br />
            Ram Nagar South, Chennai - 600100, India. Ph - 91-62-622-62222
          </p>
        </div>
        <div>{<AmuraLogo />}</div>
      </div>
    </div>
  );
};

export default PresFooter;
