import { PMS_S3 } from '../../../../Utils';

export const getHistoryNoteData = async (props: any, noteId: string) => {
  try {
    let historynotesData = await PMS_S3.getObject(
      `pms-ql-chatNotesHistoy/${noteId}/NoteHistory.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    if (!historynotesData.Error) {
      return historynotesData;
    }
    return {};
  } catch (error) {
    console.log(error, 'notesData error');
    return {};
  }
};
