import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import { PMS_LOCALE } from '../../../../Utils';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { IAllSensitivities } from '../FoodSensitivities.types';
import { getSelectedItem } from './AddSensitivityCard.functions';
import { areaStyle, CssTextField, CssTextFieldWithValue, DescriptionTextField, useStyles } from './AddSensitivityCard.styles';
import { IProps } from './AddSensitivityCard.types';

export function AddFoodSensitivityCard(props: IProps) {
  const { classes } = useStyles();
  const [sensitivityId, setSensitivityId] = useState('');
  const [description, setDescription] = useState('');

  const { sensitivity, AllSensitivities, handleClose } = props;
  return (
    <div className={`${classes.addAllergiesList} addAllergiesList`} id={'AddAllergenContainer'}>
      <div className={classes.selectBox}>
        {sensitivityId === '' ? (
          <Autocomplete
            className={classes.allergensSelect}
            disabled={props.loadingFlag}
            options={AllSensitivities.map((value: any) => value)}
            getOptionLabel={(option: any) => option.ShortName}
            renderOption={(iprops: any, ioptions: any, { selected, ...rest }) => {
              return (
                <span
                  {...iprops}
                  title={`${ioptions.ShortName}`}
                  style={{
                    width: '300px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >{`${PMS_LOCALE.translate(ioptions.ShortName)}`}</span>
              );
            }}
            value={getSelectedItem(sensitivityId, AllSensitivities)}
            onChange={(_event, value: IAllSensitivities) => {
              if (value?.SensitivityId) {
                setSensitivityId(value.SensitivityId);
              }
            }}
            id="AutoSuggestLabName"
            renderInput={(params: any) => (
              <CssTextField
                {...params}
                placeholder={PMS_LOCALE.translate(`Search Sensitivity`)}
                classname={classes.allergensSelect}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                  disableUnderline: true,
                  className: classes.textBackground,
                }}
                title={sensitivityId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        ) : (
          <Autocomplete
            className={classes.allergensSelect}
            disabled={props.loadingFlag}
            options={AllSensitivities}
            getOptionLabel={(option: any) => option.ShortName}
            renderOption={(iprops: any, ioptions: any, { selected, ...rest }) => {
              return (
                <span
                  {...iprops}
                  title={`${ioptions.ShortName}`}
                  style={{
                    width: '300px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >{`${PMS_LOCALE.translate(ioptions.ShortName)}`}</span>
              );
            }}
            value={getSelectedItem(sensitivityId, AllSensitivities)}
            onChange={(_event, value: IAllSensitivities) => {
              if (value?.SensitivityId) {
                setSensitivityId(value.SensitivityId);
              }
            }}
            id="AutoSuggestLabName"
            renderInput={(params: any) => (
              <CssTextFieldWithValue
                {...params}
                placeholder={PMS_LOCALE.translate(`Search Sensitivity`)}
                classname={classes.allergensSelect}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                  disableUnderline: true,
                  className: classes.textBackground,
                }}
                title={sensitivityId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      </div>
      <div className={classes.descriptionBox}>
        <DescriptionTextField
          variant="outlined"
          InputProps={{ className: classes.textBackground }}
          disabled={sensitivityId === ''}
          value={description}
          className={classes.root}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          multiline
          label={PMS_LOCALE.translate('Description')}
          style={areaStyle}
          rows={5}
          placeholder={PMS_LOCALE.translate('Enter Description')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.buttonStyles}>
          <MUIButton variant="contained" className={classes.cancelIconStyle} onClick={() => handleClose(false)}>
            {PMS_LOCALE.translate('Cancel')}
          </MUIButton>
          <MUIButton
            style={{
              background:
                !sensitivityId || !description.trim() || props.loadingFlag || description.length < 50
                  ? 'rgb(86,87,91)'
                  : '#00FFC2',
              textDecoration: 'none',
              textTransform: 'none',
              color: '#000000',
            }}
            variant="contained"
            disabled={!sensitivityId || !description.trim() || props.loadingFlag || description.length < 2}
            title={'Add'}
            onClick={() => {
              props.onAddSensitivity({
                sensitivityId: sensitivityId,
                description: description,
              });
            }}
          >
            {PMS_LOCALE.translate('Add')}
          </MUIButton>
        </div>
      </div>
    </div>
  );
}
