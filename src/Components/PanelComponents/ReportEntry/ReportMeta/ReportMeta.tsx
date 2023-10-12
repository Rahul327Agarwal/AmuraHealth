import React, { useState, useEffect } from 'react';
import { PMS_LOCALE } from '../../../../Utils';
import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { updateFields } from './ReportMeta.functions';
import { BootstrapDate, useStyles } from './ReportMeta.styles';
import { IProps } from './ReportMeta.types';
import { useDispatch } from 'react-redux';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

function ReportMeta(props: IProps) {
  const { onNewReportAdd } = props;
  const { id: panelId } = useCurrentPanel();
  const [disableAllFields, setDisableAllFields] = useState(false);
  const [createEmptyBiomarker, setCreateEmptyBiomarker] = useState(false);
  const [currentState, setCurrentState] = useState({
    sampleDateState: props.sampleDate ? props.sampleDate : null,
    reportDateState: props.reportDate ? props.reportDate : null,
    sidNumberForState: props.sidNumber,
    labName: props.lab,
    reportId: props.reportId,
  });
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentState({
      ...currentState,
      sampleDateState: props.sampleDate as any,
      reportDateState: props.reportDate as any,
      sidNumberForState: props.sidNumber,
      labName: props.lab,
      reportId: props.reportId,
    });
  }, [props.reportId]);

  return (
    <div>
      <div className={classes.container}>
        <div title="Report Id" className={classes.reportDate}>
          {PMS_LOCALE.translate('Report Id')}
        </div>
        <div className="" style={{ width: '50%' }}>
          <BootstrapDate
            className={classes.fieldStyles}
            placeholder={PMS_LOCALE.translate('Report Id')}
            value={currentState.sidNumberForState}
            onChange={(event) => {
              // setSidNumber(event.target.value);
              setCurrentState({
                ...currentState,
                sidNumberForState: event.target.value,
              });
            }}
            disabled={!props.enableEdit || disableAllFields || props.loadingFlag}
            InputProps={{ disableUnderline: true }}
            inputProps={{ maxLength: 16 }}
            title={currentState.sidNumberForState}
            onBlur={(event) => {
              updateFields(
                panelId,
                'sidNumber',
                props,
                currentState,
                setCurrentState,
                setDisableAllFields,
                createEmptyBiomarker,
                setCreateEmptyBiomarker,
                onNewReportAdd,
                dispatch,
                event.target.value
              );
            }}
          />
        </div>
      </div>
      <div className={classes.container}>
        <div title="Report Date" className={classes.reportDate}>
          {PMS_LOCALE.translate('Report Date')}
        </div>
        <div className="">
          {/* TODO: <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableFuture
              placeholder={PMS_LOCALE.translate("Report Date")}
              className={classes.keyBoardWidth}
              TextFieldComponent={BootstrapDate}
              autoOk={true}
              disabled={
                !props.enableEdit || disableAllFields || props.loadingFlag
              }
              variant="inline"
              InputProps={{ disableUnderline: true }}
              format="yyyy-MM-dd"
              id="reportDatePicker"
              value={currentState.reportDateState}
              onChange={(date) => {
                updateFields(
                  "reportDate",
                  props,
                  currentState,
                  setCurrentState,
                  setDisableAllFields,
                  createEmptyBiomarker,
                  setCreateEmptyBiomarker,
                  onNewReportAdd,
                  dispatch,
                  date
                );
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              error={false}
              helperText={false}
              keyboardIcon={calenderIcon}
            />
          </MuiPickersUtilsProvider> */}
        </div>
      </div>
      <div className={classes.container}>
        <div title="Sample Date" className={classes.reportDate}>
          {PMS_LOCALE.translate('Sample Date')}
        </div>
        <div className="">
          {/* TODO: <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              placeholder={PMS_LOCALE.translate("Sample Date")}
              disableFuture
              className={classes.keyBoardWidth}
              TextFieldComponent={BootstrapDate}
              disabled={
                !props.enableEdit || disableAllFields || props.loadingFlag
              }
              autoOk={true}
              variant="inline"
              format="yyyy-MM-dd"
              id="sampleDatePicker"
              value={currentState.sampleDateState}
              onChange={(date) => {
                updateFields(
                  "sampleDate",
                  props,
                  currentState,
                  setCurrentState,
                  setDisableAllFields,
                  createEmptyBiomarker,
                  setCreateEmptyBiomarker,
                  onNewReportAdd,
                  dispatch,
                  date
                );
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              InputProps={{ disableUnderline: true }}
              error={false}
              helperText={false}
              keyboardIcon={calenderIcon}
            />
          </MuiPickersUtilsProvider> */}
        </div>
      </div>
      <div className={classes.container}>
        <div title="Lab" className={classes.reportDate}>
          {PMS_LOCALE.translate('Lab name')}
        </div>
        <div className={classes.labFieldStyles}>
          <Autocomplete
            disabled={!props.enableEdit || disableAllFields || props.loadingFlag}
            freeSolo
            options={props.vendors.map((value: any) => value.Name)}
            onChange={(e, value) => {
              setCurrentState({ ...currentState, labName: value });
            }}
            getOptionLabel={(option) => option}
            // fullWidth
            renderOption={(option) => (
              <span
                title={`${option}`}
                style={{
                  width: '300px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >{`${PMS_LOCALE.translate(option)}`}</span>
            )}
            // closeIcon=""
            inputValue={currentState.labName || ''}
            onInputChange={(event, newInputValue) => {
              // setLabName(newInputValue);
              setCurrentState({ ...currentState, labName: newInputValue });
            }}
            onBlur={() => {
              updateFields(
                panelId,
                'labName',
                props,
                currentState,
                setCurrentState,
                setDisableAllFields,
                createEmptyBiomarker,
                setCreateEmptyBiomarker,
                onNewReportAdd,
                dispatch
              );
            }}
            id="AutoSuggestLabName"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={PMS_LOCALE.translate(`Search or enter lab name`)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                  disableUnderline: true,
                }}
                title={currentState.labName}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportMeta;
