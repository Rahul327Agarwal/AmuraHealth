import React, { useEffect, useState } from 'react';
import { useStyles } from './StaffCard.styles';
import { IProps } from './StaffCard.types';
import { Avatar } from '@mui/material';
import { getFirstLetters, getUserNameById, getUserNameFromES } from '../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import Checkbox from '../../../../LibraryComponents/MUICheckbox/MUICheckbox';
import { useFetchUserName } from '../../../../../Common/Common.hooks';

export default function StaffCard(props: IProps) {
  const {
    tenantIcon,
    displayName,
    subLabel,
    profileURL,
    profileIcon,
    onSelect,
    isSelected,
    isSmallCard,
    selectType,
    isInlineSubLabel,
    errorMessage,
    id,
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const { fetchUserName } = useFetchUserName();

  const onSelectChange = (e) => {
    e.stopPropagation();
    onSelect();
  };
  const [name, setName] = useState('');
  useEffect(() => {
    (async () => {
      // let name = await getUserNameFromES(id);
      let name = await fetchUserName(id);
      setName(name);
    })();
  }, [name]);

  return (
    <section className={classes.cardContainer} onClick={(e) => selectType === 'card' && onSelectChange(e)}>
      <section className={classes.cardSelectSection}>
        <aside className={classes.profileSection}>
          {tenantIcon ? <span className={classes.tenantIcon}>{tenantIcon}</span> : null}
          <Avatar className={classes.profilePic} src={profileURL}>
            {profileIcon || getFirstLetters(name)}
          </Avatar>
        </aside>
        <aside className={classes.profileContentSection}>
          {!isSmallCard ? <div className={`${commonClasses.body15Medium} ${classes.textPrimary}`}>{name}</div> : null}
          <div
            className={`${
              selectType === 'card' && !isInlineSubLabel ? commonClasses.caption12Medium : commonClasses.body15Regular
            } ${classes.sublabel}`}
          >
            {isSmallCard ? `${name} ${subLabel || ''}` : subLabel}
          </div>
        </aside>
        {selectType === 'checkbox' ? (
          <aside className={classes.checkFlexbox}>
            {errorMessage ? (
              <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorMessage}</span>
            ) : null}
            <Checkbox onClick={(e) => onSelectChange(e)} checked={isSelected} />
          </aside>
        ) : null}
      </section>
      {selectType === 'card' && errorMessage ? (
        <section className={`${commonClasses.caption12Regular} ${classes.errorTextMessage}`}>{errorMessage}</section>
      ) : null}

      {selectType === 'card' && isSelected ? (
        <section className={classes.selectedSection}>
          <div className={classes.checkIconDIv}>{checkIcon}</div>
        </section>
      ) : null}
    </section>
  );
}
export const checkIcon = (
  <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.25" y="0.0888672" width="36" height="36" rx="18" fill="white" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.9656 12.2095C24.2672 12.4206 24.3406 12.8363 24.1294 13.1379L16.9758 23.3557C16.9756 23.356 16.9754 23.3563 16.9752 23.3566C16.4357 24.1308 15.3707 24.3215 14.596 23.7824C14.4454 23.6776 14.3127 23.5493 14.2029 23.4023C14.2027 23.4021 14.2025 23.4018 14.2024 23.4016L12.3834 20.9769C12.1625 20.6824 12.2221 20.2645 12.5166 20.0436C12.8112 19.8226 13.229 19.8823 13.45 20.1768L15.2709 22.6042C15.2951 22.6366 15.3244 22.6649 15.3576 22.688C15.5282 22.8067 15.7627 22.7646 15.8814 22.5941L15.8825 22.5926L23.0372 12.3732C23.2483 12.0716 23.664 11.9983 23.9656 12.2095Z"
      fill="#5C5A61"
    />
  </svg>
);
