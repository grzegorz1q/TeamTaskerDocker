import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadEmployeeDto } from "../../Types/ReadEmployeeDto";

export async function CheckIfMember(projectId: string | undefined, setIsMember: React.Dispatch<React.SetStateAction<boolean>>, 
    setGettingState: React.Dispatch<React.SetStateAction<boolean>>, setIsMemberSuccess: React.Dispatch<React.SetStateAction<number>>)
{
    if(projectId === "0" || projectId == undefined)
        return;

    setGettingState(true);
    try{
        const currentProjectEmployees = await axios.get<ReadEmployeeDto[]>(`https://localhost:7014/api/Project/GetEmployeesFromProject?projectId=${projectId}`, AxiosOptions);
        const currentUserEmail = await axios.get<string>(`https://localhost:7014/api/Account/authorize/email`, AxiosOptions);

        if(currentProjectEmployees.data.some(employee => employee.email === currentUserEmail.data))
        {
            setIsMember(true);
            setGettingState(false);
            setIsMemberSuccess(1);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setIsMemberSuccess(0);
        }
        else
            throw new Error("User is not a member of the project");
        
    }
    catch(error)
    {
        console.error("There was an issue with \"CheckIfMember\" request: ", {error});
        setIsMemberSuccess(2);
        setGettingState(false);
        setIsMember(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsMemberSuccess(0);
    }
}