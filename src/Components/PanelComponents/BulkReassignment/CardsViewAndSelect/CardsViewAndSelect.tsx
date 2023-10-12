import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './CardsViewAndSelect.styles';
import { IProps, ISelectedCard, IStaff, IUserNames } from './CardsViewAndSelect.types';

import { checkedIcon, partialCheckedIcon, unCheckedIcon } from '../MoveCardRequest/MoveMyCardsIcons';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import Checkbox from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import StaffCard from './StaffCard/StaffCard';
import { getCardsToAssign, makecardstoAssignObj } from './CardsViewAndSelect.function';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { doesUserHaveClickAccess } from '../../../../Utilities/AccessPermissions';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function CardsViewAndSelect(props: IProps) {
  const childEventTrigger = useDFEvent();
  const goBack = useDFGoBack();
  const {
    sessions,
    headerContent,
    setAction,
    summaryData,
    clickedSnippetIds,
    reShowSelectCards,
    setReShowSelectSelectedCards,
    setCardsToAssign,
  } = props || {};

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState<IStaff[]>([]);
  const [selectedCards, setSelectedCards] = useState<ISelectedCard>({}); //ISelectedCard
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let userAccess = doesUserHaveClickAccess(accessPermissionsForThisClient, 'Summary', 'Summary.Bulk');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let response = await getCardsToAssign(panelId, sessions, summaryData, clickedSnippetIds);
      setCardData(response);
      setIsLoading(false);
      setSelectedCards(reShowSelectCards);
    })();
  }, [props]);

  const handleReject = () => {
    // childEventTrigger('onEmptyWorkPanel', {});
    goBack('S');
  };
  const handleNext = () => {
    let makeObj = makecardstoAssignObj(cardData, selectedCards);
    setReShowSelectSelectedCards(selectedCards);
    setCardsToAssign(makeObj);
    setAction('STAFFPOOLVIEW');
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
      <PageHeader handleBack={handleReject} customStyle={classes.headerStyle} headerContent={headerContent || ''} />
      {userAccess && (
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
      )}

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
                  userIsTA={userAccess}
                  id={detailsData.patientId}
                  onSelect={() => {
                    if (userAccess) onSelectCard(detailsData.currentStaffRoleId, detailsData.patientId);
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
          leftButtonText="" //{'Reject'}
          righButtontText={'Next'}
          handleLeftButton={() => {}} //{handleReject}
          handleRightButton={handleNext}
          disableLeftButton={true}
        />
      ) : null}
    </div>
  );
}
