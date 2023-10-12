import { makeStyles } from 'tss-react/mui';
import { getFixedMaxWidgetWidth } from '../../../../DisplayFramework/DisplayFramework.functions';
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: `${getFixedMaxWidgetWidth()}px`,
    height: `inherit`,
    position: 'relative',
  },
  dividerStyle: {
    backgroundColor: theme.palette.colors.gray[100],
    margin: '10px -20px',
  },
  reportdiv: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  attachmentWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridAutoColumns: '90% 10%',
    '& svg': {
      cursor: 'pointer',
    },
  },
  bigGrayButton: {
    wordBreak: 'break-word',
    padding: '16px',
    color: theme.palette.colors.theme.primaryLight,
    backgroundColor: `${theme.palette.colors.gray[50]} !important`,
    borderRadius: '4px',
    fontSize: '15px !important',
    '& .MuiIconButton-label': {
      fontSize: 'inherit',
    },
  },
  fullWidth: {
    width: '100%',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '10px 20px',
  },
  footerStyle: {
    margin: 'auto -20px -20px',
  },
  switchLabel: {
    color: `${theme.palette.colors.theme.primary} !important`,
    margin: '0',
    padding: '0',
    cursor: 'pointer',
  },

  switchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    color: theme.palette.colors.gray[500],
    lineHeight: '1 !important',
    marginLeft: '8px',
  },
  permanentCheckboxContainer: {
    width: 'fit-content',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
}));
