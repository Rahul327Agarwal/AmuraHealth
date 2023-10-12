import { Button, debounce, FormControlLabel, Popper, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import { ToastContainer } from 'react-toastify';
import { withStyles } from 'tss-react/mui';
import InputField from '../../LibraryComponents/InputField/InputField';
import MUIDatePicker from '../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import SearchAndMultiSelect from '../Components/Dropdown/SearchAndMultiSelect/SearchAndMultiSelect';
import SearchAndSelect from '../Components/Dropdown/SearchAndSelect/SearchAndSelect';
import PhoneInputField from '../Components/InputField/PhoneInputField/PhoneInputField';
import { getCitiesAPI, getCountriesAPI, getTimeZoneAPI } from './../../../Common/Common.functions';

// import {
//   getLanguage,
//   getNationality,
// } from "../ProfileManagement/Personal/Personal.functions";

import { List } from '../../../Utilities/AutoResizerWrapper';
import { PMS_LOCALE } from '../../../Utils';
import { getLanguage, getNationality } from '../../PanelComponents/ProfileManagement/Personal/Personal.functions';
import Token from '../Components/Token/Token';
import { registerNewUser } from './Registernew.functions';
import { RegisterStyles } from './Registernew.styles';
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DatePicker from '../../LibraryComponents/DatePicker/DatePicker';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const modifiedSex = ['Female', 'Male', 'Non-binary', 'Transgender', 'Intersex', 'I prefer not to say', 'Let me type'];

const ValidationTextField = withStyles(TextField, {
  root: {
    height: '45px',
    boxSizing: 'border-box',
    // border: "1px solid #D8D8D8 !important",
    //border: "none !important",
    //paddingLeft: "7px",
    width: 'calc(100% - 10px) !important',
    marginLeft: '7px',
    '& input:valid': {
      border: '1px solid rgb(174, 174, 174) !important',
      borderRadius: 4,
    },
    '& input:valid:hover + fieldset': {
      border: '1px solid rgb(174, 174, 174) !important',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& input:valid:focus + fieldset': {
      //border: "1px solid #D8D8D8",
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
      border: 'none',
    },
    '& .MuiInputBase-input': {
      padding: '0px 5px !important',
      background: '#F7F7F7 !important',
      color: '#1B1B1B !important',
      height: '45px',
      border: 'none',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
    border: 'none',
    // color: "#FFF",
    // padding: "10px 8px 10px 12px",
    // Use the system font instead of the default Roboto font.

    // "&:hover": {
    //   borderRadius: 2,
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    // },
  },
});

const ListboxComponent = React.forwardRef(function ListboxComponent(props: any, ref) {
  const { children, role, className, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const { classes } = RegisterStyles();

  // return (
  //   <div ref={ref} {...other} className={classes.popperstyle}>
  //     {Array.from(children).map((child: any, index: number) => {
  //       return child;
  //     })}
  //   </div>
  // );

  return (
    <div ref={ref} {...other}>
      <List
        className={classes.popperstyle}
        height={250}
        width={400}
        rowHeight={40}
        // overscanCount={5}
        // overscanRowCount={5}
        data={children}
        rowCount={itemCount}
        rowRenderer={(props) => {
          return React.cloneElement(children[props.index], {
            style: props.style,
          });
        }}
        // role={role}
      />
    </div>
  );
});
const initRegisterUser = {
  FirstName: '',
  LastName: '',
  EmailId: '',
  PhoneNumber: '',
  Country: '',
  CountryCode: '',
  Nationality: '',
  State: '',
  City: '',
  TimeZone: '',
  TimeZoneName: '',
  PreferredLanguages: [],
  isModifiedGender: false,
  gender: '',
  medicallyModifiedGender: '',
  isUserTypedGender: false,
  userTypedGender: '',
  dob: null,
};

const initErrorObject = {
  FirstName: '',
  LastName: '',
  EmailId: '',
  PhoneNumber: '',
  gender: '',
  medicallyModifiedGender: '',
  medicallyModifiedOther: '',
  dob: '',
  Nationality: '',
  Country: '',
  State: '',
  City: '',
  TimeZone: '',
  Languages: '',
};

export default function Registernew(props: any) {
  const { classes } = RegisterStyles();
  // const { id: panelId } = useCurrentPanel();
  const getLanguages = getLanguage();
  const nationalitys = getNationality();
  const [phonenumber, setPhonenumber] = React.useState('');
  const [registerUser, setRegisterUser] = useState(initRegisterUser);
  const [selectedLanguage, setSelectedLanguages] = useState([]);
  const [errorObject, seterrorObject] = useState(initErrorObject);
  const [citiesOption, setCitiesOption] = useState([]);
  const [countriesOption, setCountriesOption] = useState([]);
  const [timezoneOption, setTimezoneOption] = useState([]);
  const [city, setCity] = useState({
    id: registerUser?.CountryCode,
    label: registerUser?.City,
  });
  const [country, setCountry] = useState({
    id: registerUser?.CountryCode,
    label: registerUser?.Country,
  });

  useEffect(() => {
    callCountriesAPI();
  }, []);

  useEffect(() => {
    if (country?.id) {
      callCitiesAPI();
      callTimeZoneAPI();
    }
  }, [country?.id]);

  useEffect(() => {
    if (registerUser?.PreferredLanguages.length && !selectedLanguage.length) {
      const newLanguages = getLanguages.filter((val) => registerUser?.PreferredLanguages?.includes(val.id));
      setSelectedLanguages(newLanguages);
    }
  }, [registerUser?.PreferredLanguages]);

  const callCountriesAPI = async (searchText?: string) => {
    try {
      const response = await getCountriesAPI(searchText);
      const options = response?.map(({ _source }) => ({
        id: _source.isoCode,
        label: _source.name,
      }));
      setCountriesOption(options);
    } catch (error) {
      console.error(error);
    }
  };

  const callCitiesAPI = async (searchText?: string) => {
    try {
      const response = await getCitiesAPI(country.id, searchText);
      const options = response?.map(({ _source }) => ({
        id: _source.countryCode,
        label: _source.name,
      }));
      setCitiesOption(options);
    } catch (error) {
      console.error(error);
    }
  };

  const callTimeZoneAPI = async () => {
    try {
      const response = await getTimeZoneAPI(country.id);
      const nestedoptions = response.map(({ _source }) =>
        _source?.timezones?.map((data) => ({
          id: data?.zoneName,
          label: `${data?.tzName} ${data?.gmtOffsetName}`,
        }))
      );
      const options = nestedoptions.flat();
      setTimezoneOption(options);
      if (options.length === 1)
        setRegisterUser((pre) => ({
          ...pre,
          TimeZone: options[0].id,
          TimeZoneName: options[0].label,
        }));
    } catch (error) {
      console.error(error);
    }
  };

  const debounceCountriesFun: Function = debounce(callCountriesAPI, 500);
  const debounceCitiesFun: Function = debounce(callCitiesAPI, 500);

  return (
    <div>
      <div style={{ margin: ' 0 auto', width: '328px' }} className={classes.formContainer}>
        {/* <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          Enter your details
        </div> */}
        <div className={classes.textStyle}>Mobile Number*</div>
        <div className={'registerPhoneInput'} style={{ marginLeft: '5px' }}>
          <PhoneInputField
            focusBorder="#AEAEAE"
            hoverBorder="#1B1B1B"
            fontColor="#000000"
            autoFocus={true}
            label={` `}
            value={phonenumber}
            handleOnChange={(e: string) => {
              setPhonenumber(e.replace(/[^A-Z0-9+]/gi, ''));
              setRegisterUser({
                ...registerUser,
                PhoneNumber: e.replace(/[^A-Z0-9+]/gi, ''),
              });
            }}
          />
        </div>
        <div className={classes.errorMessage}>{errorObject.PhoneNumber}</div>
        <div className={classes.textStyle}>First Name*</div>
        <ValidationTextField
          size="small"
          variant="outlined"
          value={registerUser.FirstName}
          onChange={(event) => {
            setRegisterUser({
              ...registerUser,
              FirstName: event.target.value,
            });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.errorMessage}>{errorObject.FirstName}</div>
        <div className={classes.textStyle}>Last Name*</div>

        <ValidationTextField
          size="small"
          value={registerUser.LastName}
          variant="outlined"
          onChange={(event) => {
            setRegisterUser({
              ...registerUser,
              LastName: event.target.value,
            });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.errorMessage}>{errorObject.LastName}</div>
        <div className={classes.textStyle}>Email*</div>
        <ValidationTextField
          size="small"
          variant="outlined"
          value={registerUser.EmailId}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, EmailId: event.target.value });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.errorMessage}>{errorObject.EmailId}</div>

        <div className={`${classes.container} ${classes.topMargin}`}>
          <div className={classes.textStyle}>{PMS_LOCALE.translate('Sex of Birth*')}</div>
          <div>
            <RadioGroup
              // defaultChecked
              // defaultValue={"Male"}
              value={registerUser?.gender}
              className={classes.radioGroup}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  gender: e.target.value,
                  isModifiedGender: false,
                })
              }
            >
              <FormControlLabel
                title={'Male'}
                value="Male"
                control={<Radio />}
                labelPlacement="end"
                label={PMS_LOCALE.translate('Male')}
                //disabled={registerUser?.gender !== "Male"}
              />
              <FormControlLabel
                title={'Female'}
                value="Female"
                control={<Radio />}
                labelPlacement="end"
                label={PMS_LOCALE.translate('Female')}
                //disabled={registerUser?.gender !== "Female"}
              />
            </RadioGroup>
          </div>
          {errorObject.gender && (
            <>
              <div>
                <span className={classes.errorText}>{errorObject.gender}</span>
              </div>
            </>
          )}
        </div>
        <div className={classes.container}>
          <div className={classes.textStyle}>{PMS_LOCALE.translate('Has it been medically modified in any way?')}</div>
          <div className={classes.fieldWrapper}>
            <span className={`${classes.token} ${registerUser.isModifiedGender ? classes.tokenActive : ''}`}>
              <Token
                checked={registerUser.isModifiedGender !== true}
                label="Yes"
                onSelect={() =>
                  setRegisterUser({
                    ...registerUser,
                    isModifiedGender: true,
                  })
                }
                value="Yes"
                variant="primary"
                // disabled={!isEditable}
              />
            </span>
            <span className={`${classes.token} ${!registerUser.isModifiedGender ? classes.tokenActive : ''}`}>
              <Token
                checked={registerUser.isModifiedGender !== false}
                label="No"
                onSelect={() =>
                  setRegisterUser({
                    ...registerUser,
                    isModifiedGender: false,
                    medicallyModifiedGender: '',
                  })
                }
                value="No"
                variant="primary"
                // disabled={!isEditable}
              />
            </span>
            {registerUser?.isModifiedGender ? (
              <RadioGroup
                className={classes.radioGroup2}
                value={registerUser?.medicallyModifiedGender}
                onChange={(e) => {
                  let isUserTyped = e.target.value === 'Let me type';
                  setRegisterUser({
                    ...registerUser,
                    medicallyModifiedGender: e.target.value,
                    isUserTypedGender: isUserTyped,
                  });
                }}
              >
                {modifiedSex.map((value, index) => {
                  {
                    const radioButton = (
                      <FormControlLabel
                        key={index}
                        title={value}
                        value={value}
                        control={<Radio />}
                        labelPlacement="end"
                        label={PMS_LOCALE.translate(value)}
                        // disabled={
                        //   registerUser?.medicallyModifiedGender !== value
                        // }
                      />
                    );
                    return value === 'Let me type' ? (
                      <div className={classes.otherSex}>
                        {radioButton}
                        <InputField
                          // focusBorder={"#D8D8D8"}
                          placeholder="Type your gender"
                          onChange={(value) =>
                            setRegisterUser({
                              ...registerUser,
                              userTypedGender: (value as any).value,
                            })
                          }
                          value={registerUser?.isUserTypedGender ? registerUser?.userTypedGender : ''}
                          //disabled={!registerUser?.isUserTypedGender}
                        />
                      </div>
                    ) : (
                      radioButton
                    );
                  }
                })}
              </RadioGroup>
            ) : null}
            {errorObject.medicallyModifiedGender && (
              <>
                <div>
                  <span className={classes.errorText}>{errorObject.medicallyModifiedGender}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.textStyle}>{PMS_LOCALE.translate('Date of Birth*')}</div>
          <div className={`${classes.fieldWrapper2} ${classes.width}`}>
            {/* TODO: <MUIDatePicker
              //disabled={!isEditable}
              variant="date"
              customStyle={classes.keyBoardWidth}
              startDate={registerUser?.dob}
              placeholder="Start Date"
              handleDateChange={(date) =>
                setRegisterUser({ ...registerUser, dob: date })
              }
            /> */}

            <DatePicker
              //disabled={!isEditable}
              variant="date"
              customStyle={classes.keyBoardWidth}
              startDate={registerUser?.dob}
              placeholder="Start Date"
              handleDateChange={(date) => setRegisterUser({ ...registerUser, dob: date })}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="yyyy/MM/dd"
                value={registerUser?.dob}
                onChange={(newValue) => {
                  setRegisterUser({ ...registerUser, dob: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
          </div>
          {errorObject.dob && (
            <>
              <div>
                <span className={classes.errorText}>{errorObject.dob}</span>
              </div>
            </>
          )}
        </div>

        <div className={classes.textStyle}>Nationality*</div>
        <div className={classes.newFields}>
          <SearchAndSelect
            label={``}
            freeSolo={false}
            onChange={(event) => {
              setRegisterUser({
                ...registerUser,
                Nationality: event.label,
              });
            }}
            options={nationalitys}
            value={registerUser?.Nationality}
            labelParameter={'label'}
            idParameter={'label'}
            placeHolder={'Select Nationality'}
            showError={true}
            showBorder={true}
            ListboxComponent={ListboxComponent}
            errorText={errorObject.Nationality}
            PopperComponent={(props: any) => <Popper {...props} className={classes.stylePopper} placement="bottom-start" />}
          />
        </div>
        <div className={classes.textStyle}>Country*</div>
        <div className={classes.newFields}>
          <SearchAndSelect
            label={``}
            freeSolo={false}
            onChange={(e) => {
              setCountry(e);
              setRegisterUser((pre) => ({
                ...pre,
                CountryCode: e.id,
                Country: e.label,
              }));
              setCity({ id: '', label: '' });
            }}
            onChangeInput={(value) => debounceCountriesFun(value)}
            options={countriesOption}
            value={country}
            labelParameter={'label'}
            idParameter={'label'}
            placeHolder={'Select Country'}
            showError={true}
            showBorder={true}
            ListboxComponent={ListboxComponent}
            PopperComponent={(props: any) => <Popper {...props} className={classes.stylePopper} placement="bottom-start" />}
            errorText={errorObject.Country}
          />
        </div>
        {/*
        <div className={classes.textStyle}>State*</div>
        <div className={classes.newFields}>
          <SearchAndSelect
            label={``}
            freeSolo={false}
            onChange={(event) => {
              setRegisterUser({ ...registerUser, State: event.name });
            }}
            options={statesOption}
            value={registerUser?.State}
            labelParameter={"name"}
            idParameter={"name"}
            placeHolder={"Select State"}
            showError={true}
            showBorder={true}
            ListboxComponent={ListboxComponent}
            errorText={errorObject.State}
            PopperComponent={(props: any) => (
              <Popper
                {...props}
                className={classes.stylePopper}
                placement="bottom-start"
              />
            )}
          />
        </div> */}
        <div className={classes.textStyle}>City*</div>
        <div className={classes.newFields}>
          <SearchAndSelect
            disabled={!Boolean(country?.id)}
            label={``}
            freeSolo={false}
            onChange={(e) => {
              setCity(e);
              setRegisterUser((pre) => ({ ...pre, City: e.label }));
            }}
            onChangeInput={(value) => debounceCitiesFun(value)}
            options={citiesOption}
            value={city}
            labelParameter={'label'}
            idParameter={'label'}
            placeHolder={'Select City'}
            showError={true}
            showBorder={true}
            ListboxComponent={ListboxComponent}
            PopperComponent={(props: any) => <Popper {...props} className={classes.stylePopper} placement="bottom-start" />}
            errorText={errorObject.City}
          />
        </div>

        <div className={classes.textStyle}>Time Zone*</div>
        <div className={classes.newFields}>
          <SearchAndSelect
            disabled={!Boolean(country?.id)}
            label={``}
            freeSolo={false}
            onChange={(event) =>
              setRegisterUser((pre) => ({
                ...pre,
                TimeZone: event.id,
                TimeZoneName: event.label,
              }))
            }
            options={timezoneOption}
            value={registerUser?.TimeZoneName}
            labelParameter={'label'}
            idParameter={'label'}
            placeHolder={'Select TimeZone'}
            showError={true}
            showBorder={true}
            ListboxComponent={ListboxComponent}
            PopperComponent={(props: any) => <Popper {...props} className={classes.stylePopper} placement="bottom-start" />}
            errorText={errorObject.TimeZone}
          />
        </div>

        <div className={classes.textStyle}>Languages*</div>
        <div className={classes.newFields2}>
          <SearchAndMultiSelect
            label={``}
            newTheme={true}
            onChange={(value: any) => {
              const result = value.reduce((unique, o) => {
                if (!unique.some((obj) => obj.id === o.id)) {
                  unique.push(o);
                } else {
                  const index = unique.findIndex((v) => v.id === o.id);
                  if (index !== -1) unique.splice(index, 1);
                }
                return unique;
              }, []);

              setSelectedLanguages(result);
              setRegisterUser({
                ...registerUser,
                PreferredLanguages: result.map((option) => option.label),
              });
            }}
            options={getLanguages}
            value={selectedLanguage}
            disabled={false}
            // disabled={!isEditable}
            placeHolder={'Type and selectLanguages'}
            idParameter={'id'}
            labelParameter={'label'}
            showTokens={true}
            showError={true}
            showBorder={true}
            PopperComponent={(props: any) => <Popper {...props} className={classes.stylePopper} placement="bottom-start" />}
            ListboxComponent={ListboxComponent}
            errorText={errorObject.Languages}
          />
        </div>
        <Button
          style={{ width: '97%' }}
          variant="contained"
          onClick={() => {
            registerNewUser('main', registerUser, seterrorObject, setRegisterUser, setSelectedLanguages);
          }}
          className={classes.centerButtonStyle}
        >
          {PMS_LOCALE.translate('Register')}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
