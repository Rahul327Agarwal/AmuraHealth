import { MenuItem } from '@mui/material';
import { SearchResultStyled } from '../RecipesBuilder.styles';
import { SearchResultProps } from '../RecipesBuilder.types';

const SearchResult = (props: SearchResultProps) => {
  const { options, handleSelect } = props;
  return (
    <SearchResultStyled>
      {options.map((data) => (
        <MenuItem className="result" onClick={() => handleSelect(data)}>
          {data}
        </MenuItem>
      ))}
    </SearchResultStyled>
  );
};

export default SearchResult;
