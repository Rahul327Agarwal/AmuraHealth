import React, { useState, useEffect } from 'react';
import { PMS_LOCALE } from '../../../../Utils';
import { makeStyles, withStyles } from 'tss-react/mui';
import { InputBase, ListSubheader, MenuItem, Select, TextField } from '@mui/material';
import { IBiomarker } from '../Interface/IBiomarker';
import { IProps } from './ReportEntryBiomarkerRow.types';
import {
  getUnitOptions,
  onbioMarkerSelect,
  constructBiomarker,
  getSelectedItem,
  getBioMarkerOptions,
} from './ReportEntryBiomarkerRow.function';
import { Autocomplete } from '@mui/material';
import { BootstrapInput, useStyles, ValueInput } from './ReportEntryBiomarkerRow.styles';
import { checkCircle } from '../../../Registration/assets/Svgs';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ReportEntryBiomarkerRow(props: IProps) {
  const [selectedUnitId, setSelectedUnitId] = useState<any>(props.defaultUnitId || 'Select Unit');
  const [selectedBiomarkerId, setSelectedBiomarkerId] = useState(props.defaultBioMarkerId || '');
  const [units, setUnits] = useState([]);
  const { id: panelId } = useCurrentPanel();
  const biomarker = JSON.parse(JSON.stringify(props.biomarkers));
  const [biomarkers, setBiomarkers] = useState(
    biomarker.sort(
      (a: any, b: any) => a.DisplayName.localeCompare(b.DisplayName) || a.BiomarkerGroupName.localeCompare(b.BiomarkerGroupName)
    )
  );
  const [patientBiomarker, setPatientBiomarker] = useState(props.patientBiomarker);
  const [reportValue, setReportValue] = useState(props.patientBiomarker.BiomarkerReportValue);
  const [displayName, setDisplayName] = useState(props.defaultBioMarkerDisplayName || 'Select Biomarker');
  const [typeOfBiomarker, setTypeOfBiomarker] = useState(props.patientBiomarker.BiomarkerType || '');

  const [selectedBiomarkerGroupId, setSelectedBiomarkerGroupId] = useState(props.defaultBioMarkerGroupId);
  const [unitsOptions, setUnitOptions] = useState([]);
  useEffect(() => {
    getUnitOptions(
      panelId,
      selectedBiomarkerId,
      biomarkers,
      setUnitOptions,
      setUnits,
      setSelectedUnitId,
      props.sessions,
      props.selectedClient
    );
  }, []);
  const { classes } = useStyles();

  let defaultReportValue: string = patientBiomarker.BiomarkerReportValue;
  const biomarkerOptions = getBioMarkerOptions(props);

  return (
    <div>
      <div className={`report-detail-add-cmp-divs at6p ${classes.textAlignInitial}`}>
        <div className={classes.biomakerAutoSuggest}>
          <Autocomplete
            options={biomarkerOptions}
            onChange={(e, value: IBiomarker) => {
              if (value && value.Id && value.DisplayName) {
                onbioMarkerSelect(
                  panelId,
                  value,
                  setSelectedBiomarkerGroupId,
                  setSelectedBiomarkerId,
                  setUnitOptions,
                  setUnits,
                  biomarkers,
                  props.patientBiomarkers,
                  setSelectedUnitId,
                  props.sessions,
                  props.selectedClient,
                  setDisplayName,
                  setTypeOfBiomarker
                );
              }
            }}
            getOptionLabel={(option) =>
              PMS_LOCALE.translate(
                `${
                  option.DisplayName
                    ? option.DisplayName?.concat(option?.Type ? '-' : '').concat(option?.Type)
                    : 'Select Biomarker'
                }`
              )
            }
            renderOption={(options: any) => (
              <span
                title={`${
                  options.DisplayName
                    ? options.DisplayName?.concat(options?.Type ? '-' : '').concat(options?.Type)
                    : 'Select Biomarker'
                }`}
                className={classes.biomarkerOption}
              >
                {`${PMS_LOCALE.translate(options.DisplayName)} ${options?.Type ? '-' : ''} ${PMS_LOCALE.translate(options.Type)}`}
              </span>
            )}
            fullWidth
            // closeIcon=""
            id="AutoSuggestLabName"
            value={getSelectedItem(selectedBiomarkerId, selectedBiomarkerGroupId, biomarkers, displayName)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={PMS_LOCALE.translate(`Select Biomarker`)}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  endAdornment: null,
                  className: classes.biomakerAutoSuggestText,
                }}
                title={`${displayName} ${typeOfBiomarker ? '-' : ''} ${typeOfBiomarker}`}
              />
            )}
          />
        </div>
        <div>
          <ValueInput
            data-testid="iralue"
            title={reportValue || 'Enter value'}
            className={classes.valueHolder}
            placeholder={PMS_LOCALE.translate('Enter value')}
            value={reportValue}
            onChange={(e: any) => {
              let x = e.target.value;
              if (x.indexOf('.') > -1) {
                if (x.split('.').length > 2) {
                  x = reportValue;
                } else {
                  x = x.replace(/[^a-z0-9A-Z\+\-\.]/gi, '');
                }
              } else x = x.replace(/[^a-z0-9A-Z\+\-]/gi, '');
              setReportValue(x);
            }}
          />
        </div>
        <div>
          {/* <Select
            className={classes.unitSelect}
            input={<BootstrapInput />}
            value={selectedUnitId}
            title={selectedUnitId}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            onChange={(e) => {
              setSelectedUnitId(e.target.value);
            }}
          >
            <MenuItem
              key="Select unit"
              value={"Select Unit"}
              title={"Select Unit"}
              disabled={true}
            >
              {PMS_LOCALE.translate("Select Unit")}
            </MenuItem>
            {unitsOptions.map((obj: any, i: number) => (
              <MenuItem key={i} value={obj.value}>
                {PMS_LOCALE.translate(obj.label)}
              </MenuItem>
            ))}
          </Select> */}
        </div>
        <div className={classes.checkMarkStyle}>
          <span
            className={classes.checkCircle}
            onClick={() => {
              constructBiomarker(
                selectedBiomarkerId,
                selectedUnitId,
                reportValue,
                selectedBiomarkerGroupId,
                props.index,
                props.addPatientBiomarker,
                props.updateBiomarker,
                patientBiomarker,
                units,
                biomarkers,
                displayName,
                typeOfBiomarker
              );
            }}
          >
            {checkCircle}
          </span>
        </div>
      </div>
    </div>
  );
}
