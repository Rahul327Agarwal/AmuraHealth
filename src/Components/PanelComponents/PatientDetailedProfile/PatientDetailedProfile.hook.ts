import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INIT_PORFILE_STATE, changeInAnyField, getAllCuisines, getPatientProfileData } from './PatientDetailedProfile.functions';
import { IModifiedGenderState, IOptions, IPatientDetailedProfile, IProfileDetailsState } from './PatientDetailedProfile.types';
// import { IModifiedGenderState, IOptions, IPatientDetailedProfile, IProfileDetailsState } from './PatientDetailedProfile.types';
import { isDecimalNumberAcceptingRegex } from '../../../Common/Common.functions';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const useProfileDetails = (props: IPatientDetailedProfile) => {
  const { registerEvent, unRegisterEvent, patientId } = props;
  const { id: panelId } = useCurrentPanel();
  const [profileDetailsAPI, setProfileDetailsAPI] = useState<IProfileDetailsState>(INIT_PORFILE_STATE);
  const [profileDetails, setProfileDetails] = useState<IProfileDetailsState>(INIT_PORFILE_STATE);
  const [profileDetailsError, setProfileDetailsError] = useState<IProfileDetailsState>(INIT_PORFILE_STATE);
  const [openGenderModified, setOpenGenderModified] = useState<boolean>(false);
  const [isWhatsAppChecked, setIsWhatsAppChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modifiedGender, setModifiedGender] = useState<IModifiedGenderState>({
    MedicallyModifiedGender: profileDetails.MedicallyModifiedGender,
    userTypedGender: profileDetails.userTypedGender,
    isUserTypedGender: profileDetails.isUserTypedGender,
  });
  const [cuisineOptions, setCuisineOptions] = useState<Required<IOptions>[]>([]);
  const isChangeInAnyField = useMemo(() => {
    return changeInAnyField(profileDetailsAPI, profileDetails);
  }, [profileDetailsAPI, profileDetails]);
  useEffect(() => {
    let myCustomerSubscription: any;
    (async () => await getPersonalProfileDataCall())();
    myCustomerSubscription =
      registerEvent && registerEvent(patientId, 'pms-ql-user', async () => await getPersonalProfileDataCall());
    return () => {
      unRegisterEvent && unRegisterEvent(myCustomerSubscription);
    };
  }, []);

  const getPersonalProfileDataCall = async () => {
    const response = await getPatientProfileData(panelId,props, setIsLoading);

    if (response) {
      const { DateOfBirth, height: resHeight = '', weight: resWeight = '', ...restResponse } = response || {};
      // const [height = '', heightUnit = 'cm'] = resHeight?.split(' ');
      let height = resHeight?.split(' ')[0];
      let heightUnit = resHeight?.split(' ')[1];
      if (heightUnit !== 'cm' && heightUnit !== 'ft/in') {
        heightUnit = 'cm';
        height = '';
      }
      let feet = '';
      let inches = '';
      let heightField = { cm: '', ft: '', in: '' };
      if (heightUnit === 'ft/in') {
        feet = height?.split('~')[0];
        inches = height?.split('~')[1];
        heightField = { ft: feet || '', in: inches || '', cm: convertToCm(feet, inches).toString() };
      } else {
        heightField = {
          cm: height,
          ft: convertCmToFeetAndInches(height).feet.toString() || '',
          in: convertCmToFeetAndInches(height).inches.toString() || '',
        };
      }
      const [weight = '', weightUnit = 'kgs'] = resWeight?.split(' ');
      const data: IProfileDetailsState = {
        ...INIT_PORFILE_STATE,
        ...restResponse,
        DateOfBirth: DateOfBirth ? new Date(DateOfBirth) : null,
        height,
        weight,
        heightUnit,
        weightUnit,
        feet,
        inches,
        heightField,
      };
      setProfileDetailsAPI({ ...data });
      setProfileDetails({ ...data });
    }
  };

  useEffect(() => {
    getAllCuisines(props).then((res) => {
      if (!res) return;
      const options = res?.map((data) => ({ label: data.name, value: data.name }));
      setCuisineOptions(options);
    });
  }, []);
  useEffect(() => {
    if (profileDetails.height.length > 0) {
      setProfileDetailsError((pre) => ({ ...pre, feet: '' }));
    }
  }, [profileDetails]);

  useEffect(() => {
    setModifiedGender({
      MedicallyModifiedGender: profileDetails.MedicallyModifiedGender,
      userTypedGender: profileDetails.userTypedGender,
      isUserTypedGender: profileDetails.isUserTypedGender,
    });
  }, [profileDetails.MedicallyModifiedGender, profileDetails.userTypedGender, profileDetails.isUserTypedGender]);

  const onResetFields = () => {
    setProfileDetails(INIT_PORFILE_STATE);
    setProfileDetailsError(INIT_PORFILE_STATE);
  };
  function convertToCm(feet, inches) {
    if (!feet && !inches) {
      return '';
    }
    // Convert feet to inches
    let totalInches = +feet * 12;
    // Add inches
    totalInches += +inches;
    // Convert inches to centimeters
    let cm = Math.round(totalInches * 2.54);
    return cm;
  }
  function convertCmToFeetAndInches(cm) {
    if (!cm.length) return { cm: '', feet: '', inches: '' };
    const heightInCm = parseFloat(cm);
    const inches = Math.round(heightInCm / 2.54);
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return {
      feet: feet,
      inches: remainingInches,
    };
  }
  const onHeightChange = useCallback(
    (e) => {
      const height = e.target.value.trim() ? e.target.value : e.target.value.trim();
      let heightValue = {
        cm: height,
        ft: convertCmToFeetAndInches(height).feet.toString(),
        in: convertCmToFeetAndInches(height).inches.toString(),
      };
      if (isDecimalNumberAcceptingRegex(height)) setProfileDetails((pre) => ({ ...pre, heightField: heightValue }));
      setProfileDetailsError((pre) => ({ ...pre, heightField: { ...profileDetailsError.heightField, cm: '' } }));
    },
    [profileDetails]
  );

  const onFeetChange = useCallback(
    (e) => {
      const feet = e.target.value.trim() ? e.target.value : e.target.value.trim();
      let heightValue = {
        cm: convertToCm(feet, profileDetails.heightField.in).toString(),
        ft: feet,
        in: profileDetails.heightField.in,
      };
      if (isDecimalNumberAcceptingRegex(feet)) setProfileDetails((pre) => ({ ...pre, heightField: heightValue }));
      setProfileDetailsError((pre) => ({ ...pre, heightField: { ...profileDetailsError.heightField, ft: '' } }));
    },
    [profileDetails]
  );

  const onInchesChange = useCallback(
    (e) => {
      const inches = e.target.value.trim() ? e.target.value : e.target.value.trim();
      let heightValue = {
        cm: convertToCm(profileDetails.heightField.ft, inches).toString(),
        in: inches,
        ft: profileDetails.heightField.ft,
      };

      if (isDecimalNumberAcceptingRegex(inches)) setProfileDetails((pre) => ({ ...pre, heightField: heightValue }));
      setProfileDetailsError((pre) => ({ ...pre, heightField: { ...profileDetailsError.heightField, in: '' } }));
    },
    [profileDetails]
  );

  // const onHeightUnitChange = useCallback((e) => {
  //   const heightUnit = e.target.value;
  //   setProfileDetails((pre) => ({ ...pre, heightUnit }));
  // }, []);

  const onHeightUnitChange = useCallback(
    (heightUnit) => {
      if (profileDetails.heightUnit === heightUnit) return;
      setProfileDetails((pre) => ({ ...pre, heightUnit }));
      if (heightUnit === 'cm') {
        setProfileDetails((pre) => ({ ...pre, height: profileDetails.heightField.cm }));
        let toStringFeet = profileDetails.heightField.ft.toString();
        let toStringInch = profileDetails.heightField.in.toString();
        if (
          profileDetailsError.heightField.ft ||
          profileDetailsError.heightField.in ||
          toStringFeet.startsWith('.') ||
          toStringInch.startsWith('.') ||
          profileDetails.heightField.cm === 'NaN'
        ) {
          setProfileDetails((pre) => ({ ...pre, heightField: { cm: '', ft: '', in: '' } }));
        }
      } else {
        setProfileDetails((pre) => ({ ...pre, height: `${profileDetails.heightField.ft}~${profileDetails.heightField.in}` }));

        if (
          profileDetails.heightField.cm.toString().startsWith('.') ||
          profileDetailsError.heightField.cm ||
          !profileDetails.heightField.cm ||
          profileDetails.heightField.ft === 'NaN' ||
          profileDetails.heightField.in === 'NaN'
        ) {
          setProfileDetails((pre) => ({ ...pre, heightField: { ft: '', in: '', cm: '' } }));
          return;
        }
      }
    },
    [profileDetails.heightField.ft, profileDetails.heightField.in, profileDetails.heightField.cm, profileDetails.heightUnit]
  );

  const onWeightChange = useCallback((e) => {
    const weight = e.target.value.trim() ? e.target.value : e.target.value.trim();
    let finalWeight = profileDetails.weightUnit === 'kgs' ? /^\d*\.?\d{0,1}$/.test(weight) : /^\d*\.?\d{0,2}$/.test(weight);
    if (finalWeight) setProfileDetails((pre) => ({ ...pre, weight }));
  }, []);

  const onWeightUnitChange = useCallback(
    (e) => {
      const weightUnit = e.target.value;
      setProfileDetails((pre) => ({ ...pre, weightUnit }));
      if (!profileDetails.weight) return;
      if (weightUnit === 'lbs') {
        const lbsValue: any = parseFloat(profileDetails?.weight) * 2.20462; // 1 kg = 2.20462 lbs
        let lbs = lbsValue.toFixed(2);
        setProfileDetails((pre) => ({ ...pre, weight: lbs }));
      } else {
        const kgValue: any = parseInt(profileDetails?.weight) / 2.20462; // 1 kg = 2.20462 lbs
        let kg = kgValue.toFixed(2);
        setProfileDetails((pre) => ({ ...pre, weight: kg }));
      }
    },
    [profileDetails.weight, profileDetails.weightUnit]
  );

  const onDateOfBirthChange = useCallback((DateOfBirth) => {
    setProfileDetails((pre) => ({ ...pre, DateOfBirth }));
  }, []);

  const onGender = useCallback((Gender) => {
    setProfileDetails((pre) => ({ ...pre, Gender }));
  }, []);

  const onModifiedGender = useCallback((isModifiedGender) => {
    setOpenGenderModified(isModifiedGender);
    // profileDetailsError.userTypedGender=="";
    setProfileDetails((pre) => ({ ...pre, isModifiedGender }));
    if (!isModifiedGender) {
      setModifiedGender((pre) => ({ ...pre, userTypedGender: '', MedicallyModifiedGender: '', isUserTypedGender: false }));
      setProfileDetails((pre) => ({ ...pre, userTypedGender: '', MedicallyModifiedGender: '', isUserTypedGender: false }));
      setProfileDetailsError((pre) => ({
        ...pre,
        isModifiedGender: false,
        isUserTypedGender: false,
        MedicallyModifiedGender: '',
        userTypedGender: '',
        PreferredLanguages: [],
      }));
    }
  }, []);

  const onMedicallyModifiedGender = useCallback((MedicallyModifiedGender) => {
    setModifiedGender((pre) => ({ ...pre, MedicallyModifiedGender, userTypedGender: '' }));
    (MedicallyModifiedGender || profileDetailsError.userTypedGender) &&
      setProfileDetailsError((prev) => ({ ...prev, userTypedGender: '' }));
  }, []);

  const onUserTypedGender = useCallback((e) => {
    const userTypedGender = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setModifiedGender((pre) => ({
      ...pre,
      userTypedGender,
      MedicallyModifiedGender: userTypedGender.trim() ? '' : pre.MedicallyModifiedGender,
      isUserTypedGender: Boolean(userTypedGender),
    }));
    setProfileDetailsError((prev) => ({ ...prev, userTypedGender: '' }));
  }, []);

  const onEditModifyGender = () => setOpenGenderModified(true);

  const onCloseModifiedDrawer = () => {
    if (
      profileDetails.userTypedGender.trim() === '' &&
      modifiedGender.MedicallyModifiedGender == '' &&
      modifiedGender.userTypedGender.trim() == '' &&
      profileDetails.MedicallyModifiedGender == ''
    ) {
      setProfileDetails((pre) => ({ ...pre, isModifiedGender: false }));
    }
    setProfileDetailsError((prev) => ({ ...prev, userTypedGender: '' }));
    setModifiedGender((pre) => ({
      ...pre,
      MedicallyModifiedGender: profileDetails.MedicallyModifiedGender,
      userTypedGender: profileDetails.userTypedGender,
    }));
    setOpenGenderModified(false);
  };
  const onDoneModifiedGender = () => {
    if (modifiedGender.userTypedGender.trim() === '' && !modifiedGender.MedicallyModifiedGender) {
      setProfileDetailsError((prev) => ({ ...prev, userTypedGender: 'Invalid Input' }));
      return;
    }
    if (modifiedGender.MedicallyModifiedGender == '' && modifiedGender.userTypedGender.trim() == '') {
      setProfileDetails((pre) => ({ ...pre, isModifiedGender: false }));
      setOpenGenderModified(false);
      return;
    }
    if (modifiedGender.MedicallyModifiedGender == '' && modifiedGender.userTypedGender.trim().length > 60) {
      setProfileDetailsError((prev) => ({ ...prev, userTypedGender: 'Please enter maximum 60 characters only' }));
      return;
    }
    setModifiedGender((prev) => ({ ...prev, userTypedGender: prev.userTypedGender.trim() }));
    setProfileDetails((pre) => ({ ...pre, ...modifiedGender, userTypedGender: modifiedGender.userTypedGender.trim() }));
    setOpenGenderModified(false);
    setProfileDetailsError((prev) => ({ ...prev, userTypedGender: '' }));
  };

  const onFoodRestrictionChange = useCallback((FoodRestriction) => {
    setProfileDetails((pre) => ({ ...pre, FoodRestriction }));
  }, []);

  const onCuisineChange = useCallback((Cuisine) => {
    setProfileDetails((pre) => ({ ...pre, Cuisine }));
  }, []);

  const onPreferredLanguages = useCallback((PreferredLanguages) => {
    setProfileDetails((pre) => ({ ...pre, PreferredLanguages }));
  }, []);

  const onNationality = useCallback((Nationality) => {
    setProfileDetails((pre) => ({ ...pre, Nationality }));
  }, []);

  const onEmail = useCallback((e) => {
    const EMail = e.target.value;
    setProfileDetails((pre) => ({ ...pre, EMail }));
  }, []);

  const onFacebookUrlChange = useCallback((e) => {
    const facebookUrl = e.target.value;
    setProfileDetails((pre) => ({ ...pre, facebookUrl }));
  }, []);

  const onTwitterUrlChange = useCallback((e) => {
    const twitterUrl = e.target.value;
    setProfileDetails((pre) => ({ ...pre, twitterUrl }));
  }, []);

  const onInstagramUrlChange = useCallback((e) => {
    const instagramUrl = e.target.value;
    setProfileDetails((pre) => ({ ...pre, instagramUrl }));
  }, []);

  const onYoutubeUrlChange = useCallback((e) => {
    const youtubeUrl = e.target.value;
    setProfileDetails((pre) => ({ ...pre, youtubeUrl }));
  }, []);

  const onLinkedInUrlChange = useCallback((e) => {
    const linkedInUrl = e.target.value;
    setProfileDetails((pre) => ({ ...pre, linkedInUrl }));
  }, []);

  const onBloodGrpChange = useCallback((bloodGrp) => {
    setProfileDetails((pre) => ({ ...pre, bloodGrp }));
  }, []);

  const onMobileChange = useCallback((e) => {
    const Mobile = e.target.value.replace(/[^A-Z0-9+]/gi, '');
    setProfileDetails((pre) => ({ ...pre, Mobile }));
  }, []);

  const onWhatsAppNumberChange = useCallback((e) => {
    const whatsAppNumber = e.target.value.replace(/[^A-Z0-9+]/gi, '');
    setProfileDetails((pre) => ({ ...pre, whatsAppNumber }));
    setIsWhatsAppChecked(profileDetails.Mobile === whatsAppNumber);
  }, []);

  const onCheckWhatsAppNumber = (checked: boolean) => {
    setProfileDetails((pre) => ({ ...pre, whatsAppNumber: checked ? `${profileDetails.Mobile}` : '' }));
    setIsWhatsAppChecked(checked);
  };

  const onEmergencyContactChange = useCallback((e) => {
    const emergencyContact = e.target.value.replace(/[^A-Z0-9+]/gi, '');
    setProfileDetails((pre) => ({ ...pre, emergencyContact }));
  }, []);

  return {
    profileDetails,
    profileDetailsError,
    openGenderModified,
    modifiedGender,
    cuisineOptions,
    isWhatsAppChecked,
    isChangeInAnyField,
    setProfileDetailsError,
    setProfileDetails,
    setOpenGenderModified,
    onHeightChange,
    onFeetChange,
    onInchesChange,
    onHeightUnitChange,
    onWeightChange,
    onWeightUnitChange,
    onDateOfBirthChange,
    onGender,
    onModifiedGender,
    onMedicallyModifiedGender,
    onUserTypedGender,
    onEditModifyGender,
    onCloseModifiedDrawer,
    onDoneModifiedGender,
    onFoodRestrictionChange,
    onCuisineChange,
    onPreferredLanguages,
    onNationality,
    onEmail,
    onFacebookUrlChange,
    onTwitterUrlChange,
    onInstagramUrlChange,
    onYoutubeUrlChange,
    onLinkedInUrlChange,
    onBloodGrpChange,
    onMobileChange,
    onWhatsAppNumberChange,
    onCheckWhatsAppNumber,
    onEmergencyContactChange,
    onResetFields,
    isLoading,
  };
};

export default useProfileDetails;