import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosOptions } from '../../../Types/AxiosOptions';
import { Option, Select } from '@mui/joy';
import { FormControl } from '@mui/material';
import { FormikUsersSetValue } from '../../../Types/CommonTypes';
import { ReadTeamDto } from '../../../Types/ReadTeamDto';


export default function TeamsSelect({FormikValue, formikSetValue, idName}: {FormikValue: number, formikSetValue: FormikUsersSetValue, idName: string})
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