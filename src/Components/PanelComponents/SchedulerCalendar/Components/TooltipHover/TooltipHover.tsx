import { Avatar, Fade, Paper, Popper } from '@mui/material';
import moment from 'moment';
import { getNameInitials } from '../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { CalenderIconTooltip, ClockIconTooltip, TenantIconAvailability, VectorIconTooltip } from '../../../../SVGs/Common';
import { useStyles } from './TooltipHover.styles';
import { TenantIcon, AmuraTenantIcon } from './TooltipHover.svg';
import { IProps } from './TooltipHover.types';

const TooltipHover = (props: IProps) => {
  const { dateString, title, time, date, tentIcon, open, element, meetingWith } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <Popper
      open={open}
      anchorEl={element}
      disablePortal
      className={classes.popperStyle}
      placement={'bottom'}
      transition
      onDragOver={(e) => e.preventDefault()}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          <Paper className={classes.paperStyle}>
            <div className={classes.mainContainer}>
              <div className={classes.vector}>
                <VectorIconTooltip />
              </div>
              {/* TODO:: new tooltip design doubts pending */}
              {/* <div className={commonClasses.sm10Regular}>Client Meeting with</div> */}
              <div className={classes.titleContainer}>
                {/* {
                  <Avatar className={classes.avatar} src={`${import.meta.env.VITE_DP_URL}${meetingWith}/profile-pic.png`}>
                    {getNameInitials(title)}
                  </Avatar>
                } */}
                <div className={`${commonClasses.caption12Medium} ${classes.titleHeading}`}>{title}</div>
              </div>
              <div className={classes.footerDiv}>
                <div className={classes.footerLeft}>
                  <div className={classes.dateIcon}>
                    <CalenderIconTooltip />
                    <div className={`${commonClasses.sm10Regular} ${classes.dateLabel}`}>
                      {moment(dateString || date).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className={classes.clockDiv}>
                    <ClockIconTooltip />
                    <div className={`${commonClasses.sm10Regular} ${classes.timeLabel}`}>{time}</div>
                  </div>
                </div>

                {tentIcon ? <AmuraTenantIcon /> : null}
              </div>
            </div>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default TooltipHover;
