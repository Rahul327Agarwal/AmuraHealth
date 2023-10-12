import { FormControlLabel, Popover, Radio, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  getSortingOptions,
  setNoRamping,
  sortingProducts,
  splitProducts,
  updateProducts,
  updateRamping,
  validateRampingDays,
} from './PrescriptionNutritionProtocol.functions';
import { useStyles } from './PrescriptionNutritionProtocol.styles';
import { IProps } from './PrescriptionNutritionProtocol.types';
import SelectComponentEdit from '../Components/SelectComponentEdit';
import { PMS_LOCALE } from '../../../../../Utils';
import SliderMaterialUI from '../Components/SliderMaterialUI';
import MUISelect from '../../../../LibraryComponents/MUISelect/MUISelect';

export default function PrescriptionNutritionProtocol(props: IProps) {
  const {
    products,
    defaultNoRamping,
    setTreatedProducts,
    prescriptionLength,
    setIsPrescriptionApproved,
    setIsProtocolsLoaded,
    errorMessages,
    setErrorMessages,
    prescriptionKey,
    prescriptionHistory,
  } = props;
  const [productsData, setProductsData] = useState([]);
  const [anchorel, setAnchorel] = useState(null);
  const [open, setOpen] = useState(false);
  const [dataForPopOver, setDataForPopOver] = useState([]);
  const [typeOfRampingSelected, setTypeOfRampingSelected] = useState('');
  const [popOverIndex, setPopOverIndex] = useState(null);
  const [popOveObject, setPopOverObject] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [sortingDropdown, setSortingDropdown] = useState(getSortingOptions());

  const { classes } = useStyles();

  useEffect(() => {
    setProductsData(
      sortingProducts(
        sortOrder,
        splitProducts(products, prescriptionLength, setErrorMessages, setIsProtocolsLoaded, prescriptionKey, prescriptionHistory)
      )
    );
  }, [products, prescriptionHistory]);

  useEffect(() => {
    if (defaultNoRamping) {
      setProductsData(setNoRamping(productsData));
    }
  }, [defaultNoRamping]);

  useEffect(() => {
    if (productsData.length > 0) {
      setTreatedProducts(productsData);
    }
  }, [productsData]);

  const onChangeRamping = (e: any) => {
    if (validateRampingDays(e.target.value, popOverIndex, productsData, typeOfRampingSelected)) {
      setProductsData(updateRamping(e.target.value, popOverIndex, productsData, typeOfRampingSelected));
      setOpen(false);
      setIsPrescriptionApproved(false);
    } else {
      setErrorMessages('The prescription period is too short for the selected ramping.');
      setOpen(false);
    }
  };

  return (
    <div className={classes.prescriptioncmpsection}>
      <div className={classes.prescriptionCard}>
        <div className={classes.nutrientTitle}>
          <h3 className={classes.conditionHeader}>{PMS_LOCALE.translate('Nutrition Protocols')}</h3>
          <div>
            <MUISelect
              options={sortingDropdown.map((value) => ({
                value: value.id,
                label: value.id,
              }))}
              labelId={'sorting'}
              onChange={(e) => {
                let selectedOption = sortingDropdown.find((value) => value.id === e.target.value);
                setSortOrder(selectedOption.id);
                setProductsData(sortingProducts(selectedOption.id, productsData));
              }}
              value={sortOrder}
            />
          </div>
        </div>
        {productsData?.length > 0 ? (
          productsData.map((productObj, index) => (
            <div className={classes.productsContainer}>
              <div className={`${classes.textOverFlow} ${classes.productTitle}`}>
                <span title={`${productObj.ProductName}`}>{PMS_LOCALE.translate(`${productObj.ProductName}`)}</span>
              </div>
              <SliderMaterialUI
                disableSlider={prescriptionKey ? true : false}
                value={JSON.parse(JSON.stringify(productObj.daysRange))}
                handleChange={(value) => {
                  setIsPrescriptionApproved(false);
                  setProductsData(updateProducts(value, index, productsData));
                }}
                initialIndex={productObj.startDay}
                lastIndex={productObj.endDay}
              />
              <div className={classes.contentsBelowSlider}>
                <div className={`${classes.rampingIcons} ${prescriptionKey ? classes.disableRampingIcons : ''}`}>
                  <span
                    onClick={(event) => {
                      if (productObj.hasRampUp) {
                        setPopOverIndex(index);
                        setPopOverObject(productObj);
                        setTypeOfRampingSelected('rampUp');
                        setAnchorel(event.currentTarget);
                        setOpen(true);
                        setDataForPopOver(productObj.rampUpDropdown);
                      }
                    }}
                    className={classes.rampUpStyle}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.5"
                        y="0.5"
                        width="23"
                        height="23"
                        rx="2.5"
                        fill={productObj.selectedRampUp ? '#252427' : productObj.hasRampUp ? '#A6A6A6' : '#E1E1E1'}
                        stroke={productObj.selectedRampUp ? '#252427' : productObj.hasRampUp ? '#E1E1E1' : '#F1F1F1'}
                      />
                      <path
                        d="M3 20V4C7.83167 11.6296 11.8386 15.0916 21 20H3Z"
                        fill={productObj.selectedRampUp ? '#FFFFFF' : productObj.hasRampUp ? '#FFFFFF' : '#F1F1F1'}
                      />
                    </svg>
                  </span>
                  <span
                    onClick={(event) => {
                      if (productObj.hasRampDown) {
                        setPopOverIndex(index);
                        setPopOverObject(productObj);
                        setTypeOfRampingSelected('rampDown');
                        setAnchorel(event.currentTarget);
                        setOpen(true);
                        setDataForPopOver(productObj.rampDownDropdown);
                      }
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.5"
                        y="0.5"
                        width="23"
                        height="23"
                        rx="2.5"
                        fill={productObj.selectedRampDown ? '#252427' : productObj.hasRampDown ? '#A6A6A6' : '#E1E1E1'}
                        stroke={productObj.selectedRampDown ? '#252427' : productObj.hasRampDown ? '#E1E1E1' : '#F1F1F1'}
                      />
                      <path
                        d="M3 20V4C7.83167 11.6296 11.8386 15.0916 21 20H3Z"
                        fill={productObj.selectedRampDown ? '#FFFFFF' : productObj.hasRampDown ? '#FFFFFF' : '#F1F1F1'}
                      />
                    </svg>
                  </span>
                </div>
                <span className={classes.timingSpan}>{PMS_LOCALE.translate(`${productObj.dosageTime}`)}</span>
                <span className={classes.timingSpan}>{PMS_LOCALE.translate(`${productObj.dosage}`)}</span>
                <span className={classes.daysRange} title={`Day ${productObj.daysRange[0]} - Day ${productObj.daysRange[1]}`}>
                  {PMS_LOCALE.translate(`Day ${productObj.daysRange[0]} - Day ${productObj.daysRange[1]}`)}
                </span>
              </div>
              <div className={classes.productWithFood}>{PMS_LOCALE.translate(`${productObj.ProductWithFood}`)}</div>
              <div className={classes.rampingDiv}>
                <div>
                  {PMS_LOCALE.translate(
                    `${
                      productObj.selectedRampUp && productObj.selectedRampUp !== 'No Ramping'
                        ? productObj.selectedRampUp
                        : 'No ramp up'
                    }`
                  )}
                </div>

                <div className={classes.rampDown}>
                  {PMS_LOCALE.translate(
                    `${
                      productObj.selectedRampDown && productObj.selectedRampDown !== 'No Ramping'
                        ? productObj.selectedRampDown
                        : 'No ramp down'
                    }`
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.emptyProducts}>
            <span>{PMS_LOCALE.translate('No Products assigned.')}</span>
          </div>
        )}
      </div>
      {open ? (
        <Popover
          open={open}
          anchorEl={anchorel}
          onClose={() => {
            setOpen(false);
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <RadioGroup
            className={classes.radioGroup}
            onChange={(e) => {
              onChangeRamping(e);
            }}
            value={typeOfRampingSelected === 'rampUp' ? popOveObject.selectedRampUp : popOveObject.selectedRampDown}
          >
            <FormControlLabel
              value="No Ramping"
              control={<Radio className={`${classes.radioStyle} radioButton`} />}
              labelPlacement="start"
              label={
                <div
                  className={popOveObject.selectedRampUp === 'No Ramping' ? classes.selectedNoRampingText : classes.noRampingText}
                >
                  {PMS_LOCALE.translate('No ramping')}
                </div>
              }
            />
            <div className={classes.footerContent} />
            {dataForPopOver
              ? dataForPopOver.map((item: any) => (
                  <FormControlLabel
                    value={item.ramp_id}
                    control={<Radio className={'radioButton'} />}
                    labelPlacement="start"
                    label={
                      <div
                        className={
                          popOveObject.selectedRampUp === item.ramp_id || popOveObject.selectedRampDown === item.ramp_id
                            ? classes.selectedRamping
                            : classes.notSelectedRamping
                        }
                      >
                        {item.ramp_id}
                      </div>
                    }
                  />
                ))
              : ''}
          </RadioGroup>
        </Popover>
      ) : null}
    </div>
  );
}
