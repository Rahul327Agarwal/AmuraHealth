import React from 'react';
import MediaAudio from '../ChatComponent/Media/MediaAudio';
import MediaDoc from '../ChatComponent/Media/MediaDoc';
import MediaPhoto from '../ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign  from './../ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import { IMediaPreviewProps } from './MediaPreview.types';
import MediaPreviewBody from './MediaPreviewBody';

const MediaPreview = (props: IMediaPreviewProps) => {
  const { mediaType, mediaURL, customStyle, sessions } = props;

  switch (mediaType) {
    case 'thumbnail':
      return (
        <MediaPreviewBody customStyle={customStyle} title="Thumbnail image">
          <MediaPhoto src={mediaURL} sessions={sessions} />
        </MediaPreviewBody>
      );
    case 'image':
      return (
        <MediaPreviewBody customStyle={customStyle} title="Image">
          <MediaPhoto src={mediaURL} sessions={sessions} />
        </MediaPreviewBody>
      );
    case 'video':
      return (
        <MediaPreviewBody customStyle={customStyle} title="Video">
          <VideoPlayerNewDesign src={mediaURL} sessions={sessions} />
        </MediaPreviewBody>
      );
    case 'file':
      return (
        <MediaPreviewBody customStyle={customStyle} title="Document">
          <MediaDoc src={mediaURL} sessions={sessions} />
        </MediaPreviewBody>
      );
    case 'audio':
      return (
        <MediaPreviewBody customStyle={customStyle} title="Audio">
          <MediaAudio src={mediaURL} whiteTheme sessions={sessions} />
        </MediaPreviewBody>
      );
    default:
      return null;
  }
};

export default MediaPreview;
