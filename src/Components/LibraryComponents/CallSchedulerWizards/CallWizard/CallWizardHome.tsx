import CallWizard from './CallWizard';
import { IProps } from './CallWizard.types';
import CallWizardConfirmView from './CallWizardConfirmView';

export default function CallWizardHome(props: IProps) {
  const { message: messageData } = props;

  switch (messageData?.ContextType) {
    case '@call':
    case '@callDeclined':
    case '@callChange':
    case '@callCancel':
      return <CallWizard {...props} />;

    case '@callCancelBooked':
    case '@callScheduled':
      return <CallWizardConfirmView {...props} />;
  }
}
