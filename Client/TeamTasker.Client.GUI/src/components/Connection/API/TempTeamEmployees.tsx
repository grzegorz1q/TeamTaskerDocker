import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosOptions } from "../../Types/AxiosOptions";

async function FetchData(setUserPermission: React.Dispatch<React.SetStateAction<boolean>>, setSendingState: React.Dispatch<React.SetStateAction<boolean>>)
{
    setSendingState(true);
    setUserPermission(false);
    try{
        
        //TODO: Another endpoint needed - get user id by token
        const responeEmail = await axios.get('https://localhost:7014/api/Account/authorize/email', AxiosOptions);
        const responseEmployees = await axios.get('https://localhost:7014/api/Team/GetAllTeamEmployees?id=1', AxiosOptions);
        for (const employee of responseEmployees.data) {
            console.log("Employee Name: " + employee.email);
            if(employee.email == responeEmail.data)
                setUserPermission(true);
        }
        setSendingState(false);
        //setUserPermission(false);
    
        //await new Promise(resolve => setTimeout(resolve, 4000));
        //location.href = "/";
    }
    catch(error)
    {
        console.error("There was an issue with \"CheckLoggedInPermission\" POST request: ", {error});
        setUserPermission(false);
        setSendingState(false);
    }
}

export default function TempTeamEmployees(setUserPermission: React.Dispatch<React.SetStateAction<boolean>>)
{
    //const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);
    const [sendingState, setSendingState] = useState<boolean>(false);
    sendingState;

    useEffect(() => {
        FetchData(setUserPermission, setSendingState);
    }, []);
}