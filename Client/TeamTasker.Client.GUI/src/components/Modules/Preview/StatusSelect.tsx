import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckLeaderPermission from '../../Connection/API/CheckLeaderPermission';
import { useEffect, useState } from 'react';
import { UpdateProjectStatus } from '../API/Preview/UpdateProjectStatus';
import DataPostSnackbar from '../../Connection/Notifies/DataPostSnackbar';

export default function StatusSelect({projectId, projectStatus}: {projectId: number, projectStatus: string}) { 
  const statusNumberValues: {[key: string]: number} = {
    "OnTheRightPath": 1,
    "OnHold": 2,
    "Finished": 3,
    "CriticallyOffThePath": 4
  }

  const statusStringValues: {[key: string]: string} = {
    "1": "OnTheRightPath",
    "2": "OnHold",
    "3": "Finished",
    "4": "CriticallyOffThePath"
  }

  const [leaderPermission, setLeaderPermission] = React.useState<boolean>(false);
  leaderPermission;
  CheckLeaderPermission(setLeaderPermission);

  const [selectStatus, setSelectStatus] = useState<string>("OnTheRightPath");
  const [sendingState, setSendingState] = useState<boolean>(false);
  const [sendSucess, setSendSucess] = useState<number>(0);

  useEffect(() => {
    console.log("projectStatus: " + projectStatus + " | " + statusStringValues[projectStatus]);
    //setSelectStatus(projectStatus);
  }, []);

  return (
    <Box sx={{ maxWidth: 230, ml: "1.5rem", mt: "1rem" }}>
      {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
      {sendingState == false && sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectStatus}
          label=""
          onChange={(event) => {
            UpdateProjectStatus(projectId, statusNumberValues[event.target.value], setSendingState, setSendSucess, setSelectStatus);
          }}
          //disabled={leaderPermission ? false : true}
          disabled={true}
          
        >
          <MenuItem value={"OnTheRightPath"}>✅ On the right path</MenuItem>
          <MenuItem value={"OnHold"}>⏺ On hold</MenuItem>
          <MenuItem value={"Finished"}>🟪 Finished</MenuItem>
          <MenuItem value={"CriticallyOffThePath"}>❌Critically off the path</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}