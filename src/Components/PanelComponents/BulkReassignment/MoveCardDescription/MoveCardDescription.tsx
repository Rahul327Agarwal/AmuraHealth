import { memo, useCallback, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { PMS_LOCALE } from '../../../../Utils';
import InputField from '../../../LibraryComponents/InputField/InputField';
import Checkbox from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import ModalBox from '../../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import WithIconContainer from '../../TimeManagement/Components/WithIconContainer';
import { AmuraIcon2, MyListIconNew } from '../BulkReassignment.svg';
import { DEFAULT_ERRORSTATE, DEFAULT_FIELDSTATE } from '../MoveCardRequest/MoveCardRequest.function';
import { handleSave, validateMoveCard } from './MoveCardDescription.function';
import { useStyles } from './MoveCardDescription.styles';
import { IError, IProps, RequestDescription } from './MoveCardDescription.types';
const MemoInputField = memo(InputField);

export default function MoveCardDescription(props: IProps) {
  const goBack = useDFGoBack();
  const { setScreen, selectedRoleCards, panel, setFieldState, setErrors, setSelectedRoleCards } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [sameDescription, setSameDescription] = useState(false);
  const [commonDescription, setCommonDescription] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [description, setDescription] = useState<RequestDescription>({});
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [errorObject, setErrorObject] = useState<IError>({ descriptionError: '' });
  const selectedCards = [];
  selectedCards.push(Object.keys(selectedRoleCards));
  const handleBack = () => {
    setScreen('MOVE_CARDS_REQUEST');
  };

  const onDescriptionChange = (e, tenant) => {
    let value = e.target.value.trim() ? e.target.value : '';
    setDescription((pre) => ({ ...pre, [tenant]: value }));
    setErrorObject((pre) => {
      return { ...pre, descriptionError: '' };
    });
  };

  const onCommonDescription = (e) => {
    let commonDes = {};
    let value = e.target.value.trim() ? e.target.value : '';
    selectedCards.forEach((data) => {
      commonDes[data] = value;
    });
    setDescription(commonDes);
    setCommonDescription(value);
  };
  const onCheckboxClick = useCallback((sameDescription) => {
    setSameDescription(!sameDescription);
  }, []);

  const handleSubmit = () => {
    let errorObject = validateMoveCard(description);
    setErrorObject(errorObject);
    if (Object.keys(errorObject).find((key) => errorObject[key] !== '')) {
      return;
    }
    setShowPopUp(true);
  };
  const handleBackButton = () => {
    setScreen('MOVE_CARDS_REQUEST');
  };

  const handleCancelModal = () => {
    setShowPopUp(false);
  };
  const handleConfirm = async () => {
    setShowPopUp(false);
    setDisableSubmit(true);
    let response = await handleSave(props, description, panelId);

    if (response) {
      setFieldState(DEFAULT_FIELDSTATE);
      setErrors(DEFAULT_ERRORSTATE);
      setDisableSubmit(false);
      setSelectedRoleCards({});
      goBack('H');
    } else {
      setDisableSubmit(false);
    }
  };
  return (
    <div className={classes.container}>
      <PageHeader handleBack={handleBack} headerContent={'Request details'} />
      <div className={classes.scrollBody}>
        {selectedCards.length > 1 && (
          <span className={classes.checkbox} onClick={() => onCheckboxClick(sameDescription)} style={{ marginTop: '20px' }}>
            <Checkbox checked={Boolean(sameDescription)} />
            <span className={`${commonClasses.body17Regular} ${classes.labelText}`}>Same description for all tenant</span>
          </span>
        )}
        {!sameDescription &&
          selectedCards?.map((data, ind) => {
            return (
              <div key={data}>
                <div className={classes.tenentHeader}>
                  <span className={`${classes.tenantName} ${commonClasses.body15Medium}`}>
                    <span className={classes.flex}>
                      <AmuraIcon2 />
                    </span>
                    <span>{data}</span>
                  </span>
                </div>
                <div className={classes.mb}>
                  <WithIconContainer Label="Request Description" Icon={<MyListIconNew />}>
                    <MemoInputField
                      label="Add description"
                      multiline
                      maxRows={2}
                      value={description[data]}
                      onChange={(e) => onDescriptionChange(e, data)}
                      error={Boolean(errorObject.descriptionError)}
                      helperText={errorObject.descriptionError}
                    />
                  </WithIconContainer>
                </div>
              </div>
            );
          })}
        {!!sameDescription && (
          <div className={classes.mb}>
            <WithIconContainer Label="Request Description" Icon={<MyListIconNew />}>
              <MemoInputField
                label="Add description"
                multiline
                maxRows={2}
                value={commonDescription}
                onChange={(e) => onCommonDescription(e)}
                error={Boolean(errorObject.descriptionError)}
                helperText={errorObject.descriptionError}
              />
            </WithIconContainer>
          </div>
        )}
      </div>

      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Submit'}
        disableRightButton={disableSubmit}
        handleLeftButton={handleBackButton}
        handleRightButton={handleSubmit}
      />
      <ModalBox
        panelWidth={panel?.width.toString()}
        open={showPopUp}
        handleClose={handleCancelModal}
        modalTitle={'Submit'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: handleCancelModal,
          },
          {
            text: PMS_LOCALE.translate('Confirm'),
            variant: 'contained',
            onClick: handleConfirm,
          },
        ]}
      >
        <div className={classes.modalWrapper}>Are you sure you want to Submit?</div>
      </ModalBox>
    </div>
  );
}
