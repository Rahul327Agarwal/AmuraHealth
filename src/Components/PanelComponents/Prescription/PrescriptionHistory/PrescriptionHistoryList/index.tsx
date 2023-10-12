import moment from 'moment';
import { PMS_LOCALE } from '../../../../../Utils';
import React from 'react';
import { WidgetIcon } from '../../Prescription.svg';
import { historyPrescriptionStyles } from '../PrescriptionHistory.styles';
import { IProps } from './PrescriptionHistoryList.types';

export default function PrescriptionHistoryList(props: IProps) {
  const { prescriptionList, topicSnippetClick, downloadPrescription, patientId, sessions, selectedClient } = props;
  const { classes } = historyPrescriptionStyles();
  return (
    <div>
      {prescriptionList?.length ? (
        prescriptionList.map((item, index) => {
          let prescriptionName = item?.Key?.substring(item?.Key?.lastIndexOf('/') + 1, item?.Key?.indexOf('.')).split('_');
          let prescriptionDate = moment(parseInt(prescriptionName[0])).format('YYYY-MM-DD');
          let prescriptionNumber = prescriptionName[1];
          let displayName = `${
            prescriptionDate !== 'Invalid date' ? prescriptionDate : moment(item.LastModified).format('YYYY-MM-DD')
          }${prescriptionNumber ? ' - ' + prescriptionNumber : ''}`;
          return (
            <div key={`${displayName} ${index}`} className={classes.prescriptionContainer}>
              <div id={displayName} title={displayName}>
                {PMS_LOCALE.translate(displayName)}
              </div>
              <div></div>
              <div
                title={PMS_LOCALE.translate('Preview')}
                onClick={() => {
                  topicSnippetClick(item.Key);
                }}
                className={classes.widgetStyles}
              >
                {<WidgetIcon />}
              </div>
              {/* <div
                title={PMS_LOCALE.translate("Download")}
                className={classes.widgetStyles}
                onClick={() => {
                  downloadPrescription(
                    patientId,
                    sessions,
                    selectedClient,
                    item.Key
                  );
                }}
              >
                {PDFIcon}
              </div> */}
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
