import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadEmployeeDto } from "../../Types/ReadEmployeeDto";

export async function GetProjectEmployees(projectId: string | undefined, setProjectEmployees: React.Dispatch<React.SetStateAction<ReadEmployeeDto[]>>)
{
    if(projectId === "0" || projectId == undefined)
        return;

    //setSendingState(true);
    try{
        const response = await axios.get<ReadEmployeeDto[]>(`https://localhost:7014/api/Project/GetEmployeesFromProject?projectId=${projectId}`, AxiosOptions);
        //console.log("ReadEmployeeDto[0]: " + response.data[0].email);
        console.log("Response: " + response.data[0].firstName);
        setProjectEmployees(response.data);

        //setSendingState(false);
        //setSendSucess(1);
        //await new Promise(resolve => setTimeout(resolve, 3000));
        //setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issue with \"GetProjectEmployees\" GET request: ", {error});
        //setSendSucess(2);
        //setSendingState(false);
        //await new Promise(resolve => setTimeout(resolve, 3000));
        //setSendSucess(0);
    }
}