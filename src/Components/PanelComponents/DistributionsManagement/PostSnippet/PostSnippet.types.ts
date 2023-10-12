import { MouseEventHandler } from "react";

export interface PostSnippetProps {
  content?: string;
  title?: string;
  titleOnly?: boolean;
  handleToggleView?: MouseEventHandler;
  isHideView?: boolean;
  ispadding?:boolean
}

export interface PostSnippetHeaderProps extends PostSnippetProps {
  content?: string;
  icon: any;
  handleToggleView?: MouseEventHandler;
  isHideView?: boolean;
  isShowIcon?:boolean;
  count?:number;
}
