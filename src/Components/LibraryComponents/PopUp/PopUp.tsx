import { Dialog, DialogActions, DialogContent } from '@mui/material';
import InputField from '../InputField/InputField';
import MUIButton from '../MUIButton/MUIButton';
import { useStyles } from './PopUp.styles';
import { IProps } from './PopUp.types';

export default function PopUp(props: IProps) {
  const {
    isOpen,
    header,
    body,
    variant,
    description,
    descriptionPlaceHolder,
    handleCancel,
    handleDescriptionChange,
    handleSave,
    cancelButtonLabel,
    saveButtonLabel,
    disableSaveButton,
    panelWidth,
  } = props;
  const { classes } = useStyles();
  return (
    <Dialog
      className={classes.dialog}
      open={isOpen}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div style={{ width: `${panelWidth}px`, maxWidth: `${panelWidth}px` }}>
        <DialogContent className={`${classes.dialogContent} ${classes.paddingBottom0px}`}>
          <div className={classes.headerGrid}>
            <div>
              <span className={classes.header}>{header}</span>
            </div>
            <div className={classes.closeCenter}>
              <span>
                <svg
                  cursor="pointer"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  <path
                    d="M14 1.974L12.026 0L7 5.026L1.974 0L0 1.974L5.026 7L0 12.026L1.974 14L7 8.974L12.026 14L14 12.026L8.974 7L14 1.974Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
          {variant === 'primary' ? (
            <div className={`${classes.padding4px} ${classes.body}`}>
              <span>{body}</span>
            </div>
          ) : null}
          {variant === 'withinput' ? (
            <div>
              <InputField
                value={description}
                placeholder={descriptionPlaceHolder}
                rows={5}
                onChange={(e) => {
                  handleDescriptionChange?.(e);
                }}
              />
            </div>
          ) : null}
        </DialogContent>
        <DialogActions className={classes.padding8px}>
          <div className={classes.flexButtons}>
            <div className={`${classes.padding4px}`}>
              <MUIButton
                variant="contained"
                onClick={() => {
                  handleCancel();
                }}
              >
                {cancelButtonLabel}
              </MUIButton>
            </div>
            <div className={`${classes.padding4px}`}>
              <MUIButton
                variant={'contained'}
                disabled={disableSaveButton}
                onClick={() => {
                  handleSave();
                }}
              >
                {saveButtonLabel}
              </MUIButton>
            </div>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
}
