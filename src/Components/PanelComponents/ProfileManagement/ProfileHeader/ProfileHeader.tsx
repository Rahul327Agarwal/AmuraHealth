import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import ProfileCropper from '../ProfileCropper/ProfileCropper';
import { EditWhite } from '../ProfileManagement.svg';
import { ProfileHeaderProps } from '../ProfileManagement.types';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import { callUploadProfileImage } from './ProfileHeader.functions';
import { useStyles } from './ProfileHeader.styles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
export default function ProfileHeader(props: ProfileHeaderProps) {
  const {
    profileImage,
    profileEditable,
    setProfileEditable,
    name,
    username,
    myPatientId,
    firstname,
    lastname,
    email,
    setProfileImage,
    ...restProps
  } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();

  const [openProfileCropper, setOpenProfileCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleEditable = () => setProfileEditable(true);
  const handleEditProfileImage = () => setOpenProfileCropper(true);
  const onImageCropped = async (image: any) => {
    if (image) {
      setCroppedImage(image);
      setOpenProfileCropper(false);
      await callUploadProfileImage(panelId, restProps, myPatientId, image);
    }
  };
  const onRemoveImg = () => {
    // setCroppedImage(null);
    // setOpenProfileCropper(false);
    setProfileImage('');
    console.log('fixigin this');
  };
  const getFirstLetters = (name: any) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };
  return (
    <div className={classes.mainProfileHeader}>
      <div className={classes.profileImageBox}>
        <Avatar className={classes.profileAvatar} src={croppedImage || profileImage}>
          {/* {EmtyProfileImage} */}
          {getFirstLetters(`${username}` || `${firstname}` + ' ' + `${lastname}`)}
        </Avatar>
        {profileEditable && (
          <IconButton onClick={handleEditProfileImage} className={classes.profileEditBottom}>
            {<EditWhite />}
          </IconButton>
        )}
      </div>
      <div className={classes.profileDetailsBox}>
        <div className={`${commonClasses.body17Medium} ${classes.profileName} ${classes.textOverflow}`}>{name}</div>
        <div className={`${commonClasses.body15Regular} ${classes.profileUserName} ${classes.textOverflow}`}>{email}</div>
      </div>
      {!profileEditable && (
        <Button
          onClick={handleEditable}
          className={classes.editableButton}
          variant="contained"
          size="small"
          startIcon={<EditWhite />}
        >
          Edit profile
        </Button>
      )}
      <ProfileCropper
        open={openProfileCropper}
        setOpenProfileCropper={setOpenProfileCropper}
        onImageCropped={onImageCropped}
        onRemoveImg={onRemoveImg}
      />
    </div>
  );
}
