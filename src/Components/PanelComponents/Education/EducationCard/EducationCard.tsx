import { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import PDFViewer from '../../../LibraryComponents/PDFViewer/PDFViewer';
import { Edit } from '../../../SVGs/Common';
import { useStyles } from './EducationCard.styles';
import { IProps } from './EducationCard.types';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';

const EducationCard = (props: IProps) => {
  const { qualification, joiningDate, internshipDate, university, attachments, country, speciality } = props.data;
  const { handleEdit } = props;
  const triggerEvent = useDFEvent();
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const goBack = useDFGoBack();

  const [showPDF, setShowPDF] = useState(false);
  const [fileLink, setFileLink] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const showPreview = (fileURL) => {
    setIsLoading(true);
    setFileLink(fileURL);
    setShowPDF(true);
    // triggerEvent('onPDFView', { url: fileURL });
  };
  let joiningYear = new Date(joiningDate).getFullYear();
  let internshipYear = new Date(internshipDate).getFullYear();
  let specialityNew = `${speciality}`;

  return (
    <>
      {isLoading && <IndeterminateLoader panelWidth={'100%'} />}
      {/* {isLoading && (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" />
        </>
      )} */}
      <div className={classes.container}>
        <div className={classes.spaceBetween}>
          <div>
            <span className={`${classes.wrapText} ${CommonStyles.body15Medium}`}>
              {qualification} {`${speciality && `(${speciality})`}`}
            </span>
            <span className={`${CommonStyles.caption12Medium}  ${classes.year}`}>{` ${joiningYear} - ${internshipYear}`}</span>
          </div>
          <div>
            <Edit
              className={classes.pointer}
              onClick={() => {
                setIsLoading(true);
                handleEdit(props.data);
              }}
            />
          </div>
        </div>
        <div className={classes.mb}>
          <span className={`${classes.wrapText} ${CommonStyles.body15Regular}`}>{university}</span>
          <span className={`${classes.year} ${classes.wrapText} ${CommonStyles.caption12Medium}`}>{country}</span>
        </div>
        {attachments.length > 0 && (
          <>
            <span className={`${CommonStyles.caption12Medium}`}>Attachments</span>
            {attachments.map((data, ind) => {
              return (
                <div onClick={() => showPreview(data)} className={classes.attachmentDiv}>
                  <span className={`${classes.fileName} ${classes.wrapText}`}> {data?.split('/')?.pop() || data}</span>
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

export default EducationCard;
