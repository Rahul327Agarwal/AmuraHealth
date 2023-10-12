import { makeStyles } from 'tss-react/mui';
import { IProps } from './ChatSelect.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps & { isIcon: boolean }>()((theme, props) => ({
  rootStyle: { position: 'relative' },
  searchWrapper: { marginBottom: '20px' },
  tokenWrapper: {
    // display: 'flex',
    // flexWrap: 'wrap',
    //gap: "10px",
    margin: '20px 0px 20px -10px',
    //height: "auto",
    maxHeight: '90px !important',
    overflowY: 'auto',
    overflowX: 'clip',
    padding: '0px 23px',
    '& .MuiChip-root': {
      display: 'flex',
      width: 'fit-content',
      marginBottom: '8px',
      gap: '8px',
    },
  },
  fixedHeight: {
    height: '55px',
    overflowY: 'hidden',
    marginBottom: '0px',
  },
  fullHeight: {
    height: 'auto',
    maxHeight: '120px',
    overflowY: 'scroll',
  },
  noResult: {
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    height: '300px',
    color: theme.palette.colors.theme.primary,
  },
  labelStyle: {
    display: 'grid',
    color: theme.palette.colors.gray[500],
    transition: '.3s ease',
    alignItems: 'center',
    gridTemplateColumns: props?.isIcon ? 'minmax(35px, auto) 1fr' : '1fr',
    '& .iconStyle': { display: 'flex' },
    '& .textStyle': { display: 'flex' },
  },
  readOnly: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '40px 20px',
    gap: '30px',
    '& .noteMessage': {
      fontSize: '15px',
      textAlign: 'center',
      color: theme.palette.colors.gray[500],
    },
  },
  pointer: { cursor: 'pointer' },
  rotateUp: {
    '& svg': {
      rotate: '180deg',
      transition: '.3s ease',
    },
  },
  rotateDown: {
    '& svg': {
      rotate: '0deg',
      transition: '.3s ease',
    },
  },
  wrapperHeight: {
    // maxHeight:"184px",
    // overflowY:"auto",
    background: '#F8F8F8',
    padding: '5px',
  },

  dflex: {
    display: 'flex',
    justifyContent: 'end',
    gap: '24px',
  },
  menuStyle: {
    margin: 0,
    listStyleType: 'none',
    padding: '10px 0',
    marginBottom: '15px',
  },
  menuListStyle: {
    // width:'95% !important',
    // position:"relative",
    fontSize: '20px',
    fontFamily: 'Graphik',
    transition: '.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexDirection: props.optionsType === 'radio' || props.optionsTypeReverse ? 'row-reverse' : 'row',
    cursor: 'pointer',
    borderBottom: props.isDivider ? `1px solid ${theme.palette.colors.gray[100]}` : 'none',
    '&:last-child': { borderBottom: 'none' },
    '& > :nth-child(1)': { width: '100%' },
    '& > :nth-child(2)': { width: '30px' },
    padding: '0px 18px 0px 0px',
  },
  btnContainer: {
    display: 'flex',
    //alignItems:"end",
    justifyContent: 'end',
    // marginTop: '100px',
    padding: '0px 18px 0px 0px',
  },
  Container: {
    backgroundColor: '#F8F8F8',
    padding: '28px 0px 28px 18px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  question: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    color: theme.palette.colors.gray[500],
    padding: '0px 18px 0px 0px',
  },
  OptionsContainer: {
    paddingLeft: '40px',
  },
  listStyle: {
    padding: '0px 18px 0px 0px',
    maxHeight: '240px',
    height: 'unset !important',
    overflow: 'auto !important',
  },
  searchField: {
    flexGrow: 1,
    background: theme.palette.colors.gray[25],
    display: ' flex',
    borderRadius: '6px',
  },
}));
