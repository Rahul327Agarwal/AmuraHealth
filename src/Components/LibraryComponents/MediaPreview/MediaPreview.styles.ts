import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mediaPreviewBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px 20px',
    gap: '24px',
    width: '100%',
    background: theme.palette.colors.gray[25],
    border: `1px solid ${theme.palette.colors.gray[200]}`,
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  mediaPreviewTitle: {
    color: theme.palette.colors.gray[900],
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
