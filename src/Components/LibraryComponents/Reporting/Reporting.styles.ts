import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 12px 8px 8px',
    gap: '8px',
    background: '#FFFFFF',
    border: '1px solid #E1E1E1',
    borderRadius: '64px',
    width: 'fit-content',
    maxWidth: '100%',
  },
  namediv: {
    color: '#5C5A61',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '12px',
  },
  contentCon: {
    width: 'calc(100% - 40px)',
  },
  // description: {width:"calc(100% - 56px)"},
  flex2: { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' },
  profilePic: {
    borderRadius: '50%',
    height: '32px',
    width: '32px',
    color: '#FFFFFF',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
    backgroundColor: theme.palette.colors.gray[900],
  },
  profilediv: {
    height: '32px',
    width: '32px',
    position: 'relative',
  },
  designation: {
    color: '#A6A6A6',
    fontSize: '10px',
    fontFamily: 'Graphik',
    fontweight: 400,
    lineheight: '12px',
    letterspacing: '0px',
    textalign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    wordBreak: 'break-word',
    '&:firstLetter': {
      textTransform: 'capitalize',
    },
  },
  logo: {
    '& svg': { width: '9px', height: '9px' },
  },
  cross: {
    '& svg': { width: '13px', height: '13px' },
    '& path': { fill: '#5C5A61' },
  },
}));
