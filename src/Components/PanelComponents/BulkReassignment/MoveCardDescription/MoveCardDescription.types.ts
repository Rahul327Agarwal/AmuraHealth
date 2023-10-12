import { IErrorsState, IFieldState } from '../MoveCardRequest/MoveCardRequest.types';
import { TScreen } from '../BulkReassignment.types';
import { ICheckedCard } from '../MoveCardRequest/Components/RoleAndTenant/RoleAndTenant.types';
import { IPanel, ISession } from '../../../../Common/Common.types';
import { Actions } from '../MoveCardRequestHome/MoveCardRequesstHome.types';

export interface IProps {
  setScreen: React.Dispatch<React.SetStateAction<Actions>>;
  setErrors: React.Dispatch<React.SetStateAction<IErrorsState>>;
  errors: IErrorsState;
  setFieldState: React.Dispatch<React.SetStateAction<IFieldState>>;
  fieldState: IFieldState;
  selectedRoleCards: ICheckedCard;
  setSelectedRoleCards: React.Dispatch<React.SetStateAction<ICheckedCard>>;
  panel?: IPanel;
  sessions: ISession;
}

export interface RequestDescription {
  [tenant: string]: string;
}
export type IError = {
  descriptionError: string;
};
