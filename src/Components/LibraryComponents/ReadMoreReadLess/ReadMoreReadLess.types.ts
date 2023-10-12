import { MouseEventHandler } from 'react';

export interface IProps {
  children: string;
  charLimit: number;
  ellipsis?: string;
  readMoreText?: string;
  readLessText?: string;
  readMoreClassName?: string;
  readLessClassName?: string;
}

export interface ReadButtonProps {
  isHidden: boolean;
  content: string;
  customStyle?: string;
  handleClick: MouseEventHandler;
}
