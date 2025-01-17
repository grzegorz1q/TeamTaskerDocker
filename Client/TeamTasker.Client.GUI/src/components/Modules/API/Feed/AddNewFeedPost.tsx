import axios from "axios";
import { AxiosOptions } from "../../../Types/AxiosOptions";
import { CreateFeedPostDto } from "../../../Types/CreateFeedPostDto";


export async function AddNewFeedPost(newFeedPost: CreateFeedPostDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    setSendingState(true);
    try{
        await axios.post<CreateFeedPostDto>(`https://localhost:7014/api/Project/CreateFeedPost`, newFeedPost, AxiosOptions);
        setSendingState(false);
        setSendSucess(1);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"AddCommentToIssue\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}