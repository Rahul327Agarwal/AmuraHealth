import { makeStyles } from 'tss-react/mui';
import { PostSnippetHeaderProps, PostSnippetProps } from './PostSnippet.types';

export const useStyles = makeStyles<PostSnippetProps>()((theme, props) => ({
  snippetBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingLeft: props.ispadding ? '40px' : '0px',
  },
  snippetBox1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '4px',
  },
  postCount: {
    height: '27px',
    width: '27px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#5C5A61',
    color: '#FFFFFF',
    borderRadius: '4px',
  },
  snippetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    wordBreak: 'break-word',
  },
  snippetTitle: {
    color: theme.palette.colors.theme.primary,
    wordBreak: 'break-word',
  },
  snippetContent: {
    color: theme.palette.colors.gray[500],
    maxWidth: 'calc(100% - 26px)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  snippetIconBox: {
    display: 'flex',
    // alignItems: "center",
    gap: '12px',
  },
}));
