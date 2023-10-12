import React from 'react';
import { toast } from 'react-toastify';
import MUIToaster  from '../Components/LibraryComponents/MUIToaster/MUIToaster';

type Variant = 'error' | 'warning';

export default function ErrorToaster(message: string, panelId?: string, variant?: Variant) {
  toast.success(<MUIToaster message={message} variant={variant ?? 'error'} />, {
    containerId: panelId ?? 'main',
    hideProgressBar: true,
    closeButton: false,
    icon: false,
  });
}