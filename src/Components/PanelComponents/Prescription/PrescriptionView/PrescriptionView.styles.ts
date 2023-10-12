import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  //export styles to different file
  prescriptionBody: {
    background: 'rgba(255, 255, 255, 0.5)',
    paddingTop: '1px',
    paddingBottom: '1px',
  },
  prescriptionForm: {
    height: 'inherit',
    maxHeight: ' calc(100% - 120px)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  previewHover: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
  prescriptionDaysLabelGrid: {
    width: '198px',
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '77% 33%',
  },
  landScapeSpan: {
    padding: '0px 8px',
    width: '25px',
    fontSize: '10px',
    border: '1px solid',
    margin: 'auto 0px auto 4px',
  },
  potraitSpan: {
    padding: '4px 3px',
    width: '14px',
    fontSize: '10px',
    border: '1px solid',
    marginLeft: '4px',
  },
  radioGroup: {
    width: '260px',
    alignItems: 'baseline',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), #121212',
    color: '#fff !important',
    border: '1px solid #595A5A',
    borderRadius: '4px',
  },
  component: {
    background: '#FFFFFF',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
  },
  backArrow: {
    cursor: 'pointer',
    margin: '8px 8px 0px 12px',
  },
  dropdownItem: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px',
  },
  dropdownListItem: {
    display: 'grid',
    gridTemplateColumns: '32px auto',
    marginBottom: '12px',
    height: '40px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      '& span': { color: theme.palette.colors.gray[900] },
      '& path': { fill: theme.palette.colors.gray[900] },
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  dropdownListItemOld: {
    display: 'grid',
    marginBottom: '12px',
    height: '40px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      '& span': { color: theme.palette.colors.gray[900] },
      '& path': { fill: theme.palette.colors.gray[900] },
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  listIcon: {
    display: 'block',
    margin: 'auto',
  },
  listTitle: {
    display: 'block',
    margin: 'auto 0px',
  },
  listItemText: {
    fontSize: '16px',
    color: theme.palette.colors.gray[500],
  },
  profile: { height: '24px', width: '24px', color: theme.palette.colors.gray[900] },
  modalWrapper: {},
}));
