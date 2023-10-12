import { Fab } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import InputField from '../../LibraryComponents/InputField/InputField';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from '../../LibraryComponents/MUIDrawer/MUIDrawer';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import SearchField from '../../LibraryComponents/SearchField/SearchField';
import { BackArrowIcon, PlusIcon, SearchIcon, SearchIcon2 } from './NotesBrowse.svg';
import NavBar from './NavBar';
import {
  DeactivateNote,
  defaultFiltres,
  filterProvidedData,
  getNoteData,
  handleAddNotes,
  handleSearch,
} from './NotesBrowse.functions';
import { useStyles } from './NotesBrowse.styles';
import { IProps, basicData, cardData, filterStatus } from './NotesBrowse.types';
import NotesCardsAnimate from './NotesCardsAnimate';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useFetchUserName } from '../../../Common/Common.hooks';
const NotesBrowse = (props: IProps) => {
  const { childEventTrigger, registerEvent, unRegisterEvent, selectedClient, sessions } = props;
  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const [cardData, setCardData] = useState<Array<cardData>>([]);
  const [notesdata, setNotesdata] = useState<Array<cardData>>([]);
  const [deactivateCardData, setDeactivateData] = useState<cardData>();
  const [selectedCard, setSelectedCard] = useState<Array<string>>([]);
  const [noResultFound, setNoResultFound] = useState({ show: true, value: 'No note added' });
  const [searchStringValue, setSearchStringValue] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<filterStatus>(defaultFiltres);
  const [basicData, setBasicData] = useState<basicData>({ search: false, open: false, isLoading: true });
  const [value, setValue] = useState<string>('');
  const [userNames, setUserNames] = useState({});
  const goBack = useDFGoBack();
  const cardRef = useRef<HTMLElement>(null);
  const { id: panelId } = useCurrentPanel();
  const { fetchMultipleUserNames } = useFetchUserName();

  useEffect(() => {
    if (notesdata.length === 0) {
      let value = 'No note added';
      // if any filter applied and no data to display
      if (filterStatus.hash || filterStatus.privacy || filterStatus.star || filterStatus.archive) value = 'No notes found';
      // if while searching we dont get any data then message as per below.
      if (basicData.search && searchStringValue.length > 2) value = 'No search results found';
      setNoResultFound({ value: value, show: true });
    }
  }, [notesdata, basicData.search]);

  // update the data when refresh triggered.
  useEffect(() => {
    // cardRef.current.scrollTo({ top: 0 });
    (async () => {
      let userIds = cardData.map((notedata) => notedata?.updatedBy);
      let usernamesObject = await fetchMultipleUserNames([...new Set(userIds)]);
      setUserNames(usernamesObject);
    })();

    if (basicData.search) {
      handleSearch(searchStringValue, setSearchStringValue, filterStatus, setNotesdata, cardData);
      return;
    }
    setNotesdata(filterProvidedData(cardData, filterStatus));
  }, [cardData]);

  let historySubscription: any;
  useEffect(() => {
    (async () => {
      const summaryResponse = await getNoteData(props);
      if (summaryResponse) {
        setBasicData((pre) => ({ ...pre, isLoading: false }));
        setCardData((summaryResponse || [])?.sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()));
      }
    })();
    historySubscription = registerEvent(`${selectedClient.tenant_id}/${selectedClient.client_id}`, 'pms-ql-chatNotes', () => {
      getNoteData(props).then((summaryResponse) => {
        if (!summaryResponse.Error) {
          cardRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            setCardData(summaryResponse?.sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()));
          }, 500);
        }
      });
    });
    return () => {
      if (historySubscription) {
        unRegisterEvent(historySubscription);
      }
    };
  }, []);
  const handleOnCardClick = useCallback(
    (Cardkey) => {
      if (selectedCard.includes(Cardkey)) {
        setSelectedCard(selectedCard.filter((key) => key !== Cardkey));
      } else {
        setSelectedCard((pre) => [...pre, Cardkey]);
      }
    },
    [selectedCard]
  );

  const handleDeactivate = useCallback((e, cardData) => {
    setDeactivateData(cardData);
    e.stopPropagation();
    setBasicData((pre) => ({ ...pre, open: true }));
    setValue('');
  }, []);

  const OnSearchIconClick = useCallback(() => {
    // reset results to the previous state while removing search header
    if (basicData.search) {
      setNotesdata(filterProvidedData(cardData, filterStatus));
    }
    setBasicData((pre) => ({ ...pre, search: !basicData.search }));
  }, [basicData, cardData, filterStatus]);

  const handleScroll = (e) => {
    const parenttop = e.target.getBoundingClientRect().top;
    let elements = document.querySelectorAll('[data-openedCard="true"]');
    elements.forEach((ele: any) => {
      let top = ele.getBoundingClientRect().top - parenttop;
      ele.setAttribute('data-sticky', `${top <= 44}`);
    });
  };

  const handleNoteEdit = useCallback((data) => {
    props.childEventTrigger(null, null, 'onNoteEdit', {
      isEdit: true,
      editCardData: data,
    });
  }, []);

  return (
    <div className={classes.mainContainer}>
      <PageHeader
        customStyle={classes.marginBottom24}
        startAdornment={<BackArrowIcon onClick={() => goBack('S')} className={classes.backArrorIcon} />}
        headerContent={`Notes`}
        endAdornment={
          <div className={classes.endAdornment}>
            <div className={classes.icondiv} onClick={OnSearchIconClick}>
              {!basicData.search ? <SearchIcon /> : <SearchIcon2 />}
            </div>
          </div>
        }
      />

      {basicData.isLoading || (cardData.length > 0 && Object.keys(userNames).length === 0) ? (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
        </>
      ) : (
        <>
          <NavBar
            search={basicData.search}
            cardData={cardData}
            filterStatus={filterStatus}
            setNotesdata={setNotesdata}
            setFilterStatus={setFilterStatus}
            searchStringValue={searchStringValue}
            setSearchStringValue={setSearchStringValue}
          />
          {basicData.search && (
            <div className={classes.searchdiv}>
              <SearchField
                placeholder="Search notes"
                handleSearch={(searchvalue) =>
                  handleSearch(searchvalue, setSearchStringValue, filterStatus, setNotesdata, cardData)
                }
                autoFocus
              />
            </div>
          )}

          <section className={classes.scrollArea} ref={cardRef} onScroll={handleScroll}>
            <NotesCardsAnimate
              sessions={sessions}
              notesdata={notesdata}
              userNames={userNames}
              handleOnCardClick={handleOnCardClick}
              handleDeactivate={handleDeactivate}
              selectedCard={selectedCard}
              handleNoteEdit={handleNoteEdit}
            />
          </section>
          {notesdata.length === 0 && (
            <div className={classes.noResultFoundDiv}>
              <p className={`${CommonStyles.body15Medium}`}>{noResultFound.value}</p>
            </div>
          )}
        </>
      )}

      <div className={classes.footer1}>
        <Fab onClick={() => handleAddNotes(childEventTrigger)} className={classes.addButton}>
          {<PlusIcon />}
        </Fab>
      </div>
      <MUIDrawer
        anchor={'bottom'}
        headerTitle={'Confirm deactivation'}
        open={basicData.open}
        handleClose={() => setBasicData((pre) => ({ ...pre, open: false }))}
      >
        <div>
          <InputField
            // helperText={error}
            multiline
            maxRows={5}
            className={classes.inputStyle}
            label="Reason for deactivation"
            value={value}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
            onChange={(e) => {
              e.target.value.trim() ? setValue(e.target.value) : setValue(e.target.value.trim());
            }}
          />

          <div className={classes.footerStyle}>
            <MUIButton
              className={`${classes.CancelButton}  ${CommonStyles.body15Medium}`}
              onClick={() => {
                setBasicData((pre) => ({ ...pre, open: false }));
              }}
            >
              Cancel
            </MUIButton>
            <MUIButton
              className={`${classes.ConfirmButton}  ${CommonStyles.body15Medium}`}
              disabled={value.length === 0}
              variant="contained"
              onClick={() => {
                DeactivateNote(props, deactivateCardData, value, panelId);
                setBasicData((pre) => ({ ...pre, open: false }));
              }}
            >
              Confirm
            </MUIButton>
          </div>
        </div>
      </MUIDrawer>
    </div>
  );
};

export default NotesBrowse;
