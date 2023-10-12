import React, { memo, useCallback, useEffect, useState } from 'react';
import { IPatientBasicProfile, IViewScreens } from './PatientBasicProfile.types';
import PatientBasicProfile from './PatientBasicProfile';
import PatientBasicProfileEditView from './PatientBasicProfileEditview';

const PatientBasicProfileHome = (props: IPatientBasicProfile) => {
  const [action, setAction] = useState<IViewScreens>('NORMAL_VIEW');
  switch (action) {
    case 'NORMAL_VIEW':
      return <PatientBasicProfile {...props} setAction={setAction} />;
    case 'EDIT_VIEW':
      return <PatientBasicProfileEditView {...props} setAction={setAction} />;
  }
};

export default PatientBasicProfileHome;
