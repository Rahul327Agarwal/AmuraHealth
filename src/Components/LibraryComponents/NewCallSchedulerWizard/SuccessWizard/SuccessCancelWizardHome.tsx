import React, { useEffect, useState } from 'react';
import { IProps } from './SuccessWizard.types';
import SuccessWizard from './SuccessWizard';
import CancelWizard from './CancelWizard';
export default function SuccessCancelWizardHome(props: IProps) {
  const { messageData, description, slotTime, timeZoneValue } = props;
  const [modifiedMessageData, setModifiedMessageData] = useState<any>(messageData);
  console.log('messageData', messageData);
  useEffect(() => {}, [messageData]);
  switch (modifiedMessageData?.ContextType) {
    case '@call':
    case '@callScheduled':
      return <SuccessWizard {...props} setModifiedMessageData={setModifiedMessageData} />;
    case '@callCancel':
    case '@callCancelBooked':
    case '@callDeclined':
      return <CancelWizard {...props} modifiedMessageData={modifiedMessageData} />;
  }
}
