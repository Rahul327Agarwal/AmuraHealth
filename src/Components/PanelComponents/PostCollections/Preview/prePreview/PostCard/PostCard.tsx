import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import { PostCollectionsIcon } from '../../../../../SVGs/Common';

import { useEffect, useState } from 'react';
import ThreeDotActionMenu from '../../../ThreeDotActionMenu/ThreeDotActionMenu';
import { IRootState } from './../../../../../../DisplayFramework/State/store';
import ThreeDotModal from './../../../../../LibraryComponents/ThreeDotModal/ThreeDotModal';
import { useStyles } from './PostCard.styles';
import {
  BranchingIcon,
  ImageIcon,
  MultiSelectPost,
  MusicIcon,
  PostCollections,
  PostsIcon,
  SelectPost,
  TextFieldPost,
  VideoIcon,
} from './PostCard.svg';
import { IProps } from './PostCard.types';

const PostCard = (props: IProps) => {
  const {
    invisibleKeys,
    name,
    mainDescription,
    noThreeDot,
    postType,
    totalPost,
    threeDotOptions,
    handleThreeDotAction,
    handlecardClick,
    postId,
    maindata,
    profilePic,
  } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const branchingdata = useSelector((state: IRootState) => state.Branching.BranchingCardData);

  const [localInvisibleKeys, setLocalInvisibleKeys] = useState([]);
  const [seletedCard, setSelectedCard] = useState(false);

  // useEffect(() => {
  //   if (postId === branchingdata?.postId) {
  //     setSelectedCard(true);
  //   } else {
  //     setSelectedCard(false);
  //   }
  // }, []);

  useEffect(() => {
    setLocalInvisibleKeys(invisibleKeys);
  }, [invisibleKeys]);

  const Icon_attachmentObj = {
    video: <VideoIcon />,
    image: <ImageIcon />,
    audio: <MusicIcon />,
    file: <PostsIcon />,
    default: <PostsIcon />,
    textField: <TextFieldPost />,
    select: <SelectPost />,
    multiSelect: <MultiSelectPost />,
  };
  return (
    <div className={seletedCard ? `${classes.mainContainerselected} ` : `${classes.mainContainer} `}>
      <div
        className={classes.subContainer}
        onClick={(e) => {
          if (noThreeDot) {
            e.stopPropagation();
            handlecardClick();
          }
        }}
      >
        <div className={classes.avatarCon}>
          <div className={classes.profileDiv}>
            {
              <Avatar className={`${classes.profilePic}`}>
                {profilePic ? (
                  profilePic
                ) : postType === 'post_collection' ? (
                  <PostCollectionsIcon />
                ) : (
                  Icon_attachmentObj[postType]
                )}
              </Avatar>
            }
          </div>
        </div>
        <div className={classes.contentCon}>
          <div className={!noThreeDot ? classes.subContainer2 : classes.contentwrap}>
            <div className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>{name}</div>
            <div className={classes.subContainer3}>
              {!noThreeDot ? (
                // <div className={classes.dotIconDiv}>
                <ThreeDotModal isGrow={true} usePopOver>
                  <div className={classes.actionModalStyle}>
                    <ThreeDotActionMenu
                      checkedKeys={localInvisibleKeys}
                      options={threeDotOptions}
                      handleOnClick={(data) => {
                        setLocalInvisibleKeys(data.selected);
                        handleThreeDotAction(data);
                      }}
                    />
                  </div>
                </ThreeDotModal>
              ) : null}
            </div>
          </div>
          {postType !== 'post_collection' && (
            <div className={classes.audioContainer}>
              {/* <i>{!noThreeDot || branchingdata?.branching?.length !== 0 ? BranchingIcon : ''}</i> */}
              {maindata?.hasBranching && (
                <i className={classes.BranchingIconSmall}>
                  <BranchingIcon />
                </i>
              )}
              {mainDescription != undefined && (
                <div className={classes.captionCon}>
                  <span className={`${classes.mainDescription}  ${CommonStyles.body15Regular}`}>{mainDescription}</span>
                </div>
              )}
            </div>
          )}
          {postType === 'post_collection' && (
            <div className={classes.postContainer}>
              <div className={classes.iconsContainer}>
                {maindata?.hasSubcollections && (
                  <i className={classes.postIconSmall}>
                    <PostCollectionsIcon />
                  </i>
                )}
                {maindata?.hasBranching && (
                  <i className={classes.postIconSmall}>
                    <BranchingIcon />
                  </i>
                )}
              </div>
              <div className={classes.postWrapper}>
                <span className={`${classes.mainDescription}  ${CommonStyles.body15Regular}`}>{totalPost} Posts</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
