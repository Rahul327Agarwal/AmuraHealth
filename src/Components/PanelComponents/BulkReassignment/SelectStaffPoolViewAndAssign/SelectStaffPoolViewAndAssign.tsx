import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './SelectStaffPoolViewAndAssign.styles';
import { IProps, ISelectedCard, IcardData, IUserNames } from './SelectStaffPoolViewAndAssign.types';

import { checkedIcon, partialCheckedIcon, unCheckedIcon } from '../MoveCardRequest/MoveMyCardsIcons';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import Checkbox from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import StaffCard from './StaffCard/StaffCard';
import { convertObject, getStaffPoolData, handleAutoAssign } from './SelectStaffPoolViewAndAssign.function';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function SelectStaffPoolViewAndAssign(props: IProps) {
  const childEventTrigger = useDFEvent();
  const { id: panelId } = useCurrentPanel();
  const goBack = useDFGoBack();
  const {
    sessions,
    headerContent,
    setAction,
    action,
    summaryData,
    cardsToAssign,
    reShowStaffPollCards,
    setReShowStaffPollCards,
  } = props || {};
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState<IcardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<ISelectedCard>({}); //ISelectedCard
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [cardsCount, setCardsCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let response = await getStaffPoolData(panelId, sessions, summaryData);
      let newObject = convertObject(response);
      setCardData(newObject);
      setIsLoading(false);
      setSelectedCards(reShowStaffPollCards);
    })();
  }, [props]);

  const handleManual = () => {
    setReShowStaffPollCards(selectedCards);
    setAction('MANUALADD');
  };
  const handleAuto = async () => {
    setDisableBtn(true);
    let response: any = await handleAutoAssign(sessions, cardsToAssign, selectedCards, summaryData, panelId);
    if (response?.statusCode === 200) {
      // childEventTrigger('onEmptyWorkPanel', {});
      goBack('S');
    }
    setDisableBtn(false);
  };
  const { isSelected, isCheckStatus } = useMemo(() => {
    let isSelected = false;
    let isCheckStatus = false;
    let totalStaff = cardData.length || 0;
    let totalSelectedStaff = 0;
    for (let key in selectedCards) {
      const staffData = selectedCards[key].length;
      totalSelectedStaff += staffData;
    }
    if (totalStaff > 0 && totalStaff === totalSelectedStaff) isSelected = true;
    if (totalSelectedStaff > 0) isCheckStatus = true;
    return { isSelected, isCheckStatus };
  }, [selectedCards]);

  const onSelectAll = () => {
    if (!isSelected) {
      let result = {};
      cardData.forEach((obj) => {
        const { currentStaffRoleId, patientId } = obj;
        if (!result[currentStaffRoleId] && currentStaffRoleId && patientId) {
          result[currentStaffRoleId] = [];
        }
        if (patientId && currentStaffRoleId) result[currentStaffRoleId].push(patientId);
      });
      setSelectedCards(result);
    } else {
      setSelectedCards({});
    }
  };

  const onSelectCard = (currentStaffRoleId: string, patientId: string) => {
    let preClone = JSON.parse(JSON.stringify(selectedCards));
    let preValue = preClone[currentStaffRoleId] || [];
    const index = preValue.indexOf(patientId);
    if (index !== -1) {
      preValue.splice(index, 1);
    } else {
      preValue = [...preValue, patientId];
    }
    const selectedObject: ISelectedCard = { ...preClone, [currentStaffRoleId]: [...preValue] };
    setSelectedCards(selectedObject);
  };

  return (
    <div className={classes.mainContainer}>
      <PageHeader
        handleBack={() => {
          setReShowStaffPollCards(selectedCards);
          setAction('HOME');
        }}
        customStyle={classes.headerStyle}
        headerContent={headerContent || ''}
        bottomContainer={<span>Choose the staff to map the selected {cardsToAssign.length} cards</span>}
        bottomContainerStyle={classes.bottomContainerStyle}
      />
      <div className={classes.cheboxDiv}>
        {isLoading ? (
          <MUISkeleton variant={'rectangular'} height={'46px'} />
        ) : (
          <span className={classes.allCheckboxContainer} onClick={onSelectAll}>
            <Checkbox
              checked={Boolean(isSelected)}
              icon={isCheckStatus ? partialCheckedIcon : unCheckedIcon}
              checkedIcon={checkedIcon}
            />
            <span className={`${commonClasses.body17Regular} ${classes.labelText}`}>Select All</span>
          </span>
        )}
      </div>

      <div className={classes.scrollBody}>
        {isLoading && (
          <>
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          </>
        )}
        {!isLoading &&
          cardData?.map((detailsData) => {
            return (
              <div className={classes.staffcardBox}>
                <StaffCard
                  key={detailsData.patientId}
                  selectType="card"
                  id={detailsData.patientId}
                  onSelect={() => {
                    onSelectCard(detailsData.currentStaffRoleId, detailsData.patientId);
                  }}
                  isSelected={(selectedCards[detailsData.currentStaffRoleId] || []).includes(detailsData.patientId)}
                />
              </div>
            );
          })}
      </div>
      {Object.keys(selectedCards).length > 0 ? (
        <PanelFooter
          paddingX="20px"
          customStyle={classes.footerStyle}
          leftButtonText={'Manual'}
          righButtontText={'Auto'}
          handleLeftButton={handleManual}
          handleRightButton={handleAuto}
          disableRightButton={disableBtn}
          disableLeftButton={cardsToAssign.length === 1 ? false : true}
        />
      ) : null}
    </div>
  );
}
