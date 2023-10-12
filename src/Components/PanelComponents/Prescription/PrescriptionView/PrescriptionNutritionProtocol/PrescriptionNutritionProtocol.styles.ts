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
    lineHeight: '24px',
  },
  contentsBelowSlider: {
    display: 'grid',
    gridTemplateColumns: '26% 15% 18% 33%',
    fontSize: '11px',
    lineHeight: '130.5%',
    gridGap: '2%',
  },
  timingSpan: {
    fontSize: '14px',
    lineHeight: '17px',
    margin: 'auto 0px',
    textAlign: 'center',
  },
  rampingDiv: {
    margin: '10px 0px',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '80%',
  },
  emptyProducts: {
    minHeight: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioGroup: {
    width: '260px',
    alignItems: 'baseline',
    background: '#FFFFFF',
    color: `${theme.palette.colors.gray[900]} !important`,
    borderRadius: '4px',
  },
  nutrientTitle: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    alignItems: 'end',
    margin: '0px 0px 4px 0px',
  },
  productsContainer: {
    paddingTop: '13px',
    paddingRight: '18px',
  },
  productTitle: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  daysRange: {
    textAlign: 'end',
    margin: 'auto 0px',
    fontWeight: 300,
  },
  footerContent: {
    height: '1px',
    width: '100%',
    backgroundColor: '#595A5A',
  },
  rampDown: {
    textAlign: 'end',
  },
  rampingIcons: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  disableRampingIcons: {
    opacity: '0.5',
  },
  rampUpStyle: {
    marginRight: '11px',
  },
  radioStyle: {
    width: '30px',
  },
  selectedRamping: {
    width: '200px',
    color: theme.palette.colors.gray[900],
  },
  notSelectedRamping: {
    width: '200px',
    color: theme.palette.colors.gray[500],
  },
  noRampingText: {
    width: '207px',
    color: theme.palette.colors.gray[500],
  },
  selectedNoRampingText: {
    width: '207px',
    color: theme.palette.colors.gray[900],
  },
  productWithFood: {
    margin: '10px 0px',
    fontSize: '12px',
  },
  textOverFlow:{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));
