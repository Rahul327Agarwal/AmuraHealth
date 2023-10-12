import { Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from 'tss-react/mui';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { doesUserHaveClickAccess, doesUserHaveDisabledAccess } from '../../../../Utilities/AccessPermissions';
import { PMS_LOCALE } from '../../../../Utils';
import ModalBoxWithInput from '../../Prescription/PrescriptionView/Components/ModalBox/ModalBoxWithInput';
import { IFoodSensitivityHistory } from '../FoodSensitivities.types';
import { SensitivityHistory } from '../SensitivityHistory';
import { useStyles } from './SensitivitiesCard.styles';
import { updateStateOfSensitivity } from './SensitivityCard.functions';
import { IProps } from './SensitivityCard.types';

const CustomSwitchNew = withStyles(Switch, (theme, props) => ({
  switchBase: {
    color: `#00FFCC !important`,
  },
  track: {
    backgroundColor: `rgba(0,255,204) !important`,
  },
  checked: {
    color: `#00FFCC !important`,
  },
}));

export function SensitivityCard(props: IProps) {
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const { patientId, setLoadingFlag, sensitivityName, callBack, panelWidth, parentData, sessions, selectedClient } = props;
  const [data, setData] = useState(JSON.parse(JSON.stringify(props.data)));
  const [isActive, setIsActive] = useState(false);
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  let revertValue = false;

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );

  function isActiveChange() {
    revertValue = isActive;
    setOpen(true);
  }

  function confirmStageChange(description: string) {
    setOpen(false);
    setIsActive(!isActive);
    setLoadingFlag(true);
    updateStateOfSensitivity(
      panelId,
      patientId,
      data,
      !isActive,
      description,
      callBack,
      revertToggle,
      setLoadingFlag,
      setData,
      sessions,
      selectedClient
    );
  }

  function revertToggle() {
    setIsActive(revertValue);
  }

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    setIsActive(props?.data?.CurrentState?.IsActive && props?.data?.CurrentState?.IsActive.toString() === '1');
  }, []);

  useEffect(() => {
    let tempData = data?.Descriptions || [];
    tempData.sort((a, b) => {
      let dateA = a.UpdatedOn;
      let dateB = b.UpdatedOn;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    setHistoryData(tempData);
    let sensitivityList = JSON.parse(JSON.stringify(parentData));
    let alreadyAddedSensitivity =
      sensitivityList?.Sensitivitys?.find((value) => value.SensitivityId.toLowerCase() === sensitivityName.toLowerCase()) || null;
    if (alreadyAddedSensitivity) {
      if (alreadyAddedSensitivity?.Descriptions?.length < data?.Descriptions?.length) {
        alreadyAddedSensitivity.Descriptions = data.Descriptions;
        sensitivityList?.Sensitivitys?.map((value) => {
          if (value.SensitivityId.toLowerCase() === sensitivityName.toLowerCase()) {
            return alreadyAddedSensitivity;
          } else {
            return value;
          }
        });
        callBack(JSON.parse(JSON.stringify(sensitivityList)));
      }
    }
  }, [data]);

  useEffect(() => {
    setData(props.data);
    if (props.data.Descriptions.length > data.Descriptions.length) {
      setIsActive(props?.data?.CurrentState?.IsActive && props?.data?.CurrentState?.IsActive.toString() === '1');
      setData(props.data);
    }
  }, [props.data]);

  const expandFunction = () => {
    setExpand(!expand);
  };

  return (
    <div className={classes.allergenCard}>
      <div
        style={{
          display: 'grid',
          gridGap: '1.5%',
          gridTemplateColumns: panelWidth && parseFloat(panelWidth) > 376 ? '88.5% 10%' : '83.5% 15%',
        }}
      >
        <div
          className={classes.allergenHeader}
          onClick={(event) => {
            setExpand(!expand);
          }}
        >
          <h4 className={classes.allergyTitle} title={sensitivityName}>
            {PMS_LOCALE.translate(sensitivityName)}
          </h4>
        </div>
        <div style={{ textAlign: 'end' }}>
          <CustomSwitchNew
            disabled={doesUserHaveDisabledAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.2A')}
            checked={isActive}
            size="small"
            onChange={() => {
              if (doesUserHaveClickAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.2A'))
                isActiveChange();
            }}
          />
        </div>
      </div>
      {expand ? (
        <div className="">
          {historyData.length
            ? historyData.map((sensitivity: IFoodSensitivityHistory, index: number) => {
                return (
                  <SensitivityHistory
                    key={sensitivity.DescriptionId}
                    updatedOn={sensitivity.UpdatedOn}
                    sensitivityDescription={sensitivity.Description}
                    panelWidth={panelWidth}
                    isExpanded={expand}
                  />
                );
              })
            : null}
        </div>
      ) : (
        <div
          className=""
          style={{ cursor: 'pointer' }}
          onClick={() => {
            expandFunction();
          }}
        >
          {historyData.length > 5
            ? historyData.slice(0, 5).map((sensitivity: IFoodSensitivityHistory, index: number) => {
                return (
                  <SensitivityHistory
                    key={sensitivity.DescriptionId}
                    updatedOn={sensitivity.UpdatedOn}
                    sensitivityDescription={sensitivity.Description}
                    panelWidth={panelWidth}
                    isExpanded={expand}
                  />
                );
              })
            : historyData?.map((sensitivity: IFoodSensitivityHistory, index: number) => {
                return (
                  <SensitivityHistory
                    key={sensitivity.DescriptionId}
                    updatedOn={sensitivity.UpdatedOn}
                    sensitivityDescription={sensitivity.Description}
                    panelWidth={panelWidth}
                    isExpanded={expand}
                  />
                );
              })}
        </div>
      )}
      <ModalBoxWithInput
        open={open}
        handleClosePopOver={() => {
          setOpen(false);
        }}
        handleSubmitPopOver={confirmStageChange}
        panelWidth={panelWidth}
      />
    </div>
  );
}
