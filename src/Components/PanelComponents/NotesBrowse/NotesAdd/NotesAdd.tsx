import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import Checkbox from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import MUISelect from '../../../LibraryComponents/MUISelect/MUISelect';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import { BackArrowIcon, LeftArrowIcon } from '../../../SVGs/Common';
import { AddNotesData, UpdateNoteData } from '../NotesBrowse.functions';
import { WEIGHT_UNIT_OPTIONS } from './NotesAdd.functions';
import { useStyles } from './NotesAdd.styles';
import { IProps } from './NotesAdd.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const NotesAdd = (props: IProps) => {
  const { editCardData, isEdit } = props;
  const { classes } = useStyles();
  const [tag, setTag] = useState('');
  const CommonStyles = useCommonStyles();
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const { id: panelId } = useCurrentPanel();

  const handleCheck = () => {
    setChecked(!checked);
  };

  const addNotes = async () => {
    if (!isEdit) AddNotesData(props, tag, description, checked, panelId);
    else UpdateNoteData(props, tag, description, checked, editCardData, panelId);
    goBack('S');
  };
  const handleChange = (event) => {
    setDescription(event.trim() ? event : event.trim());
  };
  useEffect(() => {
    setDescription(isEdit ? editCardData?.message : '');
    setTag(isEdit ? editCardData?.privacy : '');
    setChecked(isEdit ? (editCardData?.isStar ? true : false) : false);
  }, [isEdit]);

  const goBack = useDFGoBack();

  return (
    <div className={classes.maindiv}>
      <div className={classes.headerdiv}>
        <div className={classes.flex}>
          <div className={`${classes.header}`}>
            <PageHeader
              paddingX="20px"
              startAdornment={
                <span className={classes.arrowstyle} onClick={() => goBack('S')}>
                  {/* {<LeftArrowIcon />} */}
                  <BackArrowIcon className={classes.backArrowIcon} />
                </span>
              }
              handleBack={() => goBack('S')}
              // handleBack={() => setAction('HOME')}
              headerContent={isEdit ? 'Update note' : 'Add note'}
              // endAdornment={<span onClick={() => {}}>{CrossIcon}</span>}
            />
          </div>
          <div className={`${classes.tagdiv}`}>
            <MUISelect
              label="Choose a tag"
              placeholder="Choose a tag"
              options={WEIGHT_UNIT_OPTIONS}
              value={tag}
              onChange={(e: any) => setTag(e.target.value)}
              labelId={'Choose a tag'}
            />
          </div>
          <div className={classes.inputdiv}>
            <InputField
              label="Enter note"
              value={description}
              multiline
              maxRows={5}
              onChange={(event) => handleChange(event.target.value)}
            />
          </div>
          {description && (
            <div>
              <Checkbox checked={checked} onChange={handleCheck} />
              <span className={`${classes.check} ${CommonStyles.body15Regular}`}>Star</span>
            </div>
          )}
        </div>

        <div className={classes.footer}>
          <MUIButton
            variant="contained"
            size="large"
            onClick={addNotes}
            children={isEdit ? 'Update note' : 'Add note'}
            fullWidth={true}
            disabled={
              isEdit
                ? description?.length === 0 ||
                  (editCardData?.message === description && editCardData?.isStar === checked && editCardData?.privacy === tag)
                : description?.length === 0
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotesAdd;
