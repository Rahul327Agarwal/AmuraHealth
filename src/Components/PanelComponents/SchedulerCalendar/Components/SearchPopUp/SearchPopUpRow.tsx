import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { getTimeIn12HrFormat } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import { formattedDate } from '../../../TimeManagement/TimeManagement.function';
import { AmuraIcon } from '../../SchedularCalendar.svg';
import { useStyles } from './SearchPopUp.styles';
import { RowProps } from './SearchPopUp.types';

const SearchPopUpRow = (props: RowProps) => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { onEventClick, searchData, roleName } = props;

  return (
    <div className={classes.spaceBetween} onClick={onEventClick}>
      <div className={classes.titleDayDiv}>
        <span className={`${classes.name} ${commonClasses.body15Regular}`} title={searchData?.title.length>33 ? searchData?.title : null}>{searchData?.title}</span>
        <span className={`${classes.date} ${commonClasses.caption12Regular}`}>
          {formattedDate(searchData?.eventDate)}
          {/* <i className={classes.dot}></i>{' '} */}
        </span>
      </div>
      <div className={classes.roleTimeDiv}>
        <div className={`${classes.roleDiv} ${commonClasses.sm8Medium}`}>
          {roleName && <AmuraIcon />}
          <span>{roleName}</span>
        </div>

        <span className={`${classes.text} ${commonClasses.caption12Regular}`}>
          {searchData?.isAFB ? (
            <>
              {getTimeIn12HrFormat(searchData?.afbData?.Before?.fromTime)} -{' '}
              {getTimeIn12HrFormat(searchData?.afbData?.After?.toTime)}
            </>
          ) : (
            <>
              {getTimeIn12HrFormat(searchData?.fromTime)} - {getTimeIn12HrFormat(searchData?.toTime)}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default SearchPopUpRow;
