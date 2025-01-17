import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadProjectDto } from "../../Types/ReadProjectDto";

export async function GetUsersProjects(userId: number, setProjects: React.Dispatch<React.SetStateAction<ReadProjectDto[]>>)
{
    if(userId == 0 || userId == null)
        return;

    //setSendingState(true);
    try{
        //console.log("przed" + userId);
        const response = await axios.get<ReadProjectDto[]>(`https://localhost:7014/api/User/GetAllEmployeeProjects?id=${userId}`, AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        console.log("asdasdsasa" + response.data);
        setProjects(response.data);
        console.log(response.data.length);
        //setSendingState(false);
        //setSendSucess(1);
        //await new Promise(resolve => setTimeout(resolve, 3000));
        //setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"POSTCalendarEntry\" POST request: ", {error});
        //setSendSucess(2);
        //setSendingState(false);
        //await new Promise(resolve => setTimeout(resolve, 3000));
        //setSendSucess(0);
    }
}