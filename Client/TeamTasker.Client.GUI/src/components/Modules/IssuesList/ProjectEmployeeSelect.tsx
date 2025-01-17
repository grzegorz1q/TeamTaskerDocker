import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Box, CircularProgress, MenuItem, Select } from '@mui/material';
import { ReadEmployeeDto } from '../../Types/ReadEmployeeDto';
import { AxiosOptions } from '../../Types/AxiosOptions';
import { FormikCreateIssueHandleChange } from '../../Types/CommonTypes';


export default function ProjectEmployeeSelect({projectId, formikValue, formikHandleChange: formikSetFieldValue}: 
                                              {projectId: string, formikValue: number, formikHandleChange: FormikCreateIssueHandleChange})
{
    const [employees, setEmployees] = useState<ReadEmployeeDto[]>([]);

    useEffect(() => {
        axios.get<ReadEmployeeDto[]>(`https://localhost:7014/api/Project/GetEmployeesFromProject?projectId=${projectId}`, AxiosOptions)
            .then(response => 
                {
                setEmployees(response.data);
                console.log(response.data);
                console.log("Employees size: " + employees.length);
                if(employees.length != 0)
                {
                    //formikSetFieldValue("employeeId", employees[0].id);
                    console.log("Formik Value useEffect: " + formikValue);
                }
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych z API:', error);
            });
    }, []);

    if(employees.length == 0)
        return(<CircularProgress/>);

    return(
                <Select
                name="employeeId"
                placeholder="Select User to add" 
                sx={{minWidth: 245, maxWidth: 245}}
                defaultValue={0}
                value={formikValue}
                //onChange={(event, value) => {console.log("Formik Value onChange: " + formikValue + "\nSelect value: " + value?.toString()); formikSetFieldValue("employeeId", value); event}}
                onChange={formikSetFieldValue}
                >
                    <MenuItem key={0} value={0}>Select user</MenuItem>
                    {employees.map(employee => (
                        <MenuItem key={employee.id} value={employee.id}>
                            <Box display="flex" flexDirection="row" alignItems="center"><Avatar sx={{height: 25, width: 25}} alt="?" src={employee.avatar}/> {" "} {employee.firstName} {employee.lastName}</Box>
                        </MenuItem>
                    ))}
                </Select>
    );
}