import { Box, IconButton } from "@mui/material";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//import { Input } from "@mui/joy";
//import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
//import CheckLeaderPermission from "../Connection/API/CheckLeaderPermission";
import TempGetNavbarAvatar from "../Connection/API/TempGetNavbarAvatar";
import UserAvatarMenu from "./UserAvatarMenu";
import { useParams } from "react-router-dom";
import IssuesListOptions from "./NavbarOptions/IssuesListOptions";
//import React from "react";
import TempSendNotification from "../Connection/API/TempSendNotification";
import ProjectFeedOptions from "./NavbarOptions/ProjectFeedOptions";

function renderSwitchJSX(pathName: string, projectId: string | undefined): JSX.Element
{
    switch (pathName) 
    {
        case `/projectname/${projectId}/issueslist`:
            return <IssuesListOptions />;

        //TODO: Need to check leader permission
        case `/projectname/${projectId}/projectfeed`:
            return <ProjectFeedOptions projectId={projectId!}/>
    
        default:
            return <></>;
    }
}

// function renderSwitch(pathnName: string, projectId: string | undefined): string[]
// {
//     const [userPermission, setUserPermission] = useState<boolean>(false);
//     CheckLeaderPermission(setUserPermission);
//     //TODO: Implement better solution ASAP - this is only a temporary solution
//     switch(pathnName)
//     {
//         case "/projectname/test":
//             return ["", "", ""];

//         case `/projectname/${projectId}/preview`:
//             if(userPermission)
//                 return ["Components", "Add", "Remove"];
//             else
//                 return ["", "", ""];

//         case `/projectname/${projectId}/issueslist`:
//             return ["Your Issues", "", ""];

//         case `/projectname/${projectId}/notifications`:
//             return ["Mentions", "Shared", ""];

//         case `/projectname/${projectId}/projectfeed`:
//             if(userPermission)
//                 return ["Publish", "", ""];
//             else
//                 return ["", "", ""];

//         case `/projectname/${projectId}/projectsettings`:
//             return ["", "", ""];

//         case `/projectname/usersettings`:
//             return ["", "", ""];

//         case `/projectname/${projectId}/board`:
//             return ["Switch Board", "", ""];

//         case `/projectname/${projectId}/projectmembers`:
//             if(userPermission)
//                 return ["Manage Users", "Manage Roles", ""];
//             else
//                 return ["", "", ""];
            
//         default:
//             return ["", "", ""];
//     }
// }

export default function UserElements()
{
    let pathName = location.pathname;
    const { projectId } = useParams<{projectId: string}>();
    const [avatarUrl, setAvatarUrl] = useState<string>("none");

    useEffect(()=> {
        TempGetNavbarAvatar(setAvatarUrl);
    }, []);

    return(
            <Box display="flex" flexDirection="row" sx={{width: "100%", height: "100%"}}>
                {/*Left Side of the Navbar*/}

                <Box display="flex" flexDirection="row" sx={{marginRight: "auto", alignItems: "center"}}>

                    {renderSwitchJSX(pathName, projectId)}

                    {/* <Typography variant="body1" color="#363b4d" fontWeight={550}>
                    {renderSwitch(pathName, projectId)[0] == "" ? <></> : <ArrowDropDownIcon sx={{color: "#363b4d", pt: "0.6rem"}}/>}{renderSwitch(pathName, projectId)[0]}
                    </Typography>

                    <Typography variant="body1" color="#363b4d" fontWeight={550} sx={{ml: "2rem"}}>
                        {renderSwitch(pathName, projectId)[1] == "" ? <></> : <ArrowDropDownIcon sx={{color: "#363b4d", pt: "0.6rem"}}/>}{renderSwitch(pathName, projectId)[1]}
                    </Typography>

                    <Typography variant="body1" color="#363b4d" fontWeight={550} sx={{ml: "2rem"}}>
                    {renderSwitch(pathName, projectId)[2] == "" ? <></> : <ArrowDropDownIcon sx={{color: "#363b4d", pt: "0.6rem"}}/>}{renderSwitch(pathName, projectId)[2]}
                    </Typography> */}
                </Box>

                {/*Right Side of the Navbar*/}
                <Box display="flex" flexDirection="row" sx={{marginLeft: "auto", alignItems: "center"}}>
                    {/* <Input 
                    startDecorator={<SearchIcon/>}
                    placeholder="Search for..."
                    sx={{mr: "1.5rem"}}
                    /> */}
                    <IconButton onClick={() => {TempSendNotification();}}>
                        <Badge badgeContent={0} color="primary" sx={{mr: "0rem"}}>
                            <NotificationsIcon fontSize="medium" sx={{color: "#363b4d"}} />
                        </Badge>
                    </IconButton>
                    <UserAvatarMenu avatarUrl={avatarUrl}/>
                </Box>
            </Box>
    );
}