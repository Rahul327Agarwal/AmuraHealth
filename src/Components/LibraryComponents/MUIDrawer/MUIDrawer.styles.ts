import { styled } from '@mui/material';

export const DrawerStyled = styled('div')(({ theme, anchor, maxHeight, changebgColor }: any) => ({
  // height: '100%',
  overflowY: 'auto',
  boxSizing: 'border-box',
  background: `${changebgColor ? theme.palette.colors.gray[25] : theme.palette.colors.system.white} !important`,
  boxShadow: '0px 14px 74px rgba(0, 0, 0, 0.15)',
  borderRadius: anchor === 'top' ? '0px 0px 16px 16px ' : '16px 16px 0px 0px',
  width: '100%',
  overflow: 'hidden',
  maxHeight: maxHeight || '90%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: anchor === 'top' ? 0 : 'initial',
  bottom: anchor === 'top' ? 'initial' : 0,
  animation: 'fadeInBottom .3s ease',
  zIndex: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  // display: "none",
  // "&.open": { display: "initial" },
  // "&.close": { animation: "fadeOutBottom .3s ease", animationFillMode: "forwards !important" },
}));
export const DrawerBGStyled = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: 'rgb(0 0 0 / 18%)',
  zIndex: 1050,
  animation: 'fadeIn .3s ease',
  // display: "none",
  // "&.open": { display: "initial" },
  // "&.close": { animation: "fadeOut .3s ease", animationFillMode: "forwards !important" },
});

export const ContainerStyled = styled('div')<any>(({ drawerPadding }: any) => ({
  padding: drawerPadding || '20px',
  height: 'inherit',
  overflowY: 'auto',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
}));

export const ContainerHeaderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
  boxSizing: 'border-box',
  '& .contentStyle': {
    color: theme.palette.colors.gray[900],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
  },
  '& .iconStyle': { cursor: 'pointer' },
}));
