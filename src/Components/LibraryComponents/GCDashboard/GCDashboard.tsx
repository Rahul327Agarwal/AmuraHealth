import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useUserSession } from '../../../DisplayFramework/State/Slices/Auth';
import { IRootState } from '../../../DisplayFramework/State/store';
import { CloseIconDark } from '../../SVGs/Common';
import MUIButton from '../MUIButton/MUIButton';
import MUIDatePicker from '../MUIDatePicker/MUIDatePicker';
import {
  belongsToCEO,
  belongsToGCL2,
  getClientDetailsOfTheStaff,
  getDashboardData,
  getDetailsOfStaff,
  initiaState,
} from './GCDashboard.function';
import { useStyles } from './GCDashboard.styles';
import { ArraowDown, ArrowRight, Close, DiscoverIcon, EditIcon, VectorIcon } from './GCDashboard.svg';
import { BasicInfo, DashBoard, IClientData, IProps, StaffData } from './GCDashboard.types';

const GCDashboard = (props: IProps) => {
  const sessions = useUserSession()!;
  let navigate = useNavigate();
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  const [selectedDate, setSelectedDate] = useState({ FromDate: null, ToDate: null });
  const loggedInUserInformation = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const [openedStaffId, setOpenedStaffId] = useState([]);
  const [dashboardData, setDashBoardData] = useState<Array<DashBoard>>([]);
  const [staffData, setStaffData] = useState<Array<StaffData>>([]);
  const [clientData, setClientData] = useState<IClientData>();
  const [previousDates, setPreviousDates] = useState({ FromDate: null, ToDate: null });
  const [basicInfo, setBasicInfo] = useState<BasicInfo>(initiaState);
  const [loading, setLoading] = useState<boolean>(false);

  const openStaff = useCallback(
    async (status, staffId) => {
      if (openedStaffId.includes(staffId)) {
        let indexOfStaffId = openedStaffId.indexOf(staffId);

        let updatedStaffId = JSON.parse(JSON.stringify(openedStaffId));
        updatedStaffId.splice(indexOfStaffId, 1);

        setOpenedStaffId(updatedStaffId);
        setClientData((pre) => {
          let updatedClientData = JSON.parse(JSON.stringify(pre));
          delete updatedClientData[staffId];
          return updatedClientData;
        });
        return;
      }

      setOpenedStaffId((pre) => [...pre, staffId]);
      setLoading(true);

      let startDate = new Date(basicInfo.edit ? previousDates.FromDate : selectedDate.FromDate);
      startDate.setHours(0, 0, 0, 0); //12AM

      let endDate = new Date(basicInfo.edit ? previousDates.ToDate : selectedDate.ToDate);
      endDate.setHours(24, 0, 0, 0); //12AM

      setClientData((pre) => ({ ...pre, [staffId]: [] }));
      const tempClientData = await getClientDetailsOfTheStaff(
        sessions,
        startDate.toISOString(),
        endDate.toISOString(),
        status,
        staffId
      );

      // deleting details if empty array as data receive
      if (tempClientData.length === 0) {
        setOpenedStaffId((pre) => pre.filter((id) => id !== staffId));
        setClientData((pre) => {
          let updatedClientData = JSON.parse(JSON.stringify(pre));
          delete updatedClientData[staffId];
          return updatedClientData;
        });
      }
      //updating data in the state.
      else {
        setClientData((pre) => {
          if (staffId in pre) return { ...pre, [staffId]: tempClientData };
          else return { ...pre };
        });
      }

      setLoading(false);
    },
    [selectedDate, openedStaffId, basicInfo]
  );

  const handleClickOnDashBoard = useCallback(async () => {
    setClientData({});
    setStaffData([]);
    setBasicInfo({ ...basicInfo, active: '' });
    let startDate = new Date(selectedDate.FromDate);
    startDate.setHours(0, 0, 0, 0); //12AM

    let endDate = new Date(selectedDate.ToDate);
    endDate.setHours(24, 0, 0, 0); //12AM
    const tempdashboardData = await getDashboardData(sessions, startDate.toISOString(), endDate.toISOString());
    let totalUser = 0;
    let arrayOfObjects = Object.entries(tempdashboardData).map(([key, value]) => {
      if (key === 'totalClients') totalUser = value as number;
      return {
        status: key,
        count: value as number,
      };
    });
    arrayOfObjects = arrayOfObjects.filter(({ status }) => status !== 'totalClients');

    setDashBoardData(arrayOfObjects);
    setBasicInfo({ ...basicInfo, active: '', stage: 'stage2', totalUser: totalUser, edit: false });
  }, [selectedDate, basicInfo]);

  const handleStatusClick = useCallback(
    async (status) => {
      setOpenedStaffId([]);
      setClientData({});
      setStaffData([]);

      // same status card clicked.
      if (basicInfo.active === status) {
        setBasicInfo({ ...basicInfo, active: '' });
        return;
      }
      // get details of clicked status card.
      setBasicInfo({ ...basicInfo, active: status });
      setLoading(true);
      let startDate = new Date(basicInfo.edit ? previousDates.FromDate.toISOString() : selectedDate.FromDate.toISOString());
      startDate.setHours(0, 0, 0, 0); //12AM

      let endDate = new Date(basicInfo.edit ? previousDates.ToDate.toISOString() : selectedDate.ToDate.toISOString());
      endDate.setHours(24, 0, 0, 0); //12AM
      const tempStaffData = await getDetailsOfStaff(sessions, startDate, endDate, status);
      setStaffData(tempStaffData);
      setLoading(false);
    },
    [selectedDate, basicInfo]
  );

  useEffect(() => {
    if (!(belongsToGCL2(loggedInUserInformation.allRoles ?? '') || belongsToCEO(loggedInUserInformation.allRoles ?? ''))) {
      navigate('/login');
    }
  }, [loggedInUserInformation]);

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.container}>
        {basicInfo.stage === 'stage1' && (
          <div className={classes.upperHeader}>
            <div className={classes.dateInputContainer}>
              <div className={`${classes.heading} ${commonClass.body17Medium}`}>
                Enter Date Range for User Conversion Analysis Dashboard
              </div>
              {dashboardData.length !== 0 && (
                <span
                  className={classes.pointer}
                  onClick={() => {
                    setBasicInfo({ ...basicInfo, stage: 'stage2', edit: false });
                    setSelectedDate(previousDates);
                  }}
                >
                  <CloseIconDark />
                </span>
              )}
            </div>

            <div className={classes.datefield}>
              <div className={classes.datefieldsdWraper}>
                <div className={classes.flex1}>
                  <MUIDatePicker
                    label="From Date"
                    date={selectedDate?.FromDate}
                    setDate={(date) => {
                      if (selectedDate.ToDate === null || selectedDate.ToDate < date) {
                        setSelectedDate((pre) => ({ ...pre, FromDate: date, ToDate: date }));
                      } else {
                        setSelectedDate((pre) => ({ ...pre, FromDate: date }));
                      }
                    }}
                    maxDate={new Date()}
                    openDialogBox={true}
                  />
                </div>
                <div className={classes.flex1}>
                  <MUIDatePicker
                    label="To Date"
                    date={selectedDate?.ToDate}
                    setDate={(date) => {
                      if (selectedDate.FromDate === null || selectedDate.FromDate > date) {
                        setSelectedDate((pre) => ({ ...pre, ToDate: date, FromDate: date }));
                      } else {
                        setSelectedDate((pre) => ({ ...pre, ToDate: date }));
                      }
                    }}
                    maxDate={new Date()}
                    openDialogBox={true}
                  />
                </div>
              </div>
              {selectedDate.FromDate !== null && selectedDate.ToDate !== null && (
                <div>
                  <MUIButton
                    className={`${classes.button} ${commonClass.body15Medium}`}
                    variant="contained"
                    disabled={
                      new Date(selectedDate.FromDate).getTime() === new Date(previousDates.FromDate).getTime() &&
                      new Date(selectedDate.ToDate).getTime() === new Date(previousDates.ToDate).getTime()
                    }
                    size="large"
                    onClick={() => {
                      handleClickOnDashBoard();
                    }}
                  >
                    Create Dashboard
                  </MUIButton>
                </div>
              )}
            </div>
          </div>
        )}
        {basicInfo.stage === 'stage2' && (
          <div className={classes.header}>
            <div className={classes.userWrap}>
              <span className={commonClass.body20Medium}>Number of users</span>
              <div className={classes.userCount}>{basicInfo.totalUser}</div>
            </div>
            <div className={classes.dateWrap}>
              <span className={commonClass.body17Medium}>Created within</span>
              <div className={classes.flex}>
                <span className={`${classes.date} ${commonClass.heading3}`}>
                  {moment(selectedDate.FromDate).format('YYYY-MM-DD')} <span className={classes.showToText}> to </span>
                  {moment(selectedDate.ToDate).format('YYYY-MM-DD')}
                </span>
                <span
                  className={classes.editIcon}
                  onClick={() => {
                    setBasicInfo({ ...basicInfo, stage: 'stage1', edit: true });
                    setPreviousDates(selectedDate);
                  }}
                >
                  <EditIcon></EditIcon>
                </span>
              </div>
            </div>
          </div>
        )}
        {dashboardData.length > 0 && (
          <>
            <div className={classes.tabs}>
              <div className={classes.tabsNav}>
                {dashboardData?.map(({ status, count }, index) => (
                  <div
                    className={
                      basicInfo.active === status
                        ? ` ${classes.active} ${classes.navItems}`
                        : count === 0
                        ? `${classes.cursor} ${classes.inActive}  `
                        : `${classes.inActive}  ${classes.navItems}`
                    }
                    id={status}
                    key={status}
                    onClick={() => {
                      count > 0 && handleStatusClick(status);
                    }}
                  >
                    <div className={classes.navWrap}>
                      {basicInfo.active === status && (
                        <div className={`${basicInfo.active === status && basicInfo.active && classes.absolute}`}>
                          <span className={`${index === 0 ? null : classes.first}`}>
                            <VectorIcon />
                          </span>
                          <span className={`${index === dashboardData.length - 1 ? null : classes.last}`}>
                            <VectorIcon />
                          </span>
                        </div>
                      )}

                      <span className={`${commonClass.body17Medium} ${classes.tabTitle}`}> {status}</span>
                      <div className={classes.accordianHeader}>
                        <span className={classes.count}>{count}</span>
                        {count > 0 && (
                          <span>
                            {basicInfo.active === status ? (
                              loading && staffData.length === 0 ? (
                                <CircularProgress size={20} className={classes.circularloader} />
                              ) : (
                                <Close />
                              )
                            ) : (
                              <ArrowRight />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.tabsContentWrapper}>
                {basicInfo.active && (
                  <div className={classes.content}>
                    {staffData.length > 0 &&
                      staffData[0].status === basicInfo.active &&
                      staffData?.map((data) => {
                        return (
                          <div key={data.staffId} className={classes.tabContent}>
                            <div
                              className={classes.accordianHeader}
                              onClick={() => {
                                openStaff(data.status, data.staffId);
                              }}
                            >
                              <div className={`${commonClass.body20Medium} ${classes.StaffName}`}>
                                {data.staffName} ({data.client})
                              </div>
                              <span className={!openedStaffId.includes(data.staffId) ? classes.rotateUP : null}>
                                {openedStaffId.includes(data.staffId) && clientData[data.staffId].length === 0 ? (
                                  <CircularProgress size={20} className={classes.circularloader} />
                                ) : (
                                  <ArraowDown />
                                )}
                              </span>
                            </div>
                            {openedStaffId.includes(data.staffId) && (
                              <div className={classes.marginTop}>
                                {clientData[data.staffId]?.map(({ userName }) => {
                                  return (
                                    <div className={classes.clientWrapper}>
                                      <span className={commonClass.body17Medium}>{userName}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}

                {!basicInfo.active && (
                  <div className={classes.height}>
                    <div className={classes.center}>
                      <DiscoverIcon />
                      <span className={`${classes.text} ${commonClass.body15Medium}`}>Discover by choosing a card</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.mobileViewConainter}>
              <div className={classes.tabsNav}>
                {dashboardData?.map(({ status, count }, index) => (
                  <div
                    className={
                      basicInfo.active === status
                        ? ` ${classes.active} ${classes.navItems}`
                        : `${classes.inActive}  ${classes.navItems}`
                    }
                    id={status}
                    key={status}
                    onClick={() => {
                      count > 0 && handleStatusClick(status);
                    }}
                  >
                    <div className={classes.navWrap}>
                      <span className={`${commonClass.body17Medium} ${classes.tabTitle}`}> {status}</span>
                      <div className={classes.accordianHeader}>
                        <span className={classes.count}>{count}</span>
                        {count > 0 && (
                          <span>
                            {basicInfo.active === status ? (
                              loading && staffData.length === 0 ? (
                                <CircularProgress size={20} className={classes.circularloader} />
                              ) : (
                                <Close />
                              )
                            ) : (
                              <ArrowRight />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    {basicInfo.active === status && basicInfo.active && (
                      <div>
                        {staffData?.map((data, index) => {
                          return (
                            <div
                              key={data.staffId}
                              className={classes.tabContent}
                              onClick={(e) => {
                                openStaff(data.status, data.staffId);
                                e.stopPropagation();
                              }}
                            >
                              <div className={classes.accordianHeader}>
                                <div className={`${commonClass.body20Medium} ${classes.StaffName}`}>
                                  {data.staffName} ({data.client})
                                </div>
                                <span className={!openedStaffId.includes(data.staffId) ? classes.rotateUP : null}>
                                  {openedStaffId.includes(data.staffId) && clientData[data.staffId].length === 0 ? (
                                    <CircularProgress size={20} className={classes.circularloader} />
                                  ) : (
                                    <ArraowDown />
                                  )}
                                </span>
                              </div>

                              {openedStaffId.includes(data.staffId) && (
                                <div className={classes.marginTop}>
                                  {clientData[data.staffId]?.map(({ userName }) => {
                                    return (
                                      <div key={userName} className={classes.clientWrapper}>
                                        <span className={commonClass.body17Medium}>{userName}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default GCDashboard;
