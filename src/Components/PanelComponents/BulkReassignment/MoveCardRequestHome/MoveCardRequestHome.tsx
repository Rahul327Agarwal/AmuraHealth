import React, { useState } from 'react';
import { Actions, IProps } from './MoveCardRequesstHome.types';
import MoveCardRequest from '../MoveCardRequest/MoveCardRequest';
import MoveCardDescription from '../MoveCardDescription/MoveCardDescription';
import { IErrorsState, IFieldState } from '../MoveCardRequest/MoveCardRequest.types';
import { DEFAULT_ERRORSTATE, DEFAULT_FIELDSTATE } from '../MoveCardRequest/MoveCardRequest.function';
import { ICheckedCard } from '../MoveCardRequest/Components/RoleAndTenant/RoleAndTenant.types';

const MoveCardRequestHome = (props: IProps) => {
  const { sessions } = props || {};
  const [action, setAction] = useState<Actions>('MOVE_CARDS_REQUEST');
  const [fieldState, setFieldState] = useState<IFieldState>(DEFAULT_FIELDSTATE);
  const [errors, setErrors] = useState<IErrorsState>(DEFAULT_ERRORSTATE);
  const [selectedRoleCards, setSelectedRoleCards] = useState<ICheckedCard>({});

  const renderComponets = (action) => {
    switch (action) {
      case 'MOVE_CARDS_REQUEST':
        return (
          <MoveCardRequest
            {...props}
            setScreen={setAction}
            fieldState={fieldState}
            setFieldState={setFieldState}
            errors={errors}
            setErrors={setErrors}
            setSelectedRoleCards={setSelectedRoleCards}
            selectedRoleCards={selectedRoleCards}
          />
        );
      case 'MOVE_CARD_DESCRIPTION':
        return (
          <MoveCardDescription
            setScreen={setAction}
            fieldState={fieldState}
            setFieldState={setFieldState}
            errors={errors}
            setErrors={setErrors}
            selectedRoleCards={selectedRoleCards}
            setSelectedRoleCards={setSelectedRoleCards}
            sessions={sessions}
          />
        );
      default:
        return <div>default</div>;
    }
  };
  return <>{renderComponets(action)}</>;
};
export default MoveCardRequestHome;
