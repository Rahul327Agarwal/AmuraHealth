import React from 'react';
import { useStyles } from './PostSnippet.styles';
import { PostSnippetHeaderProps, PostSnippetProps } from './PostSnippet.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { HideView, ViewIcon } from '../../../SVGs/Common';

const PostSnippet = (props: PostSnippetProps) => {
  const { content, isHideView, titleOnly, title, handleToggleView, ispadding } = props;

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return content || titleOnly ? (
    <div className={classes.snippetBox}>
      <div className={classes.snippetHeader}>
        <div className={`${classes.snippetTitle} ${commonClasses.body15Medium}`}>{title}</div>
        {handleToggleView ? <div onClick={handleToggleView}>{isHideView ? <HideView /> : <ViewIcon />}</div> : null}
      </div>
      {content ? <div className={`${classes.snippetContent} ${commonClasses.body15Regular}`}>{content}</div> : null}
    </div>
  ) : null;
};

const PostSnippetHeader = (props: PostSnippetHeaderProps) => {
  const { count, icon, content, isHideView, handleToggleView, isShowIcon } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return content ? (
    <div className={classes.snippetBox1}>
      <div className={classes.snippetIconBox}>
        <span className={classes.postCount}>{count}</span>
        <i>{icon}</i>
        {/* <div className={`${classes.snippetContent} ${commonClasses.body15Regular}`}>{content}</div> */}
        <div className={`${classes.snippetTitle} ${commonClasses.body15Medium}`}>{content}</div>
      </div>
      {handleToggleView ? <div onClick={handleToggleView}>{isHideView ? <HideView /> : <ViewIcon />}</div> : null}
    </div>
  ) : null;
};

export { PostSnippet, PostSnippetHeader };
