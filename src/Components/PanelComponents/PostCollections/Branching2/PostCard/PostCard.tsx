import { Avatar } from '@mui/material';
import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { MultiSelectPost, PostsIcon, SelectPost, TextFieldPost } from '../../../../SVGs/Common';
import { useStyles } from './PostCard.styles';
import { IProps } from './PostCard.types';

const PostCard = (props: IProps) => {
  const { name, mainDescription, handleCardClick, borderColor, postType } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const Icon_attachmentObj = {
    file: <PostsIcon />,
    default: <PostsIcon />,
    textField: <TextFieldPost />,
    select: <SelectPost />,
    multiSelect: <MultiSelectPost />,
  };

  return (
    <div className={`${classes.mainContainer} `}>
      <div className={classes.subContainer} onClick={handleCardClick}>
        <div className={classes.avatarCon}>
          <div className={classes.profileDiv}>
            {<Avatar className={`${classes.profilePic}`}>{Icon_attachmentObj[postType]}</Avatar>}
          </div>
        </div>
        <div className={classes.contentCon}>
          <div className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>{name}</div>
          {mainDescription && (
            <div className={classes.captionCon}>
              <span className={`${classes.mainDescription}  ${CommonStyles.body15Regular}`}>{mainDescription}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
