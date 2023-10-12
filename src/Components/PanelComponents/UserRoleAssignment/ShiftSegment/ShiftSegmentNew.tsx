import React, { useEffect, useState } from 'react';
import { useStyles } from '../UserRoleAssignment.styles';
import { createTimeDropdown, createTimeDropdownNew, IProps } from './ShiftSegment.types';
import MUIDatePicker from './../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUISelect from './../../../LibraryComponents/MUISelect/MUISelect';
import Checkbox from './../../../LibraryComponents/MUICheckbox/MUICheckbox';
import ModalBox from './../../../LibraryComponents/ModalBox/ModalBox';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CrossIcon } from '../UserRoleAssignmentNew.svg';
import { PMS_LOCALE } from '../../../../Utils';

export default function ShiftSegmentNew(props: IProps) {
  const {
    segmentId,
    weekDays,
    startDate,
    endDate,
    startTime,
    endTime,
    neverEnds,
    handleChange,
    handleDelete,
    handleReset,
    error,
  } = props;
  const {classes} = useStyles();
  const commonClasses = useCommonStyles();
  const [openModal, setOpenModal] = useState(false);

  const [timeDropdown, setTimeDropDown] = useState(createTimeDropdownNew(startTime));
  const displayWeekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const handleDeleteSegment = () => {
    handleDelete(segmentId);
    setOpenModal(false);
  };
  return (
    <div className={`${classes.AddShiftSegmentsNew} ${classes.divider}`}>
      <div className={classes.deleteWrapper}>
        <span
          onClick={() => {
            setOpenModal(true);
          }}
          className={classes.pointerStyle}
        >
          {<CrossIcon />}
        </span>
      </div>
      <div>
        <MUIDatePicker
          label="Start Date"
          date={new Date(startDate)}
          setDate={(e: Date) => {
            handleChange(segmentId, 'startDate', e);
          }}
        />
        {error?.startDate ? (
          <div>
            <span className={classes.errorText}>{error.startDate}</span>
          </div>
        ) : null}
      </div>

      <div className={classes.nverEndsWrap}>
        <Checkbox
          id="never Ends"
          checked={neverEnds}
          onChange={(e: any) => {
            handleChange(segmentId, 'neverEnds', !neverEnds);
          }}
        />
        <span className={`${classes.nverEnds} ${commonClasses.body15Medium}`}>Never Ends</span>
      </div>
      {!neverEnds && (
        <div>
          <MUIDatePicker
            disabled={neverEnds}
            label="End Date"
            date={!endDate ? null : new Date(endDate)}
            setDate={(e: Date) => {
              handleChange(segmentId, 'endDate', e);
            }}
          />
          {error?.endDate ? (
            <div>
              <span className={classes.errorText}>{error.endDate}</span>
            </div>
          ) : null}
        </div>
      )}
      <div className={classes.TimeSelector}>
        <div className={classes.width50}>
          <MUISelect
            label="Start Time"
            placeholder="Start Time"
            options={timeDropdown}
            value={startTime.toString()}
            onChange={(e: any) => {
              handleChange(segmentId, 'startTime', e.target.value);
            }}
            labelId={'startTime'}
            error={error?.startTime ? true : false}
          />
          {error?.startTime ? (
            <div>
              <div className={classes.errorText}>{error.startTime}</div>
            </div>
          ) : null}
        </div>
        <div className={classes.width50}>
          <MUISelect
            label="End Time"
            placeholder="End Time"
            options={timeDropdown}
            value={endTime.toString()}
            onChange={(e: any) => {
              handleChange(segmentId, 'endTime', e.target.value);
            }}
            labelId={'endTime'}
            error={error?.endTime ? true : false}
          />
          {error?.endTime ? (
            <div>
              <span className={classes.errorText}>{error.endTime}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className={classes.selectTimeLabel}>
        <span className={classes.labelNew} title={`Days`}>
          {PMS_LOCALE.translate(`Days`)}
        </span>
      </div>
      <div className={classes.DaysLabel}>
        {displayWeekDays.map((day, index) => (
          <div className={`${classes.weekdaySpan} ${classes.flexJustifyCenter}`} key={index}>
            <div
              className={`${classes.days} ${weekDays.includes(index) ? classes.daysSelected : ''}`}
              onClick={() => {
                let tempWeekdays = [...weekDays];
                if (tempWeekdays.includes(index)) tempWeekdays = tempWeekdays.filter((item) => item !== index);
                else tempWeekdays.push(index);
                handleChange(segmentId, 'weekDays', tempWeekdays);
              }}
            >
              <span
                className={`${weekDays.includes(index) ? commonClasses.body15Medium : commonClasses.body17Regular}  ${
                  classes.dayDivSpan
                }`}
              >
                {day}
              </span>
            </div>
          </div>
        ))}
      </div>
      {error?.weekDays ? (
        <div>
          <span className={classes.errorText}>{error.weekDays}</span>
        </div>
      ) : null}
      <ModalBox
        panelWidth={props.panel?.width}
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
        }}
        modalTitle={'Delete Shiftsegment'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: () => {
              setOpenModal(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Yes'),
            variant: 'contained',
            onClick: handleDeleteSegment,
          },
        ]}
      >
        <div className={classes.modalWrapper}>Are you sure you want to delete shift segment?</div>
      </ModalBox>
    </div>
  );
}
// export default function ShiftSegmentNew(props: IProps) {
//   const {
//     segmentId,
//     segmentName,
//     weekDays,
//     startDate,
//     endDate,
//     startTime,
//     endTime,
//     is_active,
//     neverEnds,
//     handleChange,
//     handleDelete,
//     handleReset,
//     error,
//   } = props;
//   console.log('startTime props', props);
//   const { classes } = useStyles();
//   const commonClasses = useCommonStyles();
//   const [active, setActive] = useState(is_active);
//   const [openModal, setOpenModal] = useState(false);

//   const [timeDropdown, setTimeDropDown] = useState(createTimeDropdownNew(startTime));
//   const displayWeekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
//   // useEffect(() => {
//   //   setTimeDropDown(createTimeDropdown(startDate));
//   // }, [startDate]);
//   const handleDeleteSegment = () => {
//     handleDelete(segmentId);
//     setOpenModal(false);
//   };
//   return (
//     <div className={`${classes.AddShiftSegmentsNew} ${classes.divider}`}>
//       <div className={classes.deleteWrapper}>
//         <span
//           onClick={() => {
//             setOpenModal(true);
//           }}
//           className={classes.pointerStyle}
//         >
//           {<CrossIcon />}
//         </span>
//       </div>
//       <div>
//         <MUIDatePicker
//           label="Start Date"
//           date={new Date(startDate)}
//           setDate={(e: Date) => {
//             handleChange(segmentId, 'startDate', e);
//             // let newTimeDropdown = createTimeDropdown(e);
//             // setTimeDropDown(newTimeDropdown);
//             // handleChange(segmentId, 'startTime', newTimeDropdown[0].id);
//             // handleChange(segmentId, 'endTime', newTimeDropdown[newTimeDropdown.length - 1].id);
//           }}
//           // minDate={new Date()}
//         />
//         {error?.startDate ? (
//           <div>
//             <span className={classes.errorText}>{error.startDate}</span>
//           </div>
//         ) : null}
//       </div>

//       <div className={classes.nverEndsWrap}>
//         <Checkbox
//           id="never Ends"
//           checked={neverEnds}
//           onChange={(e: any) => {
//             handleChange(segmentId, 'neverEnds', !neverEnds);
//           }}
//         />
//         <span className={`${classes.nverEnds} ${commonClasses.body15Medium}`}>Never Ends</span>
//       </div>
//       {!neverEnds && (
//         <div>
//           <MUIDatePicker
//             disabled={neverEnds}
//             label="End Date"
//             date={!endDate ? null : new Date(endDate)}
//             setDate={(e: Date) => {
//               handleChange(segmentId, 'endDate', e);
//             }}
//           />
//           {error?.endDate ? (
//             <div>
//               <span className={classes.errorText}>{error.endDate}</span>
//             </div>
//           ) : null}
//         </div>
//       )}
//       <div className={classes.TimeSelector}>
//         <div className={classes.width50}>
//           <MUISelect
//             label="Start Time"
//             placeholder="Start Time"
//             options={timeDropdown}
//             value={startTime.toString()}
//             onChange={(e: any) => {
//               handleChange(segmentId, 'startTime', e.target.value);
//             }}
//             labelId={'startTime'}
//             error={error?.startTime ? true : false}
//           />
//           {error?.startTime ? (
//             <div>
//               <div className={classes.errorText}>{error.startTime}</div>
//             </div>
//           ) : null}
//         </div>
//         <div className={classes.width50}>
//           <MUISelect
//             label="End Time"
//             placeholder="End Time"
//             options={timeDropdown}
//             value={endTime.toString()}
//             onChange={(e: any) => {
//               handleChange(segmentId, 'endTime', e.target.value);
//             }}
//             labelId={'endTime'}
//             error={error?.endTime ? true : false}
//           />
//           {error?.endTime ? (
//             <div>
//               <span className={classes.errorText}>{error.endTime}</span>
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className={classes.selectTimeLabel}>
//         <span className={classes.labelNew} title={`Days`}>
//           {PMS_LOCALE.translate(`Days`)}
//         </span>
//       </div>
//       <div className={classes.DaysLabel}>
//         {displayWeekDays.map((day, index) => (
//           <div className={`${classes.weekdaySpan} ${classes.flexJustifyCenter}`} key={index}>
//             <div
//               className={`${classes.days} ${weekDays.includes(index) ? classes.daysSelected : ''}`}
//               onClick={() => {
//                 let tempWeekdays = [...weekDays];
//                 if (tempWeekdays.includes(index)) tempWeekdays = tempWeekdays.filter((item) => item !== index);
//                 else tempWeekdays.push(index);
//                 handleChange(segmentId, 'weekDays', tempWeekdays);
//               }}
//             >
//               <span
//                 className={`${weekDays.includes(index) ? commonClasses.body15Medium : commonClasses.body17Regular}  ${
//                   classes.dayDivSpan
//                 }`}
//               >
//                 {day}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       {error?.weekDays ? (
//         <div>
//           <span className={classes.errorText}>{error.weekDays}</span>
//         </div>
//       ) : null}
//       {/* <div className={classes.nverEndsWrap}>
//         <Checkbox
//           id="is_active"
//           checked={is_active}
//           onChange={(e: any) => {
//             setActive(!active);
//             handleChange(segmentId, 'is_active', !active);
//           }}
//         />
//         <span className={`${classes.nverEnds} ${commonClasses.body15Medium}`}>Is Active</span>
//       </div> */}
//       <ModalBox
//         panelWidth={props.panel?.width}
//         open={openModal}
//         handleClose={() => {
//           setOpenModal(false);
//         }}
//         modalTitle={'Delete Shiftsegment'}
//         buttonConfig={[
//           {
//             text: PMS_LOCALE.translate('Cancel'),
//             variant: 'text',
//             onClick: () => {
//               setOpenModal(false);
//             },
//           },
//           {
//             text: PMS_LOCALE.translate('Yes'),
//             variant: 'contained',
//             onClick: handleDeleteSegment,
//           },
//         ]}
//       >
//         <div className={classes.modalWrapper}>Are you sure you want to delete shift segment?</div>
//       </ModalBox>
//     </div>
//   );
// }
