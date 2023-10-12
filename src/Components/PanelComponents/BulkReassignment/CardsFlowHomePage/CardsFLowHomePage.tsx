import React, { useState } from 'react';
import { Actions, ICardtoAssign, IProps } from './CardsFlowHomePage.types';
import CardsViewAndSelect from '../CardsViewAndSelect/CardsViewAndSelect';
import SelectStaffPoolViewAndAssign from '../SelectStaffPoolViewAndAssign/SelectStaffPoolViewAndAssign';
import { ISelectedCard } from '../CardsViewAndSelect/CardsViewAndSelect.types';
import ManualAddFlow from '../ManualAddFlow/ManualAddFlow';
export default function CardsFlowHomePage(props: IProps) {
  const [reShowSelectCards, setReShowSelectSelectedCards] = useState<ISelectedCard>({}); // [
  const [cardsToAssign, setCardsToAssign] = useState<ICardtoAssign[]>([]);
  const [reShowStaffPollCards, setReShowStaffPollCards] = useState<ISelectedCard>({});

  const [action, setAction] = useState<Actions>('HOME');
  const renderComponent = (action) => {
    switch (action) {
      case 'HOME':
        return (
          <CardsViewAndSelect
            {...props}
            headerContent={'Cards to assign'}
            action={action}
            setAction={setAction}
            setCardsToAssign={setCardsToAssign}
            reShowSelectCards={reShowSelectCards}
            setReShowSelectSelectedCards={setReShowSelectSelectedCards}
          />
        );
      case 'STAFFPOOLVIEW':
        return (
          <SelectStaffPoolViewAndAssign
            {...props}
            headerContent={'Select staff pool'}
            action={action}
            setAction={setAction}
            cardsToAssign={cardsToAssign}
            reShowStaffPollCards={reShowStaffPollCards}
            setReShowStaffPollCards={setReShowStaffPollCards}
          />
        );
      case 'MANUALADD':
        return (
          <ManualAddFlow {...props} cardsToAssign={cardsToAssign[0]} staffPoolData={reShowStaffPollCards} setAction={setAction} />
        );

      default:
        return <div>Default</div>;
    }
  };

  return <>{renderComponent(action)}</>;
}
