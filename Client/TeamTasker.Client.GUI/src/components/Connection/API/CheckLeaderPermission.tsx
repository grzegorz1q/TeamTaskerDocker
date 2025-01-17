import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { useParams } from "react-router-dom";

async function FetchData(projectId: string | undefined, setUserPermission: React.Dispatch<React.SetStateAction<boolean>>, setSendingState: React.Dispatch<React.SetStateAction<boolean>>)
{
    setSendingState(true);
    try{
        if(projectId === "0" || projectId === undefined)
            throw new Error();

        const response = await axios.get<boolean>(`https://localhost:7014/api/Account/authorize/IsLeader?projectId=${projectId}`, AxiosOptions);
        console.log("POST: Respone from API" + response.data);
        if(response.data)
            setUserPermission(true);
        else
            setUserPermission(false);
        
        setSendingState(false);
        //await new Promise(resolve => setTimeout(resolve, 4000));
        //location.href = "/";
    }
    catch(error)
    {
        console.error("There was an issue with \"Check if Leader\" GET request: ", {error});
        setUserPermission(false);
        setSendingState(false);
    }
}

export default function CheckLeaderPermission(setUserPermission: React.Dispatch<React.SetStateAction<boolean>>)
{
    //const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);
    const [sendingState, setSendingState] = useState<boolean>(false);
    sendingState;

    const { projectId } = useParams<{projectId: string}>();

    useEffect(() => {
        FetchData(projectId, setUserPermission, setSendingState);
    }, []);
}