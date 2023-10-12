import { Button, InputBase } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { makeStyles, withStyles } from 'tss-react/mui';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { PMS_LOCALE, PMS_S3 } from '../../../../../Utils';
import ErrorToaster from './../../../../../Common/ErrorToaster';
import ClientProgressAdd from './ClientProgressAdd/ClientProgressAdd';
import { IProps } from './ClientProgressForm.types';

const useStyles = makeStyles()((theme) => ({
  keyBoardWidth: {
    width: '70%',
    marginTop: '7px',
  },
  container: {
    display: 'grid',
    marginBottom: '6px',
    gridTemplateColumns: '40% 60%',
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
    width: '100%',
  },
  uploadedReports: {
    display: 'flex',
    color: '#FFF',
  },
  margingForIcon: { marginRight: '8px' },
  uploadedLabel: {
    width: '95.1%',
    marginLeft: '10px',
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
  panelContainer: {
    height: 'inherit',
    overflow: 'auto',
  },
  emptyContainer: {
    border: '1px solid rgb(255, 255, 255)',
    borderRadius: '3px',
    height: '58px',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '51px',
    padding: '4px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '14px',
  },
  inputField: {
    '& .MuiInputBase-input': {
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
  },
}));

const BootstrapInput = withStyles(
  InputBase,
  () =>
    ({
      root: {
        'label + &': {
          marginTop: '4px',
        },
      },
      input: {
        position: 'relative',
        backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
        fontSize: 12,
        color: '#FFF',
        padding: '7px 20px 7px 6px !important',
        '&:focus': {
          outline: '0',
          backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
        },
        '&:hover': {
          backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
        },
      },
    } as any)
);

const allPerametersList = [
  {
    Id: 'Height',
    Value: 'Height',
    Units: [
      { Id: 'cm', ShortName: 'cm', IsDefault: 1 },
      { Id: 'Inch', ShortName: 'inch', IsDefault: 0 },
    ],
    IsAdded: false,
  },
  {
    Id: 'Weight',
    Value: 'Weight',
    Units: [
      { Id: 'kg', ShortName: 'kg', IsDefault: 1 },
      { Id: 'g', ShortName: 'g', IsDefault: 0 },
    ],
    IsAdded: false,
  },
  {
    Id: 'Waist',
    Value: 'Waist',
    Units: [
      { Id: 'cm', ShortName: 'cm', IsDefault: 1 },
      { Id: 'Inch', ShortName: 'inch', IsDefault: 0 },
    ],
    IsAdded: false,
  },
  {
    Id: 'Chest',
    Value: 'Chest',
    Units: [
      { Id: 'cm', ShortName: 'cm', IsDefault: 1 },
      { Id: 'Inch', ShortName: 'inch', IsDefault: 0 },
    ],
    IsAdded: false,
  },
  {
    Id: 'Hip',
    Value: 'Hip',
    Units: [
      { Id: 'cm', ShortName: 'cm', IsDefault: 1 },
      { Id: 'Inch', ShortName: 'inch', IsDefault: 0 },
    ],
    IsAdded: false,
  },
  { Id: 'BP_DIA', Value: 'BP_DIA', Units: [{ Id: 'mmHg', ShortName: 'mmHg', IsDefault: 1 }], IsAdded: false },
  { Id: 'BP_SYS', Value: 'BP_SYS', Units: [{ Id: 'mmHg', ShortName: 'mmHg', IsDefault: 1 }], IsAdded: false },
  { Id: 'Glucose', Value: 'Glucose', Units: [{ Id: 'mg/dL', ShortName: 'mg/dL', IsDefault: 1 }], IsAdded: false },
  { Id: 'Food Added', Value: 'FoodAdded', Units: [], IsAdded: false },
  { Id: 'Protocol Name', Value: 'ProtocolName', Units: [], IsAdded: false },
  { Id: 'Intolerence', Value: 'Intolerence', Units: [], IsAdded: false },
];

export default function TenantAdd(props: IProps) {
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [progessList, setprogessList] = useState([]);
  const [dummyRender, setDummyrender] = useState(false);
  const [listData, setListData] = useState(allPerametersList);
  const [dayValue, setDayValue] = useState('1');

  const handleChange = (panelId: string, index: any, roles: any, type: string) => {
    let tempObj = progessList;
    const newList = listData;
    tempObj.forEach((value: any) => {
      if (value.Id !== roles.Id) return;
      value[type] = index;
      if (type === 'Property') {
        const selectedObject = newList.find((item) => item.Value === index);
        let selectedUnits = selectedObject ? selectedObject.Units : [];
        let defaultUnit = selectedUnits.filter((record) => record.IsDefault === 1);
        let defaultId = defaultUnit.length > 0 ? defaultUnit[0].Id : '';
        value.Unit = defaultId;
      }
    });
    setprogessList(tempObj);
    if (type === 'Property') {
      newList.forEach((item) => {
        if (item.Value === index) {
          item.IsAdded = true;
        }
      });
      setListData(newList);
    }
    setDummyrender(!dummyRender);
  };
  const deleteprogess = (index: string, key: string) => {
    let tempObj = progessList;
    tempObj = tempObj.filter((value: any) => value.Id !== index);
    const newList = listData;
    newList.forEach((item) => {
      if (item.Value === key) {
        item.IsAdded = false;
      }
    });
    setListData(newList);
    setprogessList(tempObj);
  };
  const onSave = async () => {
    const isoDate = moment(moment()).format('YYYY-MM-DD');
    const newProgressList = [...progessList];
    newProgressList.forEach((record: any) => {
      record.Date = moment(`${isoDate} , ${record.Time}`).format();
    });
    const reduceObject = newProgressList.reduce(function (r: any, a: any) {
      r[a.Property] = r[a.Property] || [];
      r[a.Property].push(a);
      return r;
    }, Object.create(null));

    let objectToSend: any = {};

    Object.keys(reduceObject).forEach((value: string) => {
      if (value) {
        const singleProgess = reduceObject[value][0];
        delete singleProgess.Property;
        delete singleProgess.Time;
        delete singleProgess.Id;
        objectToSend[value] = singleProgess;
      }
    });

    const object = {
      EventName: 'patient-progress-add',
      PatientId: props.patientId,
      ProgressId: '',
      Date: isoDate,
      Day: dayValue,
      url: `${import.meta.env.VITE_EVENT_API}`,
      token: props.sessions.id_token,
      method: 'POST',
      headers: {},
      ...objectToSend,
    };
    const response = await PMS_S3.postData(object);
    if (response?.Error) {
      const newList = listData;
      newList.forEach((item) => {
        if (item.IsAdded) {
          item.IsAdded = false;
        }
      });
      setListData(newList);
      setDummyrender(!dummyRender);
      setprogessList([]);
      ErrorToaster(response?.Error.data, panelId, 'error');
    } else {
      const newList = listData;
      newList.forEach((item) => {
        if (item.IsAdded) {
          item.IsAdded = false;
        }
      });
      setListData(newList);
      setListData([...allPerametersList]);
      setprogessList([]);
      setDummyrender(!dummyRender);
    }
  };

  return (
    <div className={classes.panelContainer}>
      <div className={classes.dateContainer}>
        <div title="Date" className={classes.reportDate}>
          {PMS_LOCALE.translate('Date')}
        </div>
        <div className=""></div>
      </div>

      <div className={classes.dateContainer}>
        <div title="Day Value" className={classes.reportDate}>
          {PMS_LOCALE.translate('Day value')}
        </div>
        <div className="">
          <BootstrapInput
            data-testid="iralue"
            title="Enter value"
            style={{ width: '100px' }}
            defaultValue={dayValue}
            type="number"
            placeholder={PMS_LOCALE.translate('Enter value')}
            onBlur={(e) => {
              setDayValue(e.target.value);
            }}
          />
        </div>
      </div>

      {progessList.map((value: any) => (
        <div
          key={value.Id}
          style={{
            border: '1px solid rgb(255, 255, 255)',
            marginBottom: '10px',
            padding: '6px',
            margin: '5px',
          }}
        >
          <ClientProgressAdd
            record={value}
            deleteprogess={deleteprogess}
            handleChange={handleChange}
            allPerametersList={listData}
          />
        </div>
      ))}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '100%',
          marginTop: '10px',
          marginBottom: '5px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            style={{
              background: '#00FFC2',
              textDecoration: 'none',
              textTransform: 'none',
              color: '#000000',
            }}
            onClick={() => {
              onSave();
            }}
            title={'Save'}
          >
            {PMS_LOCALE.translate('Save')}
          </Button>
        </div>
      </div>
    </div>
  );
}
