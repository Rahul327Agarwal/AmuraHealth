import { makeStyles } from 'tss-react/mui';
import { colors } from './../../../Common/Theme/palettes.styles';
import { IProps } from './Select.types';

const isFirefox = !!navigator.userAgent.match(/firefox|fxios/i);

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<
  IProps & {
    isIcon: boolean;
    isProfileToken: boolean;
    isFirefox: boolean;
  }
>()((theme, props) => ({
  rootStyle: {
    position: 'relative',

    '& .MuiInput-underline': {
      '&::before': { content: props.noUnderline ? 'unset' : '""' },
      '&::after': { content: props.noUnderline ? 'unset' : '""' },
    },
  },
  searchWrapper: {
    marginBottom: '20px',
    background: theme.palette.colors.gray[25],
    borderRadius: '6px',
  },
  tokenWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
    height: 'auto',
    // maxHeight:"124px",
    // overflowY:"auto",
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
    padingBottom: 0,
    // marginBottom: '25px',
  },
  normalMenuListStyle: {
    maxHeight: props?.popOverCustomHeight ? props.popOverCustomHeight : '208px',
    overflowY: 'auto',
    background: theme.palette.colors.system.white + ' !important',
  },
  normalMenuItem: {
    color: theme.palette.colors.system.black,
    background: theme.palette.colors.system.white + ' !important',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.colors.gray[25] + ' !important',
    },
  },
  normalPaper: {
    background: theme.palette.colors.system.white + ' !important',
    borderRadius: '0px',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.14)',
  },
  menuListStyle: {
    fontSize: '20px',
    fontFamily: 'Graphik',
    transition: '.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexDirection: props.optionsTypeReverse ? 'row-reverse' : 'row',
    cursor: 'pointer',
    borderBottom: props.isDivider ? `1px solid ${theme.palette.colors.gray[100]}` : 'none',
    '&:last-child': { borderBottom: 'none' },
    '& > :nth-child(1)': { width: '100%' },
    '& > :nth-child(2)': { width: '30px' },
    paddingRight: isFirefox && '15px',
  },

  listStyle: {
    maxHeight: '380px',
    // height: ({ options }: any) => (options.length > 4 ? '500px' : 'unset !important'),
    height:
      props.options?.length < 4
        ? 'unset !important'
        : props.options?.length > 4 && props.headerTitle === 'Duration'
        ? 'auto !important'
        : '500px',
    '&::-ms-overflow-style': props?.headerTitle === 'Duration' ? 'none' : '',
    scrollbarWidth: props?.headerTitle === 'Duration' ? 'none' : 'auto',
    '&::-webkit-scrollbar': {
      display: props?.headerTitle === 'Duration' ? 'none' : '',
    },
  },
  participantCard: {
    position: 'relative',
    paddingRight: isFirefox && '15px',
  },
  participantSelectContainer: {
    boxSizing: 'border-box',
    padding: '0 6px',
    height: '48px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '48px',
    gap: '8px',
    border: `1px solid ${theme.palette.colors.gray[100]}`,
    marginBottom: '12px',
    cursor: 'pointer',
    maxHeight: '48px',
  },
  avatarContainer: {
    minHeight: '35px',
    minWidth: '35px',
    height: '35px',
    width: '35px',
    overflow: 'hidden',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.colors.gray[100]}`,
    padding: '1px',
  },
  participantDetails: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    flexDirection: 'column',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '80%',
    textTransform: 'capitalize',
  },
  participantCardAbove: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '48px',
    height: '48px',
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'rgba(37, 36, 39, 0.5)',
    width: '100%',
    padding: '0 6px',
    cursor: 'pointer',
  },
  gray400: {
    color: theme.palette.colors.gray[400],
  },
  checkboxContainer: {
    height: '36px',
    width: '36px',
    borderRadius: '100%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  avatarInitials: {
    color: 'white',
  },
  profilePic: {
    height: '32px',
    width: '32px',
    color: theme.palette.colors.system.white,
    backgroundColor: theme.palette.colors.gray[900],
    fontSize: '12px',
    fontWeight: 600,
  },
}));
