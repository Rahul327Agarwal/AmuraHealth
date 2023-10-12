import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, { isIcon, isAvatarIcon, isDivider }) => ({
  menuListStyled: {
    listStyleType: 'none',
    padding: '10px 0',
    overflowY: 'auto',
    maxHeight: 'inherit',
    margin: '0',
    minWidth: '205px',
  },
  listStyle: {
    padding: '10px 12px',
    color: theme.palette.colors.gray[500],
    transition: '.3s ease',
    display: 'grid',
    gridTemplateColumns: isIcon || isAvatarIcon ? 'minmax(25px, auto) 1fr' : '1fr',
    borderBottom: isDivider ? `1px solid ${theme.palette.colors.gray[100]}` : 'none',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '8px',
    '&:hover': { background: theme.palette.colors.gray[25] },
    '& .iconStyle': { display: 'flex' },
    '& .textStyle': {
      display: 'flex',
      color: theme.palette.colors.gray[500],
    },
    '& .avatarStyle': {
      width: '25px',
      height: '25px',
      marginRight: '10px',
      color: theme.palette.colors.system.white,
    },
    '&:last-child': { borderBottom: 'none' },
    '&[data-selected="true"]': {
      '& .textStyle': {
        color: `${theme.palette.colors.gray[900]} !important`,
        fontWeight: `600 !important`,
      },
      '& .iconStyle': { fill: `${theme.palette.colors.gray[900]} !important` },
    },
    '&[data-disabled="true"]': {
      pointerEvents: 'none',
      '& .textStyle': { color: `${theme.palette.colors.gray[400]} !important` },
      '& .iconStyle': { fill: `${theme.palette.colors.gray[400]} !important` },
    },
  },
}));

export const useStylesButton = makeStyles()((theme) => ({
  renderButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    '& > span': { display: 'flex', alignItems: 'center' },
  },
  reSize: { transform: 'scale(1.2)' },
}));
