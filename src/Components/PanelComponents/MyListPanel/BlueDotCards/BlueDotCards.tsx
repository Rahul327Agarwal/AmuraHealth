import { useEffect, useState } from 'react';
import { BlueDotCardsProps } from '../MyListHome.types';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import { BackArrowIcon } from '../../../SVGs/Common';
import { useStyles } from './BlueDotCards.styles';
import Card from './Card/Card';
import { ITaskDB } from '../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotPopUp.types';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { registerEvent, unRegisterEvent } from '../../../../AppSync/AppSync.functions';
import { getBlueDotsOfAUserInDetails } from './BlueDotCards.functions';
import { getStaffId } from '../CardComponent/MylistCard.functions';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const BlueDotCards = (props: BlueDotCardsProps) => {
  const goBack = useDFGoBack();
  const { sessions, selectedClientObject, reporteesData, activeTab } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const [selectedCard, setSelectedCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [blueDotDetails, setBlueDotDetails] = useState<ITaskDB[]>([]);

  useEffect(() => {
    let blueDotClickFromReportes = getStaffId(activeTab, reporteesData, selectedClientObject);
    buleDotsCallAPI(blueDotClickFromReportes);
    const blueDotListener = registerEvent(blueDotClickFromReportes, 'BLUEDOT', async () => {
      setBlueDotDetails([]);
      buleDotsCallAPI(blueDotClickFromReportes);
    });

    return () => {
      unRegisterEvent(blueDotListener);
    };
  }, [selectedClientObject]);

  let buleDotsCallAPI = async (blueDotClickFromReportes) => {
    try {
      const res = await getBlueDotsOfAUserInDetails(panelId, sessions, selectedClientObject, blueDotClickFromReportes);
      setBlueDotDetails(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    goBack('H');
  };
  return (
    <div className={`${classes.rootContainer} `}>
      <PageHeader
        customStyle={classes.headerStyle}
        startAdornment={
          <span className={classes.backArrow} onClick={handleBack}>
            <BackArrowIcon />
          </span>
        }
        headerContent={selectedClientObject?.title || ''} //{blueDotsScreenViewData.patientName}
      />
      {isLoading && (
        <>
          <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
        </>
      )}
      {!isLoading && (
        <div className={classes.bodyContainer}>
          {blueDotDetails.length > 0 &&
            blueDotDetails?.map((each) => {
              return <Card cardData={each} setSelectedCard={setSelectedCard} />; //isSelected={each.bluedotId === selectedCard}
            })}
        </div>
      )}
    </div>
  );
};

export default BlueDotCards;
