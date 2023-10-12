import { Tooltip } from '@mui/material';
import { withStyles } from 'tss-react/mui';

export const TooltipStyled = withStyles(Tooltip, {
  tooltip: {
    backgroundColor: '#F0F0F0',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#5C5A61',
    padding: '8px',
    margin: '15px 0',
    wordBreak: 'break-all',
  },
  arrow: { color: '#F0F0F0' },
});
