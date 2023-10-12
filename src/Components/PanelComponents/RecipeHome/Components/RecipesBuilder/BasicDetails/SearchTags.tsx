import { useState } from "react";
import InputField from "../../../../../LibraryComponents/InputField/InputField";
import MUIButton from "../../../../../LibraryComponents/MUIButton/MUIButton";
import Token from "../../../../../LibraryComponents/MUIToken/MUIToken";
import SearchField from "../../../../../LibraryComponents/SearchField/SearchField";
import SearchResult from "../Common/SearchResult";
import { useStyles } from "../RecipesBuilder.styles";
import { SearchTagsProps } from "./BasicDetails.types";

const response = ["Hello", "New Hello"];
const SearchTags = (props: SearchTagsProps) => {
  const { setAction } = props;
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState([]);

  const handleSelectResult = (data) => {
    setInputValue((pre) => [...pre, data]);
    setSearch("");
  };
  const handleDelete = (index) =>
    setInputValue((pre) => pre.filter((_, i) => i !== index));

  const handleDone = () => {
    setAction({ screen: "BASIC_DETAILS", payload: { tags: inputValue } });
  };

  return (
    <div className={classes.rootContainerSearch}>
      <SearchField
        placeholder="Search tags"
        handleSearch={(e) => setSearch(e)}
      />
      {search.length ? (
        <SearchResult options={response} handleSelect={handleSelectResult} />
      ) : null}
      {inputValue.length && !search.length ? (
        <InputField
          className={classes.my20}
          SelectProps={{
            readOnly: true,
            IconComponent: "a",
            renderValue: (selected: Array<string>) => (
              <div className={classes.tokenWrap}>
                {selected.map((data, index) => (
                  <Token
                    key={index}
                    size="small"
                    label={data}
                    onDelete={() => handleDelete(index)}
                  />
                ))}
              </div>
            ),
          }}
          select
          value={inputValue}
          label={"Tags"}
        />
      ) : null}
      {/* <RecentSearches customStyle={classes.mb} searchHistories={SEARCH_HISTORY} /> */}
      <MUIButton
        variant="contained"
        size="large"
        fullWidth
        onClick={handleDone}
      >
        Done
      </MUIButton>
    </div>
  );
};

export default SearchTags;
