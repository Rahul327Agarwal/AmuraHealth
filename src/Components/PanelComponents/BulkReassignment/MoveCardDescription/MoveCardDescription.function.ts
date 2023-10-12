import { object } from 'prop-types';
import { FormatingObj, moveCardRequestAPI } from '../BulkReassigment.functions';
import { IProps, RequestDescription } from './MoveCardDescription.types';

export const handleSave = async (props: IProps, description, panelId: string) => {
  const { fieldState, selectedRoleCards } = props;
  // const startDatewithTime = convertDateWithTime(fieldState.startDate, fieldState.startTime);
  const cardsToMove = FormatingObj(selectedRoleCards, description);

  const moveCardReqPaylaod = {
    startDate: new Date().toISOString(), //startDatewithTime.toISOString(),
    staffId: props.sessions?.user?.id,
    createdBy: props.sessions?.user?.id,
    updatedBy: props.sessions?.user?.id,
    cardsToMove: cardsToMove,
    cardType: 'moveCard',
    action: 'ADD',
    isPermanent: fieldState.permanentCheck,
    EventName: 'user-cards-management',
    url: import.meta.env.VITE_EVENT_API,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  };
  console.log('moveCardReqPaylaod', moveCardReqPaylaod);
  let response = await moveCardRequestAPI(moveCardReqPaylaod, panelId);
  return response;
};

export const validateMoveCard = (description: RequestDescription) => {
  let error = {
    descriptionError: '',
  };

  if (Object.keys(description).length === 0) {
    error.descriptionError = 'Description is required.';
    return error;
  }

  let value = Object.values(description)[0];
  console.log('value', value, description);

  if (typeof value === 'string' && value.length == 0) {
    error.descriptionError = 'Description is required.';
  }
  // if (description && description.length > 200) {
  //   error.descriptionError = 'Description length should be less than 200 characters.';
  // }
  return error;
};
