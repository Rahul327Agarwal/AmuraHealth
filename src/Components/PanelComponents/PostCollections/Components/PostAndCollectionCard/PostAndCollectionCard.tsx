import { Avatar } from '@mui/material';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import {
  BranchingIcon,
  ImageIcon,
  MultiSelectPost,
  MusicIcon,
  PostCollectionsIcon,
  PostsIcon,
  SelectPost,
  TextFieldPost,
  VideoIcon,
} from '../../PostCollections.svgs';
import { useStyles } from './PostAndCollectionCard.styles';
import { IProps, Icon_attachmentObjType } from './PostAndCollectionCard.types';

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

const PostAndCollectionCard = (props: IProps) => {
  const { cardData, postpreview1, postType, profilePic, endActionBtn } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();

  return (
    <div onClick={() => postpreview1(cardData.postId, postType)} className={`${classes.mainContainer}`}>
      <div className={classes.subContainer}>
        <div className={classes.avatarCon}>
          <div className={classes.profileDiv}>
            {
              <Avatar className={`${classes.profilePic}`}>
                {profilePic ? (
                  profilePic
                ) : postType == 'post_collection' ? (
                  <PostCollectionsIcon />
                ) : (
                  (Icon_attachmentObj as Icon_attachmentObjType)[postType!]
                )}
              </Avatar>
            }
          </div>
        </div>
        <div className={classes.contentCon}>
          <div className={classes.subContainer2}>
            <div className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
              {postType == 'post_collection' ? cardData?.collectionName : cardData?.heading}
            </div>
            <div className={classes.subContainer3}>{endActionBtn ? endActionBtn : null}</div>
          </div>
          {postType != 'post_collection' && cardData?.description && (
            <div>
              <div className={classes.captionCon}>
                <span className={`${classes.mainDescription}  ${CommonStyles.body15Regular}`}>{cardData?.description}</span>
              </div>
            </div>
          )}
          {postType == 'post_collection' && (
            <div className={classes.postContainer}>
              <div className={classes.leftBox}>
                {cardData?.subCollections ? <span className={classes.icondiv}>{<PostCollectionsIcon />}</span> : null}
                {cardData?.hasBranching ? <span className={classes.icondiv}>{<BranchingIcon />}</span> : null}
              </div>
              <div className={classes.postWrapper}>
                <span className={`${classes.mainDescription}  ${CommonStyles.body15Regular}`}>
                  {cardData?.numberOfPosts} Posts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostAndCollectionCard;
