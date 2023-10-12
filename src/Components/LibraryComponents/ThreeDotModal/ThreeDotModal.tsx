import { ClickAwayListener, Grow, IconButton, Paper, Popover, Popper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ThreeDotIcon } from '../../SVGs/Common';
import { ThreeDotContainer, useStyles } from './ThreeDotModal.styles';
import { IProps } from './ThreeDotModal.types';

export default function ThreeDotModal(props: IProps) {
  const {
    renderButton,
    isReverse,
    children,
    customStyle,
    open: openModal,
    setOpen: setOpenModal,
    isGrow,
    isRotate,
    disable,
    onModalOpen,
    onModalClose,
    anchorAlignment,
    popOverAlignment,
  } = props;

  const { classes } = useStyles(props);
  const anchorEl = useRef(null);

  const [open, setOpen] = useState(openModal || false);

  useEffect(() => {
    setOpen(openModal || false);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    setOpenModal && setOpenModal(false);
  };

  const handleShow = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!disable) {
      setOpen((pre) => !pre);
      // TODO: commented out fix pop up not closing when clicked on the icon again
      // setOpenModal && setOpenModal((pre) => (isRotate ? !pre : true));
      setOpenModal && setOpenModal((pre) => !pre);
    }
  };

  if (props.usePopOver) {
    return (
      <div
        ref={anchorEl}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popover
          open={open}
          anchorEl={anchorEl.current}
          className={classes.zIndex}
          role={undefined}
          onClose={handleClose}
          anchorOrigin={
            anchorAlignment ?? {
              vertical: 'bottom',
              horizontal: 'center',
            }
          }
          transformOrigin={
            popOverAlignment ?? {
              horizontal: 'right',
              vertical: 'top',
            }
          }
          PaperProps={{
            className: `${classes.rootStyle} ${customStyle}`,
          }}
          disableRestoreFocus
        >
          {children}
        </Popover>
        {renderButton ? (
          <span data-rotate={Boolean(isRotate && open)} className={classes.renderButtonStyle} onClick={handleShow}>
            {renderButton}
          </span>
        ) : (
          <IconButton className={classes.threeDotButton} onClick={handleShow}>
            <ThreeDotIcon />
          </IconButton>
        )}
      </div>
    );
  }

  return (
    <>
      {isGrow ? (
        <div ref={anchorEl}>
          <Popper open={open} anchorEl={anchorEl.current} className={classes.zIndex} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper className={`${classes.rootStyle} ${customStyle}`}>
                  <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {renderButton ? (
            <span data-rotate={Boolean(isRotate && open)} className={classes.renderButtonStyle} onClick={handleShow}>
              {renderButton}
            </span>
          ) : (
            <IconButton className={classes.threeDotButton} onClick={handleShow}>
              <ThreeDotIcon />
            </IconButton>
          )}
        </div>
      ) : (
        <ClickAwayListener onClickAway={handleClose}>
          <div className={`${classes.rootStyle} ${customStyle}`}>
            <ThreeDotContainer
              PopperProps={{ disablePortal: true }}
              onClose={handleClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              // interactive
              placement={isReverse ? 'bottom-start' : 'bottom-end'}
              title={children}
            >
              {renderButton ? (
                <span data-rotate={Boolean(isRotate && open)} className={classes.renderButtonStyle} onClick={handleShow}>
                  {renderButton}
                </span>
              ) : (
                <IconButton className={classes.threeDotButton} onClick={handleShow}>
                  <ThreeDotIcon />
                </IconButton>
              )}
            </ThreeDotContainer>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}
