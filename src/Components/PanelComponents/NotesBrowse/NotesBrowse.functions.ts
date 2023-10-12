import { PMS_S3 } from '../../../Utils';
import SuccessToast from '../../../Common/SuccessToaster';

export const AddNotesData = async (props: any, tag: string, description: string, isStar: boolean, panelId: string) => {
  let payload = {
    privacy: tag === '@all' ? '' : tag,
    EventName: 'chat-notes', //'chat-categorizer',
    tenantId: props.selectedClient.tenant_id,
    message: description,
    ContextType: '@chat-notes',
    senderId: props.sessions.user.id,
    patientId: props.selectedClient.client_id,
    isStar: isStar,
    userId: props.selectedClient.client_id,
  };

  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: props.sessions.id_token,
    method: 'POST',
    action: 'ADD',
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        SuccessToast('Note added succesfully!', panelId, 'success');
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};
export const getNoteData = async (props: any) => {
  try {
    let notesData = await PMS_S3.getObject(
      `pms-ql-chatNotes/amura/${props.selectedClient.client_id}/myChatNotes.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    // const teamDetails = await getMyTeamDetails(props);
    // const teamId = teamDetails?.filter((team) => team.userId === props.sessions.user.id);

    if (!notesData?.Error) {
      const privateData = notesData?.chatNotes?.filter((note: any) =>
        // !(note?.privacy === '@me' && note?.updatedBy !== props.sessions.user.id) &&
        // !(note?.privacy === '@team' && note?.patientId === props.sessions.user.id)
        {
          if (note?.privacy === '@me' && note?.updatedBy !== props.sessions.user.id) {
            return false;
          }
          if (note?.privacy === '@team' && note?.patientId === props.sessions.user.id) {
            return true;
          }
          return true;
        }
      );

      return privateData;
    }
    return {};
  } catch (error) {
    console.log(error, 'notesData error');
  }
};

export const UpdateNoteData = async (
  props: any,
  tag: any,
  description: any,
  isStar: boolean,
  editCardData: any,
  panelId: string
) => {
  let payload = {
    privacy: tag === '@all' ? '' : tag,
    EventName: 'chat-notes', //'chat-categorizer',
    tenantId: props.selectedClient.tenant_id,
    message: description,
    ContextType: '@chat-notes',
    senderId: props.sessions.user.id,
    patientId: props.selectedClient.client_id,
    noteId: editCardData?.sort_key,
    isStar: isStar,
    userId: props.selectedClient.client_id,
  };

  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: props.sessions.id_token,
    method: 'POST',
    action: 'UPDATE',
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        SuccessToast('Note updated succesfully!', panelId, 'success');
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};

export const DeactivateNote = async (props: any, editCardData: any, reasonForDeactivation: string, panelId: string) => {
  let payload = {
    privacy: editCardData?.privacy,
    EventName: 'chat-notes',
    tenantId: props.selectedClient.tenant_id,
    message: editCardData?.message,
    ContextType: '@chat-notes',
    senderId: props.sessions.user.id,
    patientId: props.selectedClient.client_id,
    noteId: editCardData?.sort_key,
    reasonForDeactivation: reasonForDeactivation,
    isStar: editCardData?.isStar,
    userId: props.selectedClient.client_id,
  };

  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: props.sessions.id_token,
    method: 'POST',
    action: 'DEACTIVATE',
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        SuccessToast('Note deactivated succesfully!', panelId, 'success');
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};

export const filterProvidedData = (NotesData, filterStatus) => {
  let TempfilteredData = NotesData.filter(
    (NoteData) =>
      (filterStatus['star'] && NoteData.isStar === true) ||
      (filterStatus['hash'] && NoteData.tags.length > 0) ||
      (filterStatus['privacy'] && NoteData.privacy.length > 0)
  ).sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime());

  // if no filter applied then provide original data.
  if (!filterStatus['star'] && !filterStatus['hash'] && !filterStatus['privacy']) {
    TempfilteredData = NotesData.sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime());
  }
  if (!filterStatus['archive']) {
    TempfilteredData = TempfilteredData.filter((NoteData) => NoteData.isActive);
  }
  return TempfilteredData;
};

export const handleSearch = (searchvalue, setSearchStringValue, filterStatus, setNotesdata, cardData) => {
  setSearchStringValue(searchvalue);
  if (searchvalue.length < 3) {
    setNotesdata(filterProvidedData(cardData, filterStatus));
    return;
  }
  if (searchvalue.length > 2) {
    let privacyCheck = searchvalue.split(' ')[0];
    if (privacyCheck === '@team' || privacyCheck === '@me' || privacyCheck === '@note') {
      let checkMsg = searchvalue.split(' ').splice(1).join(' ');
      let searchedData = cardData.filter(
        (tempdata) => tempdata.privacy === privacyCheck && tempdata.message.toLowerCase().includes(checkMsg.toLowerCase())
      );
      setNotesdata(filterProvidedData(searchedData, filterStatus));
    } else {
      let searchedData = cardData.filter((tempdata) => tempdata.message.toLowerCase().includes(searchvalue.toLowerCase()));
      setNotesdata(filterProvidedData(searchedData, filterStatus));
    }
  }
};

export const handleFilterIconClick = (
  filterName,
  search,
  cardData,
  filterStatus,
  setNotesdata,
  setFilterStatus,
  searchvalue,
  setSearchStringValue
) => {
  // if archive button is clicked reset everything.
  if (filterName === 'archive' && !filterStatus['archive']) {
    let newFilterStatus = { ...defaultFiltres, archive: true };
    setFilterStatus(newFilterStatus);
    if (search) {
      handleSearch(searchvalue, setSearchStringValue, newFilterStatus, setNotesdata, cardData);
      return;
    }
    setNotesdata(cardData);
    return;
  }

  let newFilterStatus = JSON.parse(JSON.stringify(filterStatus));
  newFilterStatus[filterName] = !filterStatus[filterName];
  newFilterStatus['archive'] = false;

  setFilterStatus(newFilterStatus);
  if (search) {
    // if filter is being applied while search is ON.
    handleSearch(searchvalue, setSearchStringValue, newFilterStatus, setNotesdata, cardData);
    return;
  }
  setNotesdata(filterProvidedData(cardData, newFilterStatus));
};

export const handleAddNotes = (childEventTrigger) => {
  childEventTrigger(null, null, 'onNoteEdit', {
    isEdit: false,
    editCardData: {},
  });
};

export const defaultFiltres = { star: false, hash: false, privacy: false, archive: false };
