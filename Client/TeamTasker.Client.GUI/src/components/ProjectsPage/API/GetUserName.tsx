import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadUserDto } from "../../Types/ReadUserDto";
import axios from "axios";

export default async function GetLoggedInUser(setUserName: React.Dispatch<React.SetStateAction<ReadUserDto | undefined>>, 
                                          setSendingState: React.Dispatch<React.SetStateAction<boolean>>,
                                          setUserId: React.Dispatch<React.SetStateAction<number>>
                                          /*setSendSucess: React.Dispatch<React.SetStateAction<number>>*/)
{
    setSendingState(true);
    try{
        var tempUser: ReadUserDto = {id: 0, firstName: "", lastName: "", email: "", isTeamLeader: false, password: "", resetPassword: false, position: "", roleId: 1}
        //CAUTION: there is only one tutor in DB, with no near plans of adding more. Should me changed if needed
        const responseEmail = await axios.get("https://localhost:7014/api/Account/authorize/email", AxiosOptions);
        const responseUserName = await axios.get(`https://localhost:7014/api/User/email?email=${responseEmail.data}`, AxiosOptions);
        
        tempUser = responseUserName.data;
        
        console.log("Id: " + tempUser.id);

        setUserName(tempUser);
        setUserId(tempUser.id);

        setSendingState(false);
        //setSendSucess(1);
        //await new Promise(resolve => setTimeout(resolve, 4000));
        //location.href = "/admin";
    }
    catch(error)
    {
        console.error("There was an issie with \"FetchData\" POST request: ", {error});
        //setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 4000));
        //setSendSucess(0);
    }
}