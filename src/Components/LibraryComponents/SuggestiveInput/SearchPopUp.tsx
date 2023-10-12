import { useStyles } from './SuggestiveInput.styles';
import { ISearchPopUp } from './SuggestiveInput.types';
import SearchPopUpRow from './SearchPopUpRow';

const SearchPopUp = (props: ISearchPopUp) => {
  const { searchedData, setshowPopup, onDropDownOptionClick, suggestionIndex } = props;
  const { classes } = useStyles();

  const handleClickOnDropDownOptions = (e, value) => {
    e.stopPropagation();
    onDropDownOptionClick(e, value);
    setshowPopup(false);
  };

  return (
    <div className={classes.container}>
      {searchedData?.map((data, index) => (
        <div className={suggestionIndex === index ? classes.highlightOption : ''}>
          <SearchPopUpRow
            key={data.label}
            searchData={data.label}
            onDropDownOptionClick={(e) => handleClickOnDropDownOptions(e, data)}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchPopUp;
