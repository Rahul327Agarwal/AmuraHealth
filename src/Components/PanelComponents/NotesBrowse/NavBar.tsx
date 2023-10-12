import { handleFilterIconClick } from './NotesBrowse.functions';
import { useStyles } from './NotesBrowse.styles';
import { INavBar } from './NotesBrowse.types';
import {
  ArchieveIcon,
  ArchieveIconApplied,
  HashIcon,
  HashIconApplied,
  Privacy,
  PrivacyApplied,
  StarIcon,
  StarIconApplied,
} from './NotesBrowse.svg';

const NavBar = (props: INavBar) => {
  const { search, cardData, filterStatus, setNotesdata, setFilterStatus, searchStringValue, setSearchStringValue } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.maindiv}>
      <div
        className={classes.icondiv}
        onClick={() =>
          handleFilterIconClick(
            'star',
            search,
            cardData,
            filterStatus,
            setNotesdata,
            setFilterStatus,
            searchStringValue,
            setSearchStringValue
          )
        }
      >
        {!filterStatus.star ? <StarIcon /> : <StarIconApplied />}
      </div>
      <div
        className={classes.icondiv}
        onClick={() =>
          handleFilterIconClick(
            'hash',
            search,
            cardData,
            filterStatus,
            setNotesdata,
            setFilterStatus,
            searchStringValue,
            setSearchStringValue
          )
        }
      >
        {!filterStatus.hash ? <HashIcon /> : <HashIconApplied />}
      </div>
      <div
        className={classes.icondiv}
        onClick={() =>
          handleFilterIconClick(
            'privacy',
            search,
            cardData,
            filterStatus,
            setNotesdata,
            setFilterStatus,
            searchStringValue,
            setSearchStringValue
          )
        }
      >
        {!filterStatus.privacy ? <Privacy /> : <PrivacyApplied />}
      </div>
      <div
        className={classes.icondiv}
        onClick={() =>
          handleFilterIconClick(
            'archive',
            search,
            cardData,
            filterStatus,
            setNotesdata,
            setFilterStatus,
            searchStringValue,
            setSearchStringValue
          )
        }
      >
        {!filterStatus.archive ? <ArchieveIcon /> : <ArchieveIconApplied />}
      </div>
    </div>
  );
};

export default NavBar;
