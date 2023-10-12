import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '../../LibraryComponents/MUIButton/MUIButton';
import RadioGroup from '../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import SearchField from '../../LibraryComponents/SearchField/SearchField';
import { NoResultsSVG } from '../../SVGs/Common';

import { isValidPhoneNumber } from 'react-phone-number-input';
import { getSearchUsers } from './ClientToStaffAssignment.functions';
import { useStyles } from './ClientToStaffAssignment.styles';

const UserListView = (props: any) => {
  const { setSelectedUser } = props;
  const { classes } = useStyles(props);

  const [selectedStaff, setSelectedStaff] = useState({ value: '', label: '', tenantId: '' });
  const [staffOptions, setStaffOptions] = useState([]);
  const [searchString, setSearchString] = useState('');

  const handleSelect = (value, label) => {
    let data: any = staffOptions.find((each) => each.value === value) || { value: '', label: '', tenantId: '' };
    setSelectedStaff(data);
  };

  const handlePaste = (pastedData: string) => {
    const cleanedString = pastedData.replace(/[^+\d]/g, '');
    if (isValidPhoneNumber(cleanedString)) setSearchString(cleanedString);
    else setSearchString(pastedData);
  };

  const onSearch = async (searchString) => {
    if (searchString.length < 3) {
      setStaffOptions([]);
      setSelectedStaff({ value: '', label: '', tenantId: '' });
      return;
    }
    const options = await getSearchUsers(searchString);
    const filterData = options.filter(
      (ele) =>
        ele.label.toLowerCase()?.includes(searchString.toLowerCase()) ||
        ele.mobileNumber.toLowerCase()?.includes(searchString.toLowerCase())
    );
    setStaffOptions(filterData);
  };
  const handleAssign = () => {
    if (selectedStaff.value) {
      setSelectedUser({ ...selectedStaff });
    }
  };

  useEffect(() => {
    debounceFun(searchString);
  }, [searchString]);

  const debounceFun: Function = debounce(onSearch, 50);
  return (
    <>
      <div className={`${classes.roleContainer}`}>
        <div className={classes.searchMatch}>
          <SearchField
            value={searchString}
            placeholder={'search for client'}
            handleSearch={(e) => {
              setSearchString(e);
            }}
            onPaste={(pastedData) => {
              handlePaste(pastedData);
            }}
            autoFocus
          />
        </div>
        <div className={classes.radioWrapper}>
          <RadioGroup
            variant={'radioForStaff'}
            flexDirection="column"
            isReverse
            isDivider
            options={staffOptions}
            value={selectedStaff.value}
            setValue={handleSelect}
          />
        </div>
        {staffOptions.length === 0 && (
          <div className={`${classes.noResultsDiv}`}>
            <div>
              <div className={`${classes.textAlign}`}>
                <NoResultsSVG />
              </div>
            </div>
          </div>
        )}
        <div>
          <div className={classes.selectFooter}>
            {selectedStaff.value && (
              <Button
                disabled={props.isLoading}
                children={`Assign staff`}
                variant="contained"
                size="large"
                fullWidth={true}
                onClick={handleAssign}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListView;
