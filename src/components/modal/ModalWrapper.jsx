/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions,  DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
// import CloseIcon from '@material-ui/icons/Close';
// import Controls from './controls/Controls';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../features/modal/modalSlice';

export default function ModalWrapper({ isOpen, header, children, maxWidth, isHeader, componentName, modalId, onClick }) {
  const isModal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [onClose, setOnClose] = useState(false);
  useEffect(() => {
    if (onClose) {
      dispatch(closeModal());
      setOnClose(!onClose);
    }
  }, [onClose]);

  const CustomDialog = styled(Dialog)(({ theme }) => ({
    top: 10,
    bottom: 'auto',
    // overflow: 'auto',
    // maxHeight: '95vh',
  }));

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isModal.isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isModal.isOpen]);

  return (
    <Dialog
      scroll="paper"
      open={(isModal.isOpen && isModal.componentName === componentName && isModal.id === modalId)}
      maxWidth={maxWidth}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      className=""
      sx={{ top: 20 }}
    >
      <DialogTitle id="scroll-dialog-title" className={`${isHeader === false ? 'hidden' : 'block'}`}>
        <div style={{ display: 'flex' }}>
          {header}
          <button onClick={() => setOnClose(true)} type="button" className="absolute right-8">
            <CloseIcon />
          </button>
        </div>
      </DialogTitle>
      <DialogContent dividers id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button onClick={onClick} >Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
