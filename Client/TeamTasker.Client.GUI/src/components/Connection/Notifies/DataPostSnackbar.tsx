import * as React from 'react';
import Box from '@mui/joy/Box';
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function DataPostSnackbar({TextIndex, IsDangerSnackBar}: {TextIndex: number, IsDangerSnackBar: boolean}) {
  const [state, setState] = React.useState<State>({
    open: true,
    vertical: 'top',
    horizontal: 'left',
  });
  const { vertical, horizontal } = state;

  const ErrorTexts = [
    "There was an issue while performing this action",
    "An action was performed successfully"
  ];

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        autoHideDuration={3000}
        sx={{marginTop: "0rem"}}
        anchorOrigin={{ vertical, horizontal }}
        open={true}
        onClose={handleClose}
        key={vertical + horizontal}
        variant='solid'
        color={IsDangerSnackBar ? 'danger' : 'success'}
      >
        {ErrorTexts[TextIndex]}
      </Snackbar>
    </Box>
  );
}