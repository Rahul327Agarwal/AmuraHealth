import { useCallback, useEffect, useState } from 'react';
import { IProps } from './RegistrationSnippetHome.types';
import { Fab } from '@mui/material';
import RegistrationCard from './RegistrationCard/RegistrationCard';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import { PlusIcon } from '../../SVGs/Common';
import { useStyles } from './RegistrationSnippetHome.styles';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { getRegistrationCardsData } from './RegistrationSnippetHome.functions';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import { registerEvent, unRegisterEvent } from '../../../AppSync/AppSync.functions';
const RegistrationSnippetHome = (props: IProps) => {
  const { patientId } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const [registrationCards, setRegistrationCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendEvent = useDFEvent();
  const goBack = useDFGoBack();
  const onBack = () => {
    goBack('S');
  };
  let registrationDataListener;
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let cardsData = await getRegistrationCardsData(patientId, setIsLoading);
      console.log('cardsData', cardsData);

      setRegistrationCards(cardsData);
    })();
    registrationDataListener = registerEvent(patientId, 'pms-registration', async () => {
      let cardsData = await getRegistrationCardsData(patientId, setIsLoading);
      console.log('cardsData', cardsData);
      setRegistrationCards(cardsData);
    });
    return () => {
      if (registrationDataListener) {
        unRegisterEvent(registrationDataListener);
      }
    };
  }, []);

  return (
    <div className={classes.rootContainer}>
      <PageHeader headerContent={'Registration with professional bodies'} handleBack={onBack} />
      <div className={classes.scrollBody}>
        {isLoading && (
          <>
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
          </>
        )}

        {!isLoading &&
          registrationCards.map((data, ind) => {
            return <RegistrationCard cardData={data} patientId={props.patientId} sessions={props.sessions}/>;
          })}
      </div>
      <Fab
        onClick={() => {
          sendEvent('onAddRegistrationsSnippet', {
            ...props,
          });
        }}
        className={`${classes.addButton}`}
      >
        <PlusIcon />
      </Fab>
    </div>
  );
};

export default RegistrationSnippetHome;
