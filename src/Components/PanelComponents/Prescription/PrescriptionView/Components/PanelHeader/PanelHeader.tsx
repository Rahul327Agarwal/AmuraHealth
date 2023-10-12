import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from 'tss-react/mui';
import { PMS_LOCALE } from '../../../../../../Utils';
import { IProps } from './PanelHeader.types';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
const useStyles = makeStyles()((theme) => ({
  headerContainer: {
    height: '40px',
    backgroundColor: '#3f4044',
    borderRadius: '8px 8px 0px 0px',
    marginBottom: '0px !important',
    padding: '4px 6px 2px 9px',
    // width: '100%',
    display: 'grid',
    gridTemplateColumns: '2fr .1fr',
  },
  titleContainer: {
    marginRight: '10px',
    width: 'auto',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    color: '#00FFC2',
  },
  biomarkerFilterIcon: {
  "&:hover":{
    border: "1px solid #4b4e50 !important",
    boxSizing: "border-box",
    borderRadius: "6px"
  }
  },
}));

export default function Header(props: IProps) {
  const { classes } = useStyles();
  const { title, iconTray, injectComponent, loadingFlag } = props;
  return (
    <div className={classes.headerContainer}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {injectComponent}
        <div title={title} className={classes.titleContainer}>
          {PMS_LOCALE.translate(title)}
        </div>
        <div>
          {loadingFlag ? (
            <CircularProgress style={{ color: 'rgb(255, 255, 255)', width: '17px', height: '17px', marginRight: '15px' }} />
          ) : null}
        </div>
      </div>
      {iconTray ? (
        <div
          className={classes.biomarkerFilterIcon}
          style={{
            cursor: 'pointer',
            height: 'max-content',
            // padding: "5px",
            border: '1px solid #3F4044',
            width: 'max-content',
          }}
        >
          {iconTray}
        </div>
      ) : null}
    </div>
  );
}
