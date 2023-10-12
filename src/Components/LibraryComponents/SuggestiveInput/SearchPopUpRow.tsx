import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './SuggestiveInput.styles';
import { IRowProps } from './SuggestiveInput.types';

const SearchPopUpRow = (props: IRowProps) => {
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const { onDropDownOptionClick, searchData } = props;

  return (
    <div className={classes.spaceBetween} onClick={onDropDownOptionClick}>
      <span className={`${classes.name} ${commanClass.body15Regular}`}>{searchData}</span>
    </div>
  );
};

export default SearchPopUpRow;
