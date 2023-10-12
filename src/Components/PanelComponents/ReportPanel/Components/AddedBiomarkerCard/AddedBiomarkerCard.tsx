import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { DeleteIconDark, EditIcon } from '../../../../SVGs/Common';
import ThreeDotMenu from './../../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './AddedBiomarkerCard.styles';
import { IProps } from './AddedBiomarkerCard.types';

const OPTIONS = [
  { label: 'Edit', value: 'EDIT', icon: EditIcon },
  { label: 'Delete', value: 'DELETE', icon: DeleteIconDark },
];

const AddedBiomarkerCard = (props: IProps) => {
  const { name, unit, value, handleThreeDotAction } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <section className={classes.mainContainer}>
      <span className={`${commonClasses.body14Regular} ${classes.primaryText}`}>{name}</span>
      <span className={`${commonClasses.body14Regular} ${classes.unitText}`}>{unit}</span>
      <span className={`${commonClasses.body14Regular} ${classes.valueText}`}>{value}</span>
      <ThreeDotMenu customStyle={classes.threeDot} isDivider options={OPTIONS} handleClick={handleThreeDotAction} />
    </section>
  );
};

export default AddedBiomarkerCard;
