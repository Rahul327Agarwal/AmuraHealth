import React from 'react';
import { toast } from 'react-toastify';
import MUIToaster from '../Components/LibraryComponents/MUIToaster/MUIToaster';

type Variant = 'success' | 'info';

export default function SuccessToaster(message: string, panelId?: string, variant?: Variant) {
  toast.success(<MUIToaster message={message} variant={variant ?? 'success'} />, {
    containerId: panelId ?? 'main',
    hideProgressBar: true,
    closeButton: false,
    icon: false,
  });
}
