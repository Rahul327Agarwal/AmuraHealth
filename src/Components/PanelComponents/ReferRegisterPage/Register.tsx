import { Checkbox, FormControlLabel, Popper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';

import PhoneInput from 'react-phone-number-input';
import { ToastContainer } from 'react-toastify';
import PhoneNumberRegister from './PhoneNumberRegister';
import { belongsToGCL1, belongsToGCL2, getGcDetails, registerNewUser } from './Register.functions';
import { RegisterStyles } from './Register.styles';
import { IGCData, IRegisterNewForm } from './Register.types';

import { useSelector } from 'react-redux';
import { withStyles } from 'tss-react/mui';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../DisplayFramework/State/store';
import { List } from '../../../Utilities/AutoResizerWrapper';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import ModalBox from '../../LibraryComponents/ModalBox/ModalBox';
import SearchAndSelect from '../../Registration/Components/Dropdown/SearchAndSelect/SearchAndSelect';
import PhoneInputField from '../../Registration/Components/InputField/PhoneInputField/PhoneInputField';
import { useFetchUserName } from '../../../Common/Common.hooks';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const ValidationTextField = withStyles(TextField, {
  root: {
    height: '45px',
    //border: "1px solid #D8D8D8 !important",
    //border: "none !important",
    marginLeft: '5px',
    '& input:valid:hover + fieldset': {
      // border: "1px solid #D8D8D8",
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& input': {
      //border: "1px solid #D8D8D8 !important",
      borderRadius: 2,
    },
    '& input:valid:focus + fieldset': {
      // border: "1px solid #D8D8D8",
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& .MuiInputBase-input': {
      padding: '0px 10px !important',
      background: '#FFF !important',
      color: '#1B1B1B !important',
      height: '45px',
      borderRadius: '3px',
    },
    '&.Mui-focused fieldset': {
      border: 'none !important',
    },
    '& .MuiOutlinedInput-root': {
      width: 'calc(100% - 7px) !important',
      background: 'transparent !important',
      border: '1px solid #D8D8D8 !important',
      '& fieldset': {
        padding: '0px !important',
      },
      '&:hover fieldset': {
        //border: "1px solid #D8D8D8 !important",
      },
      '&.Mui-focused fieldset': {
        border: 'none !important',
      },
      '&.Mui-disabled fieldset': {
        border: '1px solid #D8D8D8 !important',
      },
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
    border: '1px solid #D8D8D8 !important',
    // color: "#FFF",
    // padding: "10px 8px 10px 12px",
    // Use the system font instead of the default Roboto font.

    // "&:hover": {
    //   borderRadius: 2,
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    // },
  },
});

const MultilineTextField = withStyles(TextField, {
  root: {
    //border: "none !important",
    //paddingLeft: "7px",
    marginLeft: '5px',
    '& input:valid:hover + fieldset': {
      //border: "1px solid #D8D8D8 !important",
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      background: '#FFF !important',
      paddingLeft: '7px',
    },
    '& input:valid:focus + fieldset': {
      background: '#FFF !important',
      //border: "1px solid #D8D8D8 !important",
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& .MuiInput-underline:after': {
      //border: "1px solid #D8D8D8 !important",
    },

    '& .MuiInputBase-input': {
      //border: "0px solid #D8D8D8 !important",
      padding: '6px 10px',
      background: '#FFF !important',
      color: 'black !important',
      fontSize: '14px',
      borderRadius: '5px',
    },
    '& .MuiOutlinedInput-multiline': {
      background: '#FFF !important',
      padding: '0px !Important',
    },
    '& .MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
      padding: '0px 0px !important',
    },
    '& .MuiOutlinedInput-root': {
      width: 'calc(100% - 7px) !important',
      background: 'transparent !important',
      paddingLeft: 0,
      paddingRight: 0,
      border: '1px solid #D8D8D8 !important',
      '& fieldset': {
        padding: '0px !important',
      },
      '&:hover fieldset': {
        //border: "1px solid #D8D8D8 !important",
      },
      '&.Mui-focused fieldset': {
        border: 'none !important',
      },
      '&.Mui-disabled fieldset': {
        border: '1px solid #D8D8D8 !important',
      },
    },
  },
  input: {
    borderRadius: 4,
    background: '#FFF !important',
    position: 'relative',
    fontSize: 12,
  },
});
const ListboxComponent = React.forwardRef(function ListboxComponent(props: any, ref) {
  const { children, role, className, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const { classes } = RegisterStyles();
  const { id: panelId } = useCurrentPanel();
  return (
    <div ref={ref} {...other}>
      <List
        className={classes.popperstyle}
        height={250}
        width={400}
        rowHeight={40}
        overscanCount={5}
        overscanRowCount={5}
        rowCount={itemCount}
        rowRenderer={(props) => {
          return React.cloneElement(children[props.index], {
            style: { ...props.style, listStyleType: 'none', padding: '8px 10px', cursor: 'pointer' },
          });
        }}
        role={role}
      />
    </div>
  );
});

export default function Register(props: IRegisterNewForm) {
  const { sessions, selectedClient } = props;
  const { id: panelId } = useCurrentPanel();
  const loggedInUserInformation = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const { classes } = RegisterStyles();
  const commonClasses = useCommonStyles();
  const [btnDisable, setBtnDisable] = useState(true);
  const [gcData, setGcData] = useState<IGCData[]>([]);
  const [isGCL2, setIsGCL2] = useState(false);
  const [isGCL1, setIsGCL1] = useState(false);
  const [proceedModal, setProceedModal] = useState<any>(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    FirstName: '',
    LastName: '',
    EmailId: '',
    PhoneNumber: '',
    HealthObjective: '',
    staffId: '',
    staffName: '',
    reAssign: 'false',
  });

  const [errorObject, seterrorObject] = useState({
    FirstName: '',
    EmailId: '',
    LastName: '',
    PhoneNumber: '',
    staffId: '',
  });
  const { fetchMultipleUserNames } = useFetchUserName();
  useEffect(() => {
    let checkBtn =
      registerUser?.FirstName && registerUser?.LastName && registerUser?.PhoneNumber && registerUser?.staffId ? true : false;
    if (checkBtn) {
      setBtnDisable(!checkBtn);
    }
  }, [registerUser]);

  useEffect(() => {
    let getGcTeam = async () => {
      let gcList = await getGcDetails(props);
      if (gcList.length > 0) {
        // let esUserDataOld = await getEsDataforUsers(gcList);
        let esUserDataObj = await fetchMultipleUserNames(gcList.map((item) => item.staffId));
        let esUserData = gcList.map((item) => {
          return {
            id: item.staffId,
            label: esUserDataObj[item.staffId],
          };
        });
        if (esUserData.length === 1) {
          setRegisterUser((pre) => ({
            ...pre,
            staffId: esUserData[0].id,
            staffName: esUserData[0].label,
          }));
          setGcData(esUserData);
          setDataFetched(true);
        } else {
          setGcData(esUserData);
          setDataFetched(true);
        }
      }
    };
    getGcTeam();
  }, []);

  useEffect(() => {
    if (belongsToGCL2(loggedInUserInformation.allRoles ?? '')) {
      setIsGCL2(true);
    }
    if (belongsToGCL1(loggedInUserInformation.allRoles ?? '') && !belongsToGCL2(loggedInUserInformation.allRoles ?? '')) {
      setIsGCL1(true);
    }
  }, [loggedInUserInformation]);
  useEffect(() => {
    if (isGCL1) {
      let filteredData = gcData.filter((value) => {
        if (value.id === props?.sessions?.user?.id) {
          setRegisterUser((pre) => ({
            ...pre,
            staffId: value.id,
            staffName: value.label,
          }));
          return value;
        }
      });
      setGcData(filteredData);
    }
  }, [dataFetched]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.textStyle}>First Name*</div>
        <ValidationTextField
          size="small"
          variant="outlined"
          disabled={!isGCL1 && !isGCL2}
          value={registerUser.FirstName}
          onChange={(e) => {
            setRegisterUser({
              ...registerUser,
              FirstName: e.target.value.trim() ? e.target.value : e.target.value.trim(),
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
          disabled={!isGCL1 && !isGCL2}
          variant="outlined"
          onChange={(e) => {
            setRegisterUser({
              ...registerUser,
              LastName: e.target.value.trim() ? e.target.value : e.target.value.trim(),
            });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.errorMessage}>{errorObject.LastName}</div>
        <div className={classes.textStyle}>Mobile Number*</div>
        <div className={'registerPhoneInput'} style={{ marginLeft: '5px' }}>
          <PhoneInputField
            focusBorder="#000000"
            hoverBorder="#1B1B1B"
            fontColor="#000000"
            label={``}
            value={registerUser.PhoneNumber}
            disabled={!isGCL1 && !isGCL2}
            handleOnChange={(e: string) => {
              setRegisterUser({ ...registerUser, PhoneNumber: e });
            }}
            // showError={true}

            // errorText={usernameError}
          />
        </div>
        <div className={classes.errorMessage}>{errorObject.PhoneNumber}</div>

        <div className={classes.textStyle}>Email</div>
        <ValidationTextField
          size="small"
          variant="outlined"
          disabled={!isGCL1 && !isGCL2}
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
        <div className={classes.textStyle}>Health Objective</div>
        <MultilineTextField
          size="small"
          variant="outlined"
          minRows={4}
          disabled={!isGCL1 && !isGCL2}
          maxRows={6}
          multiline
          value={registerUser.HealthObjective}
          onChange={(event) => {
            setRegisterUser({
              ...registerUser,
              HealthObjective: event.target.value,
            });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.textStyle}>Assign GC*</div>
        <div className={classes.newFields}>
          <SearchAndSelect
            label={``}
            disabled={!isGCL1 && !isGCL2}
            freeSolo={false}
            onChange={(e) => {
              // setCountry(e);
              setRegisterUser((pre) => ({
                ...pre,
                staffId: e.id,
                staffName: e.label,
              }));
              // setCity({ id: "", label: "" });
            }}
            //onChangeInput={(value) => {}}
            options={isGCL1 ? gcData.filter((value) => value.id === props?.sessions?.user?.id) : gcData}
            value={registerUser?.staffName}
            labelParameter={'label'}
            idParameter={'label'}
            placeHolder={'Select GC'}
            showError={true}
            showBorder={true}
            ListboxComponent={ListboxComponent}
            PopperComponent={(props: any) => <Popper {...props} className={classes.stylePopper} placement="bottom-start" />}
            errorText={errorObject.staffId}
          />
        </div>
      </div>
      <MUIButton
        disabled={btnDisable || (!isGCL1 && !isGCL2)}
        variant="contained"
        size="large"
        onClick={() => {
          registerNewUser(panelId, registerUser, seterrorObject, setRegisterUser, setBtnDisable, setProceedModal, props);
        }}
        children="Register"
        fullWidth={true}
      />
      <ModalBox
        modalTitle={'Are you sure you want to proceed?'}
        open={proceedModal}
        handleClose={() => setProceedModal(false)}
        buttonConfig={[
          {
            text: 'Cancel',
            variant: 'text',
            onClick: () => {
              setProceedModal(false);
            },
          },
          {
            text: 'Proceed',
            variant: 'contained',
            onClick: () => {
              registerNewUser(
                panelId,
                { ...registerUser, reAssign: 'true' },
                seterrorObject,
                setRegisterUser,
                setBtnDisable,
                setProceedModal,
                props
              );
            },
          },
        ]}
      >
        <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>
          An account with the given phone_number already exists
        </span>
      </ModalBox>
    </div>
  );
}
