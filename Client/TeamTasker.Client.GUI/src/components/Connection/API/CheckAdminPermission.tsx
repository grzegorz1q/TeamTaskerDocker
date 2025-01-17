import axios from "axios";
import { useEffect} from "react";
import { AxiosOptions } from "../../Types/AxiosOptions";

async function FetchData(setUserPermission: React.Dispatch<React.SetStateAction<boolean>>, setLoadingPermissionState: React.Dispatch<React.SetStateAction<boolean>>)
{
    setLoadingPermissionState(true);
    try{
        const response = await axios.get('https://localhost:7014/api/Account/authorize/admin', AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        setLoadingPermissionState(false);
        setUserPermission(true);
    
        //await new Promise(resolve => setTimeout(resolve, 4000));
        //location.href = "/";
    }
    catch(error)
    {
        console.error("There was an issue with \"CheckLoggedInPermission\" POST request: ", {error});
        setUserPermission(false);
        setLoadingPermissionState(false);
    }
}

export default function CheckAdminPermission(setUserPermission: React.Dispatch<React.SetStateAction<boolean>>, setLoadingPermissionState: React.Dispatch<React.SetStateAction<boolean>>)
{
    useEffect(() => {
        FetchData(setUserPermission, setLoadingPermissionState);
    }, []);
}