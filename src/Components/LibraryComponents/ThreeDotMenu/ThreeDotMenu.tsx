import { Avatar, ClickAwayListener, Popover, Popper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import ThreeDotModal from '../ThreeDotModal/ThreeDotModal';
import { useStyles } from './ThreeDotMenu.styles';
import { ThreeDotMenuProps } from './ThreeDotMenu.types';

export default function ThreeDotMenu(props: ThreeDotMenuProps) {
  const { options, handleClick, isAvatarIcon, selectedOption, ...restProps } = props;
  const { classes } = useStyles({ ...props, isIcon: Boolean(options[0]?.icon) });
  const commonClasses = useCommonStyles();

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    restProps?.setIsOpen && restProps.setIsOpen(open)
  },[open])

  const handleMenuTeamSelect = (e: any, item: any) => {
    e.stopPropagation();
    handleClick(item.value);
    setOpen(false);
  };

  return (
    <ThreeDotModal {...restProps} open={open} setOpen={setOpen}>
      <ul className={classes.menuListStyled}>
        {options?.map((item, index) => (
          <li
            data-selected={selectedOption ? selectedOption === item.value : false}
            data-disabled={item.disabled}
            key={index}
            onClick={(e) => handleMenuTeamSelect(e, item)}
            className={classes.listStyle}
          >
            {isAvatarIcon ? (
              <Avatar alt={item.label} src={item.avatarUrl} className={`${commonClasses.sm10Regular} avatarStyle`} />
            ) : item.icon ? (
              <span className="iconStyle">{item.icon}</span>
            ) : null}
            <span className={`${commonClasses.body15Regular} textStyle`}>{item.label}</span>
          </li>
        ))}
      </ul>
    </ThreeDotModal>
  );
}
