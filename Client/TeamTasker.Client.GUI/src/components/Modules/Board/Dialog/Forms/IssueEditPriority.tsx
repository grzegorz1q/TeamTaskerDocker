import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { UpdatePriorityRequest } from '../../../API/Board/EditIssueRequests';
import DataPostSnackbar from '../../../../Connection/Notifies/DataPostSnackbar';
import { handleIssueChange } from '../BoardReloadOnChange';

export default function IssueEditPriority({issuePriority, issueId, leaderPermission}: {issuePriority: string, issueId: number, leaderPermission: boolean})
{
  const priorityString: {[key: string]: string} = {
    "High": "🔴 High",
    "Medium": "🔵 Normal",
    "Low": "🟢 Low"
  }

  const priorityNumberValues: {[key: string]: number} = {
    "High": 1,
    "Medium": 2,
    "Low": 3
  }

  const [selectPriority, setSelectPriority] = useState<number | string>(priorityNumberValues[issuePriority]);
  const [sendingState, setSendingState] = useState<boolean>(false);
  const [sendSucess, setSendSucess] = useState<number>(0);

  return (
    <Box>
        {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
        <Select
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          name="priority"
          defaultValue={2}
          disabled={!leaderPermission ? true : (sendingState ? true : false)}
          label=""
          value={selectPriority}
          onChange={(event) => {
            UpdatePriorityRequest(issueId, event.target.value, setSendingState, setSendSucess, setSelectPriority);
            handleIssueChange(event.target.value.toString() + String(Math.random()));
          }}
        >
          <MenuItem value={1}>{priorityString["High"]}</MenuItem>
          <MenuItem value={2}>{priorityString["Medium"]}</MenuItem>
          <MenuItem value={3}>{priorityString["Low"]}</MenuItem>
        </Select>
    </Box>
  );
}