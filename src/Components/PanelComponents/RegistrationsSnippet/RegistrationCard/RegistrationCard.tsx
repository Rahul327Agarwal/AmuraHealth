import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './RegistrationCard.styles';
import { IProps } from './RegistrationCard.types';
import { Edit } from '../../../SVGs/Common';
import { useDFEvent } from '../../../../DisplayFramework/Events/DFEvents';
import { IProps as IAddRegistrationProps } from './../AddRegistrations/AddRegistration.types';
import moment from 'moment';
import { useState } from 'react';
import PDFViewer from '../../../LibraryComponents/PDFViewer/PDFViewer';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';

const RegistrationCard = (props: IProps) => {
  const { professionalBody, country, regNumber, validFrom, validThru, qualificationInfo, attachments } = props.cardData;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const sendEvent = useDFEvent();
  const [showPDF, setShowPDF] = useState(false);
  const [fileLink, setFileLink] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const showPreview = (fileURL) => {
    setIsLoading(true);
    setFileLink(fileURL);
    setShowPDF(true);
    // triggerEvent('onPDFView', { url: fileURL });
  };

  return (
    <>
      {isLoading && <IndeterminateLoader panelWidth={'100%'} />}

      <div className={classes.container}>
        <div className={classes.spaceBetween}>
          <div>
            <span className={`${CommonStyles.body15Medium} ${classes.wordBreaks}`}>{professionalBody}</span>
            <span className={`${classes.colorSyle} ${CommonStyles.caption12Medium} ${classes.wordBreaks}`}>{country}</span>{' '}
          </div>
          <div
            onClick={() => {
              sendEvent<IAddRegistrationProps>('onAddRegistrationsSnippet', {
                ...props,
                isEdit: true,
                editCardregistrationId: props.cardData.registrationId,
              });
            }}
            className={classes.pointer}
          >
            <Edit />
          </div>
        </div>
        <div className={classes.mb}>
          <span className={`${CommonStyles.body15Medium} ${classes.wordBreaks}`}>Reg. No. {regNumber}</span>
          <span className={`${CommonStyles.caption12Medium}  ${classes.colorSyle} ${classes.wordBreaks}`}>{`${moment(
            new Date(validFrom)
          ).format('MMM YYYY')} - ${moment(new Date(validThru)).format('MMM YYYY')}`}</span>
        </div>
        <span className={`${CommonStyles.body15Medium}`}>Educations & Registrations:</span>
        <div className={` ${classes.educationsDetails}`}>
          {qualificationInfo?.map((data, ind) => {
            return (
              <span className={`${CommonStyles.body14Regular} ${classes.wordBreaks} ${classes.fileName}`}>{data?.label}</span>
            );
          })}
        </div>
        {attachments.length > 0 && (
          <>
            <span className={`${CommonStyles.caption12Medium} ${classes.mT16}`}>Attachments</span>
            {attachments.map((data, ind) => {
              return (
                <div onClick={() => showPreview(data)} className={classes.attachmentDiv}>
                  <span className={`${CommonStyles.caption12Regular} ${classes.wordBreaks} ${classes.fileName}`}>
                    {data?.split('/')?.pop() || data}
                  </span>
                </div>
              );
            })}
          </>
        )}

        {showPDF && (
          <PDFViewer
            url={fileLink}
            sessions={props.sessions}
            setShowPDF={setShowPDF}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default RegistrationCard;
