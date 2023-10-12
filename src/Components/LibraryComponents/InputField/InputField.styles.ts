import { makeStyles } from 'tss-react/mui';
import { IProps } from './InputField.types';

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  inputWrapper:{
    width:'100%',
  },
  gray400: {
    color: theme.palette.colors.gray[400],
  },
  errorText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    margin: '3px 0px 0px',
  },
  count: {
    color: theme.palette.colors.gray[500],
  },
  errorHighlight: {
    color: '#DA5552',
  },
  profilePic: {
    height: '32px',
    width: '32px',
    color: '#FFFFFF',
    backgroundColor: theme.palette.colors.gray[900],
    fontSize: '12px',
    fontWeight: 600,
  },
  profileTokenWrapper: {
    boxSizing: 'border-box',
    padding: '0 14px 0 8px',
    border: `1px solid ${theme.palette.colors.gray[100]} !important`,
    display: 'flex',
    borderRadius: '64px',
    alignItems: 'center',
    width: '143px',
    maxWidth: '143px',
    justifyContent: 'space-between',
    gap: '16px',
    height: '48px',
  },
  profileDetails: {
    display: 'grid',
    gridTemplateColumns: '36px 1fr',
    gap: '8px',
    alignItems: 'center',
  },
  avatarContainer: {
    minHeight: '32px',
    minWidth: '32px',
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
    width: '100%',
    textTransform: 'capitalize',
  },
  menu: {
    '& .MuiMenu-list': {
      background: `${theme.palette.colors.system.white} !important`,
      color: `${theme.palette.colors.gray[500]} !important`,
    },
    '& .MuiListItem-button': {
      background: `${theme.palette.colors.system.white} !important`,
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.08) !important',
      },
    },
  },
  tokenWrap: {
    display: 'flex',
    gap: '10px',
    overflow: props.isProfileToken ? 'auto' : '',
    maxHeight: props.isProfileToken ? '130px' : '',
    flexWrap: props.isProfileToken ? 'nowrap' : 'wrap',
    padding: '10px 0',
    '&::-webkit-scrollbar': {
      height: '4px' /* height of horizontal scrollbar ← You're missing this */,
    },
  },
  removeMargin: {
    margin: '0 !important',
  },
  inputRootStyle: {
    // borderBottom: '2px solid yellow',
    boxShadow: props.solidVariant ? '2px 2px 54px rgb(0 0 0 / 5%)' : 'unset',
    borderRadius: props.solidVariant ? '4px' : 'unset',
    background: props.solidVariant ? `${theme.palette.colors.system.white} !important` : 'transparent !important',

    '& *': {
      outline: 'none !important',
      // border: 'none !important',
    },
    '& .MuiInputLabel-formControl': {
      color: `${theme.palette.colors.gray[500]} !important`,
    },
    '& .MuiInput-underline:before': {
      // borderBottom: `5px solid ${theme.palette.colors.gray[100]} !important`,
    },
    '& .MuiInput-underline:after': {
      // borderBottom: `1px solid ${theme.palette.colors.gray[100]} !important`,
      // TODO: add hardcoded color to theme
      borderBottom: `2px solid #292F3F`,

      transform: props.value ? 'scaleX(1) !important' : undefined,
    },
    '& .MuiInputBase-root': {
      background: 'transparent !important',
      padding: props.InputProps?.startAdornment ? '6px 0' : '',
      '& input::placeholder': {
        // color: `${theme.palette.colors.gray[500]} !important`,
      },
      color: props.errorText || props.helperText ? '#DA5552 !important' : '#252427',
      pointerEvents: props.isReadOnly ? 'none' : 'initial',
      opacity: props.isReadOnly ? '0.5' : '1',
      alignItems: props.InputProps?.startAdornment ? 'center' : props.solidVariant ? 'center' : 'baseline',
    },
    '& .Mui-error': {
      '&:before': { borderBottomColor: '#d32f2f!important' },
      '&:after': { borderBottomColor: '#d32f2f!important' },
    },

    '& .MuiInputBase-input': {
      // color: `${theme.palette.colors.gray[900]} !important`,
      background: 'transparent !important',
      maxHeight: 'auto',
      ...(props.multiline
        ? {
            overflow: 'auto !important',
            padding: '4px 0',
          }
        : {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: props.renderValueAsToken ? 'auto' : '28px',
            padding: props.solidVariant ? '8px 12px !important' : '0px 6px 6px 0px !important',
            whiteSpace: 'nowrap',
          }),
    },
    '& label.MuiInputLabel-shrink': {
      color: `${theme.palette.colors.gray[400]} !important`,
    },
    '& .MuiSelect-icon': {
      color: props.renderValueAsToken ? 'transparent !important' : `${theme.palette.colors.gray[500]} !important`,
    },
  },
}));
