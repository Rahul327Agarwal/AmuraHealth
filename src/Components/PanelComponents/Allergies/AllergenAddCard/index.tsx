import { Autocomplete, Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { PMS_LOCALE } from '../../../../Utils';
import { IAllAllergen } from '../Allergies.types';
import { getSelectedItem } from './AllergenAddCard.function';
import { CssTextField, CssTextFieldWithValue, DescriptionTextField, areaStyle, useStyles } from './AllergenAddCard.styles';
import { IProps } from './AllergenAddCard.types';

export function AddAllergenCard(props: IProps) {
  const { classes } = useStyles();
  const [allergenId, setAllergenID] = useState('');
  const [description, setDescription] = useState('');

  const { Allergens, AllAllergens, handleClose, panelWidth } = props;

  return (
    <div className="addAllergiesList" id={'AddAllergenContainer'}>
      <div className={classes.selectBox}>
        {allergenId === '' ? (
          <Autocomplete
            className={classes.allergensSelect}
            disabled={props.loadingFlag}
            options={AllAllergens}
            getOptionLabel={(option: any) => option.ShortName}
            // renderOption={(option: any) => (
            //   <span
            //     title={`${option.ShortName}`}
            //     style={{
            //       width: '300px',
            //       textOverflow: 'ellipsis',
            //       overflow: 'hidden',
            //       whiteSpace: 'nowrap',
            //     }}
            //   >{`${PMS_LOCALE.translate(option.ShortName)}`}</span>
            // )}
            // closeIcon=""
            value={getSelectedItem(allergenId, AllAllergens)}
            onChange={(_event, value: IAllAllergen) => {
              if (value?.AllergenId) {
                setAllergenID(value.AllergenId);
              }
            }}
            id="AutoSuggestLabName"
            renderInput={(params: any) => (
              <CssTextField
                {...params}
                placeholder={PMS_LOCALE.translate(`Search Allergen`)}
                classname={classes.allergensSelect}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                  disableUnderline: true,
                  className: classes.textBackground,
                }}
                title={allergenId}
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
            options={AllAllergens}
            getOptionLabel={(option: any) => option.ShortName}
            // renderOption={(option: any) => (
            //   <span
            //     title={`${option.ShortName}`}
            //     style={{
            //       width: '300px',
            //       textOverflow: 'ellipsis',
            //       overflow: 'hidden',
            //       whiteSpace: 'nowrap',
            //     }}
            //   >{`${PMS_LOCALE.translate(option.ShortName)}`}</span>
            // )}
            // closeIcon=""
            value={getSelectedItem(allergenId, AllAllergens)}
            onChange={(_event, value: IAllAllergen) => {
              if (value?.AllergenId) {
                setAllergenID(value.AllergenId);
              }
            }}
            id="AutoSuggestLabName"
            renderInput={(params: any) => (
              <CssTextFieldWithValue
                {...params}
                placeholder={PMS_LOCALE.translate(`Search Allergen`)}
                classname={classes.allergensSelect}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                  disableUnderline: true,
                  className: classes.textBackground,
                }}
                title={allergenId}
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
          disabled={allergenId === ''}
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
          <Button variant="contained" className={classes.cancelIconStyle} onClick={() => handleClose(false)}>
            {PMS_LOCALE.translate('Cancel')}
          </Button>
          <Button
            style={{
              background:
                !allergenId || !description.trim() || props.loadingFlag || description.length < 50 ? 'rgb(86,87,91)' : '#00FFC2',
              textDecoration: 'none',
              textTransform: 'none',
              color: '#000000',
            }}
            variant="contained"
            disabled={!allergenId || !description.trim() || props.loadingFlag || description.length < 2}
            title={'Add'}
            onClick={() => {
              props.onAddAlergen({
                allergenId: allergenId,
                description: description,
              });
            }}
          >
            {PMS_LOCALE.translate('Add')}
          </Button>
        </div>
      </div>
    </div>
  );
}
