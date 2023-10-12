import { makeStyles } from 'tss-react/mui';
import { IProps } from './HealthObjective.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container: {
    position: 'relative',
    background: '#FFFFFF',
    padding: '1rem',
    height: 'inherit',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height: '56px',
    '& svg': {
      '& path': {
        fill: '#5C5A61',
      },
    },
  },
  objectContainer: {
    maxHeight: '100%',
    overflow: 'hidden',
    height: '100%',
  },
  objectContainerWithButton: {
    height: 'calc(100% - 56px)',
    maxHeight: 'calc(100% - 56px)',
  },
  wrapper: {
    // alignItems:"center",
    height: 'calc(100%)',
    display: 'flex',
    flexDirection: 'column',
    '& svg': {
      cursor: 'pointer',
      '& path': {
        fill: '#5C5A61',
      },
    },
  },
  headerSpan: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 32px)',
  },
  objectiveWrapper: {
    display: 'grid',
    // justifyContent:"center",
    alignItems: 'center',
    flex: 0,
    gap: '15px',
    // gridTemplateColumns: '24px 32px calc(100% - 121px) 20px',
    gridTemplateColumns: '20px 32px calc(100% - 20px - 15px - 15px - 15px - 32px - 20px) 20px',
  },
  objectiveWrapper1: {
    display: 'grid',
    // justifyContent:"center",
    // alignItems:"center",
    flex: 0,
    // gap: '15px',
    // gridTemplateColumns: '32px calc(100% - 15px - 15px - 32px - 20px) 20px',
    gridTemplateColumns: '32px calc(100% - 32px) 0px',

    maxHeight: 'calc(100% - 56px)',
  },
  objWrapper:{
    width:"100%"
  },
  mainSection: {
    overflow: 'hidden',
    height: 'inherit',
  },
  mainSection2: {
    overflow: 'auto',
  },
  height100: {
    height: '100%',
  },
  overflowAutoDescription: {
    overflow: 'auto',
    height: '100%',
  },
  iconWrapper: {
    background: '#F1F1F1',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      '& path': {
        fill: 'none',
      },
    },
  },
  text: {
    display: 'block',
    color: '#5C5A61',
    marginTop: '22px',
    wordBreak: 'break-word',
    whiteSpace:'pre-wrap'
  },
  edit: {
    cursor: 'pointer',
  },
  footer: {},
}));
