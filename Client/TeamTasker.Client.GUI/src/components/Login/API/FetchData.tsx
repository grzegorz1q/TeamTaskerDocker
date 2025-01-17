import { LoginDto } from "../../Types/LoginDto";
import axios from "axios";

export default async function FetchData(LoginDto: LoginDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    const options = {withCredentials: true};
    setSendingState(true);
    try{
        //CAUTION: there is only one tutor in DB, with no near plans of adding more. Should me changed if needed
        const response = await axios.post('https://localhost:7014/api/Account/login/credentials', LoginDto, options);
        console.log("POST: Respone from API" + response.data);
        setSendingState(false);
        setSendSucess(1);
        //await new Promise(resolve => setTimeout(resolve, 4000));
        //location.href = "/admin";
        location.reload();
    }
    catch(error)
    {
        console.error("There was an issie with \"FetchData\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 4000));
        setSendSucess(0);
    }
}