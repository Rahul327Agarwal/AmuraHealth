import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';

import { useStyles } from './UnderConstruction.styles';
import { IProps } from './UnderConstruction.types';
import { UnderConstructionIconNew } from './UnderConstruction.svg';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';

const UnderConstruction = (props: IProps) => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();

  return (
    <div className={classes.rootContainer}>
      <PageHeader headerContent={panelId == 'D' ? 'Dashboard' : ''} />
      <div className={classes.bodyContainer}>
        <UnderConstructionIconNew />
        <div className={classes.contentContainer}>
          <span className={`${commonClasses.body17Medium} ${classes.subHeaderStyle}`}>Under Construction</span>
        </div>
        {/* <MUIButton variant="contained" className={classes.btnStyle} onClick={() => {}}>
          Go Back
        </MUIButton> */}
      </div>
    </div>
  );
};
export default UnderConstruction;
