import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_S3 } from '../../../../Utils';
import Button from '../../../LibraryComponents/MUIButton/MUIButton';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUIDrawer from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../../LibraryComponents/PannelFooter/PannelFooter';
import Select from '../../../LibraryComponents/Select/Select';
import SuggestiveInput from '../../../LibraryComponents/SuggestiveInput/SuggestiveInput';
import UploadFiles from '../../../LibraryComponents/UploadFiles/UploadFiles';
import {
  AddEducationDetails,
  EducationData,
  ValidateData,
  callCountriesAPI,
  callQualificationAPIForSearch,
  callUnivercityAPIForSearch,
  checkIfNoChange,
  file_formats,
  removeProfileImage,
  uploadAttachment,
} from './AddEducation.function';
import { useStyles } from './AddEducation.styles';
import { BackArrowIcon } from './AddEducation.svg';
import { EducationErrorTypes, EducationTypes, ICountries, IProps } from './AddEducation.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const AddEducation = (props: IProps) => {
  const { sessions, setAction, patientId, selectedClient, editCardData } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const [countriesOption, setCountriesOption] = useState<ICountries[]>([]);
  const [educationState, setEducationState] = useState<EducationTypes>(EducationData);
  const [educationError, setEducationError] = useState<EducationErrorTypes>(EducationData);
  const [UploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [openConfirmDrawer, setOpenConfirmDrawer] = useState<boolean>(false);
  const { id: panelId } = useCurrentPanel();
  const commanClass = useCommonStyles();

  const loadingRef = useRef(false);

  useEffect(() => {
    (async () => {
      const countries = await callCountriesAPI();
      if (countries) setCountriesOption(countries);
    })();
  }, []);

  useEffect(() => {
    if (editCardData?.edit) {
      setUploadedFiles(editCardData.files);
      setEducationState(editCardData);
    }
  }, [editCardData]);

  useEffect(() => {
    if (editCardData?.edit) {
      const noChangeWhileEditing = checkIfNoChange(editCardData, educationState, UploadedFiles);
      if (noChangeWhileEditing) setDisableButton(true);
      else setDisableButton(false);
    } else {
      const errorObject = ValidateData(educationState);
      if (!errorObject.error) setDisableButton(false);
      else setDisableButton(true);
    }
  }, [educationState, UploadedFiles]);

  const handleCountry = useCallback((_: any, e: any) => {
    if (!e?.value || !e?.label) return;
    setEducationError((pre) => ({ ...pre, country: '' }));
    setEducationState((pre: any) => ({
      ...pre,
      country: e.label,
    }));
  }, []);

  const handleQualification = useCallback((_: any, e: any) => {
    setEducationError((pre) => ({ ...pre, qualification: '' }));
    setEducationState((pre: any) => ({
      ...pre,
      qualification: e?.label,
      qualificationId: e?.value,
    }));
  }, []);

  const handleUnivercity = useCallback((_: any, e: any) => {
    setEducationError((pre) => ({ ...pre, university: '' }));

    setEducationState((pre: any) => ({
      ...pre,
      university: e?.label,
      universityId: e?.value,
      universityAddress: '', //`${details?._source?.city}, ${details?._source?.state}, ${details?._source?.country}`,
    }));
  }, []);
  const handleSave = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const errorObject = ValidateData(educationState);

    if (errorObject.error) {
      setEducationError(errorObject);
      ErrorToaster('Please enter the required fields', panelId, 'error');
      loadingRef.current = false;
      return;
    }

    // if modifying the fields.
    if (editCardData?.edit) {
      // delete files that are now removed while editing/updation.

      let oldImageUrl = editCardData?.attachments;

      //delete old files.
      oldImageUrl.forEach((url) => {
        removeProfileImage(panelId, props.sessions, url);
      });

      // S3 location for the new files.

      const educationId = editCardData.educationId;
      let ArrayForFileLocation = [];
      ArrayForFileLocation = await Promise.all(
        UploadedFiles.map((file) => {
          let FileLocation = uploadAttachment(file, sessions, patientId, educationId);
          return FileLocation;
        })
      );

      delete educationState['files'];

      AddEducationDetails(
        educationState,
        ArrayForFileLocation,
        'UPDATE',
        sessions,
        patientId,
        educationId,
        editCardData?.createdBy,
        selectedClient,
        setAction,
        panelId
      );
    } else {
      const educationId = v4();
      let ArrayForFileLocation = [];
      ArrayForFileLocation = await Promise.all(
        UploadedFiles.map((file) => {
          let FileLocation = uploadAttachment(file, sessions, patientId, educationId);
          return FileLocation;
        })
      );

      setEducationState((pre: any) => ({
        ...pre,
        attachments: ArrayForFileLocation,
      }));
      AddEducationDetails(
        educationState,
        ArrayForFileLocation,
        'ADD',
        sessions,
        patientId,
        educationId,
        sessions?.user?.id,
        selectedClient,
        setAction,
        panelId
      );
    }
    loadingRef.current = true;
  };
  const handleUpload = async (files) => {
    setUploadedFiles(files);
  };

  async function searchCountries(searchString: string) {
    const payload = {
      size: 10000,
      index: 'countries_master',
      keyToCheck: 'name',
      value: searchString ?? '',
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_API_URL}/search`,
      token: sessions.id_token,
      headers: {},
    };

    try {
      const response = await PMS_S3.postData(payload);
      if (response.Error) return ErrorToaster(response.Error, panelId, 'error');
      let options = response?.map((country) => ({ label: country._source?.name, value: country._source?.isoCode }));
      return options;
    } catch (error) {
      ErrorToaster(error.message, panelId, 'error');
    }
  }

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        startAdornment={
          <span className={classes.backButton}>
            <BackArrowIcon onClick={() => setOpenConfirmDrawer(true)} />
          </span>
        }
        headerContent={editCardData?.edit ? 'Update Education' : 'Add Education'}
      />
      <div className={classes.scrollBody}>
        <div className={`${classes.marginBottom}`}>
          <Select
            placeholder="Country"
            headerTitle="Country"
            options={countriesOption}
            setValues={handleCountry}
            values={educationState?.country || ''}
            parameter={'label'}
            optionsType={'label'}
            position={'bottom'}
            isReturnSelectedOption
            isAutoOk
            isDivider
            isSearch
            drawerPadding={'20px 20px 0px 20px'}
            helperText={educationError.country}
            onSearchAPICall={searchCountries}
          />
        </div>
        <div className={`${classes.marginBottom}`}>
          <SuggestiveInput
            key={'Qualification'}
            placeholder="Qualification"
            label="Qualification"
            values={educationState?.qualification || ''}
            onInputChange={(e, searchValue) => handleQualification(e, { label: searchValue, value: searchValue })}
            onSearchAPICall={(data) => callQualificationAPIForSearch(panelId, data.trim(), sessions)}
            onDropDownOptionClick={handleQualification}
            helperText={educationError.qualification}
            listRenderer={(data) => {
              return <span className={`${classes.name} ${commanClass.body15Regular}`}>{data.label}</span>;
            }}
          />
        </div>

        <div className={`${classes.marginBottom}`}>
          <SuggestiveInput
            key={'Specialties'}
            placeholder="Specialties"
            label="Specialties"
            values={educationState?.speciality || ''}
            onSearchAPICall={() => {}}
            onInputChange={(e, searchValue) => {
              setEducationError((pre) => ({ ...pre, speciality: '' }));
              setEducationState((prev) => ({
                ...prev,
                speciality: searchValue,
              }));
            }}
            onDropDownOptionClick={(e, data) => {
              setEducationError((pre) => ({ ...pre, speciality: '' }));
              setEducationState((prev) => ({
                ...prev,
                speciality: data.label,
              }));
            }}
            helperText={educationError.speciality}
            listRenderer={(data) => {
              return <span className={`${classes.name} ${commanClass.body15Regular}`}>{data.label}</span>;
            }}
          />
        </div>

        <div className={`${classes.marginBottom}`}>
          <SuggestiveInput
            key={'Name of the university or institute'}
            placeholder="Name of the university or institute"
            label="Name of the university or institute"
            values={educationState?.university || ''}
            onInputChange={(e, searchValue) => {
              handleUnivercity(e, { label: searchValue, value: searchValue });
            }}
            onSearchAPICall={(data) => callUnivercityAPIForSearch(panelId, data.trim(), sessions)}
            onDropDownOptionClick={handleUnivercity}
            helperText={educationError.university}
            listRenderer={(data) => {
              return <span className={`${classes.name} ${commanClass.body15Regular}`}>{data.label}</span>;
            }}
          />
        </div>
        <div className={`${classes.marginBottom}`}>
          <MUIDatePicker
            label="Date of joining"
            date={educationState.joiningDate ? new Date(educationState.joiningDate) : null}
            setDate={(value) => {
              setEducationError((pre) => ({ ...pre, joiningDate: '' }));
              setEducationState((prev) => ({
                ...prev,
                joiningDate: value,
              }));
            }}
            minDate={new Date('1900-01-01')}
            maxDate={educationState.internshipDate === '' ? new Date() : educationState.internshipDate}
            helperText={educationError.joiningDate}
          />
        </div>
        <div className={`${classes.marginBottom}`}>
          <MUIDatePicker
            label="Date of internship completion"
            date={educationState.internshipDate ? new Date(educationState.internshipDate) : null}
            setDate={(value) => {
              setEducationError((pre) => ({ ...pre, internshipDate: '' }));
              setEducationState((prev) => ({
                ...prev,
                internshipDate: value,
              }));
            }}
            maxDate={new Date()}
            minDate={educationState.joiningDate ?? new Date('1900-01-01')}
            helperText={educationError.internshipDate}
          />
        </div>
        <div className={`${classes.marginBottom}`}>
          <span className={`${CommonStyles.body17Regular} ${classes.mb}`}>Attachments</span>
          <UploadFiles
            maxFileSizeMb={10}
            ParentuploadFiles={UploadedFiles}
            acceptedFiles={file_formats}
            multiple
            onUpload={handleUpload}
            fileLimit={10}
          />
        </div>
      </div>
      <div className={classes.footercontainer}>
        <Button
          disabled={disableButton || loadingRef.current}
          variant="contained"
          size="large"
          onClick={handleSave}
          className={classes.fullWidth}
        >
          {'Save'}
        </Button>
      </div>
      <MUIDrawer
        open={openConfirmDrawer}
        anchor={'bottom'}
        handleClose={() => setOpenConfirmDrawer(false)}
        headerTitle={'Unsaved Changes'}
      >
        <div className={`${CommonStyles.body15Regular} ${classes.warningMessage}`}>
          Your changes will be lost if you don't save them.
        </div>
        <PannelFooter
          customStyle={classes.warningFooterStyle}
          buttonOneProps={{ size: 'medium' }}
          buttonTwoProps={{ size: 'medium' }}
          handleAdd={() => {
            setAction('Education');
          }}
          handleCancel={() => setOpenConfirmDrawer(false)}
          buttonOneTitle={'Cancel'}
          buttonTwoTitle={'Discard'}
        />
      </MUIDrawer>
    </div>
  );
};

export default AddEducation;
