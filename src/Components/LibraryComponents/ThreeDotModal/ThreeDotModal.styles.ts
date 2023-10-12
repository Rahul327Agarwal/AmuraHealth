import { Tooltip } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';
import { IProps } from './ThreeDotModal.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { isReverse, usePopOver, ...props }) => ({
  rootStyle: {
    position: usePopOver ? undefined : 'relative',
    display: usePopOver ? undefined : 'inline-block',
    // '& .MuiTooltip-popper': {
    //   transform: isReverse ? `translate3d(0, 0) !important` : `translate3d(100%, 25.625px, 0px) !important`,
    // },
    '& .MuiTooltip-tooltip': {
      transform: isReverse ? `translate(0, 0) !important` : `translate(calc(0% + 10px), 0) !important`,
    },
    '& *': { boxSizing: 'border-box' },
    '& .MuiTooltip-tooltipPlacementBottom': {
      borderRadius: isReverse ? '0 8px 8px 8px' : '8px 0 8px 8px',
    },
    '& .MuiTooltip-tooltipPlacementTop': {
      borderRadius: isReverse ? '8px 8px 8px 0' : '8px 8px 0 8px',
    },
    borderRadius: (() => {
      if (!usePopOver) return undefined;
      let topLeft = '8px';
      let topRight = '8px';
      let bottomLeft = '8px';
      let bottomRight = '8px';

      const verticalAlign = props.popOverAlignment?.vertical ?? 'top';
      const horizontalAlign = props.popOverAlignment?.horizontal ?? 'right';

      if (verticalAlign === 'top' && horizontalAlign === 'left') {
        topLeft = '0';
      } else if (verticalAlign === 'top' && horizontalAlign === 'right') {
        topRight = '0';
      } else if (verticalAlign === 'bottom' && horizontalAlign === 'left') {
        bottomLeft = '0';
      } else if (verticalAlign === 'bottom' && horizontalAlign === 'right') {
        bottomRight = '0';
      }

      return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
    })(),
  },
  threeDotButton: {
    minWidth: '10px',
    padding: 0,
  },
  zIndex: {
    zIndex: 1600,
    '& .MuiPaper-root': {
      background: `${theme.palette.colors.system.white} !important`,
    },
  },
  renderButtonStyle: {
    '& .MuiFab-root svg': {
      transition: '.3s ease',
    },
    '&[data-rotate="true"] .MuiFab-root svg': {
      rotate: '45deg',
    },
  },
}));

export const ThreeDotContainer = withStyles(Tooltip, (theme) => ({
  tooltip: {
    background: theme.palette.colors.system.white,
    overflow: 'hidden',
    // position: 'absolute',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.14)',
    color: theme.palette.colors.theme.primary,
    margin: '8px 0 !important',
    padding: '0 !important',
  },
}));
