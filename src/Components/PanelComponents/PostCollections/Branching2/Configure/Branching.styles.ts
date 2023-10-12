import { styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    backgroundColor: 'white',
    height: 'inherit',
    boxSizing: 'border-box',
    position: 'relative',
  },
  header: {},
  response: {
    padding: '24px',
  },
  bgColor:{
    background:'#F8F8F8'
  },
  dflex: {},
  iconStyle: {
    cursor: 'pointer',
    '& path': {
      fill: '#5C5A61',
    },
  },
  largeCloseIcon: {
    fontSize: 'large',
    color: '#5C5A61',
    cursor: 'pointer',
    textAlign: 'end',
    width: '15px !important',
    height: '15px !important',
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '25px 20px',
  },
  titleWraper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,

    boxSizing: 'border-box',
  },
  search: { padding: '20px' },
  namecard: {},
  card: { backgroundColor: 'rgb(241, 241, 241)' },
  labelOption: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  labelContainer: {
    width: '100%',
    display: 'grid',
    height: '27px',
    gap: '16px',
    gridTemplateColumns: '27px calc(100% - 85px) 24px',
    alignItems: 'center',
    marginBottom: '16px',
    cursor: 'pointer',
  },
  labelStyle: {
    // background: "#A6A6A6",
    textAlign: 'center',
    borderRadius: '4px',
    color: 'white',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
    color: '#5C5A61',
  },
  footer: { position: 'absolute', bottom: '0', width: '100%', padding: '20px' },
  radio: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '1px solid #5C5A61',
    display: 'block',
  },
  checkBox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '1px solid #5C5A61',
    display: 'block',
  },
  bodyOverflow: {
    overflowY: 'auto',
    maxHeight: 'calc(100% - 80px)',
  },
  maxHeightIfBranchingButton: {
    height: 'inherit',
    maxHeight: 'calc(100% - 176px)',
  },
  backArrowIcon: {
    cursor: 'pointer',
  },
}));

export const MenuListStyled = styled('ul')({
  margin: 0,
  width: '100%',
  listStyleType: 'none',
  padding: '10px 0',
  marginBottom: '25px',
  paddingRight: '6px',
});

export const MenuListItemStyled = styled('li')(({ theme, optionsTypeReverse, isDivider }: any) => ({
  color: theme.palette.colors.gray[500],
  fontSize: '20px',
  fontFamily: 'Graphik',
  transition: '.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexDirection: optionsTypeReverse ? 'row-reverse' : 'row',
  cursor: 'pointer',
  marginBottom: '16px',
  // borderBottom: isDivider
  //   ? `1px solid ${theme.palette.colors.gray[100]}`
  //   : "none",
  '&:last-child': { borderBottom: 'none' },
  '& > :nth-child(1)': { width: '100%' },
  '& > :nth-child(2)': { width: '30px' },
}));
