import { debounce } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { getNameInitials, getSearchUsers } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUIAutoSelect from '../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import Select from '../../../LibraryComponents/Select/Select';
import { CHANNEL_OPTIONS } from '../../TimeManagement/TimeManagement.function';
import { checkFiltersApplied, DEFAULT_FILTERS } from './CalendarFilter.function';
import { useStyles } from './CalendarFilter.styles';
import { IProps } from './CalendarFilter.types';
import { CachedAvatar } from '../../../LibraryComponents/Avatar/CachedAvatar';

const MemoInputField = memo(InputField);
const MemoSelect = memo(Select);
const MemoMUIDatePicker = memo(MUIDatePicker);

export default function CalendarFilter(props: IProps) {
  const { defaultFilters, handleBack, onFilterChange } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [currFilter, setCurrFilter] = useState(DEFAULT_FILTERS);
  const [participantsOptions, setParticipantsOptions] = useState([]);

  const isFiltered = useMemo(() => checkFiltersApplied(defaultFilters, currFilter), [defaultFilters, currFilter]);

  useEffect(() => {
    if (defaultFilters) {
      setCurrFilter(defaultFilters);
      setParticipantsOptions(defaultFilters.participants || []);
    }
  }, [defaultFilters]);

  useEffect(() => {
    callSearchUsersAPI('', ' ');
  }, []);

  const onTenantChange = useCallback((tenantName) => setCurrFilter((pre) => ({ ...pre, tenantName })), []);
  const onKeywordChange = useCallback((e) => {
    const keyword = e.target.value;
    setCurrFilter((pre) => ({ ...pre, keyword }));
  }, []);
  const onParticipantsChange = useCallback((event, participants) => {
    setCurrFilter((pre) => ({ ...pre, participants }));
  }, []);

  const onCalltypeChange = useCallback((callType) => setCurrFilter((pre) => ({ ...pre, callType })), []);
  const onStartDateChange = useCallback(
    (_startDate) => {
      let startDate = new Date(_startDate).setHours(0, 0, 0, 0);
      let endDate = new Date(currFilter.endDate || startDate).setHours(0, 0, 0, 0);
      if (startDate > endDate) {
        endDate = startDate;
      }
      setCurrFilter((pre) => ({
        ...pre,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      }));
    },
    [currFilter.endDate]
  );
  const onEndDateChange = useCallback(
    (_endDate) => {
      let endDate = new Date(_endDate).setHours(0, 0, 0, 0);
      let startDate = new Date(currFilter.startDate || endDate).setHours(0, 0, 0, 0);
      if (startDate > endDate) {
        startDate = endDate;
      }
      setCurrFilter((pre) => ({
        ...pre,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      }));
    },
    [currFilter.startDate]
  );

  const handleApplyFilter = () => {
    onFilterChange(currFilter);
  };

  const handleClearAll = () => {
    setCurrFilter(DEFAULT_FILTERS);
  };

  const callSearchUsersAPI = async (event: any, search: string) => {
    try {
      const response = await getSearchUsers(search);
      const filteredOption = [];
      response?.forEach((data) => {
        const { profile, user_id } = data._source || {};
        if (!(currFilter.participants.length && currFilter.participants.some((data) => data.value === user_id))) {
          filteredOption.push({
            value: user_id,
            label: `${profile?.first_name || ''} ${profile?.last_name || ''}`,
            subLabel: '',
          });
        }
      });
      setParticipantsOptions(filteredOption || []);
    } finally {
    }
  };

  const debounceSearchFun: any = debounce(callSearchUsersAPI, 500);

  return (
    <div className={classes.filterContainer}>
      <PageHeader
        handleBack={handleBack}
        isClearAll
        clearAllText={
          <span className={`${commonClasses.caption12Regular} ${!isFiltered ? classes.defaultClearAll : classes.activeClearAll}`}>
            Clear All
          </span>
        }
        headerContent="Apply filters"
        handleClearAll={handleClearAll}
      />
      <div className={classes.scrollBody}>
        {/* <MemoSelect
          headerTitle={'Search for Tenants'}
          options={TENANT_OPTIONS}
          values={currFilter.tenantName}
          setValues={onTenantChange}
          optionsType={'label'}
          position={'bottom'}
          placeholder={'Tenants'}
          isDivider
          isAutoOk
        />
        <MemoInputField label="Keyword" placeholder="Keyword" value={currFilter.keyword} onChange={onKeywordChange} />
       */}
        <div className={classes.participant}></div>
        <MUIAutoSelect
          options={participantsOptions}
          InputProps={{ label: 'Participants', placeholder: 'Participants' }}
          onChange={onParticipantsChange}
          value={currFilter.participants}
          onInputChange={debounceSearchFun}
          filterSelectedOptions
          multiple
          renderOption={(props, option, state) => (
            <>
              <div {...(props as any)} className={classes.addedPeopleBox}>
                <CachedAvatar
                  className={classes.profilePic}
                  src={`${import.meta.env.VITE_DP_URL}${option.value}/profile-pic.png`}
                >
                  {getNameInitials(option.label)}
                </CachedAvatar>
                <span className={`${commonClasses.body15Medium} ${classes.wordBreak} ${classes.primaryText}`}>
                  {option.label}
                </span>
              </div>
            </>
          )}
        />
        <MemoSelect
          headerTitle={'Channel'}
          options={CHANNEL_OPTIONS}
          values={currFilter.callType}
          setValues={onCalltypeChange}
          optionsType={'label'}
          position={'bottom'}
          placeholder={'Channel'}
          isDivider
          isAutoOk
        />
        <div className={classes.divider}>
          <MemoMUIDatePicker
            label="Start Date"
            date={currFilter.startDate}
            setDate={onStartDateChange}
            format={'E dd, LLL yyyy'}
          />
          <MemoMUIDatePicker label="End Date" date={currFilter.endDate} setDate={onEndDateChange} format={'E dd, LLL yyyy'} />
        </div>
      </div>
      <PanelFooter
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Apply'}
        handleLeftButton={handleBack}
        handleRightButton={handleApplyFilter}
      />
    </div>
  );
}

// ? below code is of pre df-base migration
// export default function CalendarFilter(props: IProps) {
//   const { defaultFilters, handleBack, onFilterChange } = props;

//   const { classes } = useStyles();
//   const commonClasses = useCommonStyles();

//   const [currFilter, setCurrFilter] = useState<any>(DEFAULT_FILTERS);
//   const [participantsOptions, setParticipantsOptions] = useState<any>([]);

//   const isFiltered: boolean = useMemo(() => checkFiltersApplied(defaultFilters, currFilter), [defaultFilters, currFilter]);

//   useEffect(() => {
//     if (defaultFilters) {
//       setCurrFilter(defaultFilters);
//       setParticipantsOptions(defaultFilters.participants || []);
//     }
//   }, [defaultFilters]);

//   useEffect(() => {
//     callSearchUsersAPI('', ' ');
//   }, []);

//   const onTenantChange = useCallback((tenantName: string) => setCurrFilter((pre: any) => ({ ...pre, tenantName })), []);
//   const onKeywordChange = useCallback((e: any) => {
//     const keyword = e.target.value;
//     setCurrFilter((pre: any) => ({ ...pre, keyword }));
//   }, []);
//   const onParticipantsChange = useCallback((event: any, participants: any) => {
//     setCurrFilter((pre: any) => ({ ...pre, participants }));
//   }, []);

//   const onCalltypeChange = useCallback((callType: string) => setCurrFilter((pre: any) => ({ ...pre, callType })), []);
//   const onStartDateChange = useCallback(
//     (_startDate: any) => {
//       let startDate = new Date(_startDate).setHours(0, 0, 0, 0);
//       let endDate = new Date(currFilter.endDate || startDate).setHours(0, 0, 0, 0);
//       if (startDate > endDate) {
//         endDate = startDate;
//       }
//       setCurrFilter((pre: any) => ({ ...pre, startDate: new Date(startDate), endDate: new Date(endDate) }));
//     },
//     [currFilter.endDate]
//   );
//   const onEndDateChange = useCallback(
//     (_endDate: any) => {
//       let endDate = new Date(_endDate).setHours(0, 0, 0, 0);
//       let startDate = new Date(currFilter.startDate || endDate).setHours(0, 0, 0, 0);
//       if (startDate > endDate) {
//         startDate = endDate;
//       }
//       setCurrFilter((pre: any) => ({ ...pre, startDate: new Date(startDate), endDate: new Date(endDate) }));
//     },
//     [currFilter.startDate]
//   );

//   const handleApplyFilter = () => {
//     onFilterChange(currFilter);
//   };

//   const handleClearAll = () => {
//     setCurrFilter(DEFAULT_FILTERS);
//   };

//   const callSearchUsersAPI = async (event: any, search: string) => {
//     try {
//       const response = await getSearchUsers(search);
//       const filteredOption = [];
//       response?.forEach((data) => {
//         const { profile, user_id } = data._source || {};
//         if (!(currFilter.participants.length && currFilter.participants.some((data) => data.value === user_id))) {
//           filteredOption.push({
//             value: user_id,
//             label: profile?.nick_name || `${profile?.first_name || ''} ${profile?.last_name || ''}`,
//             subLabel: '',
//           });
//         }
//       });
//       setParticipantsOptions(filteredOption || []);
//     } finally {
//     }
//   };

//   const debounceSearchFun: any = debounce(callSearchUsersAPI, 500);

//   return (
//     <div className={classes.filterContainer}>
//       <PageHeader
//         handleBack={handleBack}
//         isClearAll
//         clearAllText={
//           <span className={`${commonClasses.caption12Regular} ${!isFiltered ? classes.defaultClearAll : classes.activeClearAll}`}>
//             Clear All
//           </span>
//         }
//         headerContent="Apply filters"
//         handleClearAll={handleClearAll}
//       />
//       <div className={classes.scrollBody}>
//         {/* <MemoSelect
//           headerTitle={'Search for Tenants'}
//           options={TENANT_OPTIONS}
//           values={currFilter.tenantName}
//           setValues={onTenantChange}
//           optionsType={'label'}
//           position={'bottom'}
//           placeholder={'Tenants'}
//           isDivider
//           isAutoOk
//         />
//         <MemoInputField label="Keyword" placeholder="Keyword" value={currFilter.keyword} onChange={onKeywordChange} />
//        */}
//         <div className={classes.participant}></div>
//         <MUIAutoSelect
//           options={participantsOptions}
//           InputProps={{ label: 'Participants', placeholder: 'Participants' }}
//           onChange={onParticipantsChange}
//           value={currFilter.participants}
//           onInputChange={debounceSearchFun}
//           filterSelectedOptions
//           multiple
//         />
//         <MemoSelect
//           headerTitle={'Channel'}
//           options={CHANNEL_OPTIONS}
//           values={currFilter.callType}
//           setValues={onCalltypeChange}
//           optionsType={'label'}
//           position={'bottom'}
//           placeholder={'Channel'}
//           isDivider
//           isAutoOk
//         />
//         <div className={classes.divider}>
//           <MemoMUIDatePicker
//             label="Start Date"
//             date={currFilter.startDate}
//             setDate={onStartDateChange}
//             format={'E dd, LLL yyyy'}
//           />
//           <MemoMUIDatePicker label="End Date" date={currFilter.endDate} setDate={onEndDateChange} format={'E dd, LLL yyyy'} />
//         </div>
//       </div>
//       <PanelFooter
//         customStyle={classes.footerStyle}
//         leftButtonText={'Cancel'}
//         righButtontText={'Apply'}
//         handleLeftButton={handleBack}
//         handleRightButton={handleApplyFilter}
//       />
//     </div>
//   );
// }
