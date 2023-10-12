import { Avatar } from '@mui/material';
import moment from 'moment';
import { getNameInitials } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { InfoIcon } from '../../../SVGs/Common';
import { DisableIcon, EditIcon, StarIconWhite } from '../NotesBrowse.svg';
import { useStyles } from './NotesCard.styles';
import { IProps } from './NotesCard.types';

const NotesCard = (props: IProps) => {
  const { userName, caller, data, showEditIcon, handleOnCardClick, expand, handleDeactivate, handleNoteEdit } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();

  return (
    <div data-notecard className={classes.maindiv} onClick={() => handleOnCardClick(data)}>
      <div className={classes.flex1}>
        <div className={`${classes.icondiv} ${CommonStyles.caption12Medium}`}>
          {caller?.length > 0 ? caller : '@note'}
          {data?.isStar ? <StarIconWhite /> : ''}
        </div>
        {showEditIcon && data.isActive === 1 && (
          <div className={classes.showEdit}>
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                handleNoteEdit(data);
              }}
            />
            <DisableIcon onClick={(e) => handleDeactivate(e, data)} />
          </div>
        )}
      </div>
      {data?.isActive === 0 && !data.isHisory && (
        <div className={classes.div2}>
          <p className={!expand ? classes.textwrapper : ''}>
            <InfoIcon />
            <span className={`${CommonStyles.caption12Regular} ${classes.span2}`}>{data?.reasonForDeactivation}</span>
          </p>
        </div>
      )}
      <div className={classes.div2}>
        <p className={!expand ? classes.textwrapper : ''}>
          <span className={`${CommonStyles.body15Regular} ${data?.isActive === 0 ? classes.deactivatedColor : classes.span1}`}>
            @note {caller}
          </span>{' '}
          <span className={`${CommonStyles.body15Regular} ${data?.isActive === 0 ? classes.span2 : classes.color1}`}>
            {data?.message}
          </span>
        </p>
      </div>
      <div className={classes.flex3}>
        <p className={`${CommonStyles.caption12Regular} ${data?.isActive === 0 ? classes.span2 : classes.p1}`}>
          {moment(data?.updatedOn).format('DD/MM/YYYY') + ' ' + moment(data?.updatedOn).format('hh:mm A')}
        </p>
        <div className={classes.flex4}>
          <Avatar className={`${classes.profilePic}`} src={`${import.meta.env.VITE_DP_URL}${data?.updatedBy}/profile-pic.png`}>
            {getNameInitials(userName)}
          </Avatar>
          <p className={`${CommonStyles.caption12Regular} ${data?.isActive === 0 ? classes.span2 : classes.p2}`}>{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
