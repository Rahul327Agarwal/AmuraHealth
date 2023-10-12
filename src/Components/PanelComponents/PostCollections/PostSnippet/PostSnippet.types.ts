import { MouseEventHandler } from "react";

export interface PostSnippetProps {
  content?: string;
  title: string;
  titleOnly?: boolean;
  handleToggleView?: MouseEventHandler;
  isHideView?: boolean;
}

export interface PostSnippetHeaderProps {
  content?: string;
  icon: any;
  handleToggleView?: MouseEventHandler;
  isHideView?: boolean;
}
