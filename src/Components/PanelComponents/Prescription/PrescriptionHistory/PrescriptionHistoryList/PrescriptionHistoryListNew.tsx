import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../../../Utils';
import { historyPrescriptionStyles } from '../PrescriptionHistory.styles';
import { IProps } from './PrescriptionHistoryList.types';

export default function PrescriptionHistoryListNew(props: IProps) {
  const { prescriptionList, topicSnippetClick, downloadPrescription, patientId, sessions, selectedClient } = props;
  const { classes } = historyPrescriptionStyles();
  const CommonStyles = useCommonStyles();
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div>
      {prescriptionList?.length ? (
        prescriptionList.map((item, index) => {
          let prescriptionName = item?.Key?.substring(item?.Key?.lastIndexOf('/') + 1, item?.Key?.indexOf('.')).split('_');
          let prescriptionDate = moment(parseInt(prescriptionName[0])).format('DD/MM/YYYY');
          let prescriptionNumber = prescriptionName[1];
          let displayDate = `${
            prescriptionDate !== 'Invalid date' ? prescriptionDate : moment(item.LastModified).format('DD/MM/YYYY')
          }`;
          let displayName = `${displayDate}${prescriptionNumber ? ' - ' + prescriptionNumber : ''}`;
          return (
            <div
              id={displayName}
              className={classes.mainConaitner}
              onClick={() => {
                topicSnippetClick(item.Key);
                setSelectedCard(displayName as any);
              }}
            >
              <span className={`${classes.titleStyle} ${CommonStyles.body15Medium}`}>{PMS_LOCALE.translate(displayDate)}</span>
              <span className={`${classes.titleStyle} aligntexts ${CommonStyles.body15Medium}`}>
                {PMS_LOCALE.translate(prescriptionNumber) || ''}
              </span>
            </div>
          );
        })
      ) : (
        <div>
          <span className={classes.noData}>{PMS_LOCALE.translate('No data available')}</span>
        </div>
      )}
    </div>
  );
}
