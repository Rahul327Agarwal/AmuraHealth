import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { AudioIcon, DescriptionIcon, HeadingIcon, PostsIcon, Thumbnail, VideoIcon } from '../../../SVGs/Common';
import { useStyles } from './RightMessage.styles';

const ICON_OBJECT = {
  distributionChannel: <VideoIcon />,
  privacy: <VideoIcon />,
  thumbnail: <Thumbnail />,
  heading: <HeadingIcon />,
  collectionName: <HeadingIcon />,
  title: <HeadingIcon />,
  description: <DescriptionIcon />,
  welcomeMessage: <DescriptionIcon />,
  thankYouMessage: <DescriptionIcon />,
};

const Icon_attachmentObj = {
  video: <VideoIcon />,
  image: <Thumbnail />,
  audio: <AudioIcon />,
  file: <PostsIcon />,
};
interface MessageHeaderProps {
  heading?: string;
  iconType?: any;
}

export default function MessageHeader(props: MessageHeaderProps) {
  const { heading, iconType } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <header className={classes.headerwrap}>
      <span>
        {iconType ? (
          iconType?.type === 'attachment' ? (
            (Icon_attachmentObj as any)[iconType?.postType]
          ) : (
            (ICON_OBJECT as any)[iconType?.type]
          )
        ) : (
          <HeadingIcon />
        )}
      </span>
      <span className={`${commonClasses.body17Medium} ${classes.headingTitle}`}>{heading}</span>
    </header>
  );
}
