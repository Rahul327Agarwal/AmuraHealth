import React, { useState } from 'react';
import Button from './../../LibraryComponents/MUIButton/MUIButton';
import InputField from './../../LibraryComponents/InputField/InputField';
import { useStyles } from './PhlebotomyView.styles';
import { IProps } from './PhlebotomyView.types';
import axios from 'axios';
import PanelFooter from './../../LibraryComponents/PanelFooter/PanelFooter';
import PanelHeader from './../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';
import { downArrow } from '../../Registration/assets/Svgs';
import { PhoneIcon } from '../../SVGs/Common';

const phleboRawData = {
  urlImg: 'https://image.shutterstock.com/image-photo/thailand-ko-samui-panorama-twilight-260nw-232653724.jpg',
  bioData: {
    lipid: ['HDL', 'LDL', 'SDL', 'MDL'],
    lipid2: ['HDL', 'LDL', 'SDL', 'MDL'],
    lipd3: ['HDL', 'LDL', 'SDL', 'MDL'],
  },
  titleName: 'Test Pacakage',
  price: 1000,
  message:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi excepturi est voluptatem pariatur possimus delectus quaerat veniam consequuntur dolores saepe autem adipisci dicta enim harum maxime, similique placeat. Soluta, ratione',
  submessage: 'this is available in india',
};

export default function PhlebotomyView(props: IProps) {
  const { classes } = useStyles();
  const { injectComponent, url, label, bioData, titleName, price, message, submessage } = props;
  const [errorText, setErrorText] = useState('Not Available');
  const [pincode, setPinCode] = useState('');
  const [errors, setErrors] = useState({
    isValide: false,
    isChecked: false,
  });
  const [isBiomarker, setIsBiomarker] = useState(false);

  const handleCheckPincode = async () => {
    if (!isNaN(parseInt(pincode))) {
      let url = 'https://api-mware-dev.i2h.ai/rest/v1/token';
      axios
        .get(url, {
          headers: {
            'api-key': 'TK',
            'api-secret': 'TS',
          },
        })
        .then((response) => {
          //console.log(response, "fortoken");
          if (response.status === 200) {
            let url2 = `https://api-mware-dev.i2h.ai/rest/v1/zipcode/${pincode}`;
            const token = `${response.data.data.token}`;
            axios
              .get(url2, { headers: { token: `${token}` } })
              .then((response) => {
                // console.log(response, "pincode");
                if (response.status) {
                  if (response.data.data.city) {
                    setErrors({
                      isValide: true,
                      isChecked: true,
                    });
                  } else {
                    setErrors({ isValide: false, isChecked: true });
                    setErrorText('Not Available');
                  }
                }
              })
              .catch((error) => {
                setErrors({ isValide: false, isChecked: true });
                setErrorText('Enter valid Pincode');
              });
          }
        })
        .catch((Error) => {
          setErrors({ isValide: false, isChecked: true });
          setErrorText('Something went wrong in tokenurl');
        });
    } else {
      setErrors({ isValide: false, isChecked: true });
      setErrorText('Enter valid Pincode');
    }
  };

  const handleChange = (value: any) => {
    if (errors.isChecked) setErrors((pre) => ({ ...pre, isChecked: false }));
    setPinCode(value);
  };

  const handleBookTest = () => {};

  return (
    <div className={classes.mainConatainer}>
      <PanelHeader
        title={phleboRawData.titleName}
        injectComponent={injectComponent}
        iconTray={
          <div className={classes.displayFlex}>
            <span className={classes.cursor}>{<PhoneIcon />}</span>
          </div>
        }
      />
      <div className={classes.bodyCon}>
        <div className={classes.imgCon}>
          <img src={phleboRawData.urlImg} className={classes.imgstyle} />
        </div>
        <p className={classes.message}>{phleboRawData.message}</p>
        <p className={classes.message}>{phleboRawData.submessage}</p>
        <div className={classes.pincodeDiv}>
          <InputField
            label="Check Pincode for Availability"
            value={pincode}
            // errorText={errorText as any} TODO:
            error={errors.isChecked && !errors.isValide}
            placeholder={'Enter Pincode'}
            onChange={(e: any) => handleChange(e)}
            className={classes.inputStyle}
            // endAdornmentIcon={errors.isChecked ? (errors.isValide ? ValidIcon : InvalidIcon) : ""} TODO:
          />

          <span
            className={`${classes.checkLabel} ${
              errors.isChecked ? (errors.isValide ? classes.disabled : classes.reposition) : ''
            }`}
            onClick={handleCheckPincode}
          >
            Check
          </span>
        </div>
        <div className={classes.textStyle} onClick={() => setIsBiomarker(!isBiomarker)}>
          {isBiomarker ? 'Hide' : 'Show'} Biomarker groups
          <span className={isBiomarker ? classes.arrowDown : classes.arrowUp}>{downArrow}</span>
        </div>
        {isBiomarker &&
          Object.keys(phleboRawData.bioData).map((key, index) => {
            return (
              <div
                key={key}
                className={`${classes.biomarkerDataCon} ${
                  Object.keys(phleboRawData.bioData).length - 1 !== index ? classes.bottomBorder : ' '
                }`}
              >
                <div className={classes.biomarkerKey}>
                  <span className={classes.biomarkerKeydiscription}>{key}-</span>
                </div>
                <div className={classes.biomarkerValueConTotal}>
                  {(phleboRawData.bioData as any)[key].map((value: any) => (
                    <div className={classes.biomarkerValueCon} key={value}>
                      <span className={classes.biomarkerValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      {/* <div className={classes.footerDiv}>
        <span className={classes.price}>{`$${phleboRawData.price}/-`}</span>
        <Button disabled={!errors.isValide} handleClick={handleBookTest} label={"Book To Test"} />
      </div> */}
      {/* TODO: <PanelFooter
        injectComponent={
          <div className={classes.fixedFooter}>
            <div className={classes.priceItemsCon}>
              <span>{`$${phleboRawData.price}/-`}</span>
            </div>
            <div className={classes.buttonItemsCon}>
              <Button disabled={!errors.isValide} handleClick={handleBookTest} label={"Book To Test"} />            </div>
          </div>
        }
      /> */}
    </div>
  );
}
