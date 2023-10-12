import { Avatar, debounce, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getNameInitials } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import { AmuraIcon2, Close, DoctorIcon } from '../../../SVGs/Common';
import { getRolesForAUserFromDB, getSearchUsers } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { IAddPeopleProps, IUserRolesDataWithTenat, showDrawer } from '../TimeManagement.types';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';
import Radio from '../../../LibraryComponents/MUIRadio/MUIRadio';
import { emailRegex } from '../../../LibraryComponents/ChatComponent/ChatReadMore/ChatReadMore.functions';

const INITIAL_USER_ROLE = { roleId: '', roleName: '', tenantId: '', value: '', label: '' };
const AddPeople = (props: IAddPeopleProps) => {
  const { setAction, tenantParticipants, isEditEvent, sessions, eventsData } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const roles = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const [search, setSearch] = useState('');
  const [searchedResults, setSearchedResults] = useState<any[]>([]);
  const [selectedResults, setSelectedResults] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [selectedUserRole, setSelectedUserRole] = useState(INITIAL_USER_ROLE);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showDrawer, setShowDrawer] = useState<showDrawer>({ drawer: 'PEOPLE' });
  const [userRoles, setUserRoles] = useState<IUserRolesDataWithTenat[]>([]);

  useEffect(() => {
    setSelectedResults(tenantParticipants);
  }, [tenantParticipants]);

  useEffect(() => {
    (async () => {
      if (selectedUser.value) {
        let rolesData: any = await getRolesForAUserFromDB(selectedUser.value, sessions, 'amura');
        let formatedRolesData: IUserRolesDataWithTenat = { tenantId: '', roleIds: [] };
        if (rolesData?.roles?.length) {
          (rolesData?.roles || []).filter((ele) => {
            if (ele?.is_active) {
              formatedRolesData = {
                ...formatedRolesData,
                tenantId: ele?.tenantId || 'amura',
                roleIds: [...formatedRolesData?.roleIds, ele?.roleId],
              };
            }
            return true;
          });
          if (formatedRolesData.roleIds.length) {
            setUserRoles([{ ...formatedRolesData }]);
            setSelectedUserRole(INITIAL_USER_ROLE);
            setShowDrawer({ drawer: 'ROLE' });
          }
        } else {
          setUserRoles([]);
          setSelectedUserRole((pre) => {
            return { ...pre, roleId: '', roleName: '', tenantId: '', value: selectedUser.value, label: selectedUser.label };
          });
          setSelectedResults([
            ...selectedResults,
            { ...selectedUserRole, roleId: '', roleName: '', tenantId: '', value: selectedUser.value, label: selectedUser.label },
          ]);
          setSearchedResults((pre) => pre.filter((d1) => d1.value !== selectedUser.value));
        }
      }
    })();
  }, [selectedUser]);

  const onSearch = async (value: string) => {
    setSearch(value);
    if (value.length < 3) {
      setSearchedResults([]);
      setIsValidEmail(false);
      return;
    }
    if (value.length > 3) {
      const isValid = emailRegex.test(value);

      setIsValidEmail(isValid);
    }
    const options = await getSearchUsers(value, sessions);
    var excludeOrganizer = [...options].filter((data) => data.value !== sessions?.user?.id);
    // var finalData = [...excludeOrganizer].filter((n) => !selectedResults.some((n2) => n.value === n2.value));
    const modifiedData = excludeOrganizer.filter(({ value }) => {
      if (!isEditEvent) {
        return !selectedResults.find((x) => x.value === value) && value !== sessions?.user?.value;
      } else {
        return !selectedResults.find((x) => x.value === value);
      }
    });
    const filterData = modifiedData.filter((ele) => ele.label.toLowerCase()?.includes(value.toLowerCase()));
    setSearchedResults(filterData);
  };

  const handleRemovePerson = (data: any, index: number) => {
    // setSelectedResults((pre) => pre.filter((_, i) => i !== index));
    setSelectedResults((pre) => pre.filter((ele) => ele.value !== data.value));
    setSearchedResults((pre) => pre.filter((d1) => d1.value !== data.value));
    setSelectedUserRole(INITIAL_USER_ROLE);
  };
  const handleAddPerson = (data: any) => {
    // setSearch('');
    setSelectedUser(data);
    setSearchedResults([]);
    setSearch('');
    // setShowDrawer({ drawer: 'ROLE' });
    // setAction({ screen: 'ADD_ROLE', payload: [data] });
    // setSearchedResults((pre) => pre.filter((d1) => d1.value !== data.value));
    // // setSelectedResults((pre) => pre.filter((d1) => d1.value !== data.value))
    // setSelectedResults([...selectedResults, data]);
  };

  const handleCancel = () => setAction({ screen: 'HOME', payload: tenantParticipants });
  const handleSave = () => {
    const filteredData = selectedResults.filter((item) => !item.value.includes('@')); // remove later after email validation from BE
    setAction({ screen: 'HOME', payload: filteredData }); // remove later after email validation from BE
    // setAction({ screen: 'HOME', payload: selectedResults });
  };

  const handleSaveRole = () => {
    setShowDrawer({ drawer: 'PEOPLE' });
    setSearchedResults((pre) => pre.filter((d1) => d1.value !== selectedUserRole.value));
    // setSelectedResults((pre) => pre.filter((d1) => d1.value !== data.value))
    setSelectedResults([...selectedResults, selectedUserRole]);
  };
  const handleCancelRole = () => {
    setShowDrawer({ drawer: 'PEOPLE' });
    setSelectedUserRole(INITIAL_USER_ROLE);
    setSelectedUser({});
  };
  const debounceFun: Function = debounce(onSearch, 500);
  const onRoleClick = (data, ele) => {
    setSelectedUserRole((pre) => {
      return {
        ...pre,
        roleId: ele,
        roleName: roles.find((role) => role.roleId === ele)?.roleName || ele,
        tenantId: data.tenantId,
        value: selectedUser.value,
        label: selectedUser.label,
      };
    });
  };
  const handleAddEmail = () => {
    setSelectedResults([...selectedResults, { value: search, label: search }]);
    setSearch('');
  };
  return (
    <>
      {showDrawer.drawer == 'PEOPLE' && (
        <div className={classes.overlapDrawerContainer}>
          <PageHeader handleBack={handleCancel} headerContent={'Add People'} />
          <div className={classes.scrollBody}>
            <SearchField
              value={search}
              placeholder={'Add People'}
              handleSearch={debounceFun}
              autoFocus
              customStyle={classes.searchBoxBgStyle}
              // isValidEmail={isValidEmail}
              // onAddEmail={handleAddEmail}
            />
            {search && searchedResults.length ? (
              <section className={classes.searchedResult}>
                {searchedResults.map((data) => (
                  // <MenuItem className={classes.selectMenu} onClick={() => handleAddPerson(data)}>
                  //   {data.label}
                  // </MenuItem>
                  <div className={`${classes.addedPeopleBox} ${classes.borderBottom}`} onClick={() => handleAddPerson(data)}>
                    <Avatar className={classes.profilePic} src={`${import.meta.env.VITE_DP_URL}${data.value}/profile-pic.png`}>
                      {getNameInitials(data.label)}
                    </Avatar>
                    <span className={`${commonClasses.body15Medium} ${classes.primaryText} ${classes.wordBreak}`}>
                      {data.label}
                    </span>
                  </div>
                ))}
              </section>
            ) : null}
            <>
              {selectedResults.length ? (
                <div className={`${commonClasses.body15Medium} ${classes.primaryText}`}>Added people</div>
              ) : null}
              <section className={classes.contentWrap}>
                {selectedResults
                  .filter((data) => (data?.value ? data?.value !== eventsData?.organizer : data))
                  .map((data, index) => {
                    return (
                      <div className={classes.addedPeopleBox}>
                        <Avatar
                          className={classes.profilePic}
                          src={`${import.meta.env.VITE_DP_URL}${data.value}/profile-pic.png`}
                        >
                          {getNameInitials(data.label ? data.label : data)}
                        </Avatar>
                        <div>
                          <p className={`${commonClasses.body15Medium} ${classes.wordBreak} ${classes.primaryText}`}>
                            {data.label ? data.label : data}
                          </p>
                          {(data.tenantId || data.roleName) && (
                            <span className={`${commonClasses.caption12Regular} ${classes.secondryText}`}>
                              {`${data?.roleName},` || ''} {data?.tenantId || 'amura'}
                            </span>
                          )}
                        </div>
                        {!(eventsData?.organizer === data.value) && (
                          <IconButton onClick={() => handleRemovePerson(data, index)}>{<Close />}</IconButton>
                        )}
                      </div>
                    );
                  })}
              </section>
            </>
          </div>
          <PanelFooter
            paddingX="20px"
            customStyle={classes.footerStyle}
            leftButtonText={'Cancel'}
            righButtontText={'Save'}
            handleLeftButton={handleCancel}
            handleRightButton={handleSave}
          />
        </div>
      )}
      {showDrawer.drawer == 'ROLE' ? (
        <>
          <div className={classes.overlapDrawerContainer}>
            <PageHeader handleBack={handleCancelRole} headerContent={'Select Tenant & Role'} />
            <div className={classes.scrollBody}>
              <div className={`${classes.addedPeopleBox}`}>
                <Avatar
                  className={classes.profilePic}
                  src={`${import.meta.env.VITE_DP_URL}${selectedUser.value}/profile-pic.png`}
                >
                  {getNameInitials(selectedUser.label)}
                </Avatar>
                <span className={`${commonClasses.body15Medium} ${classes.primaryText} ${classes.wordBreak}`}>
                  {selectedUser.label}
                </span>
              </div>

              <div>
                {userRoles &&
                  userRoles?.map((data) => {
                    return (
                      <div className={classes.cardWrapper}>
                        <header className={classes.headerSection}>
                          <div className={`${classes.tenantTitle} ${commonClasses.body15Medium}`}>
                            <span className={classes.dflex}>{<AmuraIcon2 />} </span> {data.tenantId}
                          </div>
                        </header>
                        {data.roleIds.map((ele) => {
                          return (
                            <section className={classes.cardContainer} onClick={() => onRoleClick(data, ele)}>
                              <section className={classes.cardSelectSection}>
                                <div className={classes.iconTitle}>
                                  <aside className={classes.profileSection}>
                                    {
                                      <span className={classes.tenantIcon}>
                                        <AmuraIcon2 />
                                      </span>
                                    }
                                    <Avatar className={classes.profilePicture}>
                                      <DoctorIcon />
                                    </Avatar>
                                  </aside>
                                  <aside className={classes.profileContentSection}>
                                    <div className={`${commonClasses.body15Medium} ${classes.textPrimary}`}>
                                      {roles.find((role) => role.roleId === ele)?.roleName || ele}
                                    </div>
                                  </aside>
                                </div>
                                <aside className={classes.checkFlexbox}>
                                  <Radio className={classes.radioStyle} checked={ele === selectedUserRole.roleId} />
                                </aside>
                              </section>
                            </section>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
            <PanelFooter
              paddingX="20px"
              customStyle={classes.footerStyle}
              leftButtonText={'Cancel'}
              righButtontText={'Continue'}
              handleLeftButton={handleCancelRole}
              handleRightButton={handleSaveRole}
              disableRightButton={selectedUserRole === INITIAL_USER_ROLE ? true : false}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddPeople;
