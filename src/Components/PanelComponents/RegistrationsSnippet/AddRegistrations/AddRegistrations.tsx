import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import CheckBoxGroup from '../../../LibraryComponents/CheckBoxGroup/CheckBoxGroup';
import CheckBoxHtml from '../../../LibraryComponents/CheckBoxHtml/CheckBoxHtml';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUIAutoSelect from '../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUIDrawer from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../../LibraryComponents/PannelFooter/PannelFooter';
import Select from '../../../LibraryComponents/Select/Select';
import SuggestiveInput from '../../../LibraryComponents/SuggestiveInput/SuggestiveInput';
import UploadFiles from '../../../LibraryComponents/UploadFiles/UploadFiles';
import { BackArrowIcon } from '../../../SVGs/Common';
import { file_formats } from '../../Education/AddEducation/AddEducation.function';
import { getProfessinalBodiesWithSearch } from './AddRegistration.functions';
import { useRegistrationsAddEdit } from './AddRegistration.hook';
import { useStyles } from './AddRegistration.styles';
import { ICountries, IProps } from './AddRegistration.types';

export default function AddRegistrationsSnippet(props: IProps) {
  const isEditView = props.isEdit;
  const [openConfirmDrawer, setOpenConfirmDrawer] = useState<boolean>(false);
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const {
    countriesOption,
    allProfessionalBodies,
    buttonDisabled,
    loading,
    fields,
    errors,
    setErrors,
    setFields,
    eductationandQualificationOptions,
    onAddRegistrationClick,
    onEditRegistrationClick,
  } = useRegistrationsAddEdit(props);
  const goBack = useDFGoBack();

  const onButtonClick = async () => {
    try {
      if (isEditView) {
        await onEditRegistrationClick();
      } else {
        await onAddRegistrationClick();
      }
    } catch (error) {
      console.log('error', error);
      return;
    } finally {
      goBack();
    }
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        customStyle={classes.heading}
        startAdornment={
          <span className={classes.backButton}>
            <BackArrowIcon onClick={() => setOpenConfirmDrawer(true)} />
          </span>
        }
        headerContent={'Registration with professional bodies'}
      />

      {/*  */}

      <div className={classes.scrollBody}>
        {loading ? (
          <>
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'131px'} style={{ margin: '5px 0px' }} />
          </>
        ) : (
          <>
            <div className={`${classes.marginBottom}`}>
              <Select
                placeholder="Country"
                headerTitle="Country"
                options={countriesOption}
                setValues={(country) => {
                  setFields.setCountry(country);
                }}
                values={fields.country || ''}
                parameter={'label'}
                optionsType={'label'}
                position={'bottom'}
                isReturnSelectedOption
                isAutoOk
                isDivider
                isSearch
                drawerPadding={'20px 20px 0px 20px'}
                // helperText={errors.professionalBody}
              />
            </div>
            <div className={`${classes.marginBottom}`}>
              <SuggestiveInput
                key={'Professional bodies'}
                placeholder="Professional bodies"
                label="Professional bodies"
                values={fields.professionalBody?.professionalBody || ''}
                onInputChange={(e, searchValue) =>
                  setFields.setProfessionalBody((pre) => ({
                    ...pre,
                    professionalBodyId: searchValue,
                    professionalBody: searchValue,
                  }))
                }
                onSearchAPICall={async (data) => {
                  return await getProfessinalBodiesWithSearch(props.sessions, data.trim());
                }}
                onDropDownOptionClick={(e, data) => {
                  setFields.setProfessionalBody(allProfessionalBodies.find((e) => e.professionalBody === data.label)!);
                }}
                helperText={errors.professionalBody}
                listRenderer={(data) => {
                  return <span className={`${classes.name} ${commonClasses.body15Regular}`}>{data.label}</span>;
                }}
              />
            </div>
            <div className={`${classes.marginBottom}`}>
              <InputField
                placeholder="Registration number"
                label="Registration number"
                value={fields.registrationNumber}
                onChange={(v) => {
                  const numValue = Number(v.target.value);
                  const isNumber = !isNaN(numValue);
                  if (!isNumber) return;
                  setFields.setRegistrationNumber(v.target.value);
                }}
                helperText={errors.registrationNumber}
              />
            </div>
            <div className={`${classes.marginBottom}`}>
              <MUIDatePicker
                label="From Date"
                date={fields?.fromDate ? new Date(fields.fromDate) : null}
                setDate={(value) => {
                  setFields.setFromDate(value);
                }}
                maxDate={new Date()}
                minDate={new Date('1900-01-01')}
                helperText={errors.fromDate}
              />
            </div>
            <div className={`${classes.marginBottom}`}>
              <MUIDatePicker
                label="To Date"
                date={fields.toDate ? new Date(fields.toDate) : null}
                setDate={(value) => {
                  setFields.setToDate(value);
                }}
                maxDate={new Date()}
                minDate={fields?.fromDate ? new Date(fields.fromDate) : new Date('1900-01-01')}
                helperText={errors.toDate}
              />
            </div>

            {/*  */}

            {!!eductationandQualificationOptions?.length && (
              <div>
                <h3 className={`${classes.checkGroupHeader} ${commonClasses.body15Medium}`}>Educations & Registrations</h3>

                <div className={classes.checkGroupContainer}>
                  <div className={classes.groupContainer}>
                    {eductationandQualificationOptions.map((item, index) => {
                      return (
                        <CheckBoxHtml
                          key={index}
                          // label={(() => {
                          //   let label = item.label;
                          //   if (item.specialties?.length || item.speciality?.length) {
                          //     label += ` (${item?.specialties ? item?.specialties.join(', ') : item?.speciality})`;
                          //   }
                          //   return label;
                          // })()}
                          label={item.label}
                          value={item.value}
                          sublabel={undefined}
                          isChecked={fields.selectedEducationalDetails.includes(item.value)}
                          handleAnswer={(checked, item, value) => {
                            if (checked) {
                              setFields.setSelectedEducationalDetails([...fields.selectedEducationalDetails, value]);
                            } else {
                              setFields.setSelectedEducationalDetails(
                                fields.selectedEducationalDetails.filter((e) => e !== value)
                              );
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {
              <div className={`${classes.marginBottom}`}>
                <span className={`${commonClasses.body17Regular} ${classes.mb}`}>Attachments</span>
                <UploadFiles
                  maxFileSizeMb={10}
                  ParentuploadFiles={fields.uploadedFiles}
                  acceptedFiles={file_formats}
                  multiple
                  onUpload={(files) => setFields.setUploadedFiles([...files])}
                  fileLimit={10}
                />
              </div>
            }
          </>
        )}
      </div>

      {/*  */}
      <MUIDrawer
        open={openConfirmDrawer}
        anchor={'bottom'}
        handleClose={() => setOpenConfirmDrawer(false)}
        headerTitle={'Unsaved Changes'}
      >
        <div className={`${commonClasses.body15Regular} ${classes.warningMessage}`}>
          Your changes will be lost if you don't save them.
        </div>
        <PannelFooter
          customStyle={classes.warningFooterStyle}
          buttonOneProps={{ size: 'medium' }}
          buttonTwoProps={{ size: 'medium' }}
          handleAdd={() => goBack()}
          handleCancel={() => setOpenConfirmDrawer(false)}
          buttonOneTitle={'Cancel'}
          buttonTwoTitle={'Discard'}
        />
      </MUIDrawer>
      <div className={classes.footercontainer}>
        <MUIButton
          variant="contained"
          size="large"
          onClick={onButtonClick}
          disabled={buttonDisabled || loading}
          className={classes.fullWidth}
        >
          {`${isEditView ? 'Update' : 'Add'} Registration`}
        </MUIButton>
      </div>
    </div>
  );
}
