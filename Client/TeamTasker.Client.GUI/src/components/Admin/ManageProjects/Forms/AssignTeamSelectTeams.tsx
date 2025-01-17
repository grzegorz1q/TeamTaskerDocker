import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosOptions } from '../../../Types/AxiosOptions';
import { Option, Select } from '@mui/joy';
import { FormControl } from '@mui/material';
import { FormikAssignTeamSetValue } from '../../../Types/CommonTypes';
import { ReadTeamDto } from '../../../Types/ReadTeamDto';

//TODO: Create generic Employees Select component. This in only a temporary, development solution

export default function AssignTeamSelectTeams({FormikValue, formikSetValue, idName}: {FormikValue: number, formikSetValue: FormikAssignTeamSetValue, idName: string})
{
    const [teams, setTeams] = useState<ReadTeamDto[]>([]);

    useEffect(() => {
        axios.get<ReadTeamDto[]>(`https://localhost:7014/api/Team/GetAllTeams`, AxiosOptions)
            .then(response => 
                {
                setTeams(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych z API:', error);
            });
    }, []);

    return(
        <>
            <FormControl>
                <Select placeholder="Select Team" value={FormikValue} onChange={(event, value) => {formikSetValue(idName, value), event}} sx={{minWidth: "18rem"}}>
                    {teams.map(team => (
                        <Option key={team.id} value={team.id}>
                            {team.name}
                        </Option>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}