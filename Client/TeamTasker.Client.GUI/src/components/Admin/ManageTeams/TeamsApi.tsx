import { AxiosOptions } from "../../Types/AxiosOptions";
import { AddUserToTeamForm, ChangeTeamLeader, CreateTeamForm } from "../../Types/CommonTypes";
import axios from "axios";
import { UserNameAndEmailDto } from "../../Types/UserNameAndEmailDto";
import { ReadTeamDto } from "../../Types/ReadTeamDto";

export async function AddUserToTeamRequest(UserToAdd: AddUserToTeamForm, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
                                                                                              setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    setSendingState(true);
    try{
        //CAUTION: there is only one tutor in DB, with no near plans of adding more. Should me changed if needed
        const response = await axios.post('https://localhost:7014/api/Admin/AddEmployeeToTeam', UserToAdd, AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        setSendingState(false);
        setSendSucess(1);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"POSTCalendarEntry\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}

export async function CreateTeamRequest(teamToCreate: CreateTeamForm, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    setSendingState(true);
    try{
        const response = await axios.post('https://localhost:7014/api/Admin/CreateTeam', teamToCreate, AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        setSendingState(false);
        setSendSucess(1);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"POSTCalendarEntry\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}

export async function GetUserNameAndEmail(setCurrentLeader: React.Dispatch<React.SetStateAction<string>>, teamId: number | null) 
{
    if(teamId == null || teamId == 0)
    {
        setCurrentLeader("Not set leader yet");
        return;
    }

    var firstResponse = await axios.get<ReadTeamDto>(`https://localhost:7014/api/Team/id?id=${teamId}`);
    console.log("firstResponse: " + firstResponse.data.leaderId);
    axios.get<UserNameAndEmailDto>(`https://localhost:7014/api/User/GetUserNameAndEmail?id=${firstResponse.data.leaderId}`, AxiosOptions)
    .then(response => 
        {
            setCurrentLeader(response.data.firstName + " " + response.data.lastName + ", " + response.data.email);
            console.log(response.data.firstName);
    })
    .catch(error => {
        console.error('Błąd podczas pobierania danych z API:', error);
    });    
}

export async function ChangeTeamLeaderRequest(newTeamLeader: ChangeTeamLeader, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>) 
{
    setSendingState(true);
    try{
        const response = await axios.put('https://localhost:7014/api/Admin/ChangeTeamLeader', newTeamLeader, AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        setSendingState(false);
        setSendSucess(1);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
        location.reload();
    }
    catch(error)
    {
        console.error("There was an issie with \"POSTCalendarEntry\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }    
}
