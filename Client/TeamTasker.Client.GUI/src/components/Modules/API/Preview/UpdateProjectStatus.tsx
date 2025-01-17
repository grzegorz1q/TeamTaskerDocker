import axios from "axios";
import { AxiosOptions } from "../../../Types/AxiosOptions";

const statusNumberValues: {[key: number]: string} = {
    1: "OnTheRightPath",
    2: "OnHold",
    3: "Finished",
    4: "CriticallyOffThePath"
  }

export async function UpdateProjectStatus(projectId: number, newStatus: number, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setSelectStatus:  React.Dispatch<React.SetStateAction<string>>)
{
    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Project/UpdateProjectStatus`, {"id": projectId, "priority": newStatus}, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setSelectStatus(statusNumberValues[newStatus]);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdatePriorityRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
}