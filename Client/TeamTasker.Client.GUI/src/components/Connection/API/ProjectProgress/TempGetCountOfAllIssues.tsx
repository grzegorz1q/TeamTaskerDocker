import axios from "axios";
import { TempIssuesDto } from "./TempIssuesDto";
import { AxiosOptions } from "../../../Types/AxiosOptions";

export default async function TempGetCountOfAllIssues(projectId: number, setTempIssues: React.Dispatch<React.SetStateAction<TempIssuesDto>>)
{
    try {
        const respone = await axios.get<TempIssuesDto>(`https://localhost:7014/api/Issue/GetCountOfAllAndDoneIssues?projectId=${projectId}`, AxiosOptions);
        setTempIssues(respone.data);
        console.log(respone.data);
    } catch (error) {
        console.log("Some errors with issues.");
    }
}