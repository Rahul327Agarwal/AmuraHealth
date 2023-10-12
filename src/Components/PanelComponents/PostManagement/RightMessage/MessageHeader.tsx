import { AttachIcon, AudioIcon, DescriptionIcon, HeadingIcon, ImageIcon, PostsIcon, ResponseNewIcon, VideoIcon } from '../PostManagement.svg';
import { useStyles } from './RightMessage.styles';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';

const ICON_OBJECT = {
  response: <ResponseNewIcon />,
  distributionChannel: <VideoIcon />,
  attachmentUpload: <AttachIcon />,
  thumbnail: <ImageIcon />,
  heading: <HeadingIcon />,
  description: <DescriptionIcon />,
  thumbnailUplaod: <ImageIcon />,
};

const Icon_attachmentObj = {
  video: <VideoIcon />,
  image: <ImageIcon />,
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
        {iconType
          ? iconType?.type === 'attachment'
            ? Icon_attachmentObj[iconType?.postType]
            : ICON_OBJECT[iconType?.type]
          : HeadingIcon}
      </span>
      <span className={`${commonClasses.body17Medium} ${classes.headingTitle}`}>{heading}</span>
    </header>
  );
}
