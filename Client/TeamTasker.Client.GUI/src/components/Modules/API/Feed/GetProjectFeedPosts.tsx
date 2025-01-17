import axios from "axios";
import { AxiosOptions } from "../../../Types/AxiosOptions";
import { ReadIssueDto } from "../../../Types/ReadIssuesDto";

type setSendingState = React.Dispatch<React.SetStateAction<boolean>>;
type setSendSuccess =  React.Dispatch<React.SetStateAction<number>>;
type setFeedPosts = React.Dispatch<React.SetStateAction<ReadIssueDto[]>>;

export async function GetProjectFeedPosts(setSendingState: setSendingState, setSendSucess: setSendSuccess, setFeedPosts: setFeedPosts, projectId: string | undefined)
{
    setSendingState(true);
    try{
        const response = await axios.get<ReadIssueDto[]>(`https://localhost:7014/api/Project/GetAllFeedPostsFromProject?projectId=${projectId}`, AxiosOptions);
        setSendingState(false);
        setSendSucess(1);
        setFeedPosts(response.data);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issue with \"GetProjectFeedPosts\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}