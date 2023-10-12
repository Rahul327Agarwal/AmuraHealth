import React, { useEffect, useState } from 'react';
import { useStyles } from './EditRole.styles';
import { IOption, IProps, roleActualObject, userActualObject } from './EditRole.types';
import { PMS_S3 } from '../../../../Utils';
import { convertRoleObjectToOption } from './EditRole.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { AddIcon, CrossIcon } from './EditRole.svg';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import MUISelect from '../../../LibraryComponents/MUISelect/MUISelect';
import MUIAutoSelect from '../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import PannelFooter from '../../../LibraryComponents/PannelFooter/PannelFooter';

export default function EditRole(props: IProps) {
  const {roleId,roleName,reportingTo,reportees,shiftSegments,handleEdit,handleThreedotmenu,data,patientId,selectedClient,sessions,registerEvent,injectComponent,} = props;
  const { classes } = useStyles();
  const commonStyles = useCommonStyles();
  const [selectRole, setSelectRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState<IOption>(
    convertRoleObjectToOption({
      roleId: roleId,
      roleName: roleName,
    })
  );

  // const [shiftSegmentsState, setShiftSegmentsState] = useState<IShiftSegment[]>(data.shiftSegments || []);
  // const [shiftSegmentsOriginal, setShiftSegmentsOriginal] = useState<IShiftSegment[]>(data.shiftSegments || []);
  const [roleOptions, setRoleOptions] = useState<IOption[]>([]);
  const [reportsToOptions, setReportsToOptions] = useState<Array<IOption>>([]);
  const [value, setValue] = React.useState<any>();
  const [timeDropdown, setTimeDropDown] =useState();
    // createTimeDropdown(data.shiftSegments.startDate)

  const handleUpdate = () => {
    console.log(value);
  };
  const handleCancel = () => {};
  const formatRoleOptions = (roles: roleActualObject[]): IOption[] => {
    return roles.map((role) => {
      return {
        label: role.roleName,
        value: role.roleId,
      };
    });
  };
  const formatUserOptions = (users: userActualObject[]): IOption[] => {
    return users.map((user) => {
      return {
        label: user.userName,
        value: user.userId,
      };
    });
  };
 
  useEffect(() => {

    PMS_S3.getObject(
      `pms-ql-roles/${selectedClient?.tenant_id || ''}/allRoles.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: selectedClient?.tenant_id || '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      },
      []
    ).then((res: any) => {
      if (!res.Error) {
        setRoleOptions(formatRoleOptions(res));
      }
      PMS_S3.getObject(
        `pms-ql-roles/${selectedClient?.tenant_id || ''}/staffList.json`,
        import.meta.env.VITE_CLIENT_BUCKET,
        {
          TenantId: selectedClient?.tenant_id || '',
          Locale: sessionStorage.getItem('locale'),
          url: import.meta.env.VITE_S3_FETCH_API,
          token: sessions.id_token,
          headers: {},
        },
        []
      ).then((res: userActualObject[] | any) => {
        if (!res.Error) {
          setReportsToOptions(formatUserOptions(res));
        }
      });
    });
  }, []);

  const options = [
    { label: 'The Shawshank Redemption', value: 'The Shawshank Redemption', subLabel: 'Senior Physician' },
    { label: 'The Godfather', value: 'The Godfather', subLabel: 'Senior Physician' },
    { label: 'The Godfather: Part II', value: 'The Godfather: Part II', subLabel: 'Senior Physician' },
    { label: 'The Dark Knight', value: 'The Dark Knight', subLabel: 'Senior Physician' },
    { label: '12 Angry Men', value: '12 Angry Men', subLabel: 'Senior Physician' },
    { label: "Schindler's List", value: "Schindler's List", subLabel: 'Senior Physician' },
  ];
  return (
    <>
      {
        <div className={classes.browseRole}>
          <PageHeader headerContent="Edit Roles" endAdornment={<i onClick={() => {}}>{<CrossIcon />}</i>} />
          <div className={classes.scrollBody}>
            <MUISelect
              label="Role name "
              placeholder="Role name "
              options={roleOptions}
              value={selectedRole.value}
              onChange={(e: any) => {
                let selected = roleOptions.find((val) => val.value === e.id);
                if (selected) {
                  setSelectedRole(selected);
                }
              }}
              labelId={'SELECT_UNIT'}
            />
            <MUIAutoSelect
              options={options}
              InputProps={{ label: 'select', placeholder: 'SelectRole' }}
              onChange={(e) => setValue(e)}
              value={value}
            />
            <span className={`${commonStyles.body15Regular} ${classes.reportee}`}>Reporting to</span>

            <div className={classes.dflex}>
              {/* {
              data.reportingTo.map((data) => {
                return <Reporting reportee={data.userName} role={data.userId} />
              })
            } */}
              <div onClick={() => {}}>
                <span>{<AddIcon />}</span>
              </div>
            </div>
            <span className={`${commonStyles.body15Regular} ${classes.reportee}`}>Reportees</span>
            {/* 
          <div className={classes.dflex}>
            {
              data.reportees.map((data) => {
                return <Reporting reportee={data.userName} role={data.userId} />
              })
            }
            <div onClick={() => { }}>
              <span>{AddIcon}</span>
            </div>
          </div> */}
            <span className={`${commonStyles.body15Medium} ${classes.reportee}`}>Shift segments</span>
            <div className={classes.mb}>
              <MUIDatePicker
                label="Start Date"
                date={data?.shiftSegments?.startDate}
                // date={new Date()}
                // helperText={}
                setDate={() => {}}
                // minDate={new Date()}
              />
            </div>
            <div className={classes.mb}>
              <MUIDatePicker
                label="End Date"
                date={data?.shiftSegments?.endDate}
                // helperText={}
                setDate={() => {}}
                // date={new Date()}

                // minDate={new Date()}
              />
            </div>
            <div className={classes.dflex}>
              <MUISelect
                label="Start Time"
                placeholder="Start name "
                options={timeDropdown}
                value={data.shiftSegments.startTime.toString()}
                onChange={() => {}}
                labelId={'SELECT_TIME'}
              />
              <MUISelect
                label="End Time"
                placeholder="End name "
                options={timeDropdown}
                value={data.shiftSegments.endTime.toString()}
                onChange={() => {}}
                labelId={'SELECT_TIME'}
              />
            </div>
            {/* <RoleCard roleId={data.roleId} shiftSegments={data.shiftSegments} handleEdit={handleEdit} /> */}
          </div>

          {/* {data.shiftSegments.map((shift : IShiftSegment) => (
          <ShiftSegment shift={shift}  roleId={roleId}  handleEdit={handleEdit}/>
        ))} */}

          <PannelFooter
            customStyle={classes.footerStyle}
            handleAdd={handleUpdate}
            handleCancel={handleCancel}
            buttonOneTitle="Cancel"
            buttonTwoTitle="Update"
          />
        </div>
      }
    </>
  );
}
