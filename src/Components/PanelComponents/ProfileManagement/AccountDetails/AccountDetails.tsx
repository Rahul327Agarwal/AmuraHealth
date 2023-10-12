import React, { memo, useCallback, useEffect, useState } from 'react';
import { AccountDetailshProps } from '../ProfileManagement.types';
import InputField from './../../../LibraryComponents/InputField/InputField';
import Select from './../../../LibraryComponents/Select/Select';

import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './AccountDetails.styles';

const MemoInputField = memo(InputField);
export default function AccountDetails(props: AccountDetailshProps) {
  const { profileEditable, setAccountDetailsState, accountDetailsState, accountDetailsError, showRefer, setAccountDetailsError } =
    props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [isEdit, setIsEdit] = useState(false);

  const handleUserName = useCallback((e: any) => {
    const NickName = e.target.value;
    setAccountDetailsState?.((pre: any) => ({ ...pre, NickName }));
  }, []);
  const handleEmail = useCallback((e: any) => {
    const EMail = e.target.value;
    setAccountDetailsState?.((pre: any) => ({ ...pre, EMail }));
  }, []);
  const handleReferredBy = useCallback((e: any) => {
    const referredBy = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setAccountDetailsState?.((pre: any) => ({ ...pre, referredBy }));
  }, []);
  const handleRelationship = useCallback((e: any) => {
    const referredPersonRelation = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setAccountDetailsState?.((pre: any) => ({ ...pre, referredPersonRelation }));
  }, []);
  const handlePassword = useCallback((e: any) => {
    const Password = e.target.value;
    setAccountDetailsState?.((pre: any) => ({ ...pre, Password }));
  }, []);

  const handleMobile = useCallback((e: any) => {
    const Mobile = e.target.value;
    setAccountDetailsState?.((pre: any) => ({ ...pre, Mobile }));
  }, []);
  const handleWhatsappNo = (e: any) => {
    const whatsAppNumber = e.target.value;

    setAccountDetailsState?.((pre) => ({ ...pre, whatsAppNumber }));
    if (whatsAppNumber === '' || (whatsAppNumber.length === 10 && Number(whatsAppNumber))) {
      setAccountDetailsError((prev) => ({ ...prev, whatsAppNumber: '' }));
    }
  };

  return (
    <>
      <div className={classes.container}>
        <MemoInputField label="Username" onChange={handleUserName} value={accountDetailsState.NickName} disabled={true} />
        {profileEditable ? (
          <MemoInputField
            label="Email"
            onChange={handleEmail}
            value={accountDetailsState.EMail}
            helperText={accountDetailsError!.EMail}
            disabled={!profileEditable}
          />
        ) : (
          <MemoInputField label="Email" onChange={handleEmail} value={accountDetailsState.EMail} disabled={true} multiline />
        )}

        <MemoInputField
          label="Mobile"
          onChange={handleMobile}
          value={accountDetailsState.Mobile}
          // helperText={accountDetailsError.Mobile}
          disabled={true}
        />
        {profileEditable ? (
          <MemoInputField
            label="Whatspp Number"
            onChange={handleWhatsappNo}
            value={accountDetailsState.whatsAppNumber}
            helperText={accountDetailsError!.whatsAppNumber}
            disabled={!profileEditable}
          />
        ) : (
          <MemoInputField
            label="Whatspp Number"
            onChange={handleWhatsappNo}
            value={accountDetailsState.whatsAppNumber}
            disabled={true}
          />
        )}
        {showRefer && (
          <>
            <MemoInputField
              label="Referred by"
              onChange={handleReferredBy}
              value={accountDetailsState.referredBy}
              disabled={!profileEditable}
            />
            <MemoInputField
              label="Relationship of the referred person"
              onChange={handleRelationship}
              value={accountDetailsState.referredPersonRelation}
              disabled={!profileEditable}
            />
          </>
        )}

        {/* <MemoInputField
          label="Password"
          onChange={handlePassword}
          value={accountDetailsState.Password}
          disabled={!profileEditable}
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <span className={`${commonClasses.caption12Medium} ${classes.changePassword}`} onClick={()=>{}}>Change</span>
              </InputAdornment>
            ),
          }}
        /> */}
      </div>
    </>
  );
}
