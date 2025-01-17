import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadProjectDto } from "../../Types/ReadProjectDto";

export async function GetCurrentProjectInfo(projectId: string | undefined, setProject: React.Dispatch<React.SetStateAction<ReadProjectDto>>, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    if(projectId === "0" || projectId == undefined)
        return;

    setSendingState(true);
    try{
        const response = await axios.get<ReadProjectDto>(`https://localhost:7014/api/Project/id?id=${projectId}`, AxiosOptions);
        console.log("ReadProjectDto: " + response.data.name);
        console.log("Response: " + response);
        setProject(response.data);
        setSendingState(false);
        setSendSucess(1);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"GetCurrentProjectInfo\" GET request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}