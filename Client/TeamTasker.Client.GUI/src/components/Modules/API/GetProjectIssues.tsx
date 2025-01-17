import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadIssueDto } from "../../Types/ReadIssuesDto";

export async function GetProjectIssues(projectId: string | undefined, setProjectIssues: React.Dispatch<React.SetStateAction<ReadIssueDto[]>>, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    if(projectId === "0" || projectId == undefined)
        return;

    setSendingState(true);
    try{
        const response = await axios.get<ReadIssueDto[]>(`https://localhost:7014/api/Issue/GetAllIssuesFromProject?projectId=${projectId}`, AxiosOptions);
        console.log("GetProjectIssues[]: " + response.data[0].name);
        console.log("Response: " + response);
        setProjectIssues(response.data);
        setSendingState(false);
        setSendSucess(0);
        // await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"GetProjectIssues\" GET request: ", {error});
        setSendSucess(0);
        setSendingState(false);
        //await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}