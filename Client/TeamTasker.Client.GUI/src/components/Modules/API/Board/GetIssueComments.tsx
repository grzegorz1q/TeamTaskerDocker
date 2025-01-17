import axios from "axios";
import { ReadCommentDto } from "../../../Types/CommentDtos";
import { AxiosOptions } from "../../../Types/AxiosOptions";

export default async function GetIssueComments(issueId: number, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setComments: React.Dispatch<React.SetStateAction<ReadCommentDto[]>>)
{
    setSendingState(true);
    try{
        const response = await axios.get<ReadCommentDto[]>(`https://localhost:7014/api/Comment/GetIssueComments?IssueId=${issueId}`, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setComments(response.data);
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