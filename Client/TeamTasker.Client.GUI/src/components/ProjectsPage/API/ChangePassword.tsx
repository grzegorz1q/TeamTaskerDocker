import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import DeleteTokenFromCookies from "../../Connection/DeleteTokenFromCookies";

export default async function ChangePassword(newPassword: string, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    type changedPassowrd = {
        newPassword: string
    }
    const passwordJson: changedPassowrd = {
        newPassword: newPassword
    }
    setSendingState(true);
    try{
        const response = await axios.put('https://localhost:7014/api/User/ChangePassword', passwordJson, AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        setSendingState(false);
        setSendSucess(1);
        DeleteTokenFromCookies();
        location.href = "/login";
    }
    catch(error)
    {
        console.error("There was an issie with \"ChangePassword\" PUT request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 4000));
        setSendSucess(0);
    }
}