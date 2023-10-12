import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  prescriptionCard: {
    color: theme.palette.colors.gray[900],
    background: '#F8F8F8',
    padding: '14px 8px 12px 8px !important',
  },
  prescriptioncmpsection: {
    margin: '7px 6px',
    paddingTop: '0px !important',
  },
  conditionHeader: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    margin: '0px',
  },
  daysLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '11px',
    lineHeight: '130.5%',
  },
  noConditions: {
    minHeight: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionContainer: {
    paddingTop: '13px',
    paddingRight: '18px',
  },
  conditionTitle: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  textOverflow :{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));
