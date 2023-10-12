import React from 'react';
import ProfileCard from './ProfileCard';
import { useStyles } from './ProfileCardGroup.styles';
import { barColors, ProfileCardGroupProps } from './ProfileCardGroup.types';

const ProfileCardGroup = (props: ProfileCardGroupProps) => {
  const { profileLists, selectedProfile, setSelectedProfile, bottomComponent } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.profileGroupWrapper}>
      {profileLists?.map((data, index) => (
        <ProfileCard
          key={index}
          isSelected={selectedProfile === data.id}
          {...data}
          handleSelect={() => setSelectedProfile(data.id)}
          progreesColor={barColors[index]}
        />
      ))}
      {bottomComponent}
    </div>
  );
};

export default ProfileCardGroup;
