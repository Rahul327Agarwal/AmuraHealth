import { PMS_LOCALE } from '../../../../Utils';
import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { resetSelectedClientObject } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import InputField from '../../../LibraryComponents/InputField/InputField';
import ModalBox from '../../../LibraryComponents/ModalBox/ModalBox';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import NameCard from '../../../LibraryComponents/NameCard/NameCard';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import Select from '../../../LibraryComponents/Select/Select';
import { BackArrowIcon, TicCircleIcon } from '../../../SVGs/Common';
import { getStatusOfClient } from '../MyList/MyList.function';
import { MessageStatusesProps } from '../MyListHome.types';
import {
  defaultLoststate,
  defaultWonstate,
  getStatusForAllRoles,
  notifyStatusUpdate,
  updateStatus,
} from './ManageStatus.function';
import { InputContainerStyled, useStyles } from './ManageStatus.styles';
import { CircularProgress } from '@mui/material';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { getFixedMaxWidgetWidth } from '../../../../DisplayFramework/DisplayFramework.functions';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useFetchUserName } from '../../../../Common/Common.hooks';

export default function ManageStatus(props: MessageStatusesProps) {
  const { selectedCard, reporteesData, handleBack: handleBackToHome } = props;
  const width = getFixedMaxWidgetWidth();
  const { classes } = useStyles(props);
  const [status, setStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [swipeIn, setSwipeIn] = useState(false);
  const [openConfirmLost, setOpenConfirmLost] = useState(false);
  const [openConfirmWon, setOpenConfirmWon] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loststate, setLoststate] = useState(defaultLoststate);
  const [wonstate, setWonstate] = useState(defaultWonstate);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const { id: panelId } = useCurrentPanel();
  const dispatch = useDispatch();
  const commonClasses = useCommonStyles();
  const { fetchMultipleUserNames } = useFetchUserName();

  const goBack = useDFGoBack();

  const handleBack = () => {
    goBack('H');
    handleBackToHome();
  };

  const handlePreUpdate = () => {
    if (status === 'Won') {
      setWonstate(defaultWonstate);
      return setOpenConfirmWon(true);
    } else if (status === 'Lost') {
      setLoststate(defaultLoststate);
      return setOpenConfirmLost(true);
    }
    handleUpdate();
    return;
  };
  const handleUpdate = async () => {
    let response = await updateStatus(panelId, status, selectedCard, props.sessions, {
      paymentReference: wonstate?.paymentId,
      comments: loststate?.comment || wonstate?.comment,
    });
    notifyStatusUpdate(selectedCard, props.notifyEvent, props, response, fetchMultipleUserNames);
    setIsUpdated(Boolean(response));

    return response;
  };

  useEffect(() => {
    let getStatus = async () => {
      setSwipeIn(true);
      setStatus(getStatusOfClient(selectedCard));
      let response: any = await getStatusForAllRoles(selectedCard.tenantId, selectedCard.roleId, props);
      if (response.edgeColor) {
        response = response.edgeColor;
      }
      setStatusOptions(response);
    };
    getStatus();
  }, []);

  const handleStatusChange = (data: SetStateAction<string>) => {
    setStatus(data);
  };

  const handleLostModalCancel = () => {
    setOpenConfirmLost(false);
    setLoststate(defaultLoststate);
  };
  const handleLostModalDone = async () => {
    setLoadingFlag(true);
    let response = await handleUpdate();
    if (response) {
      setLoadingFlag(false);
      setOpenConfirmLost(false);
      let propsToPass = {
        key: new Date().getTime(),
        ...props,
      } as any;
      propsToPass = { ...propsToPass, patientId: '', clientData: '' };
      dispatch(resetSelectedClientObject());
      props.childEventTrigger(null, null, 'onMyListSelect', propsToPass);
    }
    return;
  };
  const handleWonModalCancel = () => {
    setOpenConfirmWon(false);
    setWonstate(defaultWonstate);
  };
  const handleWonModalDone = async () => {
    if (!wonstate.paymentId)
      return setWonstate((pre) => ({
        ...pre,
        paymentIdError: 'Please enter payment id',
      }));
    else setWonstate((pre) => ({ ...pre, paymentIdError: '' }));
    setLoadingFlag(true);
    let response = await handleUpdate();
    if (response) {
      setLoadingFlag(false);
      setOpenConfirmWon(false);
      let propsToPass = {
        key: new Date().getTime(),
        ...props,
      } as any;
      propsToPass = { ...propsToPass, patientId: '', clientData: '' };
      dispatch(resetSelectedClientObject());
      if (!reporteesData) {
        props.childEventTrigger(null, null, 'onMyListSelect', propsToPass);
      }
    }
    return;
  };

  const getEdgeColor = () => {
    const edgeColorObject = statusOptions?.find((data) => data.value === getStatusOfClient(selectedCard));
    const colorIndex = edgeColorObject?.color.lastIndexOf('#');
    const color = edgeColorObject?.color?.slice(colorIndex).split(' ')[0];
    return color;
  };
  return (
    <div className={`${classes.rootContainer} ${swipeIn ? classes.swipeIn : classes.swipeOut}`}>
      <div className={`${classes.backdrop} ${swipeIn ? classes.backdropOpacityIn : classes.backdropOpacityOut}`}></div>
      <div className={classes.statusWrap}>
        <PageHeader
          paddingX="20px"
          startAdornment={
            <span className={classes.backArrow} onClick={handleBack}>
              <BackArrowIcon />
            </span>
          }
          handleBack={handleBack}
          headerContent="Manage statuses"
        />
        {isUpdated ? (
          <div className={classes.updateContainerWrap}>
            <div className={classes.updateContainer}>
              <span className="icon">
                <TicCircleIcon />
              </span>
              <span className={`messageText ${commonClasses.body20Regular}`}>Status updated</span>
              <MUIButton variant="contained" fullWidth onClick={handleBack} size="large">
                OK
              </MUIButton>
            </div>
          </div>
        ) : (
          <>
            <NameCard
              isExtend
              customStyle={classes.borderBottom}
              cardData={selectedCard}
              isClientSelected={true}
              isBgWhite
              noThreeDot
              edgeColor={getEdgeColor()}
              showBlueDot={selectedCard?.additionalKeys.bluedots.blueDotsCount > 0}
              bluedotClick={() => {}}
            />
            <div className={classes.body}>
              <div className={`${commonClasses.body17Medium} ${classes.labelStyle}`}>Statuses</div>
              <InputContainerStyled>
                <Select
                  isAutoOk={true}
                  placeholder={'Current status'}
                  headerTitle={'Select a status'}
                  // options={statusOptions}
                  options={status !== 'New' ? statusOptions.filter((value) => value.value !== 'New') : statusOptions}
                  values={status}
                  setValues={handleStatusChange}
                  optionsType={'radio'}
                  position={'bottom'}
                />
              </InputContainerStyled>
              {/* <InputContainerStyled>
              <Select
                placeholder={"Status"}
                headerTitle={"Lorem Ipsum"}
                options={typeOptions}
                values={status}
                setValues={setStatus}
                optionsType={"radio"}
                position={"bottom"}
                optionsTypeReverse
                isReadOnly
              />
            </InputContainerStyled>
            <InputContainerStyled>
              <Select
                placeholder={"None"}
                headerTitle={"Lorem Ipsum"}
                options={typeOptions}
                values={none1}
                setValues={setNone1}
                optionsType={"radio"}
                position={"bottom"}
                optionsTypeReverse
                isDivider
              />
            </InputContainerStyled>
            <InputContainerStyled>
              <Select
                placeholder={"None"}
                headerTitle={"Lorem Ipsum"}
                options={typeOptions}
                values={none2}
                setValues={setNone2}
                optionsType={"radio"}
                position={"bottom"}
                optionsTypeReverse
                isDivider
              />
            </InputContainerStyled>
            <InputContainerStyled>
              <Select
                placeholder={"None"}
                headerTitle={"Lorem Ipsum"}
                options={typeOptions}
                values={none3}
                setValues={setNone3}
                optionsType={"radio"}
                position={"bottom"}
                optionsTypeReverse
                isDivider
              />
            </InputContainerStyled> */}
            </div>
            {getStatusOfClient(selectedCard) !== status && (
              <PanelFooter
                customStyle={classes.footerStyle}
                leftButtonText={'Cancel'}
                righButtontText={'Update'}
                handleLeftButton={handleBack}
                handleRightButton={() => {
                  handlePreUpdate();
                }}
                paddingX="20px"
              />
            )}
          </>
        )}
      </div>
      <ModalBox
        panelWidth={`${width}`}
        open={openConfirmLost}
        handleClose={handleLostModalCancel}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: handleLostModalCancel,
          },
          {
            text: (
              <>
                {loadingFlag ? (
                  <span className={classes.loaderSpan}>
                    <CircularProgress className={classes.loader} />
                  </span>
                ) : null}
                {PMS_LOCALE.translate('Done')}
              </>
            ),
            variant: 'contained',
            onClick: async () => {
              try {
                setDisabledBtn(true);
                await handleLostModalDone();
              } finally {
                setDisabledBtn(false);
              }
            },
            disabled: disabledBtn,
          },
        ]}
      >
        <InputField
          value={loststate?.comment}
          onChange={(e: { target: { value: string } }) => {
            const comment = e.target.value.trim() ? e.target.value : e.target.value.trim();
            setLoststate({ comment: comment });
          }}
          multiline
          maxRows={5}
          label={'Add a reason'}
        />
      </ModalBox>
      <ModalBox
        panelWidth={`${width}`}
        open={openConfirmWon}
        handleClose={handleWonModalCancel}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: handleWonModalCancel,
          },
          {
            text: (
              <>
                {loadingFlag ? (
                  <span className={classes.loaderSpan}>
                    <CircularProgress className={classes.loader} />
                  </span>
                ) : null}
                {PMS_LOCALE.translate('Done')}
              </>
            ),
            variant: 'contained',
            onClick: async () => {
              try {
                setDisabledBtn(true);
                await handleWonModalDone();
              } finally {
                setDisabledBtn(false);
              }
            },
            disabled: disabledBtn,
          },
        ]}
      >
        <div className={classes.modalWrapper}>
          <InputField
            value={wonstate.paymentId}
            onChange={(e: { target: { value: string } }) => {
              const paymentId = e.target.value.trim() ? e.target.value : e.target.value.trim();
              setWonstate((pre) => ({ ...pre, paymentId, paymentIdError: '' }));
            }}
            label={'Enter payment Id'}
            helperText={wonstate.paymentIdError}
          />
          <InputField
            value={wonstate.comment}
            onChange={(e: { target: { value: string } }) => {
              const comment = e.target.value.trim() ? e.target.value : e.target.value.trim();
              setWonstate((pre) => ({ ...pre, comment: comment }));
            }}
            multiline
            maxRows={5}
            label={'Add a reason'}
          />
        </div>
      </ModalBox>
    </div>
  );
}
