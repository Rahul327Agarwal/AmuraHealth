import { makeStyles } from 'tss-react/mui';
import { IProps } from './PanelHeader.types';

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  headerContainer: {
    height: '68px',
    padding: '16px 16px 12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    // alignItems: 'flex-start',

    '& svg': {
      cursor: 'pointer',
    },
  },
  titleText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'all 2s ease',
  },
  subTitle: {
    color: theme.palette.colors.gray[500],
  },
  titleContainer: {
    width: 'auto',
    // fontFamily: 'Inter',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#252427',
    flex: '1',
    display: 'grid',
    alignItems: 'center',
  },
  flex: { display: 'flex', alignItems: 'center' },
  loader: {
    color: '#252427',
    width: '20px !important',
    height: '20px !important',
    marginRight: '8px',
  },
  background: {
    backgroundColor: props?.background ? props?.background : '#FFFFFF',
    borderBottom: '1px solid #F1F1F1',
    boxShadow: props.isShadow ? '4px 0px 24px rgb(0, 0, 0, 0.15)' : '',
    zIndex: 1,
  },

  loaderContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  injectContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '4px',
  },
  borderBottom: {
    borderBottom: '1px solid #595A5A',
  },
  iconCon: {
    margin: '5px',
  },
  pointer: {
    cursor: 'pointer',
  },
  loaderContainerIcons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
