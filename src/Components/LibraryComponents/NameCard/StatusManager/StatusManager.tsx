import { CircularProgress, Popover, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notifyEvent } from '../../../../AppSync/AppSync.functions';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { getFixedMaxWidgetWidth } from '../../../../DisplayFramework/DisplayFramework.functions';
import { setStatuses } from '../../../../DisplayFramework/State/Slices/CacheSlice';
import { resetSelectedClientObject } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { PMS_LOCALE } from '../../../../Utils';
import { GcStatusIcon } from '../../../SVGs/Common';
import InputField from '../../InputField/InputField';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import ModalBox from '../../ModalBox/ModalBox';
import {
  capitalizeFirstLetter,
  defaultLoststate,
  defaultWonstate,
  getStatusForAllRoles,
  notifyStatusUpdate,
  updateStatus,
} from './StatusManager.functions';
import { useStyles } from './StatusManager.styles';
import { IEdgeColor, IProps } from './StatusManager.types';
import { useFetchUserName } from '../../../../Common/Common.hooks';

const StatusManager = (props: IProps) => {
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const { statuses } = useSelector((state: IRootState) => state.cache);
  const { onClose, selectedCard, anchorEl, setIsLoadingStatusChangePopup, clientStatus } = props;

  const [loadingFlag, setLoadingFlag] = useState(false);
  const [wonstate, setWonstate] = useState(defaultWonstate);
  const [openConfirmLost, setOpenConfirmLost] = useState(false);
  const [openConfirmWon, setOpenConfirmWon] = useState(false);
  const [loststate, setLoststate] = useState(defaultLoststate);
  const [statusOptions, setStatusOptions] = useState<IEdgeColor[]>([]);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const isChangingStatus = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const width = getFixedMaxWidgetWidth();
  const dispatch = useDispatch();
  const { fetchMultipleUserNames } = useFetchUserName();
  // .......the functions..................
  const handleLostModalCancel = () => {
    setOpenConfirmLost(false);
    setLoststate(defaultLoststate);
    onClose();
  };

  const handleWonModalCancel = () => {
    setOpenConfirmWon(false);
    setWonstate(defaultWonstate);
    onClose();
  };

  const handleWonModalDone = async () => {
    if (!wonstate.paymentId)
      return setWonstate((pre) => ({
        ...pre,
        paymentIdError: 'Please enter payment id',
      }));
    else setWonstate((pre) => ({ ...pre, paymentIdError: '' }));
    setLoadingFlag(true);
    let response = await handleUpdate('Won');
    if (response) {
      setLoadingFlag(false);
      setOpenConfirmWon(false);

      dispatch(resetSelectedClientObject());
    }
    onClose();

    return;
  };

  const handlePreUpdate = async (newStatus: string) => {
    if (newStatus === 'Won') {
      setWonstate(defaultWonstate);
      return setOpenConfirmWon(true);
    } else if (newStatus === 'Lost') {
      setLoststate(defaultLoststate);
      return setOpenConfirmLost(true);
    }
    await handleUpdate(newStatus);
  };

  const handleUpdate = async (newStatus: string) => {
    let response = await updateStatus(panelId, newStatus, selectedCard, props.sessions, {
      paymentReference: wonstate?.paymentId,
      comments: loststate?.comment || wonstate?.comment,
    });
    notifyStatusUpdate(selectedCard, notifyEvent, props, response, fetchMultipleUserNames);

    return response;
  };

  const handleLostModalDone = async () => {
    setLoadingFlag(true);
    let response = await handleUpdate('Lost');
    if (response) {
      setLoadingFlag(false);
      setOpenConfirmLost(false);

      dispatch(resetSelectedClientObject());
    }
    onClose();
  };

  const handleStatusChange = async (status: IEdgeColor) => {
    if (status.value === clientStatus || status.isDefault) {
      onClose();
      return;
    }
    if (isChangingStatus.current) return;
    setIsLoadingStatusChangePopup(true);
    isChangingStatus.current = true;
    await handlePreUpdate(status.value);
    isChangingStatus.current = false;
    setIsLoadingStatusChangePopup(false);
  };

  //   ..........the use effects..................
  useEffect(() => {
    const statusRole = statuses?.[selectedCard.roleId];
    if (statusRole?.length) {
      setStatusOptions(statusRole.filter((value: IEdgeColor) => !(value.isDefault && clientStatus !== value.value)));
      return;
    }
    setIsLoadingStatusChangePopup(true);
    setIsLoading(true);
    let getListOfStatuses = async () => {
      try {
        let response: any = await getStatusForAllRoles(panelId, selectedCard.tenantId, selectedCard.roleId, props);
        if (response.edgeColor) {
          response = response.edgeColor;
        }
        response = response?.filter((value: IEdgeColor) => !(value.isDefault && clientStatus !== value.value));

        setStatusOptions(response);
        dispatch(setStatuses({ [selectedCard.roleId]: response }));
      } finally {
        setIsLoadingStatusChangePopup(false);
        setIsLoading(false);
      }
    };
    getListOfStatuses();
  }, []);

  //   The ui renders here
  return (
    <div>
      <div style={{ marginLeft: '5rem' }}></div>

      <Popover
        transformOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={!openConfirmLost && !openConfirmWon}
        anchorEl={anchorEl.current}
        className={classes.popover}
        role={undefined}
        onClose={() => onClose()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {isLoading ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', margin: '14.5px 12px', gap: '12px' }}>
              <Skeleton animation="wave" variant="circular" width={24} height={24} />
              <MUISkeleton variant={'rectangular'} height={'34px'} width={'140px'} style={{}} />
            </div>
          </>
        ) : (
          statusOptions?.map((status) => (
            <div
              className={`${classes.statusOption} ${clientStatus === status.value && classes.isCurrentStatus} ${
                status?.value.toLowerCase() !== 'new' && classes.hovered
              }`}
              onClick={() => handleStatusChange(status)}
              key={status.label}
            >
              <GcStatusIcon
                pathFill={status?.color?.slice(status?.color.lastIndexOf('#')).split(' ')[0]}
                className={`${clientStatus === status.value && status?.value.toLowerCase() !== 'new' && classes.currentStatus} ${
                  status?.value.toLowerCase() === 'new' && classes.blackBg
                }`}
              />
              <span>{capitalizeFirstLetter(status?.label, 'qc')}</span>
            </div>
          ))
        )}
      </Popover>
      {/* ....................The lost modal............................ */}
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
            onClick: () => {
              setDisabledBtn(true);
              handleLostModalDone().finally(() => {
                setDisabledBtn(false);
              });
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

      {/* ..................the won modal..................... */}

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
            onClick: () => {
              setDisabledBtn(true);
              handleWonModalDone().finally(() => {
                setDisabledBtn(false);
              });
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
};

export default StatusManager;
