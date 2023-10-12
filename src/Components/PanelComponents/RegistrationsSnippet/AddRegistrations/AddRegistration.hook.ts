import { set } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../DisplayFramework/State/Slices/DisplayFramework';
import { ISelectOption } from '../../../LibraryComponents/Select/Select.types';
import { convertURLToFile, getEducationDetails } from '../../Education/EducationPanel/EducationPanel.functions';
import { ICardData } from '../RegistrationCard/RegistrationCard.types';
import { getRegistrationCardsData } from '../RegistrationSnippetHome.functions';
import { RegistrationSnippet, callCountriesAPI } from './AddRegistration.functions';
import { EducationalBody, ICountries, IProps, ProfessionalBody } from './AddRegistration.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export function useRegistrationsAddEdit(props: IProps) {
  const session = useUserSession();
  const { id: panelId } = useCurrentPanel();
  const selectedClient = useSelectedClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [allProfessionalBodies, setAllProfessionalBodies] = useState<ProfessionalBody[]>([]);

  const [allCardsData, setAllCardsData] = useState<ICardData[]>([]);
  const [eductationandQualificationOptions, setEductationandQualificationOptions] = useState([]);
  const [countriesOption, setCountriesOption] = useState<ICountries[]>([]);

  const [professionalBody, setProfessionalBody] = useState<ProfessionalBody | undefined>(undefined);
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedEducationalDetails, setSelectedEducationalDetails] = useState<string[]>([]);
  const [registrationId, setRegistrationId] = useState<string>(uniqueId());
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [country, setCountry] = useState<string>('');
  const [oldRegistrationData, setOldRegistrationData] = useState<ICardData | undefined>(undefined);

  const [errors, setErrors] = useState<{
    professionalBody?: string;
    registrationNumber?: string;
    fromDate?: string;
    toDate?: string;
    country?: string;
  }>({});

  //   Initial Load
  useEffect(() => {
    (async () => {
      //
      setLoading(true);
      try {
        const allProfessionalBodies = await RegistrationSnippet.getProfessinalBodies(session);
        setAllProfessionalBodies(
          allProfessionalBodies.map((item) => {
            return item._source;
          })
        );
        const countries = await callCountriesAPI();
        if (countries) setCountriesOption(countries);

        let cardsData: ICardData[] = await getRegistrationCardsData(props.patientId, () => {});
        let educationtData = await getEducationDetails(props.patientId);
        let educationDetailsOptions = educationtData.map((data, ind) => {
          return { label: data.qualification, value: data.educationId };
        });
        let registrtionDetailsOptions = cardsData.map((data, ind) => {
          return { label: data.professionalBody, value: data.registrationId };
        });

        setEductationandQualificationOptions([...educationDetailsOptions, ...registrtionDetailsOptions]);

        setAllCardsData(cardsData);
        if (props.isEdit && props.editCardregistrationId) {
          const cardData = cardsData.find((item) => item.registrationId === props.editCardregistrationId);
          if (!cardData) {
            return;
          }

          const professionalBody = {
            professionalBodyId: cardData.professionalBodyId,
            professionalBody: cardData.professionalBody,
            country: cardData.country,
          };

          setProfessionalBody(professionalBody);
          setRegistrationNumber(cardData.regNumber);
          setCountry(cardData.country);
          setFromDate(cardData.validFrom);
          setToDate(cardData.validThru);
          const selectedEducations = cardData.qualificationInfo.map((item) => item.value);
          setSelectedEducationalDetails(selectedEducations);
          setRegistrationId(cardData.registrationId);
          const Files: File[] = (
            await Promise.all(
              cardData?.attachments?.map(async (url: string, index) => {
                return await convertURLToFile(url, session);
              })
            )
          ).filter((file) => file);
          setUploadedFiles(Files);
          setOldRegistrationData(cardData);
          setEductationandQualificationOptions((prev) => {
            return prev.filter((item) => item.value !== props.editCardregistrationId);
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Button Disabled State
  useEffect(() => {
    if (
      !professionalBody?.professionalBody?.trim() ||
      !registrationNumber.trim() ||
      !fromDate ||
      !toDate ||
      !selectedEducationalDetails.length ||
      !country
    ) {
      setButtonDisabled(true);
    } else {
      if (allCardsData.length) {
        const sameRegCard = allCardsData.find((item) => item.regNumber === registrationNumber);
        if (sameRegCard && sameRegCard.registrationId !== registrationId) {
          setButtonDisabled(true);
          setErrors({
            ...errors,
            registrationNumber: 'Registration Number Already Exists',
          });
        } else {
          setButtonDisabled(false);
          setErrors({
            ...errors,
            registrationNumber: '',
          });
        }
      } else {
        setButtonDisabled(false);
      }
    }
  }, [professionalBody, registrationNumber, fromDate, toDate, selectedEducationalDetails, allCardsData, countriesOption]);

  // enable button only when there is a change in the updated fields.
  useEffect(() => {
    if (props.editCardregistrationId) {
      let oldDataModified = false;

      // check if there is any modification in the fields.
      if (
        (oldRegistrationData?.professionalBody &&
          professionalBody?.professionalBody &&
          oldRegistrationData?.professionalBody !== professionalBody?.professionalBody) ||
        (oldRegistrationData?.regNumber && registrationNumber && oldRegistrationData?.regNumber !== registrationNumber) ||
        (oldRegistrationData?.country && country && oldRegistrationData?.country !== country) ||
        (oldRegistrationData?.validFrom &&
          fromDate &&
          moment(oldRegistrationData.validFrom).format('L') !== moment(fromDate).format('L')) ||
        (oldRegistrationData?.validThru &&
          toDate &&
          moment(oldRegistrationData.validThru).format('L') !== moment(toDate).format('L'))
      ) {
        setButtonDisabled(false);
        return;
      }
      // checking if there is any change in tick options for the registration.
      if (
        oldRegistrationData?.qualificationInfo &&
        selectedEducationalDetails &&
        oldRegistrationData?.qualificationInfo?.length !== selectedEducationalDetails?.length
      ) {
        setButtonDisabled(false);
        return;
      }
      if (
        oldRegistrationData?.qualificationInfo &&
        selectedEducationalDetails &&
        oldRegistrationData?.qualificationInfo?.length === selectedEducationalDetails?.length
      ) {
        oldRegistrationData?.qualificationInfo.forEach(({ value }) => {
          if (!selectedEducationalDetails.includes(value)) {
            oldDataModified = true;
          }
        });
        if (oldDataModified) {
          setButtonDisabled(false);
          return;
        }
      }

      // check if there is any chnage in the files.
      if (uploadedFiles && oldRegistrationData?.attachments && oldRegistrationData?.attachments.length !== uploadedFiles.length) {
        setButtonDisabled(false);
        return;
      }
      if (uploadedFiles && oldRegistrationData?.attachments && oldRegistrationData?.attachments.length === uploadedFiles.length) {
        let NewUploadedFileNames = uploadedFiles.map(({ name }) => name);

        oldRegistrationData?.attachments.forEach((fileLocation) => {
          let oldfileName = fileLocation.split('/').pop();
          if (!NewUploadedFileNames.includes(oldfileName)) oldDataModified = true;
        });
        if (oldDataModified) {
          setButtonDisabled(false);
          return;
        }
      }
      setButtonDisabled(true);
    }
  }, [
    professionalBody,
    registrationNumber,
    country,
    fromDate,
    toDate,
    selectedEducationalDetails,
    allCardsData,
    countriesOption,
    uploadedFiles,
  ]);

  const validate = () => {
    const errorObj: typeof errors = {};
    if (!country) {
      errorObj.country = 'Please Select';
    }
    if (!professionalBody) {
      errorObj.professionalBody = 'Please Select';
    }
    if (!registrationNumber) {
      errorObj.registrationNumber = 'Please Fill';
    }
    if (!fromDate) {
      errorObj.fromDate = 'Please Select';
    }
    if (!toDate) {
      errorObj.toDate = 'Please Select';
    }
    if (Object.keys(errorObj).length) {
      setErrors(errorObj);
      return false;
    }
    setErrors({});
    return true;
  };

  const onAddRegistrationClick = async () => {
    if (!validate()) return;
    try {
      let educationalBody = eductationandQualificationOptions.filter((item) => selectedEducationalDetails.includes(item.value));
      setLoading(true);
      setButtonDisabled(true);
      const res = await RegistrationSnippet.postAddRegistration(props.patientId, session, selectedClient, {
        professionalBody: professionalBody,
        educationalBody: educationalBody,
        registrationNumber: registrationNumber,
        fromDate: fromDate,
        toDate: toDate,
        registrationId: registrationId,
        uploadedFiles: uploadedFiles,
        country: country,
      });
    } catch (e) {
      ErrorToaster('Someting went wrong', panelId, 'error');
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const onEditRegistrationClick = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setButtonDisabled(true);
      let educationalBody = eductationandQualificationOptions.filter((item) => selectedEducationalDetails.includes(item.value));
      await RegistrationSnippet.postEditdRegistration(panelId, props.patientId, session, selectedClient, oldRegistrationData, {
        professionalBody: professionalBody,
        educationalBody: educationalBody,
        registrationNumber: registrationNumber,
        fromDate: fromDate,
        toDate: toDate,
        registrationId: registrationId,
        uploadedFiles: uploadedFiles,
        country: country,
      });
    } catch (e) {
      ErrorToaster('Someting went wrong', panelId, 'error');
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  //
  //

  const setFromDateHandler = (value: string) => {
    const fromDate = new Date(value);
    setFromDate(value);
    //  update the ToDate if it is less than FromDate
    if (toDate) {
      const _toDate = new Date(toDate);
      if (_toDate < fromDate) {
        setToDate(value);
      }
    }
  };

  return {
    countriesOption,
    loading,
    allProfessionalBodies,
    eductationandQualificationOptions,
    buttonDisabled,
    onAddRegistrationClick,
    onEditRegistrationClick,
    fields: {
      professionalBody,
      registrationNumber,
      selectedEducationalDetails,
      fromDate,
      toDate,
      uploadedFiles,
      country,
    },
    setFields: {
      setProfessionalBody,
      setRegistrationNumber,
      setFromDate: setFromDateHandler,
      setToDate,
      setSelectedEducationalDetails,
      setUploadedFiles,
      setCountry,
    },
    errors,
    setErrors,
  };
}
