import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import Accordian from '../../../LibraryComponents/Accordian/Accordian';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import RadioGroup from '../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../../LibraryComponents/PannelFooter/PannelFooter';
import Select from '../../../LibraryComponents/Select/Select';
import { BackArrowIcon } from '../../../SVGs/Common';
import { checkFiltersApplied } from '../ManageStatus/ManageStatus.function';
import { FilterCardProps } from '../MyListHome.types';
import {
  belongsToGC,
  belongsToGCL2,
  defaultFilterState,
  groupByOptions,
  groupByOptions2,
  sortByOptions,
} from './FilterCard.function';
import { useStyles } from './FilterCard.styles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';

const FilterCard = (props: FilterCardProps) => {
  const {
    defaultFilters,
    onFilterChange,
    appliedFilters,
    ownerOptions,
    statusOptions,
    userRoles,
    handleBack: handleBackToHome,
  } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [filterState, setFilterState] = useState(appliedFilters);
  const [swipeIn, setSwipeIn] = useState(false);

  const goBack = useDFGoBack();

  const handleBack = () => {
    goBack('H');
    handleBackToHome();
  };

  useEffect(() => {
    setSwipeIn(true);
  }, []);

  const handleApplyFilter = () => {
    onFilterChange(filterState);
    handleBack();
  };

  const allRoles = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation.allRoles);

  return (
    <div className={`${classes.rootContainer} ${swipeIn ? classes.swipeIn : classes.swipeOut}`}>
      <div className={`${classes.backdrop} ${swipeIn ? classes.backdropOpacityIn : classes.backdropOpacityOut}`}></div>
      <div className={classes.statusWrap}>
        <PageHeader
          customStyle={classes.headerStyle}
          startAdornment={
            <span className={classes.backArrow} onClick={handleBack}>
              <BackArrowIcon />
            </span>
          }
          isClearAll={true}
          headerContent="Apply filters"
          clearAllText={
            <span
              className={`${commonClass.caption12Regular} ${
                checkFiltersApplied(defaultFilterState, filterState) ? classes.activeClearAll : classes.defaultClearAll
              }`}
            >
              Clear All
            </span>
          }
          handleClearAll={() =>
            setFilterState({
              ...defaultFilterState,
              minDate: defaultFilters.minDate,
              maxDate: defaultFilters.maxDate,
            })
          }
        />
        <div className={classes.bodyContainer}>
          {belongsToGCL2(allRoles) && (
            <Select
              options={ownerOptions}
              optionsType={'checkbox'}
              headerTitle={'Select Owner'}
              position={'bottom'}
              setValues={(owner) => setFilterState((pre) => ({ ...pre, owner }))}
              values={filterState?.owner}
              placeholder="Select Owner"
              isSearch={false}
              showSelectAll={true}
            />
          )}
          {belongsToGC(allRoles) && (
            <Select
              options={statusOptions}
              optionsType={'checkbox'}
              headerTitle={'Select Status'}
              position={'bottom'}
              setValues={(status) => setFilterState((pre) => ({ ...pre, status }))}
              values={filterState?.status}
              isSearch={false}
              placeholder="Select Status"
              showSelectAll={true}
            />
          )}
          <Select
            options={userRoles}
            optionsType={'checkbox'}
            headerTitle={'Select Role'}
            position={'bottom'}
            setValues={(role) => setFilterState((pre) => ({ ...pre, role }))}
            values={filterState?.role}
            isSearch={false}
            placeholder="Select Role"
            showSelectAll={true}
          />

          <section>
            <div className={`${commonClass.body17Regular} ${classes.labelStyle}`}>Created on</div>
            <div className={classes.daterangeWrapper}>
              <MUIDatePicker
                placeholder="DD/MM/YYYY"
                label={'From date'}
                date={filterState?.createdOnStart ? new Date(filterState?.createdOnStart) : null}
                setDate={(createdOnStart) =>
                  setFilterState((pre) => ({
                    ...pre,
                    createdOnStart: new Date(createdOnStart),
                    createdOnEnd: !pre?.createdOnEnd ? new Date() : new Date(pre?.createdOnEnd),
                  }))
                }
                minDate={filterState?.minDate ? new Date(filterState?.minDate) : undefined}
                maxDate={filterState?.createdOnEnd ? new Date(filterState?.createdOnEnd) : new Date()}
                readOnly
              />
              <span className={classes.labelColor}>:</span>
              <MUIDatePicker
                placeholder="DD/MM/YYYY"
                label={'To date'}
                date={filterState?.createdOnEnd ? new Date(filterState?.createdOnEnd) : null}
                setDate={(createdOnEnd) =>
                  setFilterState((pre) => ({
                    ...pre,
                    createdOnEnd: new Date(createdOnEnd),
                    createdOnStart: !pre?.createdOnStart ? new Date(createdOnEnd) : new Date(pre.createdOnStart),
                  }))
                }
                minDate={filterState?.createdOnStart ? new Date(filterState?.createdOnStart) : new Date(filterState.minDate)}
                maxDate={new Date()}
                readOnly
              />
            </div>
          </section>
          <Accordian defaultExpanded customStyle={classes.accordianWrap} accordianTitle="Sort By">
            <RadioGroup
              variant="token"
              value={filterState?.sortBy}
              setValue={(sortBy) => setFilterState((pre: any) => ({ ...pre, sortBy }))}
              options={belongsToGC(allRoles) ? sortByOptions : sortByOptions.filter((value) => value.value !== 'Status')}
            />
          </Accordian>
          {belongsToGC(allRoles) && (
            <Accordian defaultExpanded customStyle={classes.accordianWrap} accordianTitle="Group By">
              <RadioGroup
                variant="token"
                value={filterState?.groupBy}
                setValue={(groupBy) => setFilterState((pre: any) => ({ ...pre, groupBy }))}
                options={belongsToGCL2(allRoles) ? groupByOptions : groupByOptions2}
              />
            </Accordian>
          )}
        </div>
        <PannelFooter
          customStyle={classes.footerStyle}
          handleAdd={() => {
            handleApplyFilter();
          }}
          handleCancel={handleBack}
          buttonOneTitle="Cancel"
          buttonTwoTitle="Apply"
        />
      </div>
    </div>
  );
};

export default FilterCard;
