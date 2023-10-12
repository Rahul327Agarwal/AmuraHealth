import DotStatus from '../DotStatus/DotStatus';
import MUIButton from '../MUIButton/MUIButton';
import MyListHeader from '../MyListHeader/MyListHeader';
import { FilterLess, FilterMore, MyListClearIcon, ExportIDIcon, CircleIcon } from './BasicFilter.svg';
import { useStyles } from './BasicFilter.styles';
import { IProps } from './BasicFilter.types';
import { useNavigate } from 'react-router-dom';

const BasicFilter = (props: IProps) => {
  const {
    filterOptions,
    handleClear,
    isExtend,
    setIsExtend,
    paddingX,
    diableClear,
    handleExportData,
    keepOnlyExpandBtn,
    noActionOptions,
    isClearIcon,
    startAdornment,
    endAdornment,
    customStyle,
    showGroups,
    setShowGroups,
    activeGroup,
    myListGroups,
    showGCDashBoard,
  } = props;
  const { classes } = useStyles();
  let navigate = useNavigate();

  const handleCollapse = () => setIsExtend((pre) => !pre);
  const actions = noActionOptions
    ? []
    : keepOnlyExpandBtn
    ? [{ id: 'collapseStatus', icon: isExtend ? <FilterLess /> : <FilterMore />, onClick: handleCollapse }]
    : [
        { id: 'exportData', icon: <ExportIDIcon />, onClick: handleExportData },
        // { id: 'collapseStatus', icon: isExtend ? <FilterLess /> : <FilterMore />, onClick: handleCollapse },
      ];
  return (
    <MyListHeader
      className={customStyle}
      paddingX={paddingX}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      hideAmuraIcon={keepOnlyExpandBtn || undefined}
      myListGroups={myListGroups}
      injectComponent={
        !keepOnlyExpandBtn ? (
          <div className={classes.filterWrapper}>
            {filterOptions?.map((item, i) => (
              <DotStatus key={i} isSelected={item.isSelected} color={item.color} onClick={item.onClick} opacityControl={true} />
            ))}
            <MUIButton onClick={handleClear} className={classes.clearButton} disabled={!diableClear} disableRipple variant="text">
              {isClearIcon ? <MyListClearIcon /> : 'Clear'}
            </MUIButton>
            {actions?.map((item, i) => (
              <div key={i} onClick={item?.onClick} className={classes.actionButton}>
                {item?.icon}
              </div>
            ))}
            {showGCDashBoard && (
              <MUIButton
                onClick={() => window.open('/LeadsDashboard', '_blank')}
                className={classes.gcButton}
                disableRipple
                variant="text"
              >
                {<CircleIcon />}
              </MUIButton>
            )}
          </div>
        ) : null
      }
      size="small"
      // actionOption={actions}
      showGroups={showGroups}
      setShowGroups={setShowGroups}
      activeGroup={activeGroup}
    />
  );
};

export default BasicFilter;
