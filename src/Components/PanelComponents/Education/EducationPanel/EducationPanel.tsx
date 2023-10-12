import { Fab } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { registerEvent, unRegisterEvent } from '../../../../AppSync/AppSync.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import { PlusIcon } from '../../../SVGs/Common';
import AddEducation from '../AddEducation/AddEducation';
import EducationCard from '../EducationCard/EducationCard';
import { convertURLToFile, getEducationDetails, getUniversityName } from './EducationPanel.functions';
import { useStyles } from './EducationPanel.styles';
import { BackArrowIcon } from './EducationPanel.svg';
import { IProps } from './EducationPanel.types';

const EducationPanel = (props: IProps) => {
  const { sessions, patientId } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const goBack = useDFGoBack();
  const [action, setAction] = useState('Education');
  const [educationData, setEducationData] = useState([]);
  const [editCardData, setEditCardData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const componentMounted = useRef(false);

  const handleEdit = async (data) => {
    const Files: File[] = (
      await Promise.all(
        data.attachments?.map(async (url: string) => {
          return await convertURLToFile(url, sessions);
        })
      )
    ).filter((file) => file);

    setEditCardData({ ...data, edit: true, files: Files });
    setAction('Add Education');
  };
  useEffect(() => {
    if (componentMounted.current) return;
    componentMounted.current = true;

    (async () => {
      setIsLoading(true);
      const educationData = await getEducationDetails(patientId);
      const sortedData = educationData.sort((a, b) => {
        let result = new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        return result;
      });
      setEducationData(sortedData);
      setIsLoading(false);
    })();
  }, []);

  let updatedEducationData;

  useEffect(() => {
    updatedEducationData = registerEvent(`${patientId}`, 'pms-education', async () => {
      const educationData = await getEducationDetails(patientId);
      const sortedData = educationData.sort((a, b) => {
        let result = new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        return result;
      });
      setEducationData(sortedData);
      setIsLoading(false);
    });
    return () => {
      if (updatedEducationData) {
        unRegisterEvent(updatedEducationData);
      }
    };
  }, [props]);

  switch (action) {
    case 'Education':
      return (
        <div className={classes.rootContainer}>
          <PageHeader
            startAdornment={
              <span className={classes.backButton}>
                <BackArrowIcon
                  onClick={() => {
                    goBack('S');
                  }}
                />
              </span>
            }
            headerContent={'Education'}
          />
          <div className={classes.scrollBody}>
            {isLoading ? (
              <>
                <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
                <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
                <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
              </>
            ) : (
              <>
                {educationData.map((data, ind) => {
                  return <EducationCard data={data} handleEdit={handleEdit} sessions={sessions} key={data.createdOn} />;
                })}
              </>
            )}
          </div>
          <Fab
            onClick={() => {
              setEditCardData({ edit: false });
              setAction('Add Education');
            }}
            className={`${classes.addButton}`}
          >
            <PlusIcon />
          </Fab>
        </div>
      );
    case 'Add Education':
      return <AddEducation {...props} editCardData={editCardData} setAction={setAction} />;
    default:
      return <></>;
  }
};

export default EducationPanel;
