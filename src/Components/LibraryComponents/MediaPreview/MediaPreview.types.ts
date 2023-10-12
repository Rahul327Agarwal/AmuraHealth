export interface IMediaPreviewBodyProps {
  children: React.ReactElement;
  title: string;
  customStyle?: string;
}

export interface IMediaPreviewProps {
  mediaType: mediaTypeOptions;
  mediaURL: string;
  sessions?: any;
  customStyle?: string;
}

export type mediaTypeOptions = "thumbnail" | "image" | "video" | "file" | "audio";
