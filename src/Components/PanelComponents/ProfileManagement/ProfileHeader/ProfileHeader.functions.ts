import axios from 'axios';
import ErrorToaster from './../../../../Common/ErrorToaster';

export const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

export const callUploadProfileImage = async (panelId: string, props: any, patientId: string, imageFile: string) => {
  try {
    const base64Content = imageFile;
    // base64 encoded data doesn't contain commas
    const base64ContentArray = base64Content.split(',');
    // base64 content cannot contain whitespaces but nevertheless skip if there are!
    const mimeType = base64ContentArray[0]!.match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)![0];

    const blob = await dataUrlToFile(imageFile, 'profile-pic.png');
    const formData = new FormData();
    formData.append('input_files', blob);

    const token = props.sessions.id_token;
    const API_URL = import.meta.env.VITE_DISPLAY_PIC_UPLOAD;
    const headers = {
      Authorization: `Bearer ${token}`,
      'patient-id': patientId,
      'user-id': props.sessions.user.id,
      'Content-Type': mimeType,
      'tenant-id': props.selectedClient.tenant_id,
      'display-picture': 'Yes',
      'file-name': 'profile-pic.png',
    };
    const response = await axios.post(API_URL!, formData, { headers });
    if (response) return response;
    ErrorToaster(`Unable to upload profile!`, panelId, 'error');
  } catch (error) {
    ErrorToaster(`Unable to upload profile!`, panelId, 'error');
  }
};
