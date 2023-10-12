import { makeStyles } from 'tss-react/mui';
import { getFixedMaxWidgetWidth } from '../../../../DisplayFramework/DisplayFramework.functions';

export const useStyles = makeStyles()((theme) => ({
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.colors.system.white,
  },
  container: {
    padding: '16px',
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: `${getFixedMaxWidgetWidth()}px`,
  },
  dflex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateLable: {
    color: '#A6A6A6',
    display: 'block',
    marginBottom: '6px',
  },
  date: {
    color: '#5C5A61',
    display: 'block',
  },
  time: {
    color: '#A6A6A6',
    display: 'block',
  },
  iconStyle: {
    marginBottom: '35px',
  },
  wrapper: {
    marginBottom: '35px',
    marginTop: '28px',
  },
  labelText: {
    color: theme.palette.colors.gray[500],
    lineHeight: '1 !important',
    marginLeft: '8px',
  },
  checkbox: {
    width: 'fit-content',
    cursor: 'pointer',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  tenentHeader: {
    background: '#F8F8F8',
    padding: '6px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  mb: {
    marginBottom: '30px',
  },
  tenantName: {
    color: '#5C5A61',
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
  },
  footerStyle: {
    margin: 'auto -16px -16px',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
  },
}));
