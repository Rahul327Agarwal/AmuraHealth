import React, { forwardRef } from 'react';
import Medicine  from '../Medicine/Medicine';
import { PDFGeneratorProps } from '../Prescription.types';
import { useStyles } from './PDFGenerator.styles';
import PresFooter  from './PresFooter/PresFooter';
import PresHeader  from './PresHeader/PresHeader';

const PDFGenerator = (props: PDFGeneratorProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { classes } = useStyles();

  return (
    <div ref={ref}>
      <div className={classes.spacing}>
        <PresHeader prescriptionNumber={props.prescriptionNumber} prescriptionStartDate={props.prescriptionStartDate} />
        <Medicine timeFilter={{ A: true, M: true, N: true, E: true }} {...props} />
        <PresFooter />
      </div>
    </div>
  );
};
export default forwardRef(PDFGenerator);
