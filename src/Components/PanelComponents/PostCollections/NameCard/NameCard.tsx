import { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PostCollections, TicIcon } from '../PostCollections.svgs';
import DotStatus from './../../../LibraryComponents/DotStatus/DotStatus';
import { useStyles } from './NameCard.styles';
import { IProps } from './NameCard.types';

const NameCard = (props: IProps) => {
  const { cardData, customStyle, setSelectedCard, setAction, isSelected, handleSelect, openClient } = props;

  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const clientStatus = true;

  return (
    <>
      <div
        className={`${classes.mainContainer} ${customStyle}`}
        onClick={() => {
          if (handleSelect) {
            handleSelect(cardData);
          }
        }}
        {...(openClient && { onClick: () => openClient() })}
      >
        <div className={`${classes.bannerDiv}`}></div>
        <div className={`${classes.contentContainer}`}>
          <div className={`${classes.nameCardHeader}`}>
            <div className={`${classes.profilecontainer}`}>
              <div className={classes.avatarCon}>
                <div className={classes.profileDiv}>{<PostCollections />}</div>
              </div>
            </div>
            <div className={`${classes.nameContainer}`}>
              <div className={`${classes.nameContainerHead}`}>
                <div className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>{cardData?.collectionName}</div>
                <div className={`${classes.nameConatinerHeadMenu}`}>
                  <div className={classes.DotsDiv}>
                    <DotStatus color={'#252427'} isSelected={false} />
                    <DotStatus color={'#252427'} isSelected={false} />
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainerDesc}`}>
                <div className={classes.leftBox}>
                  {clientStatus && cardData?.subCollections === true ? (
                    <span className={classes.icondiv}>{<PostCollections />}</span>
                  ) : null}
                  {/* {clientStatus && cardData?.numberOfPosts>0 ? <span className={classes.icondiv} >{QuestionIcon}</span> : null} */}
                  {clientStatus && cardData?.numberOfPosts > 0 ? (
                    <span className={classes.postWrapper}>{cardData?.numberOfPosts} posts</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSelected && (
          <div className={classes.overlayStyle}>
            <span className="ticIconStyle">{<TicIcon />}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default NameCard;
