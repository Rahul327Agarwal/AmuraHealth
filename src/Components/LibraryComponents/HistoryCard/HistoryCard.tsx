import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getNameInitials } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './HistoryCard.styles';
import { IProps } from './HistoryCard.types';
import { useFetchUserName } from '../../../Common/Common.hooks';

const HistoryCard = (props: IProps) => {
  const { label, after, before, updatedOn, updatedBy } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [updatedByValue, setUpdatedByValue] = useState('');
  const { fetchUserName } = useFetchUserName();
  let heightAfter = '';
  if (after && after.includes('~') && typeof after === 'string') {
    let feet = after.split('~')[0];
    let inches = after.split('~')[1].split(' ')[0];
    heightAfter = inches ? `${feet}.${inches} Feet` : `${feet} Feet`;
  }
  let heightBefore = '';
  if (before && before.includes('~') && typeof before === 'string') {
    let feet = before.split('~')[0];
    let inches = before.split('~')[1].split(' ')[0];
    heightBefore = inches ? `${feet}.${inches} Feet` : `${feet} Feet`;
  }
  useEffect(() => {
    (async () => {
      const userName = await fetchUserName(updatedBy);
      setUpdatedByValue(userName);
    })();
  }, [props]);

  const getTimeInDDMMYYYYHHMMF = (dateVal: Date | string) => {
    var newDate = new Date(dateVal);
    if (newDate.toString() !== 'Invalid date') {
      return moment(newDate).format('DD/MM/YYYY, hh:mm A');
    }
  };
  const getFirstLetters = (name: string) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };
  return (
    <div className={classes.cardWrap}>
      <strong className={`${classes.cardCaption} ${commonClass.body15Medium}`}>
        {label.includes('_') ? label.split('_').join(' ') : label.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')}
      </strong>

      {before && (
        <span
          className={`${classes.strikeText} ${commonClass.body15Regular} ${
            Array.isArray(before) ? before.join(', ') : `${before}` ? classes.margin8px : ''
          }`}
        >
          {Array.isArray(before) ? before.join(', ') : before.includes('~') ? heightBefore : `${before}`}
        </span>
      )}
      <span className={`${classes.currentText} ${commonClass.body15Medium}`}>
        {Array.isArray(after) ? after.join(', ') : after.includes('~') ? heightAfter : `${after}`}
      </span>
      <div className={classes.userDetailsDiv}>
        <div className={`${classes.updateTime} ${commonClass.caption12Medium}`}>{getTimeInDDMMYYYYHHMMF(updatedOn)}</div>

        <div className={classes.userClass}>
          <Avatar className={classes.avatar} src={`${import.meta.env.VITE_DP_URL}${updatedBy}/profile-pic.png`}>
            {getNameInitials(updatedByValue)}
          </Avatar>
          <div className={`${commonClass.caption12Medium} ${classes.updatedBy}`}>{updatedByValue}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
