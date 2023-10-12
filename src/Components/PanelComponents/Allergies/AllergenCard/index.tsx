import { Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, withStyles } from 'tss-react/mui';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { doesUserHaveClickAccess, doesUserHaveDisabledAccess } from '../../../../Utilities/AccessPermissions';
import { PMS_LOCALE } from '../../../../Utils';
import ModalBoxWithInput from '../../Prescription/PrescriptionView/Components/ModalBox/ModalBoxWithInput';
import { AllergenHistory } from '../AllergenHistory';
import { IAllergenHistory } from '../Allergies.types';
import { IRootState } from './../../../../DisplayFramework/State/store';
import { updateStateOfAllergen } from './AllergenCard.functions';
import { IProps } from './AllergenCard.types';

const CustomSwitch = withStyles(Switch, (_theme, _params, classes) => ({
  switchBase: {
    color: 'rgba(255, 255, 255, 0.6)',
    [`& + .${classes.track}`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    [`&.${classes.checked}`]: {
      color: '#00FFCC',
    },
    [`&.${classes.checked} + .${classes.track}`]: {
      backgroundColor: 'rgba(0,255,204)',
    },
  },
  checked: {},
  track: {},
}));

const useStyles = makeStyles()({
  unitSelectButton: {
    marginLeft: '2px',
    cursor: 'pointer',
    '&:hover': {
      color: '#00ffcc !important',
    },
  },
});

export function AllergenCard(props: IProps) {
  const { patientId, setLoadingFlag, allergenName, callBack, panelWidth, parentData, selectedClient, sessions } = props;
  const [data, setData] = useState(JSON.parse(JSON.stringify(props.data)));
  const [isActive, setIsActive] = useState(false);
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: panelId } = useCurrentPanel();
  let revertValue = false;

  function isActiveChange() {
    revertValue = isActive;
    setOpen(true);
  }

  function confirmStageChange(description: string) {
    setOpen(false);
    setIsActive(!isActive);
    setLoadingFlag(true);
    updateStateOfAllergen(
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

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  useEffect(() => {
    let tempData = data?.Descriptions || [];
    tempData.sort((a: any, b: any) => {
      let dateA = a.UpdatedOn;
      let dateB = b.UpdatedOn;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    setHistoryData(tempData);
    let clonedParentObject = JSON.parse(JSON.stringify(parentData));
    let alreadyAddedAllergen =
      clonedParentObject?.Allergens?.find((value: any) => value.AllergenId.toLowerCase() === allergenName.toLowerCase()) || null;
    if (alreadyAddedAllergen) {
      if (alreadyAddedAllergen?.Descriptions?.length < data?.Descriptions?.length) {
        alreadyAddedAllergen.Descriptions = data.Descriptions;
        clonedParentObject?.Allergens?.map((value: any) => {
          if (value.AllergenId.toLowerCase() === allergenName.toLowerCase()) {
            return alreadyAddedAllergen;
          } else {
            return value;
          }
        });
        callBack(JSON.parse(JSON.stringify(clonedParentObject)));
      }
    }
  }, [data]);

  useEffect(() => {
    setData(props.data);
    if (props.data.Descriptions.length > data.Descriptions.length) {
      setIsActive(props?.data?.CurrentState?.IsActive && props?.data?.CurrentState?.IsActive.toString() === '1');
    }
  }, [props.data]);

  const expandFunction = () => {
    setExpand(!expand);
  };
  return (
    <div className={'AllergenCard'}>
      <div
        style={{
          display: 'grid',
          gridGap: '1.5%',
          gridTemplateColumns: panelWidth && parseFloat(panelWidth) > 376 ? '88.5% 10%' : '83.5% 15%',
        }}
      >
        <div
          className="allergen-Header"
          onClick={() => {
            expandFunction();
          }}
        >
          <h4 className="allergy-title" title={allergenName}>
            {PMS_LOCALE.translate(allergenName)}
          </h4>
        </div>
        <div style={{ textAlign: 'end' }}>
          <CustomSwitch
            disabled={doesUserHaveDisabledAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.2A')}
            checked={isActive}
            size="small"
            onChange={() => {
              if (doesUserHaveClickAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.2A')) isActiveChange();
            }}
          />
        </div>
      </div>
      {expand ? (
        <div className="">
          {historyData.length
            ? historyData.map((allergen: IAllergenHistory, index: number) => {
                return (
                  <AllergenHistory
                    key={allergen.DescriptionId}
                    updatedOn={allergen.UpdatedOn}
                    AllergenDescription={allergen.Description}
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
            ? historyData.slice(0, 5).map((allergen: IAllergenHistory) => {
                return (
                  <AllergenHistory
                    key={allergen.DescriptionId}
                    updatedOn={allergen.UpdatedOn}
                    AllergenDescription={allergen.Description}
                    panelWidth={panelWidth}
                    isExpanded={expand}
                  />
                );
              })
            : historyData.length
            ? historyData.map((allergen: IAllergenHistory) => {
                return (
                  <AllergenHistory
                    key={allergen.DescriptionId}
                    updatedOn={allergen.UpdatedOn}
                    AllergenDescription={allergen.Description}
                    panelWidth={panelWidth}
                    isExpanded={expand}
                  />
                );
              })
            : null}
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
