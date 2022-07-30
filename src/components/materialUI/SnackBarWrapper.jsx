import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarWrapper({ open, onClose, severity, message }) {
  return (
    <Snackbar
      open={open}
      // autoHideDuration={6000}
      // onClose={onCloe}
      // message="Drag and Drop Mode"
      // action={action}
      severity="warning"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%', height: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
