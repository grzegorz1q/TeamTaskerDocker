import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CheckLeaderPermission from '../../Connection/API/CheckLeaderPermission';
import { FormikCreateIssueHandleChange } from '../../Types/CommonTypes';

export default function PrioritySelect({formikValue, formikHandleChange}: 
                                       {formikValue: number, formikHandleChange: FormikCreateIssueHandleChange})
{
  const [priority, setPriority] = React.useState("Medium");
  priority;

  const [leaderPermission, setLeaderPermission] = React.useState<boolean>(false);
  leaderPermission;
  CheckLeaderPermission(setLeaderPermission);

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  handleChange;

  const priorityString: {[key: string]: string} = {
    "High": "🔴 High",
    "Medium": "🔵 Normal",
    "Low": "🟢 Low"
  }

  return (
    <Box sx={{ minWidth: 245, maxWidth: 245}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          name="priority"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={2}
          value={formikValue}
          label=""
          onChange={formikHandleChange}
          
        >
          <MenuItem value={1}>{priorityString["High"]}</MenuItem>
          <MenuItem value={2}>{priorityString["Medium"]}</MenuItem>
          <MenuItem value={3}>{priorityString["Low"]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}