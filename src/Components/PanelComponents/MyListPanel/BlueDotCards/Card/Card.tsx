import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useStyles } from './Card.styles';
import { CardInfo, ICardProps } from './Card.types';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import CountDownTimeLine from '../../../../LibraryComponents/CountDownTimer/CountDownTimeLine/CountDownTimeLine';
import DotStatus from '../../../../LibraryComponents/DotStatus/DotStatus';
import { useFetchUserName } from '../../../../../Common/Common.hooks';

const Card = (props: ICardProps) => {
  const { setSelectedCard, cardData, isSelected } = props;
  const [cardDetails, setCardDetails] = useState<CardInfo>({});
  const [endTime, setEndTime] = useState<null | string>(cardData?.endTime || null);
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const [autodotChage, setAutodotChage] = useState(false);
  const { fetchUserName } = useFetchUserName();

  useEffect(() => {
    (async () => {
      if (cardData?.createdBy === cardData?.ownerId) {
        let createdByName = await fetchUserName(cardData?.createdBy);
        setCardDetails({ ...props.cardData, createdByName, madeForName: createdByName });
      } else {
        let createdByName = await fetchUserName(cardData?.createdBy);
        let madeForName = await fetchUserName(cardData?.ownerId);
        setCardDetails({ ...props.cardData, createdByName, madeForName });
      }
    })();
  }, [props.cardData]);
  useEffect(() => {
    var timerInterval = setInterval(() => {
      let dotStatus = cardDetails?.endTime ? new Date().getTime() > new Date(cardDetails?.endTime).getTime() : false;
      if (dotStatus) {
        setAutodotChage(dotStatus);
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  return (
    <div
      className={`${classes.mainContainer}`}
      onClick={() => setSelectedCard(cardData?.bluedotId)}
      style={{ padding: '12px 20px' }}
    >
      <div className={`${classes.nameContainerHead}`}>
        <div className={`${classes.userNametext} ${CommonStyles.body15Medium}`} title={cardData?.description || ''}>
          {cardDetails?.description || ''}
        </div>
        <DotStatus
          //  color={
          //   cardDetails?.endTime
          //     ? new Date().getTime() < new Date(cardDetails?.endTime).getTime()
          //       ? cardDetails?.isTransferred
          //         ? '#CAF0F8'
          //         : '#007AFF'
          //       : '#252427'
          //     : autodotChage
          //     ? '#252427'
          //     : '#007AFF'
          // }
          color={
            cardDetails?.endTime
              ? cardDetails?.isTransferred
                ? new Date().getTime() < new Date(cardDetails?.endTime).getTime()
                  ? '#CAF0F8'
                  : '#A6A6A6'
                : new Date().getTime() < new Date(cardDetails?.endTime).getTime()
                ? '#007AFF'
                : '#252427'
              : cardDetails?.isTransferred
              ? autodotChage
                ? '#A6A6A6'
                : '#CAF0F8'
              : autodotChage
              ? '#252427 '
              : '#007AFF'
          }
          isSelected={false}
        />
      </div>
      <div className={classes.detailsContainer}>
        <div className={classes.createdCon}>
          <span className={`${classes.textStyle} ${CommonStyles.caption12Regular}`}>Created by</span>
          <span className={`${classes.textStyle} ${CommonStyles.caption12Medium}`} title={cardDetails?.createdByName || ''}>
            {cardDetails?.createdByName || ''}
          </span>
          <span className={`${classes.textStyle} ${CommonStyles.caption12Regular}`}>
            {format(new Date(cardDetails?.createdOn || new Date()), 'dd/MM/yyyy, hh:mm aa')}
          </span>
        </div>
        <div className={classes.madeCon}>
          <span className={`${classes.textStyle} textEnd ${CommonStyles.caption12Regular}`}>Made for</span>
          <span className={`${classes.textStyle} textEnd ${CommonStyles.caption12Medium}`} title={cardDetails?.madeForName || ''}>
            {cardDetails?.madeForName || ''}
          </span>
          <span className={`${classes.textStyle} textEnd ${CommonStyles.caption12Regular}`}>
            {cardDetails?.endTime ? (
              format(new Date(cardDetails?.endTime || new Date()), 'dd/MM/yyyy, hh:mm aa')
            ) : (
              <span style={{ display: 'block', height: '16px', textAlign: 'center' }}></span>
            )}
          </span>
        </div>
      </div>
      {endTime && (
        <div className={classes.timeLineWrapperExtended} style={{ height: '20px' }}>
          {endTime && (
            <CountDownTimeLine
              createdTime={null}
              startTime={null}
              endTime={endTime ? new Date(endTime) : null}
              showTimer={true}
              noBGandPadding={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
