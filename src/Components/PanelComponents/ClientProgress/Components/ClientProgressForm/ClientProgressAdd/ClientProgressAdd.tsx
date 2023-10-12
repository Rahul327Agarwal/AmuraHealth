import { PMS_LOCALE } from '../../../../../../Utils';
import React, { useState, useEffect } from 'react';
import { IProps } from './ClientProgressAdd.types';
import { makeStyles, withStyles } from 'tss-react/mui';
import { TextField, InputBase } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import moment from 'moment';
import { subDeleteIcon } from '../../../../../Registration/assets/Svgs';

const BootstrapInput = withStyles(InputBase, () => ({
  root: {
    'label + &': {
      marginTop: '4px',
    },
  },
  input: {
    position: 'relative',
    backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    fontSize: 12,
    color: '#FFFFFF',
    padding: '7px 20px 7px 6px !important',
    '&:focus': {
      outline: '0',
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
    '&:hover': {
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
  },
}) as any);
const BootstrapDate = withStyles(TextField, () => ({
  root: {
    '& input:valid + fieldset': {
      padding: '0px 0px !important',
    },

    '& .MuiInputBase-input': {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      color: '#FFF !important',
      height: '34px',
      // width: "210px",
      background: '#818284 !important',
    },
    '& input:valid:focus + fieldset': {
      padding: '4px !important',
    },
    '& input:valid:hover + fieldset': {
      padding: '4px !important',
    },
  },
}));
const useStyles = makeStyles()((theme) => ({
  keyBoardWidth: {
    width: '70%',
    marginTop: '7px',
  },
  dateContainer: {
    display: 'flex',
    marginBottom: '6px',
    height: '34px',
  },
  reportDate: {
    minWidth: '30%',
    margin: '10px',
    fontSize: '0.875REM',
    fontWeight: 500,
    color: '#FFFFFF',
  },
  unitSelect: {
    width: '100%',
    marginTop: '5px',
    lineHeight: '1.17em',
  },
  container: {
    display: 'flex',
    marginBottom: '6px',
  },
  ClientName: {
    minWidth: '30%',
    margin: '10px',
    fontSize: '0.875REM',
    fontWeight: 500,
    color: '#FFFFFF',
  },
  fieldStyles: {
    marginTop: '7px',
    width: '100%',
  },
  labFieldStyles: {
    marginTop: '7px',
    width: '86%',
  },
  labFieldStyles1: {
    marginTop: '7px',
    width: '100%',
  },
  inputField: {
    '& .MuiInputBase-input': {
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
  },
  uploadedReports: { display: 'flex', color: '#FFF' },
  margingForIcon: { marginRight: '8px' },
  uploadedLabel: { width: '95.1%' },
}));

export default function ClientProgressAdd(props: IProps) {
  const { classes } = useStyles();
  const { deleteprogess, handleChange, record, allPerametersList } = props;
  const [units, setUnits] = useState([]);
  const [defaultUnit, setDefaultUnit] = useState('Units');
  const current = new Date();
  const currentTime = `${current.getHours()}:${current.getMinutes()}`;
  useEffect(() => {
    setDefaultUnit(props.record.Unit);
  }, [props.record.Unit]);

  const onSelect = (value: any) => {
    if (value) {
      let unitData = allPerametersList.find((item: any) => item.Value === value).Units;
      setUnits(unitData);
      let unitsOption = unitData.length > 0 ? unitData.filter((record: any) => record.IsDefault === 1) : [];
      setDefaultUnit(unitsOption.length > 0 ? unitsOption[0].Id : 'Units');
      handleChange(value, props.record, 'Property');
    }
  };
  return (
    <div>
      <div className={classes.container}>
        <div style={{ width: '70px', marginRight: '6px', marginTop: '5px' }}>
          <BootstrapDate
            id="time"
            type="time"
            value={currentTime}
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              background: '#818284 !important',
              marginTop: 'px',
              width: '70px',
            }}
            onChange={(e) => {
              handleChange(e.target.value, props.record, 'Time');
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
        <div style={{ width: '70px', marginRight: '6px' }}>
          <Select
            className={classes.unitSelect}
            defaultValue={record.Property || 'Select Parameter'}
            input={<BootstrapInput />}
            style={{ width: '100%' }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              //   anchorEl: null,
            }}
            onChange={(e) => {
              onSelect(e.target.value);
            }}
          >
            <MenuItem key="Select Parameter" value="Select Parameter" title="Select Parameter">
              {PMS_LOCALE.translate('Select Parameter')}
            </MenuItem>
            {props.allPerametersList
              .filter((item: any) => !item.IsAdded || item.Value === record.Property)
              .map((value: any) => (
                <MenuItem key={value.Value} value={value.Value} title={value.Value}>
                  {value.Id}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div style={{ width: '70px', marginRight: '6px', marginTop: '5px' }}>
          <BootstrapInput
            data-testid="iralue"
            placeholder={PMS_LOCALE.translate('Enter value')}
            onBlur={(e) => {
              handleChange(e.target.value, props.record, 'Value');
            }}
          />
        </div>
        <div style={{ width: '70px', marginRight: '6px' }}>
          <Select
            className={classes.unitSelect}
            input={<BootstrapInput />}
            value={defaultUnit.length > 0 ? defaultUnit : 'Units'}
            disabled={units.length === 0}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              //   getContentAnchorEl: null,
            }}
            onChange={(e) => {
              handleChange(e.target.value, props.record, 'Unit');
            }}
          >
            <MenuItem key="Units" value="Units" title="Units">
              {PMS_LOCALE.translate('Units')}
            </MenuItem>
            {units.map((value: any) => (
              <MenuItem key={value.Id} value={value.Id} title={value.Id}>
                {value.Id}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: 'block',
            margin: 'auto',
          }}
          title={'Delete Progress'}
          onClick={() => {
            deleteprogess(record.Id, record.Property);
          }}
        >
          {subDeleteIcon}
        </div>
      </div>
    </div>
  );
}
