import { styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { IProps } from './Select.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<
  IProps & {
    isIcon?: boolean;
  }
>()((theme, props) => ({
  rootStyle: { position: 'relative' },
  searchWrapper: { marginBottom: '20px' },
  tokenWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  noResult: {
    minHeight: 'inherit',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Graphik !important',
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.colors.theme.primary,
  },
  labelStyle: {
    display: 'grid',
    color: theme.palette.colors.gray[500],
    fontSize: '15px',
    fontFamily: 'Graphik',
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
  btnContainer: {
    display: 'flex',
    //alignItems:"end",
    justifyContent: 'end',
    paddingRight: '8px',
  },
  question: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    color: theme.palette.colors.gray[500],
  },
  Container: {
    backgroundColor: '#F8F8F8',
    padding: '28px 18px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
}));

export const MenuListStyled = styled('ul')({
  margin: 0,
  listStyleType: 'none',
  padding: '10px 0',
  overflowY: 'auto',
  maxHeight: '230px',
  // minHeight: "150px",
  // marginBottom: "25px",
  paddingRight: '6px',
});

export const MenuListItemStyled = styled('li')(({ theme, optionsTypeReverse, isDivider }: any) => ({
  padding: '20px 0px 20px 40px',
  color: theme.palette.colors.gray[500],
  fontSize: '20px',
  fontFamily: 'Graphik',
  transition: '.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexDirection: optionsTypeReverse ? 'row-reverse' : 'row',
  cursor: 'pointer',
  // borderBottom: isDivider
  //   ? `1px solid ${theme.palette.colors.gray[100]}`
  //   : "none",
  '&:last-child': { borderBottom: 'none' },
  '& > :nth-child(1)': { width: '100%' },
  '& > :nth-child(2)': { width: '30px' },
}));
