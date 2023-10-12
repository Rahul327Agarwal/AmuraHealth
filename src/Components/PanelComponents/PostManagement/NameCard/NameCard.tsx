import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import {
  AudioIcon,
  ImageIcon,
  MultiSelectPost,
  PostsIcon,
  StatusIcon,
  SelectPost,
  TextFieldPost,
  VideoIcon,
  GcStatusIcon,
  TicIcon,
} from '../PostManagement.svg';
import DotStatus from './../../../LibraryComponents/DotStatus/DotStatus';
import ThreeDotMenu from './../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './NameCard.styles';
import { IProps } from './NameCard.types';

const Icon_attachmentObj = {
  video: <VideoIcon />,
  image: <ImageIcon />,
  audio: <AudioIcon />,
  file: <PostsIcon />,
  default: <PostsIcon />,
  textField: <TextFieldPost />,
  select: <SelectPost />,
  multiSelect: <MultiSelectPost />,
};

const NameCard = (props: IProps) => {
  const { cardData, isExtend, noThreeDot, customStyle, setSelectedCard, setAction, isSelected, handleSelect, openClient } = props;

  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();

  const handleMessageStatus = () => {
    setSelectedCard(cardData);
    setAction('MESSAGE_STATUS');
  };

  const clientStatus = 'New';

  return (
    <>
      {isExtend ? (
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
                  <div className={classes.profileDiv}>
                    <Avatar
                      className={`${classes.profilePic}`}
                      //src={`${import.meta.env.VITE_DP_URL}${cardData?.ID}/profile-pic.png`}
                    >
                      {(Icon_attachmentObj as any)[cardData?.postType!] || <PostsIcon />}
                    </Avatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div title={cardData?.heading} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                    {cardData?.heading}
                  </div>
                  <div className={`${classes.nameConatinerHeadMenu}`}>
                    <div className={classes.DotsDiv}>
                      <DotStatus color={'#252427'} isSelected={false} />
                      <DotStatus color={'#252427'} isSelected={false} />
                    </div>
                    {clientStatus ? (
                      <div className={classes.dotIconDiv}>
                        <ThreeDotMenu
                          isDivider
                          options={[
                            {
                              label: 'Manage statuses',
                              value: 'Manage statuses',
                              icon: StatusIcon,
                            },
                          ]}
                          handleClick={handleMessageStatus}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            {isExtend && (
              <div className={classes.subContainer6}>
                <div>
                  {/* {clientStatus && <div className={`${classes.phaseContainer} ${CommonStyles.sm10Medium}`}>{clientStatus}</div>} */}
                </div>
                <div className={`${classes.msgText}`}>
                  {/* <span className={`${CommonStyles.caption12Regular} ${classes.messageColor}`}>{message?.message}</span> */}
                </div>
                {/* <span className={`${CommonStyles.caption12Regular} ${classes.MessageTime} ${classes.messageColor}`}>{message?.receivedTime}</span> */}
              </div>
            )}
            <div className={classes.timeLineWrapperExtended}>
              {/* TODO: <CountDownTimeLine
//                 createdTime={new Date(cardData?.SLA?.CreatedTime || 0)}
//                 startTime={new Date(cardData?.SLA?.StartTime || 0)}
//                 endTime={new Date(cardData?.SLA?.EndTime || 0)}
//                 showTimer={clientStatus === 'New'}
//               /> */}
            </div>
            {isExtend && (
              <div className={classes.lastCon}>
                <div className={classes.iconGroup}>
                  {clientStatus && (
                    <span className={classes.gcStatusIcon} title={clientStatus}>
                      {<GcStatusIcon />}
                    </span>
                  )}
                </div>
                <div className={classes.profilegroupCon}></div>
              </div>
            )}
          </div>
          {isSelected && (
            <div className={classes.overlayStyle}>
              <span className="ticIconStyle">{<TicIcon />}</span>
            </div>
          )}
        </div>
      ) : (
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
                  <div className={classes.profileDiv}>
                    <Avatar className={`${classes.profilePic}`}>
                      {(Icon_attachmentObj as any)[cardData?.postType!] || <PostsIcon />}
                    </Avatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div title={cardData?.heading} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                    {cardData?.heading}
                  </div>
                  <div className={`${classes.nameConatinerHeadMenu}`}>
                    <div className={classes.DotsDiv}>
                      <DotStatus color={'#252427'} isSelected={false} />
                      <DotStatus color={'#252427'} isSelected={false} />
                    </div>
                    {clientStatus && !noThreeDot ? (
                      <div className={classes.dotIconDiv}>
                        <ThreeDotMenu
                          isDivider
                          options={[
                            {
                              label: 'Manage statuses',
                              value: 'Manage statuses',
                              icon: StatusIcon,
                            },
                          ]}
                          handleClick={handleMessageStatus}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                {cardData?.description && (
                  <div className={`${classes.nameContainerDesc}`}>
                    {/* <div
                      className={classes.leftBox}
                      style={{ visibility: "hidden" }}
                    >
                      {clientStatus && (
                        <span
                          className={classes.gcStatusIcon}
                          title={clientStatus}
                        >
                          {GcStatusIcon}
                        </span>
                      )}
                    </div> */}
                    <div className={classes.rightbox}>
                      <span className={`${classes.description} ${CommonStyles.caption12Medium}`}>{cardData?.description}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <div className={classes.timelineWrapper}>
              {clientStatus === "New" && (
                <CountDownTimeLine
                  createdTime={new Date(cardData?.SLA?.CreatedTime || 0)}
                  startTime={new Date(cardData?.SLA?.StartTime || 0)}
                  endTime={new Date(cardData?.SLA?.EndTime || 0)}
                  showTimer={clientStatus === "New"}
                />
              )}
            </div> */}
          </div>
          {isSelected && (
            <div className={classes.overlayStyle}>
              <span className="ticIconStyle">{<TicIcon />}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NameCard;
