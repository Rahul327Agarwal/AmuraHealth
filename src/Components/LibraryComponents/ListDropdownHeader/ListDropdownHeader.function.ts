export const OPTIONS_CONST = {
  TO_MOVE: 'Select cards to move',
  TO_REASSIGN_BY_CARD: 'Select cards to reassign by card',
  TO_REASSIGN_BY_BATCHES: 'Select cards to reassign by batches',
};

export const SELECT_OPTIONS = [
  { label: 'Select to Move', value: OPTIONS_CONST.TO_MOVE },
  { label: 'Select to reassign, card by card', value: OPTIONS_CONST.TO_REASSIGN_BY_CARD },
  { label: 'Select to reassign, by batches', value: OPTIONS_CONST.TO_REASSIGN_BY_BATCHES },
];

export const EMPTY_CLENT_DATA = { patientId: '', clientData: '' };
