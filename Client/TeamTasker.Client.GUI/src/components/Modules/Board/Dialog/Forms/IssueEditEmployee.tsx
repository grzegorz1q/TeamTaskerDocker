import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, FormControl } from '@mui/material';
import { AxiosOptions } from '../../../../Types/AxiosOptions';
import { handleIssueChange } from '../BoardReloadOnChange';
import { UpdateEmployeeRequest } from '../../../API/Board/EditIssueRequests';
import { ReadEmployeeDto } from '../../../../Types/ReadEmployeeDto';


export default function IssueEditEmployee({projectId, issueId, issueEmployee, leaderPermission}: {projectId: string, issueId: number, issueEmployee: number, leaderPermission: boolean})
{
    const [selectUser, setSelectUser] = useState<number | string>(issueEmployee);
    const [employees, setEmployees] = useState<ReadEmployeeDto[]>([]);
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    sendSucess;

    useEffect(() => {
        axios.get<ReadEmployeeDto[]>(`https://localhost:7014/api/Project/GetEmployeesFromProject?projectId=${projectId}`, AxiosOptions)
            .then(response => 
                {
                setEmployees(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych z API:', error);
            });
    }, []);

    return(
        <>
            <FormControl>
                <Select 
                name="employee"
                placeholder="Select User" 
                value={selectUser} 
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, minWidth: "10rem"}}
                disabled={!leaderPermission ? true : (sendingState ? true : false)}
                label=""
                onChange={ (event) => {
                    UpdateEmployeeRequest(issueId, event.target.value, setSendingState, setSendSucess, setSelectUser);
                    handleIssueChange(event.target.value.toString() + String(Math.random()));
                }} 
                >
                    {employees.map(employee => (
                        <MenuItem value={employee.id}>
                            <Box sx={{display: "flex", flexDirection: "row", minWidth: "8rem", alignItems: "center"}}><Avatar src={employee.avatar}></Avatar>   {employee.firstName} {employee.lastName}</Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}