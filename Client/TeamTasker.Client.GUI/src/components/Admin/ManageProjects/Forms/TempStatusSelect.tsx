import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Select, Option } from '@mui/joy';
import { FormikCreateProjectSetValue } from '../../../Types/CommonTypes';

export default function TempStatusSelect({FormikValue, formikSetValue, idName}: {FormikValue: number, formikSetValue: FormikCreateProjectSetValue, idName: string}) 
{

  return (
    <Box sx={{ maxWidth: 230}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          value={FormikValue}
          onChange={(event, value) => {formikSetValue(idName, value), event}}
          sx={{minWidth: "25rem"}}
          placeholder="Choose the initial status"
          
        >
          <Option key={1} value={1}>✅ On the right path</Option>
          <Option key={2} value={2}>⏺ On hold</Option>
          <Option key={3} value={3}>🟪 Finished</Option>
          <Option key={4} value={4}>❌Critically off the path</Option>
        </Select>
      </FormControl>
    </Box>
  );
}