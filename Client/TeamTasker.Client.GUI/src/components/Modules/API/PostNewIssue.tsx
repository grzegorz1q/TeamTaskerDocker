import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { CreateIssueDto } from "../../Types/CreateIssueDto";

export async function PostNewIssue(newIssue: CreateIssueDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    if(newIssue.projectId == 0 || newIssue.projectId == undefined)
        return;

    setSendingState(true);
    try{
        await axios.post(`https://localhost:7014/api/Leader/CreateIssue`, newIssue, AxiosOptions);
        setSendingState(false);
        setSendSucess(1);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"PostNewIssue\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}