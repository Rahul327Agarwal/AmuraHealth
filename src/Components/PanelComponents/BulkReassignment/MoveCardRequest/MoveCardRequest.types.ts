import React from 'react';
import { IProps, TScreen } from '../BulkReassignment.types';
import { ICheckedCard } from './Components/RoleAndTenant/RoleAndTenant.types';
import { Actions } from '../MoveCardRequestHome/MoveCardRequesstHome.types';

export interface IMoveMyCardsProps extends IProps {
  setScreen: React.Dispatch<React.SetStateAction<Actions>>;
  setErrors: React.Dispatch<React.SetStateAction<IErrorsState>>;
  errors: IErrorsState;
  setFieldState: React.Dispatch<React.SetStateAction<IFieldState>>;
  fieldState: IFieldState;
  selectedRoleCards: ICheckedCard;
  setSelectedRoleCards: React.Dispatch<React.SetStateAction<ICheckedCard>>;
}

export interface IFieldState {
  // title: string;
  // description: string;
  // startDate: Date | null;
  // startTime: string;
  // endDate: Date | null;
  // endTime: string;
  // timeZone: string;
  // autoDecline: boolean;
  // autoDeclineType?: TAutoDecline;
  // attachment?: File[];
  permanentCheck?: boolean;
}

export interface IErrorsState extends Partial<Record<keyof IFieldState, string>> {}

export type TAutoDecline = 'ONLY_NEW' | 'NEW_AND_EXISTING';
